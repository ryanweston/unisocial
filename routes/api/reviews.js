const express = require('express');
const router = express.Router();
// const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Review = require('../../models/Review');
const User = require('../../models/User');
const University = require('../../models/University');

// @route    POST api/reviews
// @desc     Save user's review
// @access   Public
router.post('/', auth, async (req, res) => {
  try {
    let user = await User.findById(req.user.id, '_id university');
    const universityName = await University.findById(user.university, 'name');

    // Check if user already has a saved review.
    // find() returns array as opposed to findOne which returns a string, hence .length check
    const reviewStatus = await Review.find({ user_id: user.id });

    if (reviewStatus.length) {
      return res.status(400)
        .json({ errors: [{ msg: 'You have already submitted a review' }] });
    }

    const review = new Review({
      university: user.university,
      user_id: user.id,
      scores:
      {
        internet: req.body.scores.internet,
        happiness: req.body.scores.happiness,
        nightlife: req.body.scores.nightlife,
      },
    });

    await review.save();
    // res.json({ review });

    //After review is submitted update university with average scores
    //Aggregate reviews, calculating average and replacing previous averages in the relative university document
    await Review.aggregate([
      { $match: { university: user.university } },
      { $unwind: '$scores' },
      {
        $group: {
          _id: '$university',
          internet: { $avg: '$scores.internet' },
          happiness: { $avg: '$scores.happiness' },
          nightlife: { $avg: '$scores.nightlife' },
        },
      },
      { $set: { lastUpdated: '$$NOW' } },
      {
        $project: {
          scores: {
            internet: '$internet',
            happiness: '$happiness',
            nightlife: '$nightlife',
            total: { $avg: ['$internet', '$happiness', '$nightlife'] },
          },
          lastUpdated: true,
        }
      },
      {
        $merge: {
          into: 'universities',
          on: '_id',
          whenMatched: 'merge',
          whenNotMatched: 'insert',
        },
      },
    ]);

    return res.json(universityName.name + ' review submitted and aggregated');

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route    GET api/reviews
// @desc     Retrieves all universities and orders by total score
// @access   Public
router.get('/', async (req, res) => {
  try {
    const reviews = await University.find().sort({ "scores.total": -1 });
    return res.json({ reviews });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/reviews
// @desc     Delete's the specific user's review
// @access   Private
router.delete('/', auth, async (req, res) => {
  try {
    console.log(req.user.id);
    const userReview = await Review.findOne({ user_id: req.user.id });

    if (!userReview) {
      return res.status(400).json({ msg: 'You do not have a review to delete.' })
    }

    await Review.findOneAndDelete(userReview.id)

    return res.json({ msg: 'Review deleted.' })

  } catch (err) {
    res.status(400).json({ msg: err });
  }
})

module.exports = router;
