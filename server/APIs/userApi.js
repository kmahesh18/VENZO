const exp = require("express");
const userApp = exp.Router();
const UserAuthor = require("../models/userAuthorModel.js");
const expressAsyncHandler = require("express-async-handler");
const createUserOrAuthor = require("./createUserOrAuthor.js");
const Article = require("../models/articleModel.js")

//API


//create new user
userApp.post("/user", expressAsyncHandler(createUserOrAuthor))

//add comment
userApp.put('/comment/:articleId', expressAsyncHandler(async(req, res) => {
  try {
    //get comment obj
    const commentObj = req.body;
    
    //add commentObj to comments array of article
    const articleWithComments = await Article.findOneAndUpdate(
      { articleId: req.params.articleId },
      { $push: { comments: commentObj } },
      { new: true } // Return the updated document
    ).exec();

    if (!articleWithComments) {
      return res.status(404).send({ message: "Article not found" });
    }

    //send response
    res.status(200).send({ message: "comment added", payload: articleWithComments });
  } catch (error) {
    res.status(500).send({ message: "Error adding comment", error: error.message });
  }
}));



module.exports = userApp;
