CREATE TABLE IF NOT EXISTS Customers (
  customerId INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  PRIMARY KEY (customerId)
);

CREATE TABLE IF NOT EXISTS `Sales` (
  saleId INT NOT NULL AUTO_INCREMENT,
  date DATETIME NOT NULL,
  totalPrice DECIMAL(12,2) NOT NULL,
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
  PRIMARY KEY (saleProductId),
  FOREIGN KEY (productId) REFERENCES Sales(saleId)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (saleId) REFERENCES Products(productId)
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
  productLocationId INT  NOT NULL,
  productId INT NOT NULL,
  locationId INT NOT NULL,
  quantity INT NOT NULL,
  PRIMARY KEY (productLocationId),
  FOREIGN KEY (productId) Products(productId)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (locationId) REFERENCES Locations(locationId)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);
