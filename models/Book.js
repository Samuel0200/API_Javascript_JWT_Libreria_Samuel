const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  publicationDate: { type: Date, required: true },
  publisher: { type: String , required: true},
  availability: { type: Boolean, default: true },
  disabled: { type: Boolean, default: false },
}, {
  versionKey: false,
  timestamps: true
});

module.exports = mongoose.model('Book', bookSchema);
