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
        societies: req.body.scores.societies,
        sports: req.body.scores.sports,
        culture: req.body.scores.societies,
        freedom_of_speech: req.body.scores.freedom_of_speech,
        weather: req.body.scores.weather,
        LGBTQ_friendly: req.body.scores.LGBTQ_friendly,
        crime: req.body.scores.crime,
        mental_health: req.body.scores.mental_health,
        student_events: req.body.scores.student_events,
        nature: req.body.scores.nature,
        diversity: req.body.scores.diversity,
        accomodation: req.body.scores.accomodation,
        cost_of_living: req.body.scores.cost_of_living,
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
          sports: { $avg: '$scores.sports' },
          culture: { $avg: '$scores.culture' },
          societies: { $avg: '$scores.societies' },
          freedom_of_speech: { $avg: '$scores.freedom_of_speech' },
          weather: { $avg: '$scores.weather' },
          LGBTQ_friendly: { $avg: '$scores.LGBTQ_friendly' },
          crime: { $avg: '$scores.crime' },
          mental_health: { $avg: '$scores.mental_health' },
          student_events: { $avg: '$scores.student_events' },
          nature: { $avg: '$scores.nature' },
          diversity: { $avg: '$scores.diversity' },
          accomodation: { $avg: '$scores.accomodation' },
          cost_of_living: { $avg: '$scores.cost_of_living' },
        },
      },
      { $set: { lastUpdated: '$$NOW' } },
      {
        $project: {
          scores: {
            internet: '$internet',
            happiness: '$happiness',
            nightlife: '$nightlife',
            sports: '$sports',
            culture: '$culture',
            societies: '$societies',
            freedom_of_speech: '$freedom_of_speech',
            weather: '$weather',
            LGBTQ_friendly: '$LGBTQ_friendly',
            crime: '$crime',
            mental_health: '$mental_health',
            student_events: '$student_events',
            nature: '$nature',
            diversity: '$diversity',
            accomodation: '$accomodation',
            cost_of_living: '$cost_of_living',
            total: { $avg: ['$internet', '$happiness', '$nightlife', '$sports', '$culture', '$societies', '$freedom_of_speech', '$weather', '$LGBTQ_friendly', '$crime', '$mental_health', '$student_events', '$nature', '$diversity', '$accomodation', '$cost_of_living'] },
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


// @route    PUT api/reviews
// @desc     Update's the specific user's review
// @access   Private
router.put('/', auth, async (req, res) => {
  try {
    //Gets review from user id
    const userReview = await Review.findOne({ user_id: req.user.id });

    console.log(req.body.scores);

    //Destructure request body
    const {
      internet,
      happiness,
      nightlife,
      societies,
      sports,
      culture,
      freedom_of_speech,
      weather,
      LGBTQ_friendly,
      crime,
      mental_health,
      student_events,
      nature,
      diversity,
      accomodation,
      cost_of_living,
    } = req.body.scores;


    //Find by id and update all the relevant data sets
    //TODO: Reduce amount of code required when adding a new scores option
    //as well as option to not have to submit a value: "N/A"

    //Will return null for values that are not present in request body
    //action in client checks for null values and will reject to ensure 
    //all options are filled.
    await Review.findByIdAndUpdate(userReview.id,
      {
        'scores.internet': internet,
        'scores.happiness': happiness,
        'scores.nightlife': nightlife,
        'scores.societies': societies,
        'scores.sports': sports,
        'scores.internet': internet,
        'scores.culture': culture,
        'scores.freedom_of_speech': freedom_of_speech,
        'scores.weather': weather,
        'scores.LGBTQ_friendly': LGBTQ_friendly,
        'scores.crime': crime,
        'scores.mental_health': mental_health,
        'scores.student_events': student_events,
        'scores.nature': nature,
        'scores.diversity': diversity,
        'scores.accomodation': accomodation,
        'scores.cost_of_living': cost_of_living,
      },
      function (err, result) {
        if (err) {
          res.status(400).json({ msg: "Review edit failed" });
        } else {
          res.send(result.scores);
        }
      });


  } catch (err) {
    res.status(500).json({ msg: err });
  }
})


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
