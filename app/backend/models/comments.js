const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  body: { type: String, required: true },
  createdAt: { type: Date, required:true },
  isReported: { type: Boolean, default : false }
})

module.exports = mongoose.model('Comment', commentSchema);
