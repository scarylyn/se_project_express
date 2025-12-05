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
    // required: true,
    type: String,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },
  // owner: {
  //   // owner - required, link to the item author's model of the ObjectID type
  // },
  // likes: {
  //   // likes - empty by default, a list of users who liked the item
  //   // ^(this will be an ObjectId array with a reference to the user modal)
  // },
  // createdAt: {
  //   // createdAt - item creation date, a field with the Date type, default value is Date.now
  // },
});

module.exports = mongoose.model("clothingItem", clothingSchema);
