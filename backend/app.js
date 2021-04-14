const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use('/images', express.static('backend/images'));

mongoose.connect("mongodb+srv://sanchit_bansal_007:SanchitB007@nodeapi-khp6t.mongodb.net/node-angular?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=> {
  console.log('Database connected.');
})
.catch((error)=> {
  console.log('Connection failed.');
  console.log(error);
});

app.use(morgan('dev'));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*") // for all the domains e.g localHost:3000, localHost:4000, etc...
  res.setHeader(
    "Access-control-Allow-Headers",
    "Origin, X-Requested-with, Content-Type, Accept, Authorization"
    );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
  next();
});

app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);

/**
 *  Error Handling if none of the above routes satisfies the incoming request
 */
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});


module.exports = app;
