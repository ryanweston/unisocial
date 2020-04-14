const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route    POST api/users
// @desc     Register User
// @access   Public

//Passes second parameter through POST router that validates sent information according to check
//Req, res function checks for errors in validation
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 7 or more characters'
    ).isLength({ min: 6 }),
    // check('university', 'Please include your university').not().isEmpty(),
  ],
  async (req, res) => {
    //lists errors from validation paramater above
    const errors = validationResult(req);

    //if there are errors, display in json array
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, university } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        // Uses errors to maintain consistancy in error messaging with validation checks
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      user = new User({
        name,
        email,
        password,
        university,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

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
