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
    const commentObj = req.body;
    
    // Validate comment object
    if (!commentObj.comment || !commentObj.nameOfUser) {
      return res.status(400).send({ 
        message: "Comment and user name are required" 
      });
    }

    // Find article and add comment
    const articleWithComments = await Article.findOneAndUpdate(
      { articleId: req.params.articleId },
      { 
        $push: { 
          comments: {
            ...commentObj,
            commentId: commentObj.commentId || Date.now().toString(),
            timestamp: commentObj.timestamp || {
              date: new Date().toLocaleDateString(),
              time: new Date().toLocaleTimeString()
            }
          } 
        } 
      },
      { 
        new: true,  // Return updated document
        runValidators: true  // Run schema validations
      }
    );

    if (!articleWithComments) {
      return res.status(404).send({ message: "Article not found" });
    }

    res.status(200).send({ 
      message: "comment added", 
      payload: articleWithComments 
    });
  } catch (error) {
    console.error("Comment error:", error);
    res.status(500).send({ 
      message: "Error adding comment", 
      error: error.message 
    });
  }
}));



module.exports = userApp;
