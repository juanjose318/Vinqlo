const Community = require('../models/comments');

const express = require("express");

const router = express.Router();

router.get("/posts/:postId/comments", CommentController.getComments);

module.exports = router;
