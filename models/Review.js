const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  university_id: {
      type: String,
      required: true,
  },
  user_id: {
      type: String, 
      required: true,
  }, 
  internet_score: {
      type: String,
  },
  hospitality_score: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Review = mongoose.model('review', ReviewSchema);
