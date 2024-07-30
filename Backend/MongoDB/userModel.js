const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  aadhaarNumber: { type: String, required: true },
  password: { type: String, required: true },
  products: [],
});

const userModel = mongoose.model("userModel", userSchema);
module.exports = userModel;
