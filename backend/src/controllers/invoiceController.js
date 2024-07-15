const pool = require('../config/db');
const { NotFoundError, ValidationError } = require('../utils/customErrors.js');

// Create a new invoice
exports.createInvoice = async (req, res, next) => {
  const { InvoiceDate, CustomerID, SalespersonID, Notes, Items } = req.body;

  if (!InvoiceDate || !CustomerID || !SalespersonID || !Items || !Array.isArray(Items)) {
    return next(new ValidationError('InvoiceDate, CustomerID, SalespersonID, and Items are required'));
  }

  try {
    // Insert invoice
    const result = await pool.query(
      `INSERT INTO Invoices (InvoiceDate, CustomerID, SalespersonID, Notes)
       VALUES ($1, $2, $3, $4) RETURNING InvoiceID`,
      [InvoiceDate, CustomerID, SalespersonID, Notes]
    );
    const invoiceID = result.rows[0].invoiceid;

    // Insert invoice items
    for (const item of Items) {
      await pool.query(
        `INSERT INTO InvoiceItems (InvoiceID, ProductID, Quantity, UnitPrice)
         VALUES ($1, $2, $3, $4)`,
        [invoiceID, item.ProductID, item.Quantity, item.UnitPrice]
      );
    }

    res.status(201).json({ message: 'Invoice created successfully', invoiceID });
  } catch (err) {
    next(err);
  }
};

// Get invoice summary
exports.getInvoiceSummary = async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const offset = (page - 1) * limit;

    const countResult = await pool.query('SELECT COUNT(*) FROM InvoiceSummary');
    const totalInvoiceSummary = parseInt(countResult.rows[0].count, 10);
    const totalPages = Math.ceil(totalInvoiceSummary / limit);

    const result = await pool.query('SELECT * FROM InvoiceSummary ORDER BY invoiceid DESC LIMIT $1 OFFSET $2', [limit, offset]);
    
    res.json({
      invoiceSummary: result.rows,
      totalPages,
    });
  } catch (err) {
    next(err);
  }
};

// Get invoice details
exports.getInvoiceDetails = async (req, res, next) => {
  const invoiceID = parseInt(req.params.id);

  try {
    // Get invoice
    const invoiceResult = await pool.query(
      `SELECT i.*, c.CustomerName, s.SalespersonName 
       FROM Invoices i
       JOIN Customers c ON i.CustomerID = c.CustomerID
       JOIN Salespersons s ON i.SalespersonID = s.SalespersonID
       WHERE i.InvoiceID = $1`,
      [invoiceID]
    );

    if (invoiceResult.rows.length === 0) {
      return next(new NotFoundError('Invoice not found'));
    }

    const invoice = invoiceResult.rows[0];

    // Get invoice items
    const itemsResult = await pool.query(
      `SELECT ii.*, p.ProductName, p.ProductPicture
       FROM InvoiceItems ii
       JOIN Products p ON ii.ProductID = p.ProductID
       WHERE ii.InvoiceID = $1`,
      [invoiceID]
    );

    const items = itemsResult.rows;

    // Calculate total amount paid
    const totalAmountPaid = items.reduce((total, item) => total + (item.quantity * parseFloat(item.unitprice)), 0);

    res.json({
      invoiceid: invoice.invoiceid,
      invoicedate: invoice.invoicedate,
      customername: invoice.customername,
      salespersonname: invoice.salespersonname,
      notes: invoice.notes,
      items: items.map(item => ({
        productname: item.productname,
        productpicture: item.productpicture,
        quantity: item.quantity,
        unitprice: item.unitprice
      })),
      totalamountpaid: totalAmountPaid
    });
  } catch (err) {
    next(err);
  }
};

