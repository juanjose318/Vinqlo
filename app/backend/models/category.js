const mongoose = require('mongoose');

const communitySchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  commmunities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Community' }],
})

module.exports = mongoose.model('Community', communitySchema);
