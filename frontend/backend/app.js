const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use((req,res,next) => {
  res.setHeader("Access-Control-Allow-Origin","*"),
  res.setHeader(
    "Access-Control-Allow-Header",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Methods",
  "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
})

app.get('/api/posts', (req, res, next) => {
  const posts = [
    {
      id:134243,
      UserId:566213,
      title: 'Hello',
      body:'This is the content',
      tags:'Hello, bitch, madafaca'
    },
    {
      id:134243562,
      title: 'This is another post',
      body:'This is the content from the backend',
      tags:'Sky, dog, jump'
    },
    {
      id:13455243,
      UserId:566213,
      title: 'Hello',
      body:'This is the content',
      tags:'Hello, word, hi'
    }, {
      id:13425543,
      UserId:566213,
      title: 'Hello',
      body:'This is the content',
      tags:' word, hi, skyline'
    },
  ];
  res.status(200).json({
    message: 'Post fetched succesfully!',
    posts: posts
  });

  next();
});

app.use("api/posts", (req, res, next) => {
  const post = req.body;
  res.status(201).json({
    message: "Post added succesfully"
  });
})


module.exports = app;
