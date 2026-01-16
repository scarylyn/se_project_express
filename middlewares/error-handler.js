const errorHandler = (err, req, res, next) => {
  console.error("Error occured: ", err.message);

  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Validation failed";
  } else if (err.name === "CastError") {
    statusCode = 400;
    message = "The data provided is invalid";
  } else if (err.code === 11000) {
    statusCode = 409;
    message = "Duplicate entry";
  } else if (err) {
    return res.status(500).send({ message: "An error occured on the server" });
  }
};

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}

(module.exports = errorHandler),
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError;
