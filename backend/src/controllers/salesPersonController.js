const pool = require('../config/db.js');
const { NotFoundError, ValidationError } = require('../utils/customErrors.js');

// Get salespersons with pagination
exports.getSalespersons = async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const offset = (page - 1) * limit;

    const countResult = await pool.query('SELECT COUNT(*) FROM Salespersons');
    const totalSalespersons = parseInt(countResult.rows[0].count, 10);
    const totalPages = Math.ceil(totalSalespersons / limit);
    
    const result = await pool.query('SELECT * FROM Salespersons LIMIT $1 OFFSET $2', [limit, offset]);

    res.json({
      salespersons: result.rows,
      totalPages,
    });
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
