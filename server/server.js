const exp = require("express");
const app = exp();
require("dotenv").config(); //process.env
const mongoose = require("mongoose");
const userApp = require("./APIs/userApi");
const authorApp = require("./APIs/authorApi");
const adminApp = require("./APIs/adminApi");

const cors = require('cors')
app.use(cors())



const port = process.env.PORT || 4000;

//db connnection
mongoose
  .connect(process.env.DBURL)
  .then(() => {
    app.listen(port, () => console.log(`Server listening on port: ${port}`));
    console.log("DB Connection Success");
  })
  .catch((err) => console.log("Error in DB Connection ", err));

//body parser middleware
app.use(exp.json());

//connect API routes
app.use("/user-api", userApp);
app.use("/author-api", authorApp);
app.use("/admin-api", adminApp);



//error handler
app.use((err, req, res, next)=>{
  console.log("Error object in express error handler : ", err);
  res.send({message:err.message})
})