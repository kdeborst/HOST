//Required Dependencies
const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const authentication = require('../../middleware/authentication');

//Route:        GET api/profile/individual
//Description:  Get personal profile of current user
//Access:       Private
router.get('/individual', authentication, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['name', 'avatar']
    );

    if (!profile) {
      return res
        .status(400)
        .json({ msg: 'We have found no profile for this user..' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
