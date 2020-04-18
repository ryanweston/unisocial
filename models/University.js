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
  average_scores: [
    {
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
  ],
});

module.exports = University = mongoose.model('university', UniversitySchema);
