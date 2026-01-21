module.exports.errorHandler = (err, req, res, next) => {
  console.error("Error occured: ", err.message);

  if (err.name === "ValidationError") {
    console.error(err);
    const statusCode = err.statusCode || 400;
    const message = statusCode === 400 ? "Validation failed" : err.message;
    res.status(statusCode).send(message);
    next();
  }
  if (err.name === "CastError") {
    console.error(err);
    const statusCode = err.statusCode || 400;
    const message =
      statusCode === 400 ? "The data provided is invalid" : err.message;
    res.status(statusCode).send(message);
    next();
  }
  if (err.code === 11000) {
    const statusCode = err.statusCode || 409;
    const message = statusCode === 409 ? "Duplicate entry" : err.message;
    res.status(statusCode).send(message);
    next();
  }
  return res.status(500).send({ message: "An error occured on the server" });
};
