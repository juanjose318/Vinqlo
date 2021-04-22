const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/check-auth");
const CommunityController = require("../controllers/community");

router.get("/:categoryId", CommunityController.getCommunities);

router.get("/community/:communityId", CommunityController.getCommunity);

router.get("/community/user/getUserCommunities", checkAuth, CommunityController.getUserCommunities);

router.post("/:categoryId/", checkAuth, CommunityController.createCommunity);

router.post("/:communityId/join", checkAuth, CommunityController.toggleJoinCommunity);

router.delete("/:categoryId/:communityId", checkAuth, CommunityController.deleteCommunity);

// router.put("/:categoryId/community/:id", checkAuth, CommunityController.updateCommunity);

module.exports = router;
