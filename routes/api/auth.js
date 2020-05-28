const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const config = require('config');
var rp = require('request-promise');
//Secret site key to acces google API for captcha
const captchaKey = config.get('captchaKey');
// var Recaptcha = require('express-recaptcha').RecaptchaV2;
const { check, validationResult } = require('express-validator');


const user = require('../../models/User');

// @route    GET api/auth
// @desc     Check's user token & displays user data
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    return res.json(user);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ msg: 'Account is not authenticated' })
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
  ],
  async (req, res) => {
    //lists errors from validation paramater above
    const errors = validationResult(req);

    //if there are errors, display in json array
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }


    const { email, password, captcha } = req.body;

    try {
      //If response is empty, means captcha wasn't complete
      if (captcha === undefined ||
        captcha === '' ||
        captcha === null) {
        return res.status(400).json({ errors: [{ msg: 'Please complete captcha!' }] })
      }

      const googleApi = `https://www.google.com/recaptcha/api/siteverify?secret=${captchaKey}&response=${captcha}&remoteip=${req.connection.remoteAddress}`;


      var options = {
        method: 'POST',
        uri: googleApi,
        json: true // Automatically stringifies the body to JSON
      };

      //rp is a library that returns a promise from a request
      //makes a request to google api
      const googleReq = await rp(options);

      //Checks against google api response for failure
      if (googleReq.success === false) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Captcha failed, refresh page and try again' }] });
      }


      let user = await User.findOne({ email });

      if (!user) {
        // Uses errors to maintain consistancy in error messaging with validation checks
        return res
          .status(400)
          .json({ errors: [{ msg: 'No user exists with this email' }] });
      }

      //Compares stored user password to form password
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      //Sets token using secret key
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json([{ token }, { 'success': googleReq.success }]);
        }
      );
    } catch (err) {
      //Error will be server issue if caught
      console.error(err.message);
      res.status(500).json({})
    }
  }
);

// @route    DELETE api/auth
// @desc     Delete user's profile
// @access   Private
router.delete('/', auth, async (req, res) => {
  try {
    await User.findOneAndDelete(req.user.id);
    return res.json({ msg: 'Account successfully deleted' });
  } catch (err) {
    return res.status(400).json({ msg: 'Error in deleting your account' });
  }
})

module.exports = router;
