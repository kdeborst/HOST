//Required Dependencies
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

//Route:        POST api/user
//Description:  User Registration
//Access:       Public
router.post(
  '/',
  [
    check('name', 'Sorry, your name is required!')
      .not()
      .isEmpty(),
    check('email', 'Please enter a valid e-mail').isEmail(),
    check(
      'password',
      'Please enter a password between 6 or more characters'
    ).isLength({ min: 6 })
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.send('User route');
  }
);

module.exports = router;
