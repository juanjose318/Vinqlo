const express = require("express");
const multer = require("multer");

const Post = require("../models/post");

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
    console.log(postData);
    res.status(200).json({
      message: "Post fetched succesfully!",
      post: post,
    });
  });
});

router.delete("/:id", (req, res) => {
  Post.deleteOne({ _id: req.params.id }).then((postData) => {
    console.log(postData);
    res.status(200).json({ message: "Post Deleted" });
  });
});

router.post("", multer({ storage: storage }).single("file"), (req, res) => {
  const url = req.protocol + "://" + req.get("host");
  let post;
  if (req.body.file) {
    post = new Post({
      title: req.body.title,
      body: req.body.body,
      tags: req.body.tags,
      category: req.body.category,
      createdAt: req.body.createdAt,
      likes: req.body.category,
      file: url + "/images" + req.file.filename,
    });
  } else {
    post = new Post({
      title: req.body.title,
      body: req.body.body,
      tags: req.body.tags,
      category: req.body.category,
      createdAt: req.body.createdAt,
      likes: req.body.category,
    });
  }
  post.save().then((createdPost) => {
    console.log(res);
    res.status(201).json({
      message: "Post added succesfully",
      post: {
        ...createdPost,
        id: createdPost._id,
      },
    });
  });
});

router.put("/:id", (req, res, next) => {
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
      message: "Updated post sucesfully!",
    });
  });
});

router.get("", (req, res) => {
  Post.find().then((documents) => {
    res.status(200).json({
      message: "Post fetched succesfully!",
      posts: documents,
    });
  });
});

module.exports = router;
