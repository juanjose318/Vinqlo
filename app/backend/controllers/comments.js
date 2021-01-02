const Comment = require("../models/comments");
const Post = require("../models/post");

exports.getComments = (req, res, next) => {
  const post = Post.findOne({ _id: req.params.id })
    .populate("comments")
    .then((commentResult) => {
      res.status(200).json({
        message: "comments fetched",
        comments: commentResult,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Failed to fetch comments",
      });
    });
};

exports.createComment = (req, res) => {
  const comment = new Comment({
    body: req.body.body,
    createdAt: req.body.createdAt,
    creator: req.userData.userId,
    userName: req.userData.userName + " " + req.userData.lastName,
  });

  comment
    .save()
    .then((createdComment) => {
      res.status(201).jons({
        message: "Comment added Succesfully",
        comment: {
          ...createdComment,
          id: createdComment._id,
        },
      });
    })
    .catch((err) => {
      res.status(500).jons({
        message: "Creating a comment failed",
      });
    });
};

exports.deleteComment = (req, res) => {
  try {
    const post = Post.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { comments: req.params.commentId },
      },
      { new: true }
    );
    if (!post) {
      res.status(404).json({
        message: "Post not found",
      });
    }

    Comment.findByIdAndDelete({
      _id: req.params.commentId,
      creator: req.userData.userId,
    })
      .then((commentData) => {
        if (commentData.n > 0) {
          res.status(200).json({
            message: "Comment deleted succesfully!",
          });
        } else {
          res.status(500).json({
            message: "Not authorized!",
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: "Deleting comment failed",
        });
      });
  } catch {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};
