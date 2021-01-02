const Post = require("../models/post");

exports.getPost = (req, res) => {
  Post.findOne({ _id: req.params.id }).populate("comments")
    .then((postData) => {
      if (postData) {
        res.status(200).json({
          message: "Post fetched succesfully!",
          post: postData,
        });
      } else {
        res.status(500).json({
          message: "Post not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Fetching posts failed",
      });
    });
};

exports.deletePost = (req, res) => {
  Post.deleteOne({ _id: req.params.id, creator: req.userData.userId })
    .then((postData) => {
      if (postData.n > 0) {
        res.status(200).json({
          message: "Deleted post sucesfully!",
        });
      } else {
        res.status(401).json({
          message: "Not authorized",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Deleting post failed",
      });
    });
};

exports.createPost = (req, res) => {
  const url = req.protocol + "://" + req.get("host");
  let post;
  if (req.file !== undefined) {
    post = new Post({
      title: req.body.title,
      body: req.body.body,
      tags: req.body.tags,
      category: req.body.category,
      createdAt: req.body.createdAt,
      likes: req.body.category,
      file: url + "/images/" + req.file.filename,
      creator: req.userData.userId,
    });
  } else {
    post = new Post({
      title: req.body.title,
      body: req.body.body,
      tags: req.body.tags,
      category: req.body.category,
      createdAt: req.body.createdAt,
      likes: req.body.category,
      creator: req.userData.userId,
    });
  }
  post
    .save()
    .then((createdPost) => {
      res.status(201).json({
        message: "Post added succesfully",
        post: {
          ...createdPost,
          id: createdPost._id,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Creating a post failed",
      });
    });
};

exports.updatePost = (req, res, next) => {
  let imageUrl;
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    imageUrl = url + "/images/" + req.file.filename;
  }
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    body: req.body.body,
    tags: req.body.tags,
    category: req.body.category,
    createdAt: req.body.createdAt,
    likes: req.body.category,
    file: imageUrl,
    creator: req.userData.userId,
  });
  Post.updateOne({ _id: req.params.id, creator: req.userData.userId }, post)
    .then((updatedPost) => {
      if (updatedPost.nModified > 0) {
        res.status(200).json({
          message: "Updated post sucesfully!",
        });
      } else {
        res.status(401).json({
          message: "Not authorized",
        });
      }
    })
    .catch((err) => {
      res.status(500).jons({
        message: "Couldn't update post!",
      });
    });
};

exports.getPosts = (req, res) => {
  Post.find()
    .then((postsResults) => {
      // const page = parseInt(req.query.page)
      // const limit = parseInt(req.query.limit)

      // const startIndex = (page - 1) * limit
      // const endIndex = page * limit

      // const results = {};

      // if (endIndex < postsResults.length) {
      //   results.next = {
      //     page: page + 1,
      //     limit: limit,
      //   };
      // }

      // if (startIndex > 0) {
      //   results.previous = {
      //     page: page - 1,
      //     limit: limit,
      //   };
      // }
      // results.results = postsResults.slice(startIndex, endIndex);
      res.status(200).json({
        message: "Posts fetched",
        posts: postsResults,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Fetching posts failed",
        error: err
      });
    });
};
