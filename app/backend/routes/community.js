const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/check-auth");
const Community = require("../models/community");
const CommunityController = require("../controllers/community");

router.get("/:categoryId", CommunityController.getCommunities);

router.post("/:categoryId/", checkAuth, CommunityController.createCommunity);

router.post("/:communityId/join", checkAuth, CommunityController.toggleJoinCommunity);

router.delete("/:categoryId/:communityId", checkAuth, CommunityController.deleteCommunity);

// router.put("/:categoryId/community/:id", checkAuth, CommunityController.updateCommunity);
// router.get("/:categoryId/:id", CommunityController.getCommunity);

module.exports = router;
