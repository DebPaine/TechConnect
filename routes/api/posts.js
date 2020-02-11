const express = require('express');
const router = express.Router();

//Access = public
router.get('/', (req, res) => res.json('Posts route'));

module.exports = router;
