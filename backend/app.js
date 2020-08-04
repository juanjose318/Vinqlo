const express = require ('express');
const app = express();

app.use('/api/posts', (req, res, next) => {
  const posts = [
    {
      id:134243,
      title: 'Hello',
      content:'This is the content'
    },
    {
      id:134243562,
      title: 'This is another post',
      content:'This is the content from the backend'
    }
  ];
  res.status(200).json({
    message: 'Post fetched succesfully!',
    posts: posts
  });

  next();
});

module.exports = app;
