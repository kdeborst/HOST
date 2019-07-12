//Required Dependencies
const express = require('express');
const router = express.Router();

//Route:        GET api/user
//Description:  Test Route
//Access:       Public
router.get('/', (req, res) => res.send('User route'));

module.exports = router;
