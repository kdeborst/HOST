//Required Dependencies
const config = require('config');
const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const User = require('../../models/User');
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
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({
          errors: [{ msg: 'E-mail already exists' }]
        });
      }

      const avatar = gravatar.url(email, {
        s: '125',
        r: 'pg',
        d: 'mm'
      });

      user = new User({
        name,
        email,
        avatar,
        password
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

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
