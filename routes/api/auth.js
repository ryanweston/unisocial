const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const config = require('config');
const { check, validationResult } = require('express-validator');

const user = require('../../models/User');

// @route    GET api/auth
// @desc     Check's user token & displays user data
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/auth
// @desc     Login / Authenticate user & provide token
// @access   Public

//Passes second parameter through POST router that validates sent information according to check
//Req, res function checks for errors in validation
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
    // check('university', 'Please include your university').not().isEmpty(),
  ],
  async (req, res) => {
    //lists errors from validation paramater above
    const errors = validationResult(req);

    //if there are errors, display in json array
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        // Uses errors to maintain consistancy in error messaging with validation checks
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      //Error will be server issue if caught
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
