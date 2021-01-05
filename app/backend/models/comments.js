const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  body: { type: String, required: true },
  createdAt: { type: Date, required:true },
  isReported: { type: Boolean, default : false },
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
})

module.exports = mongoose.model('Comment', commentSchema);
