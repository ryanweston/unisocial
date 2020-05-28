const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const University = require('../../models/University');

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
    ).isLength({ min: 3 }),
    check('university', 'Please select your university').not().isEmpty(),
  ],
  async (req, res) => {
    //lists errors from validation paramater above
    const errors = validationResult(req);

    //if there are errors, display in json array
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //add university
    const { name, email, password, university } = req.body;

    try {
      let user = await User.findOne({ email });

      //if a user has been found by their email
      if (user) {
        // Uses errors to maintain consistancy in error messaging with validation checks
        // and displaying the errors in the frontend
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      //Finds domain of selected university
      let uniFind = await University.findById(university).select('domain');
      uniFind = uniFind.domain;

      //Compares user email to university domain and returns true or false
      const emailVerify = (email, domain) => {
        //Removes "http://www." from the beginning of stored domain name string
        const regex = /^(https?|ftp):\/\/www./;
        const removeHeaders = domain.replace(regex, '');
        //Removes "/" from the end of the string
        const uniDomain = removeHeaders.substring(0, removeHeaders.length - 1);
        console.log(uniDomain);
        return email.endsWith(uniDomain);
      }

      const validStudent = emailVerify(email, uniFind);

      console.log(validStudent);

      //If email is not valid
      if (validStudent === false) {
        console.log(validStudent + ':' + ' Not correct email for university');
        return res
          .status(400)
          .json({ errors: [{ msg: 'Please enter your student email' }] });
      }

      //Creates object ready to be passed into database
      //using variables of data assigned above
      user = new User({
        name,
        email,
        password,
        university,
      });


      const salt = await bcrypt.genSalt(10);

      //Encrypt password with the salt
      user.password = await bcrypt.hash(password, salt);

      //Save user to the database
      await user.save();

      //Payload is what is stored within the JWT token
      const payload = {
        user: {
          id: user.id,
        },
      };

      //Generates token using secret key 
      //Expiration set to one hour for deployment
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 3600 },
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
