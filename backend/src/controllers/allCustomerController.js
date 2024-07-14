const pool = require('../config/db');
const { NotFoundError, ValidationError } = require('../utils/customErrors.js');

// Get all customers
exports.getAllCustomers = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM customers ORDER BY customerid DESC');
    if (result.rows.length === 0) {
      throw new NotFoundError('No customers found');
    }
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    if (err instanceof NotFoundError || err instanceof ValidationError) {
      res.status(err.statusCode).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};
