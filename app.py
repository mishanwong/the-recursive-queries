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
    headers = ["ID", "Category", "Name", "Unit Price"]
    return render_template("products.j2", data=results, headers=headers) 

# ------- INSERT ------- 

# ------- UPDATE ------- 

# ------- DELETE ------- 

########################################### SALES ######################################

# ------- SELECT ------- 
@app.route("/sales_browse", methods=["GET"])
def sales_browse():
    query = """
    SELECT s.saleId, s.date, c.name AS customerName FROM Sales AS s
    JOIN Customers AS c
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
        customerId = data["customerId"]
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
        print("sale Id", data, saleId)
        query = "DELETE FROM Sales WHERE Sales.saleId = %s;"
        params = (saleId,)
        db.execute_query(db_connection=db_connection, query=query, query_params=params)
        return redirect("/sales_browse")
    

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

# ------- UPDATE ------- 

# ------- DELETE ------- 

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
# ------- UPDATE ------- 
# ------- DELETE ------- 
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

# ------- UPDATE ------- 

# ------- DELETE ------- 

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