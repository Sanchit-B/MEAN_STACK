const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

/**
 * Extra packages
 */
// const morgan = require('morgan');

const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");
const taskRoutes = require("./routes/tasks");

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use('/images', express.static(path.join(__dirname + '/images')));

mongoose.connect(
  process.env.DB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
).then(resp => {
  console.log("DB connected!!");
}).catch(err => {
  console.log("Failed to connect to DB");
});

// app.use(morgan('dev'));

if (process.env.NODE_ENV === 'dev') {

  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*") // for all the domains e.g localHost:3000, localHost:4000, etc...
    res.setHeader(
      "Access-Control-Allow-Headers",
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
  app.use("/dev/api/tasks", taskRoutes);
}

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
