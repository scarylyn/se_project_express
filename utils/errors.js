const ERROR_CODES = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

const ERROR_MESSAGES = {
  INVALID_DATA: "The data provided is invalid",
  UNAUTHORIZED_ACCESS: "Authorization required",
  RESOURCE_NOT_FOUND: "Requested resource not found",
  DUPLICATE_EMAIL: "An account with this email already exists",
  SERVER_ERROR: "An error occurred on the server",
};

// Combined Error Objects for Quick Reference
const ERRORS = {
  INVALID_DATA: {
    statusCode: ERROR_CODES.BAD_REQUEST,
    message: ERROR_MESSAGES.INVALID_DATA,
  },
  UNAUTHORIZED: {
    statusCode: ERROR_CODES.UNAUTHORIZED,
    message: ERROR_MESSAGES.UNAUTHORIZED_ACCESS,
  },
  NOT_FOUND: {
    statusCode: ERROR_CODES.NOT_FOUND,
    message: ERROR_MESSAGES.RESOURCE_NOT_FOUND,
  },
};

module.exports = {
  ERROR_CODES,
  ERROR_MESSAGES,
};
