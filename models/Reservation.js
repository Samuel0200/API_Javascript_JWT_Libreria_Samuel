const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    reservationDate: { type: Date, default: Date.now },
    disabled: { type: Boolean, default: false },
    returnDate: { type: Date }
}, {
  versionKey: false,
  timestamps: true
});

module.exports = mongoose.model('Reservation', reservationSchema);
