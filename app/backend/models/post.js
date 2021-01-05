const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required : true },
  tags: { type: String, required : true },
  category: { type: Number, required : true },
  likes: { type: Number, default: 0 },
  createdAt: { type: Date, required: true },
  file: { type: String },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" , required: true}]
});

module.exports = mongoose.model('Post', postSchema);
