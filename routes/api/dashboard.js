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
    const userRequest = await User.findById(req.user.id);
    const uniName = await University.findById(userRequest.university).select('name');

    console.log(uniName);

    let userReview = await Review.findOne({ user_id: req.user.id });


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
      .json({ errors: [{ msg: err }] });
  }
});

module.exports = router;
