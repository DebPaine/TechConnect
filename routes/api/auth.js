const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/auth');
const Register = require('../../models/Register');

router.get('/', authMiddleware, async (req, res) => {
	try {
		const user = await Register.findById(req.userID).select('-password');
		res.json(user);
	} catch (err) {
		console.log(err.message);
		res.status(404).json('User not found');
	}
});

module.exports = router;
