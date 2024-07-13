const pool = require('../config/db');
const { ValidationError } = require('../utils/customErrors');

// Get all salespersons
exports.getAllSalespersons = async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM Salespersons');
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};

// Create a new salesperson
exports.createSalesperson = async (req, res, next) => {
  const { SalespersonName } = req.body;

  if (!SalespersonName) {
    return next(new ValidationError('SalespersonName is required'));
  }

  try {
    const result = await pool.query(
      `INSERT INTO Salespersons (SalespersonName)
       VALUES ($1) RETURNING SalespersonID`,
      [SalespersonName]
    );
    const salespersonID = result.rows[0].salespersonid;
    res.status(201).json({ message: 'Salesperson created successfully', salespersonID });
  } catch (err) {
    next(err);
  }
};
