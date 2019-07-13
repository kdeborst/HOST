//Required Dependencies
const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const authentication = require('../../middleware/authentication');
const { check, validationResult } = require('express-validator');

//Route:        GET api/profile/user
//Description:  Get personal profile of current user
//Access:       Private
router.get('/user', authentication, async (req, res) => {
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

//Route:        POST api/profile
//Description:  Create & update personal profile for current user
//Access:       Private
router.post(
  '/',
  [
    authentication,
    [
      check('location', 'Location is required')
        .not()
        .isEmpty(),
      check('status', 'Status is required')
        .not()
        .isEmpty(),
      check('skills', 'Skills are required')
        .not()
        .isEmpty(),
      check('bio', 'Biography is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      location,
      status,
      skills,
      bio,
      website,
      youtube,
      twitter,
      facebook,
      linkedin,
      instagram,
      pinterest
    } = req.body;

    //Construct Profile Object
    const profileFields = {};
    profileFields.user = req.user.id;

    if (location) profileFields.location = location;
    if (status) profileFields.status = status;
    if (skills) {
      profileFields.skills = skills.split(',').map(skill => skill.trim());
    }
    if (bio) profileFields.bio = bio;
    if (website) profileFields.website = website;

    //Construct Social Media Object
    profileFields.social = {};

    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;
    if (pinterest) profileFields.social.pinterest = pinterest;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      //Update Existing Profile
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      //Create Profile
      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//Route:        GET api/profile
//Description:  Retrieve all profiles
//Access:       Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//Route:        GET api/profile/user/:user_id
//Description:  Get profile by user ID
//Access:       Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate('user', ['name', 'avatar']);

    if (!profile)
      return res
        .status(400)
        .json({ msg: 'We could not find the profile.. Please try again' });

    res.json(profile);
  } catch (err) {
    console.error(err.message);

    if (err.kind == 'ObjectId') {
      return res
        .status(400)
        .json({ msg: 'We could not find the profile.. Please try again' });
    }
    res.status(500).send('Server Error');
  }
});

//Route:        DELETE api/profile
//Description:  Delete complete account
//Access:       Private
router.delete('/', authentication, async (req, res) => {
  try {
    //Remove users' profile
    await Profile.findOneAndRemove({ user: req.user.id });

    //Remove current user
    await User.findOneAndRemove({ _id: req.user.id });

    //Remove users' messages
    //

    res.json({ msg: 'Account Deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
