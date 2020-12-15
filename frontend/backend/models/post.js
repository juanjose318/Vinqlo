const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: { type: String, default : 'Title post' },
  body: { type: String, required : true },
  tags: { type: String, required : true },
  category: { type: Number, required : true },
  likes: { type: Number, default: 0 },
  file: { type: String }
});

module.exports = mongoose.model('Post', postSchema);
