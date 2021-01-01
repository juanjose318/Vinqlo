const express = require("express");
const router = express.Router();

const Postcontroller = require("../controllers/posts");
const checkAuth = require('../middleware/check-auth');
const fileUpload = require('../middleware/file-upload');

router.get("/:id",Postcontroller.getPost );

router.delete("/:id",checkAuth, Postcontroller.deletePost);

router.post("",checkAuth, fileUpload, Postcontroller.createPost);

router.put( "/:id", checkAuth, fileUpload , Postcontroller.updatePost);

router.get("",Postcontroller.getPosts);

module.exports = router;
