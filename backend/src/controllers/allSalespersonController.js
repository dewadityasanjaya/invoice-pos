const pool = require('../config/db.js');
const { NotFoundError, ValidationError } = require('../utils/customErrors.js');

// Get all salespersons
exports.getAllSalesperson = async (req, res) => {
	try {
		const result = await pool.query('SELECT * FROM salespersons ORDER BY salespersonid DESC');
		if (result.rows.length === 0) {
			throw new NotFoundError('No salespersons found');
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