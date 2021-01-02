const mongoose = require('mongoose');

const communitySchema = mongoose.Schema({
  title: { type: String, required:true },
  description: { type: String, required: true },
  users: [ { type: mongoose.Schema.Types.ObjectId, ref: 'User' } ],
  posts: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
})
module.exports = mongoose.model('Community', communitySchema);
