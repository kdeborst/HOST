//Required Dependencies
const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const authentication = require('../../middleware/authentication');

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

module.exports = router;
