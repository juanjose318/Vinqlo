const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Post = require("./models/post");

mongoose
  .connect(
    "mongodb+srv://Admin:__N4FWbp@cluster0.vccib.mongodb.net/vinqlo?retryWrites=true&w=majority",
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

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"),
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res) => {
  const post = new Post({
    title: req.body.title,
    body: req.body.body,
    tags: req.body.tags,
    category: req.body.category,
    createdAt: req.body.createdAt,
    likes: req.body.category,
    file: req.body.file,
  });
  post.save().then((createdPost) => {
    console.log(res);
    res.status(201).json({
      message: "Post added succesfully",
      postId: createdPost._id,
    });
  });
});

app.put("/api/posts/:id", (req, res, next) => {
  const post = new Post({
    _id: req.body._id,
    title: req.body.title,
    body: req.body.body,
    tags: req.body.tags,
    category: req.body.category,
    createdAt: req.body.createdAt,
    likes: req.body.category,
    file: req.body.file,
  });
  Post.updateOne({ _id: req.params.id }, post).then((updatedPost) => {
    console.log(res);
    res.status(200).json({
       message: "Updated post sucesfully!"
     });
  });
});

app.get("/api/posts", (req, res) => {
  Post.find().then((documents) => {
    res.status(200).json({
      message: "Post fetched succesfully!",
      posts: documents,
    });
  });
});

app.get("/api/posts/:id", (req, res) => {
  Post.findOne({ _id: req.params.id }).then((post) => {
    console.log(post);
    res.status(200).json({
      message: "Post fetched succesfully!",
      post: post,
    });
  });
});

app.delete("/api/posts/:id", (req, res) => {
  Post.deleteOne({ _id: req.params.id }).then((res) => {
    console.log(res);
    res.status(200).json({ message: "Post Deleted" });
  });
});

module.exports = app;
