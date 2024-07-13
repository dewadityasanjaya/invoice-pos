// errorHandler.js

const errorHandler = (err, req, res, next) => {
	console.error(err.stack);
  
	// Determine the status code
	const statusCode = err.statusCode || 500;
  
	// Determine the error message
	const message = err.message || 'An unexpected error occurred';
  
	// Send error response
	res.status(statusCode).json({
	  success: false,
	  message,
	});
  };
  
  module.exports = errorHandler;
  