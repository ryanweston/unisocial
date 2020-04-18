const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Review = require('../../models/Review');
const User = require('../../models/User');
const University = require('../../models/University');


// @route    GET api/reviews
// @desc     Test route
// @access   Public
router.post(
  '/', auth,
  async (req, res) => {
    try {
    
    const {internet, happiness, nightLife} = req.body.scores;
    console.log(req.body.scores);

    const user = await User.findById(req.user.id, '_id university');

    const review = new Review({
      university: user.university,
      user_id: user.id,
      scores: [{
        internet,
        happiness,
        nightLife,
      }]
    }); 

    
    await review.save()
    console.log(review);  

    
    //After review is submitted update university with average scores

    //Aggregate reviews, work out average scores and save in variable
    //  const newAverages = await Review.aggregate(
    //   [ { $match : { university_id : req.university_id } } ]
    //  ); 

    //  console.log(newAverages);

    //Save average scores in relevant university document
    //  University.findOneAndUpdate(
    //    { "university_id": university_id },
    //    { $average }
    //  )

    } catch (err) {
      //Error will be server issue if caught
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// router.get('/', async (req, res) => {
//   try {
    
//   } catch(err) {

//   }
// });

module.exports = router;
