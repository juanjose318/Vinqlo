const User = require("../models/user");
const Post = require("../models/post");

exports.getPost = async (req, res) => {
  const postById = (
    await Post.findOne({ _id: req.params.id })
      .populate("creator", "name")
      .populate({
        path: "comments",
        populate: { path: "creator", select: "name" },
      })
  )
    .execPopulate()
    .then((postData) => {
      if (postData) {
        res.status(200).json({
          message: "Post fetched succesfully!",
          post: postData,
        });
      } else {
        res.status(404).json({
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
      creator: req.userData.userId,
    });
  }
  post
    .save()
    .then((createdPost) => {
      res.status(201).json({
        message: "Post added succesfully",
        post: createdPost
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Creating a post failed",
      });
    });
};

exports.togglePostToUserCollection = async (req, res, next) => {
  const postId = req.params.id;
  const user = await User.findOne({ _id: req.userData.userId })
    .then((userData) => {
      if (userData) {
        isInCollection = false;
        for (let post of userData.postsCollection) {
          if (post == postId) {
            isInCollection = true;
            break;
          }
        }
        if (isInCollection) {
          User.updateOne(
            {
              _id: req.userData.userId,
            },
            {
              $pull: {
                postsCollection: postId,
              },
            }
          )
            .then(() => {
              res.status(200).json({
                message: "Post removed from collection",
              });
            })
            .catch((err) => {
              res.status(500).json({
                message: "Couldn't remove post from collection",
              });
            });
        } else {
          User.updateOne(
            {
              _id: req.userData.userId,
            },
            {
              $push: {
                postsCollection: postId,
              },
            }
          )
            .then(() => {
              res.status(200).json({
                message: "Post added to collection",
              });
            })
            .catch(() => {
              res.status(500).json({
                message: "Couldn't add post to collection",
              });
            });
        }
      }
    })
    .catch(() => {
      res.status(404).json({
        message: "User doesn't exist",
      });
    });
};

exports.toggleLikePost = async (req, res, next) => {
  const post = await Post.findOne({ _id: req.params.id })
    .then((post) => {
      if (post) {
        let isLiked = false;
        for (let liker of post.likers) {
          if (liker == req.userData.userId) {
            isLiked = true;
            break;
          }
        }
        if (isLiked) {
          Post.updateOne(
            {
              _id: req.params.id,
            },
            {
              $pull: { likers: req.userData.userId },
            }
          )
            .then(() => {
              res.status(200).json({
                message: "post unliked",
                status: "unliked",
                likesCount: [post.likers].length,
              });
            })
            .catch(() => {
              res.status(500).json({
                message: "couldn't update post",
              });
            });
        } else {
          Post.updateOne(
            {
              _id: req.params.id,
            },
            {
              $push: {
                likers: {
                  _id: req.userData.userId,
                },
              },
            }
          )
            .then((post) => {
              res.status(200).json({
                message: "post has been liked",
                status: "liked",
                likesCount: [post.likers].length,
              });
            })
            .catch((err) => {
              res.status(500).json({
                message: "Couldn't like post" + err,
              });
            });
        }
      }
    })
    .catch(() => {
      res.status(404).json({
        message: "Post doesn't exist",
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
      res.status(500).json({
        message: "Couldn't update post!",
      });
    });
};

exports.getPosts = async (req, res) => {
  const posts = Post.find().sort({ createdAt : 'asc'})
    .populate("creator", "name")
    .exec()
    .then((postsResults) => {
      res.status(200).json({
        message: "Posts fetched",
        posts: postsResults,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Fetching posts failed",
        error: err,
      });
    });
};
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
