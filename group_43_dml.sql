-- Group 43 ----- The Recursive Queries --------------------------
-- Mishan Wong
-- Matthew Wygal
-- Project Step 3 Draft - Data Manipulation Queries
------------------------------------------------------------------

------------------------------------------------------------------------------------------------------

-- Sales Table Queries -------------------------------------------

-- Selecting all to display
SELECT * FROM Sales;

-- Inserting new row into Sales
INSERT INTO Sales (date, customerId)
VALUES (:date, :customerId);

-- Set Customer to NULL (nullable relationship)
UPDATE Sales
SET customerId = NULL
WHERE saleId = :saleId_from_list;

------------------------------------------------------------------------------------------------------

-- Customers Table Queries----------------------------------------

-- Selecting all to display
SELECT * FROM Customers;

-- Inserting new row into Customers
INSERT INTO Customers (name)
VALUES (:name);

------------------------------------------------------------------------------------------------------

-- SalesProducts Table Queries -----------------------------------

-- Selecting all to display
SELECT * FROM SalesProducts;

-- Inserting new row into SalesProducts
INSERT INTO SalesProducts (productId, saleId, quantity, lineTotal)
VALUES (:productId, :saleId, :quantity, :lineTotal);

------------------------------------------------------------------------------------------------------

-- Products Table Queries ----------------------------------------

-- Selecting all to display
SELECT * FROM Products;

-- Inserting new row into Products
INSERT INTO Products (categoryId, name, unitPrice)
VALUES (:categoryId_from_dropdown, :name, :unitPrice);

------------------------------------------------------------------------------------------------------

-- Categories Table Queries --------------------------------------

-- Selecting all to display
SELECT * FROM Categories;

-- Selecting id and name to populate drop-down list when creating new Product
SELECT categoryId, name FROM Categories;

-- Inserting new row into Categories
INSERT INTO Categories (name)
VALUES (:name);

------------------------------------------------------------------------------------------------------

-- Locations Table Queries ---------------------------------------

-- Selecting all to display
SELECT * FROM Locations;

-- Inserting new row into Locations
INSERT INTO Locations (aisle, shelf, slot, capacity)
VALUES (:aisle, :shelf, :slot, :capacity);

------------------------------------------------------------------------------------------------------

-- ProductsLocations Table Queries -------------------------------

-- Selecting all to display
SELECT * FROM ProductsLocations;

-- Inserting new row into ProductsLocations
INSERT INTO ProductsLocations (productId, locationId, quantity)
VALUES (:productId, :locationId, :quantity);

-- Disassociating a Product with a Location
-- (deleting a M:M relationship)
DELETE FROM ProductsLocations
WHERE productId = :productId_from_list
AND locationId = :locationId_from_list;

------------------------------------------------------------------------------------------------------