//Required Dependencies
const config = require('config');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const User = require('../../models/User');
const authentication = require('../../middleware/authentication');
const { check, validationResult } = require('express-validator');

//Route:        GET api/authentication
//Description:  Test Route
//Access:       Public
router.get('/', authentication, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//Route:        POST api/authentication
//Description:  Authenticate User & Generate Token
//Access:       Public
router.post(
  '/',
  [
    check('email', 'Please enter a valid e-mail').isEmail(),
    check('password', 'Password is required').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({
          errors: [{ msg: 'Your credentials are invalid, please try again' }]
        });
      }

      const passMatch = await bcrypt.compare(password, user.password);

      if (!passMatch) {
        return res.status(400).json({
          errors: [{ msg: 'Your credentials are invalid, please try again' }]
        });
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      jsonwebtoken.sign(
        payload,
        config.get('jsonwebtokenSecret'),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
