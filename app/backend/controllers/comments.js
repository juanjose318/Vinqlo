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
    post: req.body.post,
  });

  comment.save();

  Post.updateOne({ _id: req.params.id }, { $push: { comments: comment } })
    .then(() => {
      res.status(201).json({
        message: "Comment added Succesfully",
        comments: comment,
      });
    })
    .catch(() => {
      res.status(500).json({
        message: "Failed to create comment",
      });
    });
};

exports.deleteComment = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, {
      $pull: { comments: req.params.commentId },
    });
    if (!post) {
      res.status(404).json({
        message: "Post not found",
      });
    }

    const comment = await Comment.deleteOne({
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
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

exports.updateComment = (req, res) => {
  const comment = new Comment({
    body: req.body.body,
    createdAt: req.body.createdAt,
    creator: req.userData.userId,
    userName: req.userData.userName + " " + req.userData.lastName,
  });

  const post = Post.findOneAndUpdate(
    { _id: req.params.id },
    {
      $push: {
        comments: comment,
      },
    }
  ).then(
    ((newComment) => {
      res.status(201).jon({
        message: "Comment added Succesfully",
        comment: {
          ...newComment,
          id: newComment._id,
        },
      });
    }).catch((err) => {
      res.status(500).json({
        message: "Failed to create comment",
      });
    })
  );
};
