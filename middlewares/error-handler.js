module.exports.errorHandler = (err, req, res, next) => {
  console.error("Error occured: ", err.message);

  if (err.name === "ValidationError") {
    const statusCode = 400;
    const message = "Validation failed";
    return res.status(statusCode).send(message);
  }
  if (err.name === "CastError") {
    const statusCode = 400;
    const message = "The data provided is invalid";
    return res.status(statusCode).send(message);
  }
  if (err.code === 11000) {
    const statusCode = 409;
    const message = "Duplicate entry";
    return res.status(statusCode).send(message);
  }
  return res.status(500).send({ message: "An error occured on the server" });
};
