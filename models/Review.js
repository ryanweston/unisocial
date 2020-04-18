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
  scores: [
    {
      internet: {
        type: String,
      },
      happiness: {
        type: String,
      },
      nightlife: {
        type: String,
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Review = mongoose.model('review', ReviewSchema);
