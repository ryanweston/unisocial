const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const config = require('config');
const request = require('request');
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


    const { email, password, captcha } = req.body;
    var captchaSuccess = false;

    try {
      //If response is empty, means captcha wasn't complete
      if (captcha === undefined ||
        captcha === '' ||
        captcha === null) {
        return res.json({ errors: [{ msg: 'Please complete captcha!' }] })
      }

      const googleApi = `https://www.google.com/recaptcha/api/siteverify?secret=${captchaKey}&response=${captcha}&remoteip=${req.connection.remoteAddress}`;

      var options = {
        method: 'POST',
        uri: googleApi,
        json: true // Automatically stringifies the body to JSON
      };

      // request(googleApi, (err, response, body) => {
      //   body = JSON.parse(body);
      //   console.log(body);

      //   if (!body.success) {
      //     return res.json({ errors: [{ msg: 'Please complete captcha!' }] })
      //   } else {

      //     captchaSuccess = true;
      //     console.log(captchaSuccess);
      //   }
      // }

      const googleReq = await rp(options);

      console.log(googleReq);


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
          res.json([{ token }, { 'success': googleReq.success }]);
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
