//Required Dependencies
const express = require('express');
const router = express.Router();

//Route:        GET api/profile
//Description:  Test Route
//Access:       Public
router.get('/', (req, res) => res.send('Profile route'));

module.exports = router;
