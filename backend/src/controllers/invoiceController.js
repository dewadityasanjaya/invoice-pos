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
  try {
    const result = await pool.query('SELECT * FROM InvoiceSummary');
    res.json(result.rows);
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
      `SELECT * FROM Invoices WHERE InvoiceID = $1`,
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

    res.json({
      ...invoice,
      items: itemsResult.rows
    });
  } catch (err) {
    next(err);
  }
};
