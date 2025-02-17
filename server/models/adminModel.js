const mongoose = require("mongoose");
const { Schema } = require("mongoose");


const adminSchema = new Schema(
  {
    role: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    profileImageUrl: {
      type: String,
    },
  },
  { strict: true }
);

const Admin = mongoose.model("admin", adminSchema);

module.exports = Admin;
