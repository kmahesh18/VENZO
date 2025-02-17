const exp = require("express");
const authorApp = exp.Router();
// const UserAuthor = require("../models/userAuthorModel.js");
const expressAsyncHandler = require("express-async-handler");
const createUserOrAuthor = require("./createUserOrAuthor.js");
const Article = require("../models/articleModel.js");
const { requireAuth, clerkMiddleware } = require("@clerk/express");
require("dotenv").config();

authorApp.use(clerkMiddleware())

//create new author
authorApp.post("/author", expressAsyncHandler(createUserOrAuthor));

//create new article
authorApp.post(
  "/article",
  expressAsyncHandler(async (req, res) => {
    //get new article obj from req
    const newArticleObj = req.body;
    const newArticle = new Article(newArticleObj);
    const articleObj = await newArticle.save();
    res.status(201).send({ message: "article published", payload: articleObj });
  })
);

//read all articles
authorApp.get(
  "/articles",
  requireAuth({ signInUrl: "unauthorized" }),
  expressAsyncHandler(async (req, res) => {
    //read all articles from db
    const listOfArticles = await Article.find({ isArticleActive: true });
    res.status(200).send({ message: "articles", payload: listOfArticles });
  })
);

authorApp.get("/unauthorized", (req, res) => {
  res.send({ message: "unauthorized request... login first" });
});

//modify an article by article idd
authorApp.put(
  "/article/:articleId",
  requireAuth({ signInUrl: "unauthorized" }),
  expressAsyncHandler(async (req, res) => {
    //get modified article
    const modifiedArticle = req.body;
    //update article by article id
    const dbRes = await Article.findByIdAndUpdate(
      modifiedArticle._id,
      {
        ...modifiedArticle,
      },
      {
        returnOriginal: false,
      }
    );
    //send res
    res.status(200).send({ message: "article modified", payload: dbRes });
  })
);

//delete(soft delete) an article by article idd
authorApp.put(
  "/articles/:articleId",
  expressAsyncHandler(async (req, res) => {
    //get modified article
    const modifiedArticle = req.body;
    //update article by article id
    const dbRes = await Article.findByIdAndUpdate(
      modifiedArticle._id,
      {
        ...modifiedArticle,
      },
      {
        returnOriginal: false,
      }
    );
    //send res
    res.status(200).send({ message: "article deleted or restored", payload: dbRes });
  })
);

module.exports = authorApp;
