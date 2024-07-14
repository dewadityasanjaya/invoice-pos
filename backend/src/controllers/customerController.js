const pool = require('../config/db');
const { NotFoundError, ValidationError } = require('../utils/customErrors.js');

// Get customers with pagination
exports.getCustomers = async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const offset = (page - 1) * limit;

    const countResult = await pool.query('SELECT COUNT(*) FROM Customers');
    const totalCustomers = parseInt(countResult.rows[0].count, 10);
    const totalPages = Math.ceil(totalCustomers / limit);

    const result = await pool.query('SELECT * FROM Customers LIMIT $1 OFFSET $2', [limit, offset]);

    res.json({
      customers: result.rows,
      totalPages,
    });
  } catch (err) {
    next(err);
  }
};

// Create a new customer
exports.createCustomer = async (req, res, next) => {
  const { CustomerName } = req.body;

  if (!CustomerName) {
    return next(new ValidationError('CustomerName is required'));
  }

  try {
    const result = await pool.query(
      `INSERT INTO Customers (CustomerName)
       VALUES ($1) RETURNING CustomerID`,
      [CustomerName]
    );
    const customerID = result.rows[0].customerid;
    res.status(201).json({ message: 'Customer created successfully', customerID });
  } catch (err) {
    next(err);
  }
};
