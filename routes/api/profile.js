const express = require('express');
const router = express.Router();

//Access = public
router.get('/', (req, res) => res.json('Profile route'));

module.exports = router;
