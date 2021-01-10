const express = require("express");
const router = express.Router();

const Postcontroller = require("../controllers/posts");
const checkAuth = require("../middleware/check-auth");
const fileUpload = require("../middleware/file-upload");

router.get("", Postcontroller.getPosts);

router.post("", checkAuth, fileUpload, Postcontroller.createPost);

router.get("/:id", Postcontroller.getPost);

router.delete("/:id", checkAuth, Postcontroller.deletePost);

router.put("/:id", checkAuth, fileUpload, Postcontroller.updatePost);

router.post("/:id/toggleLikePost", checkAuth, Postcontroller.toggleLikePost);

router.post("/:id/togglePostToUserCollection", checkAuth, Postcontroller.togglePostToUserCollection);

module.exports = router;
