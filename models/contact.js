const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
  firstName         : { type: String, require: true },
  lastName          : { type: String, require: true },
  userName          : { type: String },
  email             : { type: String, required: true, unique: true },
  isFavorite        : { type: Boolean, default: false },
  isDeleted         : { type: Boolean, default: false },
},
{
  timestamps: true,
});

module.exports = mongoose.model('contact', contactSchema, 'contacts');

