const mongoose = require("mongoose");

//define User or Author Schema
const userAuthorSchema = new mongoose.Schema(
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
      // required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    profileImageUrl: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    "strict": "throw",
  }
);

//Create Model for User Author Schema
const UserAuthor = mongoose.model("userauthor", userAuthorSchema);

//Export
module.exports = UserAuthor;
