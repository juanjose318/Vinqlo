const Community = require("../models/community");
const Category = require("../models/category");
const User = require("../models/user");

exports.getCommunities = async (req, res) => {
  const pageSize = parseInt(req.query.pageSize);
  const currentPage = parseInt(req.query.page);
  const category = await Category.findOne({ _id: req.params.categoryId });
  let fetchedCommunities;

  if (pageSize && currentPage) {
    await Category.findOne({ _id: req.params.categoryId })
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }
  category
    .populate({
      path: "communities",
      populate: {
        path: "creator",
        select: "name",
      },
    })
    .execPopulate()
    .then((communitiesData) => {
      fetchedCommunities = communitiesData;
      return Category.findOne({ _id: req.params.categoryId }).countDocuments();
    })
    .then((count) => {
      res.status(200).json({
        message: "Communities fetched succfesfully!",
        category: fetchedCommunities,
        maxCommunities: count,
      });
    })
    .catch((err) => {
      res.status(404).json({
        message: "Communities not found" + err,
      });
    });
};

/**
 * Fetch community and its posts
 */

exports.getCommunity = async (req, res) => {
  const community = await Community.findOne({ _id: req.params.communityId })
    .populate("posts")
    .exec()
    .then((communityData) => {
      if (communityData) {
        res.status(200).json({
          message: "Community fetched succesfully",
          community: communityData,
        });
      } else {
        res.status(404).json({
          message: "Community not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Fetching community failed",
      });
    });
};

/**
 * Fetch user communities with the userId through the middleware check auth
 */

exports.getUserCommunities = async (req, res) => {
  let userCommunities;

  User.findOne({ _id: req.userData.userId })
    .populate({
      path: "communities",
      select: "title",
    })
    .exec()
    .then((user) => {
      console.log(user.communities);
      userCommunities = user.communities;
      return res.status(200).json({
        message: "Users communities fetched succesfully",
        communities: userCommunities,
      });
    })
    .catch((err) => {
      res.status(404).json({
        message: "User not found" + err,
      });
    });
};

exports.createCommunity = async (req, res) => {
  const community = await new Community({
    title: req.body.title,
    description: req.body.description,
    creator: req.userData.userId,
  });

  community.save();

  const category = (
    await Category.findOneAndUpdate(
      { _id: req.params.categoryId },
      {
        $push: {
          communities: community,
        },
      }
    ).populate("communities")
  )
    .execPopulate()
    .then((communitiesData) => {
      res.status(200).json({
        message: "Communitiy created succfesfully!",
        community: communitiesData.communities,
      });
    })
    .catch((err) => {
      res.status(404).json({
        message: "Couldn't create community" + err,
      });
    });
};

exports.toggleJoinCommunity = async (req, res) => {
  let userId = req.userData.userId;
  const community = await Community.findOne({ _id: req.params.communityId })
    .then((communityData) => {
      if (communityData) {
        let userBelongs = false;
        for (let user of communityData.users) {
          if (user == userId) {
            userBelongs = true;
            break;
          }
        }
        if (userBelongs) {
          console.log("hihi");
          User.updateOne(
            { _id: userId },
            {
              $pull: {
                communities: req.params.communityId,
              },
            }
          )
            .then((response) => {
              res.status(200).json({
                message: "Community removed from collection",
              });
            })
            .catch((err) => {
              res.status(500).json({
                message: "Couldn't remove community from collection",
              });
            });
        } else {
          try {
            Category.findOneAndUpdate(
              { _id: req.params.categoryId },
              {
                $push: {
                  users: req.userData.userId,
                },
              }
            );
          } catch {
            res.status(500).json({
              message: "couldn't update community",
            });
          }

          User.updateOne(
            { _id: req.userData.userId },
            {
              $push: {
                communities: req.params.communityId,
              },
            }
          )
            .then((response) => {
              res.status(200).json({
                message: "Community added to collection",
              });
            })
            .catch((err) => {
              res.status(500).json({
                message: "Couldn't add community to collection",
              });
            });
        }
      }
    })
    .catch((err) => {
      res.status(400).json({
        message: "User doesn't exist" + err,
      });
    });
};

exports.deleteCommunity = async (req, res) => {
  try {
    const category = await Category.findOneAndUpdate(
      { _id: req.params.id },
      {
        $pull: {
          communities: req.params.communityId,
        },
      }
    );

    const community = await Community.deleteOne({
      _id: req.params.communityId,
      creator: req.userData.userId,
    })
      .then((response) => {
        if (response.n > 0) {
          res.status(200).json({
            message: "Community deleted succesfully",
          });
        } else {
          res.status(500).json({
            message: "Not authorized!",
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: "Deleting community failed",
        });
      });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};
