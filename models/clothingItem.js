const mongoose = require("mongoose");
const validator = require("validator");

const clothingSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  weather: {
    required: true,
    type: String,
    enum: ["hot", "warm", "cold"],
  },
  imageUrl: {
    type: String,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },
  // owner: {
  //   // owner - required ObjectId with a link to the user schema
  // },
  likes: {
    // likes - empty by default, required ObjectId array with a link to the user schema
  },
  // createdAt: {
  //   // createdAt - item creation date, a field with the Date type, default value is Date.now
  // },
});

module.exports = mongoose.model("clothingItem", clothingSchema);
