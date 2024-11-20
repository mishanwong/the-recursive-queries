# Citation for following: app.py
# Date: 11/20/2024
# Adapted from/based on cs340 github Flask starter guide
# Source URL: https://github.com/osu-cs340-ecampus/flask-starter-app

from flask import Flask, render_template, json, jsonify
import os
import database.db_connector as db

# Configuration

app = Flask(__name__)
db_connection = db.connect_to_database()

# Routes 

@app.route('/')
def root():
    # return render_template("main.j2")
    # return "Testing..testing..."
    return redirect('/sale_product_browse')

# ------- Select route (display)
@app.route('/sale_product_browse', methods=['GET'])
def sale_product_browse():

    if request.method == 'GET':
        query = "SELECT * FROM SalesProducts;"
        cursor = db.execute_query(db_connection=db_connection, query=query)
        results = cursor.fetchall()
        return jsonify(results)
    else:
        return "Invalid route"

# -------- Add route
@app.route('/sale_product_new', methods=['POST'])
def sale_product_new():

    if request.method == 'POST':

        if request.form.get('add_sales_products'):  # FORM NAME! :)

            # form variables
            name = request.form['productName']  # maybe this will be Id? And the form will just show the name, but the value is actually the productId?
            saleId = request.form['saleId']
            quantity = int(request.form['quantity'])

            params = (name, saleId, quantity, name, quantity)  # in order for query
            query = 'INSERT INTO SalesProducts (productId, saleId, quantity, lineTotal) VALUES ((SELECT productId FROM Products WHERE name = %s), %s, %s, (SELECT unitCost FROM Products WHERE name = %s) * %s);'

            cursor = db.execute_query(db_connection=db_connection, query=query, query_params = params)
            results = cursor.fetchall()

            # maybe return json or just redirect?
            # return jsonify(results)
            return redirect('/sale_product_browse')
    
    else:
        return "Invalid route"
    
# -------- Update route
@app.route('/sale_product_edit', methods = ['POST'])
def sale_product_edit():

    if request.method == 'POST':

        if request.form.get('edit_sales_products'):

            # form variables
            id = request.form['salesId']
            name = request.form['productName']
            saleId = request.form['saleId']
            quantity = int(request.form['quantity'])

            query = 'UPDATE SalesProducts SET SalesProducts.productId = (SELECT productId FROM Products WHERE name = %s), SalesProducts.saleId = %s, SalesProducts.quantity = %s, lineTotal = (SELECT unitCost FROM Products WHERE name = %s) * %s WHERE SalesProducts.saleProductId = %s;'
            params = (name, saleId, quantity, name, quantity, id)

            cursor = db.execute_query(db_connection=db_connection, query=query, query_params = params)
            results = cursor.fetchall()

            return redirect('/sale_product_browse')
    
    else:
        return "Invalid route"

# --------- Delete route
@app.route('/sale_product_delete<int:id>')
def sale_product_delete(id):

    # delete query
    query = 'DELETE FROM SalesProducts WHERE id = %s;'

    cursor = db.execute_query(db_connection=db_connection, query=query, query_params = id)

    return redirect('/sale_product_browse')

# -------- Display/browse routes for Products and Sales
@app.route('products_browse', methods=['GET'])
def products_browse():
    if request.method == 'GET':
        query = 'SELECT * FROM Products;'
        cursor = db.execute_query(db_connection=db_connection, query=query)
        results = cursor.fetchall()
        return jsonify(results)
    else:
        return 'Invalid route'

@app.route('sales_browse', methods=['GET'])
def sales_browse():
    if request.method == 'GET':
        query = 'SELECT * FROM Sales;'
        cursor = db.execute_query(db_connection=db_connection, query=query)
        results = cursor.fetchall()
        return jsonify(results)
    else:
        return 'Invalid route'

# -------- Add routes for Products and then for Sales
@app.route('/products_new', methods=['POST'])
def product_new():
    if request.method == 'POST':

        if request.form.get('add_product'):

            name = request.form['name']
            categoryId = request.form['categoryId']
            unitPrice = request.form['unitPrice']

            query = 'INSERT INTO Products (categoryId, name, unitPrice) VALUES (%s, %s, %s);'
            params = (categoryId, name, unitPrice)

            cursor = db.execute_query(db_connection=db_connection, query=query, query_params = params)

            return redirect('products_browse')

@app.route('/sales_new', methods=['POST'])
def sales_new():
    if request.method == 'POST':

        if request.form.get('add_sales'):

            date = request.form['date']
            customerId = request.form['customerId']

            if customerId == "":
                query = 'INSERT INTO Sales (date) VALUES (%s);'
                cursor = db.execute_query(db_connection=db_connection, query=query, query_params = date)
            else:
                query = 'INSERT INTO Sales (date, customerId) VALUES (%s, %s);'
                params = (date, customerId)
                cursor = db.execute_query(db_connection=db_connection, query=query, query_params = params)
            
            return redirect('/sales_browse')
    
    else:
        return 'Invalid route'

# Listener

if __name__ == "__main__":
    port = int(os.environ.get('PORT', 2739))
    app.run(port=port, debug=True)