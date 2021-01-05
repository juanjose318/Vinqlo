const express = require("express");
const router = express.Router();

const CommentsController = require("../controllers/comments");
const checkAuth = require('../middleware/check-auth');

router.delete("/:id/:commentId", checkAuth, CommentsController.deleteComment);

router.post("/:id",checkAuth, CommentsController.createComment );

router.get("/:id", checkAuth, CommentsController.getComments);

router.put("/:id",checkAuth, CommentsController.updateComment );

module.exports = router;
