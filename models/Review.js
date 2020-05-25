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
    accomodation: {
      type: Number,
    },
    LGBTQ_friendly: {
      type: Number,
    },
    mental_health: {
      type: Number,
    },
    diversity: {
      type: Number,
    },
    sports: {
      type: Number,
    },
    freshers_week: {
      type: Number,
    },
    accomodation: {
      type: Number,
    },
    nature: {
      type: Number,
    },
    freedom_of_speech: {
      type: Number,
    },
    weather: {
      type: Number,
    },
    cost_of_living: {
      type: Number,
    },
    crime: {
      type: Number,
    },
    student_events: {
      type: Number,
    },
    culture: {
      type: Number,
    },
    societies: {
      type: Number,
    },
    total: {
      type: Number,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Review = mongoose.model('review', ReviewSchema);
