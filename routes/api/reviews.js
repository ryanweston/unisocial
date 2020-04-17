const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const reviews = require('../../models/Review');

// @route    GET api/reviews
// @desc     Test route
// @access   Public
router.post(
  '/',
  [check('parent_id', 'University is required').not().isEmpty()],
  auth,
  async (req, res) => {
    try {
    } catch (err) {}
  }
);

module.exports = router;
