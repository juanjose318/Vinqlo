const mongoose = require('mongoose');

const communitySchema = mongoose.Schema({
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  description: { type: String, required: true },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  isReported: { type: Boolean, default : false },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
})

module.exports = mongoose.model('Community', communitySchema);
