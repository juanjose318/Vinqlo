const express = require("express");
const router = express.Router();

const ProfileController = require("../controllers/profile");
const checkAuth = require("../middleware/check-auth");
const fileUpload = require("../middleware/file-upload");

router.get("/:id", checkAuth, ProfileController.getProfileInfo);

router.put(
  "/:id/edit",
  checkAuth,
  fileUpload,
  ProfileController.updateProfileInfo
);

module.exports = router;
