const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Review = require('../../models/Review');
const University = require('../../models/University');

// @route    GET api /dashboard
// @desc     Get current users profile
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    console.log('Running dashboard');
    // Fetches user information
    const userRequest = await User.findById(req.user.id);
    // Fetches university information based on user's university
    const uniName = await University.findById(userRequest.university).select('name');

    // console.log(uniName);

    // Finds the user's review for their university, simple findOne as user is only
    // permitted to one review
    let userReview = await Review.findOne({ user_id: req.user.id });

    //Sets review to false if no review to adjust display on frontend
    if (!userReview) {
      userReview = false;
    }

    const user = {
      email: userRequest.email,
      userUniversity: uniName,
      review: userReview
    }

    res.json({ user });
  } catch (err) {
    console.log(err);
    return res.status(400)
      .json({ errors: [{ msg: 'Server error, possibly invalid session' }] });
  }
});

module.exports = router;
