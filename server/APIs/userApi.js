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
userApp.put('/comment/:articleId', expressAsyncHandler(async(req, res)=>{
  //get comment obj
  const commentObj = req.body;
  
  //add commmentObj to comments array of article
  const articleWithComments = await Article.findOneAndUpdate(
    { articleId: req.params.articleId },
    { $push: {comments: commentObj} },
    { returnOriginal: false }
  )
  //send response
  res.send({message:"comment added", payload: articleWithComments})
}))



module.exports = userApp;
