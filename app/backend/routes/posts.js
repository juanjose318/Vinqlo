const express = require("express");
const multer = require("multer");

const Post = require("../models/post");
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  },
});

router.get("/:id", (req, res) => {
  Post.findOne({ _id: req.params.id }).then((postData) => {
    res.status(200).json({
      message: "Post fetched succesfully!",
      post: postData,
    });
  });
});

router.delete("/:id",checkAuth, (req, res) => {
  Post.deleteOne({ _id: req.params.id, creator: req.userData.userId }).then((postData) => {
    if(postData.n > 0) {
      res.status(200).json({
        message: "Updated post sucesfully!",
      });
    } else {
      res.status(401).json({
        message: "Not authorized",
      });
    }
  });
});

router.post("",
checkAuth,
multer({ storage: storage }).single("file"), (req, res) => {
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
      creator: req.userData.userId
    });
  } else {
    post = new Post({
      title: req.body.title,
      body: req.body.body,
      tags: req.body.tags,
      category: req.body.category,
      createdAt: req.body.createdAt,
      likes: req.body.category,
      creator: req.userData.userId
    });
  }
  post.save().then((createdPost) => {
    res.status(201).json({
      message: "Post added succesfully",
      post: {
        ...createdPost,
        id: createdPost._id,
      },
    });
  });
});

router.put(
  "/:id",
  checkAuth,
  multer({ storage: storage }).single("file"),
  (req, res, next) => {
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
      creator: req.userData.userId
    });
    console.log(post);
    Post.updateOne({ _id: req.params.id, creator: req.userData.userId }, post).then((updatedPost) => {
      if(updatedPost.nModified > 0) {
        res.status(200).json({
          message: "Updated post sucesfully!",
        });
      } else {
        res.status(401).json({
          message: "Not authorized",
        });
      }
    });
  }
);

router.get("", (req, res) => {
  Post.find().then((postsResults) => {
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
      message: 'Posts fetched',
      posts: postsResults });
  });
});

module.exports = router;
