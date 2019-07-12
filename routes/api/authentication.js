//Required Dependencies
const express = require('express');
const router = express.Router();

//Route:        GET api/authentication
//Description:  Test Route
//Access:       Public
router.get('/', (req, res) => res.send('Authentication route'));

module.exports = router;
