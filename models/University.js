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
});

module.exports = University = mongoose.model('university', UniversitySchema);
