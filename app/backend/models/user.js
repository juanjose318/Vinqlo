const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
mongoose.set('useCreateIndex', true)

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  degree: { type: String, required: true },
  campus: { type: String, required: true },
  file: { type: String },
  bio: { type: String},
  status: { type: String, default: "pending" },
  communities: [{ type: mongoose.Schema.Types.ObjectId, ref: "Community" }],
  socialMedia: {
    twitter: { type: String },
    facebook: { type: String },
    instagram: { type: String },
    phoneNumber: { type: String }
  },
  postsCollection : [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" , required: true}],
  isAdmin: { type: Boolean, default: false }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
