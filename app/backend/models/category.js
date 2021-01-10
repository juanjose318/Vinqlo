const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  name: { type: String, required: true },
  isMandatory: { type: Boolean, required: true, default: false },
  communities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Community' }],
  icon: { type: String }
})

module.exports = mongoose.model('Category', categorySchema);
