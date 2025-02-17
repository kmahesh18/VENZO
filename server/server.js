const exp = require("express");
const app = exp();
require("dotenv").config(); //process.env
const mongoose = require("mongoose");
const userApp = require("./APIs/userApi");
const authorApp = require("./APIs/authorApi");
const adminApp = require("./APIs/adminApi");

const cors = require('cors')
app.use(cors())

// Get port from environment variable or use 3000 as fallback
const port = process.env.PORT || 3000;

//body parser middleware
app.use(exp.json());

//connect API routes
app.use("/user-api", userApp);
app.use("/author-api", authorApp);
app.use("/admin-api", adminApp);

// Basic route to test if server is running
app.get('/', (req, res) => {
  res.send('VENZO API is running');
});

//error handler
app.use((err, req, res, next)=>{
  console.log("Error object in express error handler : ", err);
  res.send({message:err.message})
})

// Connect to MongoDB first, then start the server
mongoose
  .connect(process.env.DBURL)
  .then(() => {
    // Start server after successful DB connection
    app.listen(port, '0.0.0.0', () => {
      console.log(`Server listening on port: ${port}`);
    });
    console.log("DB Connection Success");
  })
  .catch((err) => console.log("Error in DB Connection ", err));