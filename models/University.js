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
    }
  },
});

module.exports = University = mongoose.model('university', UniversitySchema);
