SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT=0;

CREATE TABLE IF NOT EXISTS Customers (
  customerId INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  PRIMARY KEY (customerId)
);

CREATE TABLE IF NOT EXISTS Sales (
  saleId INT NOT NULL AUTO_INCREMENT,
  date DATETIME NOT NULL,
  customerId INT NULL,
  PRIMARY KEY (saleId),
  FOREIGN KEY (customerId) REFERENCES Customers(customerId)
    ON DELETE SET NULL
    ON UPDATE CASCADE
);


CREATE TABLE IF NOT EXISTS Categories (
  categoryId INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) UNIQUE NOT NULL,
  PRIMARY KEY (categoryId)
);

CREATE TABLE IF NOT EXISTS Products (
  productId INT NOT NULL AUTO_INCREMENT,
  categoryId INT NOT NULL,
  name VARCHAR(50) NOT NULL,
  unitPrice DECIMAL(12,2) NOT NULL,
  PRIMARY KEY (productId),
  FOREIGN KEY (categoryId) REFERENCES Categories(categoryId)
    ON DELETE NO ACTION
    ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS SalesProducts (
  saleProductId INT NOT NULL AUTO_INCREMENT,
  productId INT NOT NULL,
  saleId INT  NOT NULL,
  quantity INT NOT NULL,
  lineTotal DECIMAL(12,2) NOT NULL,
  PRIMARY KEY (saleProductId),
  FOREIGN KEY (productId) REFERENCES Products(productId)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (saleId) REFERENCES Sales(saleId)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Locations (
  locationId INT NOT NULL AUTO_INCREMENT,
  aisle VARCHAR(10) NOT NULL,
  shelf VARCHAR(10) NOT NULL,
  slot VARCHAR(10) NOT NULL,
  capacity INT NOT NULL,
  PRIMARY KEY (locationId)
);

CREATE TABLE IF NOT EXISTS ProductsLocations (
  productLocationId INT NOT NULL AUTO_INCREMENT,
  productId INT NOT NULL,
  locationId INT NOT NULL,
  quantity INT NOT NULL,
  PRIMARY KEY (productLocationId),
  FOREIGN KEY (productId) REFERENCES Products(productId)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (locationId) REFERENCES Locations(locationId)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

-- Inserting in values ---------------------------------------

-- Categories
INSERT INTO Categories (name)
VALUES ("Health and Beauty"),
("Snacks"),
("Paper"),
("Prepared Food"),
("Drinks");

-- Customers
INSERT INTO Customers (name)
VALUES ("Sam S"),
("MJ Lee"),
("Kate Cole"),
("Abdul Smith"),
("Sven Garcia");

-- Products
INSERT INTO Products (categoryId, name, unitPrice)
VALUES ((SELECT categoryId FROM Categories WHERE name = 'Paper'), "Pocket Wet Tissues", 3.99),
((SELECT categoryId FROM Categories WHERE name = 'Snacks'), 'Yum Shrimp Chips', 2.50),
((SELECT categoryId FROM Categories WHERE name = 'Health and Beauty'), 'Travel Toothbrush Set', 5.00),
((SELECT categoryId FROM Categories WHERE name = 'Prepared Food'), 'Healthy Chicken Rice Set', 8.25),
((SELECT categoryId FROM Categories WHERE name = 'Drinks'), 'Super Sparkling Water', 2.00);

-- Locations
INSERT INTO Locations (aisle, shelf, slot, capacity)
VALUES ('A', '1', '2', 2),
('B', '2', '4', 1),
('D', '2', '3', 4),
('A', '5', '4', 3),
('B', '4', '5', 2);

-- Sales


-- SalesProducts


-- ProductsLocations
INSERT INTO ProductsLocations (productId, locationId, quantity)
VALUES (
  (SELECT productId FROM Products WHERE name = 'Pocket Wet Tissues'),
  (SELECT locationId FROM Locations WHERE locationId = 2),
  3
),
(
  (SELECT productId FROM Products WHERE name = 'Yum Shrimp Chips'),
  (SELECT locationId FROM Locations WHERE locationId = 4),
  6
),
(
  (SELECT productId FROM Products WHERE name = 'Travel Toothbrush Set'),
  (SELECT locationId FROM Locations WHERE locationId = 1),
  4
),
(
  (SELECT productId FROM Products WHERE name = 'Healthy Chicken Rice Set'),
  (SELECT locationId FROM Locations WHERE locationId = 5),
  8
),
(
  (SELECT productId FROM Products WHERE name = 'Super Sparkling Water'),
  (SELECT locationId FROM Locations WHERE locationId = 3),
  12
);

SET FOREIGN_KEY_CHECKS=1;
COMMIT;

