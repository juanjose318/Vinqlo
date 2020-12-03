const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

mongoose.connect("mongodb+srv://Admin:__N4FWbp@cluster0.vccib.mongodb.net/vinqlo?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log('connected to database!');
})
.catch(() => {
  console.log('connection failed');
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req,res,next) => {
  res.setHeader("Access-Control-Allow-Origin","*"),
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Methods",
  "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
})

app.post('/api/posts', (req, res) => {
  const post = new Post({
    body: req.body.body,
    tags: req.body.tags,
    category: req.body.category,
    file: req.body.file
  });
  post.save();
  res.status(201).json({
    message: "Post added succesfully"
  });
});

app.get('/api/posts', (req, res, next) => {
  Post.find()
  .then(documents => {
    res.status(200).json({
      message: 'Post fetched succesfully!',
      posts: documents
    });
  });
});

module.exports = app;
