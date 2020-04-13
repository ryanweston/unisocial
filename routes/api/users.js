const express = require('express');
const router = express.Router();
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
  ],
  (req, res) => {
    //lists errors from validation paramater above
    const errors = validationResult(req);

    //if there are errors, display in json array
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // See if user exists

    //Encrypt Password

    //Return web token

    res.send('User route');
  }
);

module.exports = router;
