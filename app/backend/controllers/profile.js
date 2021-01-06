const User = require("../models/user");
const Post = require("../models/post");
const SocialMedia = require("../models/social-media");
const Community = require("../models/community");
const user = require("../models/user");

exports.getProfileInfo = async (req, res) => {
  const user = (
    await (
      await User.findOne({ _id: req.params.id }).select(
        "-__v -password -email -isAdmin -status"
      )
    )
      .populate("postsCollection")
      .populate("socialMedia")
      .populate("communities")
  )
    .execPopulate()
    .then((profileData) => {
      if (profileData) {
        res.status(200).json({
          message: "Profile data fetched succesfully",
          profile: profileData,
        });
      } else {
        res.status(404).json({
          message: "Failed fetching data",
        });
      }
    })
    .catch((err) => {
      res.status(404).json({
        message: "User not found",
      });
    });
};

exports.updateProfileInfo = async (req, res) => {
  let imageUrl;
  let profileId = req.params.id;

  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    imageUrl = url + "/images/" + req.file.filename;
  }

  if (profileId === req.userData.userId) {
    const profile = await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        _id: req.body.id,
        degree: req.body.degree,
        campus: req.body.campus,
        bio: req.body.bio,
        file: imageUrl,
        socialMedia: {
            twitter: req.body.twitter,
            facebook: req.body.facebook,
            instagram: req.body.instagram,
            phoneNumber: req.body.phoneNumber
          },
      }
    ).then((profile) => {
        res.status(200).json({
          message: "profile updated succesfully",
          profile: profile,
        });
      })
      .catch((err) => {
        res.status(404).json({
          message: "profile not found" + err,
        });
      });
  }
};
