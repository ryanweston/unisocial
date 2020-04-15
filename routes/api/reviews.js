const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const reviews = require('../../models/Review');

// @route    GET api/reviews
// @desc     Test route
// @access   Public
router.post('/', auth, async (req, res) => {
    try {
        
    } catch(err){
        
    }
});

module.exports = router;
