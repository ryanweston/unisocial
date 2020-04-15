const mongoose = require('mongoose');

const UniversitySchema = new mongoose.Schema ({ 
    name: { 
        type: String,
        required: true
    },
    domain: { 
        type: String, 
    },
    country: { 
        type: String,
        required: true
    },
    average_scores: { 
        internet_score: {
            type: String,
        },
        hospitality_score: {
            type: String,
        }
    }
});
module.exports = University = mongoose.model('university', UniversitySchema);