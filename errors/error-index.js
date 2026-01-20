const BadRequestError = require("./bad-request");
const ConflictError = require("./conflict");
const ForbiddenError = require("./forbidden");
const NotFoundError = require("./not-found");
const UnauthorizedError = require("./unauthorized");

module.exports = {
  BadRequestError,
  ConflictError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
};
