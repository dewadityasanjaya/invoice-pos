const pool = require('../config/db');
const { NotFoundError, ValidationError } = require('../utils/customErrors.js');

// Get products with pagination
exports.getProducts = async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const offset = (page - 1) * limit;

    const countResult = await pool.query('SELECT COUNT(*) FROM Products');
    const totalProducts = parseInt(countResult.rows[0].count, 10);
    const totalPages = Math.ceil(totalProducts / limit);

    const result = await pool.query('SELECT * FROM Products LIMIT $1 OFFSET $2', [limit, offset]);

    res.json({
      products: result.rows,
      totalPages,
    });
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
