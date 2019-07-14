//Required Dependencies
const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Message = require('../../models/Message');
const authentication = require('../../middleware/authentication');
const { check, validationResult } = require('express-validator');

//Route:        POST api/messages
//Description:  Create message
//Access:       Private
router.post(
  '/',
  [
    authentication,
    [
      check('text', 'Text is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const newMessage = new Message({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      });
      const message = await newMessage.save();
      res.json(message);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//Route:        GET api/messages
//Description:  Retrieve all messages
//Access:       Private
router.get('/', authentication, async (req, res) => {
  try {
    const messages = await Message.find().sort({ date: -1 });
    res.json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//Route:        GET api/messages/:msg_id
//Description:  Get message by ID
//Access:       Private
router.get('/:msg_id', authentication, async (req, res) => {
  try {
    const message = await Message.findById(req.params.msg_id);
    if (!message) {
      return res.status(404).json({ msg: 'We could not find your message..' });
    }
    res.json(message);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'We could not find your message..' });
    }
    res.status(500).send('Server Error');
  }
});

//Route:        DELETE api/messages/:msg_id
//Description:  Delete message by ID
//Access:       Private
router.delete('/:msg_id', authentication, async (req, res) => {
  try {
    const message = await Message.findById(req.params.msg_id);
    if (!message) {
      return res.status(404).json({ msg: 'We could not find your message..' });
    }

    //Ensure owner of message
    if (message.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ msg: 'You are not authorised to delete this message..' });
    }
    await message.remove();

    res.json({ msg: 'Message Deleted' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'We could not find your message..' });
    }
    res.status(500).send('Server Error');
  }
});

//Route:        PUT api/messages/like/:msg_id
//Description:  Like message by ID
//Access:       Private
router.put('/like/:msg_id', authentication, async (req, res) => {
  try {
    const message = await Message.findById(req.params.msg_id);
    //Verify that user like is unique
    if (
      message.likes.filter(like => like.user.toString() == req.user.id).length >
      0
    ) {
      return res
        .status(400)
        .json({ msg: 'You have already liked this message before..' });
    }
    message.likes.unshift({ user: req.user.id });
    await message.save();
    res.json(message.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//Route:        PUT api/messages/like/:msg_id
//Description:  Unlike message by ID
//Access:       Private
router.put('/unlike/:msg_id', authentication, async (req, res) => {
  try {
    const message = await Message.findById(req.params.msg_id);
    //Verify that user like is unique
    if (
      message.likes.filter(like => like.user.toString() == req.user.id)
        .length === 0
    ) {
      return res
        .status(400)
        .json({ msg: 'You have not liked this message before..' });
    }
    const removeMsgId = message.likes
      .map(like => like.user.toString())
      .indexOf(req.user.id);

    message.likes.splice(removeMsgId, 1);

    await message.save();

    res.json(message.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
