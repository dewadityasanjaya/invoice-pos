-- Create the database schema

-- 1. Customers Table
CREATE TABLE Customers (
    CustomerID SERIAL PRIMARY KEY,
    CustomerName VARCHAR(255) NOT NULL
);

-- 2. Salespersons Table
CREATE TABLE Salespersons (
    SalespersonID SERIAL PRIMARY KEY,
    SalespersonName VARCHAR(255) NOT NULL
);

-- 3. Products Table
CREATE TABLE Products (
    ProductID SERIAL PRIMARY KEY,
    ProductName VARCHAR(255) NOT NULL,
    ProductPicture TEXT,
    Stock INT NOT NULL,
    Price DECIMAL(10, 2) NOT NULL
);

-- 4. Invoices Table
CREATE TABLE Invoices (
    InvoiceID SERIAL PRIMARY KEY,
    InvoiceDate DATE NOT NULL,
    CustomerID INT NOT NULL,
    SalespersonID INT NOT NULL,
    Notes TEXT,
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID),
    FOREIGN KEY (SalespersonID) REFERENCES Salespersons(SalespersonID)
);

-- 5. InvoiceItems Table
CREATE TABLE InvoiceItems (
    InvoiceItemID SERIAL PRIMARY KEY,
    InvoiceID INT NOT NULL,
    ProductID INT NOT NULL,
    Quantity INT NOT NULL,
    UnitPrice DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (InvoiceID) REFERENCES Invoices(InvoiceID),
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);

-- 6. Views for Summary
CREATE VIEW InvoiceSummary AS
SELECT
    i.InvoiceID,
    c.CustomerName,
    s.SalespersonName,
    SUM(ii.Quantity * ii.UnitPrice) AS TotalAmountPaid,
    i.Notes
FROM Invoices i
JOIN Customers c ON i.CustomerID = c.CustomerID
JOIN Salespersons s ON i.SalespersonID = s.SalespersonID
JOIN InvoiceItems ii ON i.InvoiceID = ii.InvoiceID
GROUP BY i.InvoiceID, c.CustomerName, s.SalespersonName, i.Notes;