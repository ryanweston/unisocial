const mongoose = require('mongoose');

const UniversitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  domain: {
    type: String,
  },
  country: {
    type: String,
    required: true,
  },
  lastUpdated: {
    type: Date,
  },
  img: {
    type: String,
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
    total: {
      type: Number,
    }
  },
});

module.exports = University = mongoose.model('university', UniversitySchema);
