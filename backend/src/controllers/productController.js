const pool = require('../config/db');
const { NotFoundError, ValidationError } = require('../utils/customErrors.js');

// Get all products
exports.getAllProducts = async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM Products');
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};

// Create a new product
exports.createProduct = async (req, res, next) => {
  const { ProductName, ProductPicture, Stock, Price } = req.body;

  if (!ProductName || Stock === undefined || Price === undefined) {
    return next(new ValidationError('ProductName, Stock, and Price are required'));
  }

  try {
    const result = await pool.query(
      `INSERT INTO Products (ProductName, ProductPicture, Stock, Price)
       VALUES ($1, $2, $3, $4) RETURNING ProductID`,
      [ProductName, ProductPicture, Stock, Price]
    );
    const productID = result.rows[0].productid;
    res.status(201).json({ message: 'Product created successfully', productID });
  } catch (err) {
    next(err);
  }
};
