const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Review = require('../../models/Review');
const User = require('../../models/User');
const University = require('../../models/University');

// @route    GET api/reviews
// @desc     Test route
// @access   Public
router.post('/', auth, async (req, res) => {
  try {
    let user = await User.findById(req.user.id, '_id university');

    // Check if user already has a saved review.
    // find() returns array as opposed to findOne which returns a string, hence .length check
    const reviewStatus = await Review.find({ user_id: user.id });

    if (reviewStatus.length) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'You have already submitted a review' }] });
    }

    const review = new Review({
      university: user.university,
      user_id: user.id,
      scores: [
        {
          internet: req.body.scores.internet,
          happiness: req.body.scores.happiness,
          nightlife: req.body.scores.nightlife,
        },
      ],
    });

    await review.save();
    res.json({ review });

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
});

// router.get('/', async (req, res) => {
//   try {

//   } catch(err) {

//   }
// });

module.exports = router;
