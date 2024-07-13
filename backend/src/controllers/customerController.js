const pool = require('../config/db');
const { NotFoundError, ValidationError } = require('../utils/customErrors');

// Get all customers
exports.getAllCustomers = async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM Customers');
    res.json(result.rows);
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
