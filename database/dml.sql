-- Group 43 ----- The Recursive Queries --------------------------
-- Mishan Wong
-- Matthew Wygal
-- Project Step 5 - Data Manipulation Queries
------------------------------------------------------------------

------------------------------------------------------------------------------------------------------

-- Sales Table Queries -------------------------------------------

-- Selecting all to display
SELECT s.saleId, s.date, COALESCE(c.name, "") AS customerName FROM Sales AS s
LEFT JOIN Customers AS c
ON s.customerId = c.customerId;

-- Inserting new row into Sales
INSERT INTO Sales (date, customerId)
VALUES (%s, %s)

-- Update an entry in Sales
UPDATE Sales 
SET Sales.date = %s, 
Sales.customerId = (SELECT customerId FROM Customers where name = %s)
WHERE Sales.saleId = %s

-- Delete an entry in Sales
DELETE FROM Sales WHERE Sales.saleId = %s;


------------------------------------------------------------------------------------------------------

-- Customers Table Queries----------------------------------------

-- Selecting all to display
SELECT * FROM Customers;

-- Inserting new row into Customers
INSERT INTO Customers (name)
VALUES (%s)

-- Update an entry in Customers
UPDATE Customers 
SET Customers.name = %s 
WHERE Customers.customerId = %s

-- Delete an entry in Customers
DELETE FROM Customers WHERE Customers.customerId = %s;

------------------------------------------------------------------------------------------------------

-- SalesProducts Table Queries -----------------------------------

-- Selecting all to display
SELECT sp.saleProductId, p.name AS productName, sp.saleId, s.date, c.name AS customerName, sp.quantity, sp.lineTotal  
FROM SalesProducts AS sp
JOIN Products AS p
ON sp.productId = p.productId
JOIN Sales AS s
ON sp.saleId = s.saleId
JOIN Customers AS c
ON s.customerId = c.CustomerId
ORDER BY sp.saleProductId;

-- Subquery to get product name for form
SELECT name AS productName FROM Products;

-- Subquery to get saleId and customer name for form
SELECT s.saleId, s.date, c.name AS customerName
FROM Sales AS s
LEFT JOIN Customers AS c
ON s.customerId = c.customerId
ORDER BY saleId ASC;

-- Inserting new row into SalesProducts
INSERT INTO SalesProducts (productId, saleId, quantity, lineTotal) 
VALUES ((SELECT productId FROM Products WHERE name = %s), %s, %s, 
(SELECT unitPrice FROM Products WHERE name = %s) * %s);

-- Update an entry in SalesProducts
UPDATE SalesProducts 
SET SalesProducts.productId = (SELECT productId FROM Products WHERE name = %s), 
SalesProducts.saleId = %s, SalesProducts.quantity = %s, 
lineTotal = (SELECT unitPrice FROM Products WHERE name = %s) * %s 
WHERE SalesProducts.saleProductId = %s;

-- Delete an entry in SalesProducts
DELETE FROM SalesProducts WHERE saleProductId = %s;
------------------------------------------------------------------------------------------------------

-- Products Table Queries ----------------------------------------

-- Selecting all to display
SELECT p.productId, c.name as categoryName, p.name as productName, p.unitPrice FROM Products AS p
JOIN Categories as c
ON p.categoryId = c.categoryId;

-- Inserting new row into Products
INSERT INTO Products (categoryId, name, unitPrice) 
VALUES ((SELECT categoryId FROM Categories WHERE name = %s), %s, %s)

-- Update an entry in Products
UPDATE Products 
SET Products.categoryId = (SELECT categoryId from Categories WHERE name = %s), 
Products.name = %s,
Products.unitPrice = %s 
WHERE Products.productId = %s

-- Delete an entry in Products
DELETE FROM Products WHERE Products.productId = %s;
------------------------------------------------------------------------------------------------------

-- Categories Table Queries --------------------------------------

-- Selecting all to display
SELECT * FROM Categories ORDER BY categoryId;

-- Inserting new row into Categories
INSERT INTO Categories (name)
VALUES (%s);

-- Update an entry in Categories
UPDATE Categories
SET Categories.name = %s
WHERE Categories.categoryId = %s;

-- Delete an entry in Categories
DELETE FROM Categories WHERE Categories.categoryId = %s;

------------------------------------------------------------------------------------------------------

-- Locations Table Queries ---------------------------------------

-- Selecting all to display
SELECT * FROM Locations;

-- Inserting new row into Locations
INSERT INTO Locations (aisle, shelf, slot, capacity)
VALUES (%s, %s, %s, %s);

-- Update an entry in Locations
UPDATE Locations
SET Locations.aisle = %s,
Locations.shelf = %s,
Locations.slot = %s,
Locations.capacity = %s
WHERE Locations.locationId = %s;

-- Delete an entry in Locations
DELETE FROM Locations WHERE Locations.locationId = %s;

------------------------------------------------------------------------------------------------------

-- ProductsLocations Table Queries -------------------------------

-- Selecting all to display
SELECT pl.productLocationId, p.name AS productName, l.locationId, CONCAT(l.aisle, '-', l.shelf, '-', l.slot) AS location, pl.quantity
FROM ProductsLocations AS pl
JOIN Products AS p
ON pl.productId = p.productId
JOIN Locations as l
ON pl.locationId = l.locationId
ORDER BY pl.productLocationId;

-- Subquery for getting product names
SELECT name AS productName FROM Products;

-- Subquery for getting location data
SELECT l.locationId, l.aisle, l.shelf, l.slot, l.capacity
FROM Locations AS l;

-- Inserting new row into ProductsLocations
INSERT INTO ProductsLocations (productId, locationId, quantity)
VALUES ((SELECT productId FROM Products WHERE name = %s), %s, %s);

-- Updating a row in ProductsLocations
UPDATE ProductsLocations
SET ProductsLocations.productId = (SELECT productId FROM Products WHERE Products.name = %s),
ProductsLocations.locationId = %s, ProductsLocations.quantity = %s
WHERE ProductsLocations.productLocationId = %s;

-- Disassociating a Product with a Location
-- (deleting a M:M relationship)
DELETE FROM ProductsLocations WHERE productLocationId = %s;

------------------------------------------------------------------------------------------------------