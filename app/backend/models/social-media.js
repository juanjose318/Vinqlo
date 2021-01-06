const mongoose = require("mongoose");

const socialMediaSchema = mongoose.Schema({
  twitter: { type: String },
  facebook: { type: String },
  phoneNumber: { type: String },
  instagram: { type: String }
});

module.exports = mongoose.model("SocialMedia", socialMediaSchema);
