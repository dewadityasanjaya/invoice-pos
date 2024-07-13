class CustomError extends Error {
	constructor(message, statusCode) {
		super(message);
		this.statusCode = statusCode;
	}
}

class NotFoundError extends CustomError {
	constructor(message = 'Resource not found') {
		super(message, 404);
	}
}

class ValidationError extends CustomError {
	constructor(message = 'Validation failed') {
		super(message, 400);
	}
}

module.exports = {
	CustomError,
	NotFoundError,
	ValidationError,
};
