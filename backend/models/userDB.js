const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  product: [{ type: mongoose.Types.ObjectId, required: true, ref: "Product" }],
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
