const pool = require('../config/db');
const { NotFoundError, ValidationError } = require('../utils/customErrors.js');

// Get daily revenue
exports.getDailyRevenue = async (req, res, next) => {
  try {
    const result = await pool.query(`
      SELECT DATE(InvoiceDate) AS Date, SUM(ii.Quantity * ii.UnitPrice) AS DailyRevenue
      FROM Invoices i
      JOIN InvoiceItems ii ON i.InvoiceID = ii.InvoiceID
      GROUP BY DATE(InvoiceDate)
    `);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};

// Get weekly revenue
exports.getWeeklyRevenue = async (req, res, next) => {
  try {
    const result = await pool.query(`
      SELECT EXTRACT(YEAR FROM InvoiceDate) AS Year, EXTRACT(WEEK FROM InvoiceDate) AS Week,
      SUM(ii.Quantity * ii.UnitPrice) AS WeeklyRevenue
      FROM Invoices i
      JOIN InvoiceItems ii ON i.InvoiceID = ii.InvoiceID
      GROUP BY EXTRACT(YEAR FROM InvoiceDate), EXTRACT(WEEK FROM InvoiceDate)
    `);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};

// Get monthly revenue
exports.getMonthlyRevenue = async (req, res, next) => {
  try {
    const result = await pool.query(`
      SELECT EXTRACT(YEAR FROM InvoiceDate) AS Year, EXTRACT(MONTH FROM InvoiceDate) AS Month,
      SUM(ii.Quantity * ii.UnitPrice) AS MonthlyRevenue
      FROM Invoices i
      JOIN InvoiceItems ii ON i.InvoiceID = ii.InvoiceID
      GROUP BY EXTRACT(YEAR FROM InvoiceDate), EXTRACT(MONTH FROM InvoiceDate)
    `);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};
