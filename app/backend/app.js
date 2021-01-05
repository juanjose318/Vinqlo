const express = require("express");
const path = require("path")
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const postsRoutes = require ("./routes/posts");
const authRoutes = require ("./routes/auth");
const commentRoutes = require ("./routes/comments");


mongoose
  .connect(
    "mongodb+srv://Admin:"+ process.env.MONGO_PASSWORD + "@cluster0.vccib.mongodb.net/vinqlo?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("connected to database!");
  })
  .catch(() => {
    console.log("connection failed");
  });

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Allow images
 */
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"),
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", postsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/comments", commentRoutes);

module.exports = app;
