const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  permissions: {
    createBooks: { type: Boolean, default: false },
    editBooks: { type: Boolean, default: false },
    deleteBooks: { type: Boolean, default: false },
    editUsers: { type: Boolean, default: false },
    deleteUsers: { type: Boolean, default: false }
  },
  disabled: { type: Boolean, default: false },
}, {
  versionKey: false,
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);


