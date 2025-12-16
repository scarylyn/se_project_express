const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: {
    required: true,
    type: String,
    unique: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: "You must enter a valid email address",
    },
  },
  password: {
    required: true,
    type: String,
    select: false,
  },
  name: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    required: true,
    type: String,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  const User = this;
  return User.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        const err = new Error("InvalidCredentials");
        err.name = "InvalidCredentials";
        err.statusCode = 401;
        return Promise.reject(err);
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          const err = new Error("InvalidCredentials");
          err.name = "InvalidCredentials";
          err.statusCode = 401;
          return Promise.reject(err);
        }
        return user;
      });
    });
};

module.exports = mongoose.model("user", userSchema);
