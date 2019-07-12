//Required Dependencies
const express = require('express');
const router = express.Router();

//Route:        GET api/messages
//Description:  Test Route
//Access:       Public
router.get('/', (req, res) => res.send('Messages route'));

module.exports = router;
