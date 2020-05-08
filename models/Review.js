const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  university: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'university',
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  scores: {
    internet: {
      type: Number,
    },
    happiness: {
      type: Number,
    },
    nightlife: {
      type: Number,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Review = mongoose.model('review', ReviewSchema);
