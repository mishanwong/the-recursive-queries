from flask import Flask, request, jsonify, render_template, redirect, url_for # type: ignore
from flask_cors import CORS
import database.db as db
from datetime import datetime
import pymysql

app = Flask(__name__)
CORS(app)

db_connection = db.connect_to_database()

@app.route("/")
def index():
    return render_template("main.j2")

########################################### SALES PRODUCTS ######################################
# ------- SELECT ------- 
@app.route("/sales_products_browse", methods=["GET"])
def sales_products_browse():
    try:
        query = """
            SELECT sp.saleProductId, p.name AS productName, sp.saleId, s.date, c.name AS customerName, sp.quantity, sp.lineTotal  
            FROM SalesProducts AS sp
            JOIN Products AS p
            ON sp.productId = p.productId
            JOIN Sales AS s
            ON sp.saleId = s.saleId
            JOIN Customers AS c
            ON s.customerId = c.CustomerId
            ORDER BY sp.saleProductId;
            """
        cursor = db.execute_query(db_connection=db_connection, query=query)
        results = cursor.fetchall()

        for result in results:
            result["date"] = datetime.strftime(result["date"], "%Y-%m-%d")

        query2 = "SELECT name AS productName FROM Products;"
        cur2 = db.execute_query(db_connection=db_connection, query=query2)
        products = cur2.fetchall()
        
        query3 = """
            SELECT s.saleId, s.date, c.name AS customerName
            FROM Sales AS s
            JOIN Customers AS c
            ON s.customerId = c.customerId
            ORDER BY saleId ASC;
            """
        cur3 = db.execute_query(db_connection=db_connection, query=query3)
        sales = cur3.fetchall()

        for sale in sales:
            sale["date"] = datetime.strftime(sale["date"], "%Y-%m-%d") 

        headers = ["ID", "Product", "Sale ID", "Sale Date", "Customer", "Quantity", "Subtotal", "Action"]
        return render_template("sales_products.j2", data=results, products=products, sales=sales, headers=headers)
    except pymysql.DatabaseError as e:
        return jsonify(str(e)), 500
    except Exception as e:
        return jsonify(str(e)), 500

# ------- INSERT ------- 
@app.route("/sales_products_new", methods=["POST"])
def sales_products_new():
    if request.method == "POST":
        data = request.form
        name = data["name"]
        saleId = data["saleId"]
        quantity = int(data["quantity"])
        params = (name, saleId, quantity, name, quantity)
        query = """
        INSERT INTO SalesProducts (productId, saleId, quantity, lineTotal) 
        VALUES ((SELECT productId FROM Products WHERE name = %s), %s, %s, 
        (SELECT unitPrice FROM Products WHERE name = %s) * %s);
        """

        cursor = db.execute_query(db_connection=db_connection, query=query, query_params=params)
        return redirect("/sales_products_browse")
    else:
        return "Invalid route"

# ------- UPDATE ------- 
@app.route("/sales_products_edit", methods=["POST"])
def sales_products_edit():
    if request.method == "POST":
        data = request.form
        saleProductId = data['saleProductId']
        name = data['productName']
        saleId = data['saleId']
        quantity = int(data['quantity'])
        query = """
        UPDATE SalesProducts 
        SET SalesProducts.productId = (SELECT productId FROM Products WHERE name = %s), 
        SalesProducts.saleId = %s, SalesProducts.quantity = %s, 
        lineTotal = (SELECT unitPrice FROM Products WHERE name = %s) * %s 
        WHERE SalesProducts.saleProductId = %s;
        """
        params = (name, saleId, quantity, name, quantity, saleProductId)
        db.execute_query(db_connection=db_connection, query=query, query_params=params)
        return redirect("/sales_products_browse")
    else:
        return "Invalid route"
    
# ------- DELETE ------- 
@app.route("/sales_products_delete", methods=["POST"])
def sales_products_delete():
    if request.method == "POST":
        data = request.form
        saleProductId = data["saleProductId"]
        query = "DELETE FROM SalesProducts WHERE saleProductId = %s;"
        params = (saleProductId,)
        cursor = db.execute_query(db_connection=db_connection, query=query, query_params=params)
        return redirect("/sales_products_browse")

########################################### PRODUCTS ######################################

# ------- SELECT ------- 
@app.route("/products_browse", methods=["GET"])
def products_browse():
    query = """
    SELECT p.productId, c.name as categoryName, p.name as productName, p.unitPrice FROM Products AS p
    JOIN Categories as c
    ON p.categoryId = c.categoryId;
    """
    cursor = db.execute_query(db_connection=db_connection, query=query)
    results = cursor.fetchall()

    query2 = "SELECT * FROM Categories;"
    cur2 = db.execute_query(db_connection=db_connection, query=query2)
    categories = cur2.fetchall()

    headers = ["ID", "Category", "Name", "Unit Price"]
    return render_template("products.j2", data=results, headers=headers, categories=categories) 

# ------- INSERT ------- 
@app.route("/products", methods=["POST"])
def products_new():
    if request.method == "POST":
        data = request.form
        category = data["category"]
        productName = data["productName"]
        unitPrice = data["unitPrice"]
        params = (category, productName, unitPrice)
        query = """
        INSERT INTO Products (categoryId, name, unitPrice) 
        VALUES ((SELECT categoryId FROM Categories WHERE name = %s), %s, %s)
        """
        db.execute_query(db_connection=db_connection, query=query, query_params=params)
        return redirect("/products_browse")
    else:
        return "Invalid route"
    

# ------- UPDATE ------- 
@app.route("/products_edit", methods=["POST"])
def products_edit():
    if request.method == "POST":
        data = request.form
        productId = data["productId"]
        category = data["category"]
        productName = data['productName']
        unitPrice = data['unitPrice']
        query = """
        UPDATE Products 
        SET Products.categoryId = (SELECT categoryId from Categories WHERE name = %s), 
        Products.name = %s,
        Products.unitPrice = %s 
        WHERE Products.productId = %s
        """
        params = (category, productName, unitPrice, productId)
        db.execute_query(db_connection=db_connection, query=query, query_params=params)
        return redirect("/products_browse")
    else:
        return "Invalid route"
    
# ------- DELETE ------- 
@app.route("/products_delete", methods=["POST"])
def products_delete():
    if request.method == "POST":
        data = request.form
        productId = data["productId"]
        query = "DELETE FROM Products WHERE Products.productId = %s;"
        params = (productId,)
        db.execute_query(db_connection=db_connection, query=query, query_params=params)
        return redirect("/products_browse")
    
########################################### SALES ######################################

# ------- SELECT ------- 
@app.route("/sales_browse", methods=["GET"])
def sales_browse():
    query = """
    SELECT s.saleId, s.date, COALESCE(c.name, "") AS customerName FROM Sales AS s
    LEFT JOIN Customers AS c
    ON s.customerId = c.customerId;
    """
    cursor = db.execute_query(db_connection=db_connection, query=query)
    results = cursor.fetchall()
    for result in results:
        result["date"] = datetime.strftime(result["date"], "%Y-%m-%d")

    query2 = "SELECT * FROM Customers;"
    cur2 = db.execute_query(db_connection=db_connection, query=query2)
    customers = cur2.fetchall()

    headers = ["ID", "Date", "Customer"]
    return render_template("sales.j2", headers=headers, data=results, customers=customers) 

# ------- INSERT ------- 
@app.route("/sales_new", methods=["POST"])
def sales_new():
    if request.method == "POST":
        data = request.form
        date = data["date"]
        customerId = data.get("customerId") 
        params = (date, customerId)
        query = """
        INSERT INTO Sales (date, customerId)
        VALUES (%s, %s)
        """

        db.execute_query(db_connection=db_connection, query=query, query_params=params)
        return redirect("/sales_browse")
    else:
        return "Invalid route"
    

# ------- UPDATE ------- 
@app.route("/sales_edit", methods=["POST"])
def sales_edit():
    if request.method == "POST":
        data = request.form
        saleId = data["saleId"]
        date = data['date']
        customerName = data['customerName']
        query = """
        UPDATE Sales 
        SET Sales.date = %s, 
        Sales.customerId = (SELECT customerId FROM Customers where name = %s)
        WHERE Sales.saleId = %s
        """
        params = (date, customerName, saleId)
        db.execute_query(db_connection=db_connection, query=query, query_params=params)
        return redirect("/sales_browse")
    else:
        return "Invalid route"
    
# ------- DELETE ------- 
@app.route("/sales_delete", methods=["POST"])
def sales_delete():
    if request.method == "POST":
        data = request.form
        saleId = data["saleId"]
        query = "DELETE FROM Sales WHERE Sales.saleId = %s;"
        params = (saleId,)
        db.execute_query(db_connection=db_connection, query=query, query_params=params)
        return redirect("/sales_browse")
    


    
########################################### CUSTOMERS ######################################
# ------- SELECT ------- 
@app.route("/customers_browse", methods=["GET"])
def customers_browse():
    query = """
        SELECT * FROM Customers;
    """
    cursor = db.execute_query(db_connection=db_connection, query=query)
    results = cursor.fetchall()

    headers = ["ID", "Name"]
    return render_template("customers.j2", headers=headers, data=results) 

# ------- INSERT ------- 
@app.route("/customers_new", methods=["POST"])
def customers_new():
    if request.method == "POST":
        data = request.form
        name = data["name"]
        params = (name, )
        query = """
        INSERT INTO Customers (name)
        VALUES (%s)
        """

        db.execute_query(db_connection=db_connection, query=query, query_params=params)
        return redirect("/customers_browse")
    else:
        return "Invalid route"
    

# ------- UPDATE ------- 
@app.route("/customers_edit", methods=["POST"])
def customers_edit():
    if request.method == "POST":
        data = request.form
        customerId = data["customerId"]
        name = data["name"]
        query = """
        UPDATE Customers 
        SET Customers.name = %s 
        WHERE Customers.customerId = %s
        """
        params = (name, customerId)
        db.execute_query(db_connection=db_connection, query=query, query_params=params)
        return redirect("/customers_browse")
    else:
        return "Invalid route"
    
# ------- DELETE ------- 
@app.route("/customers_delete", methods=["POST"])
def customers_delete():
    if request.method == "POST":
        data = request.form
        customerId = data["customerId"] 
        query = "DELETE FROM Customers WHERE Customers.customerId = %s;"
        params = (customerId,)
        db.execute_query(db_connection=db_connection, query=query, query_params=params)
        return redirect("/customers_browse")
    

########################################### CATEGORIES ######################################
# ------- SELECT ------- 
@app.route("/categories_browse", methods=["GET"])
def categories_browse():
    query = """
        SELECT * FROM Categories;
    """
    cursor = db.execute_query(db_connection=db_connection, query=query)
    results = cursor.fetchall()

    headers = ["ID", "Categories"]
    return render_template("categories.j2", headers=headers, data=results) 


# ------- INSERT ------- 
@app.route("/categories_new", methods=["POST"])
def categories_new():
    if request.method == "POST":
        data = request.form
        name = data["name"]
        params = (name, )
        query = """
        INSERT INTO Categories (name)
        VALUES (%s);
        """

        db.execute_query(db_connection=db_connection, query=query, query_params=params)
        return redirect("/categories_browse")
    else:
        return "Invalid route"

# ------- UPDATE ------- 
@app.route("/categories_edit", methods=["POST"])
def categories_edit():
    if request.method == "POST":
        data = request.form
        categoryId = data["categoryId"]
        name = data["name"]
        query = """
        UPDATE Categories
        SET Categories.name = %s
        WHERE Categories.categoryId = %s;
        """
        params = (name, categoryId)
        db.execute_query(db_connection=db_connection, query=query, query_params=params)
        return redirect("/categories_browse")
    else:
        return "Invalid route"

# ------- DELETE ------- 
@app.route("/categories_delete", methods=["POST"])
def categories_delete():
    if request.method == "POST":
        data = request.form
        categoryId = data["categoryId"]
        query = "DELETE FROM Categories WHERE Categories.categoryId = %s;"
        params = (categoryId,)
        db.execute_query(db_connection=db_connection, query=query, query_params=params)
        return redirect("/categories_browse")

########################################### LOCATIONS ######################################
# ------- SELECT ------- 
@app.route("/locations_browse", methods=["GET"])
def locations_browse():
    query = """
        SELECT * FROM Locations;
    """
    cursor = db.execute_query(db_connection=db_connection, query=query)
    results = cursor.fetchall()

    headers = ["ID", "Aisle", "Shelf", "Slot", "Capacity"]
    return render_template("locations.j2", headers=headers, data=results) 

# ------- INSERT ------- 
@app.route("/locations_new", methods=["POST"])
def locations_new():
    if request.method == "POST":
        data = request.form
        aisle = data["aisle"]
        shelf = data["shelf"]
        slot = data["slot"]
        capacity = data["capacity"]
        params = (aisle, shelf, slot, capacity)
        query = """
        INSERT INTO Locations (aisle, shelf, slot, capacity)
        VALUES (%s, %s, %s, %s);
        """

        db.execute_query(db_connection=db_connection, query=query, query_params=params)
        return redirect("/locations_browse")
    else:
        return "Invalid route"

# ------- UPDATE ------- 
@app.route("/locations_edit", methods=["POST"])
def locations_edit():
    if request.method == "POST":
        data = request.form
        aisle = data["aisle"]
        shelf = data["shelf"]
        slot = data["slot"]
        capacity = data["capacity"]
        locationId = data["locationId"]
        params = (aisle, shelf, slot, capacity, locationId)
        query = """
        UPDATE Locations
        SET Locations.aisle = %s,
        Locations.shelf = %s,
        Locations.slot = %s,
        Locations.capacity = %s
        WHERE Locations.locationId = %s;
        """

        db.execute_query(db_connection=db_connection, query=query, query_params=params)
        return redirect("/locations_browse")
    else:
        return "Invalid route"

# ------- DELETE ------- 
@app.route("/locations_delete", methods=["POST"])
def locations_delete():
    if request.method == "POST":
        data = request.form
        locationId = data["locationId"]
        query = "DELETE FROM Locations WHERE Locations.locationId = %s;"
        params = (locationId,)

        db.execute_query(db_connection=db_connection, query=query, query_params=params)
        return redirect("/locations_browse")

########################################### PRODUCTS LOCATIONS ######################################
# ------- SELECT ------- 
@app.route("/products_locations_browse", methods=["GET"])
def products_locations_browse():
    query = """
        SELECT pl.productLocationId, p.name, CONCAT(l.aisle, '-', l.shelf, '-', l.slot) AS location, pl.quantity
        FROM ProductsLocations AS pl
        JOIN Products AS p
        ON pl.productId = p.productId
        JOIN Locations as l
        ON pl.locationId = l.locationId;
    """
    cursor = db.execute_query(db_connection=db_connection, query=query)
    results = cursor.fetchall()

    headers = ["ID", "Product", "Location", "Quantity"]
    return render_template("products_locations.j2", headers=headers, data=results) 

# ------- INSERT ------- 

# ------- UPDATE ------- 

# ------- DELETE ------- 

if __name__ == "__main__":
    app.run(debug=True)