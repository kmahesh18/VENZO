const mongoose = require("mongoose");

//create author schema
const authorDataSchema = new mongoose.Schema(
  {
    nameOfAuthor: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    profileImageUrl: {
      type: String,
    },
  },
  { strict: "throw" }
);

//create user comment schema
const userCommentSchema = new mongoose.Schema(
  {
    nameOfUser: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { strict: "throw" }
);

//Create Article Schema
const articleSchema = new mongoose.Schema(
  {
    authorData: authorDataSchema,
    articleId: {
      type: String,
      required: [true, "Article ID is required"],
      unique: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    dateOfCreation: {
      type: String,
      required: [true, "Date of creation is required"],
    },
    dateOfModification: {
      type: String,
      required: [true, "Date of modification is required"],
    },
    isArticleActive: {
      type: Boolean,
      default: true,
    },
    comments: [{
      commentId: String,
      comment: String,
      nameOfUser: String,
      userImage: String,
      timestamp: {
        date: String,
        time: String
      }
    }]
  },
  { strict: "throw" }
);

//create model for article
const Article = mongoose.model("article", articleSchema);

//export
module.exports = Article;
