const express = require('express');
const router = express.Router();
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const authMiddleware = require('../middleware/auth');
const User = require('../models/User');

// To see if user exists or not
router.get('/', authMiddleware, async (req, res) => {
	try {
		const user = await User.findById(req.userID).select('-password');
		res.json(user);
	} catch (err) {
		console.log(err.message);
		res.status(404).json('User not found');
	}
});

// To sign in
router.post(
	'/',
	[
		check('email', 'Please enter a valid email').isEmail(),
		check('password', 'Please enter a valid password').notEmpty()
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		try {
			const { email, password } = req.body;
			const user = await User.findOne({ email });
			if (!user) {
				return res.status(401).json('Invalid credentials');
			}

			const result = await bcrypt.compare(password, user.password);
			if (!result) {
				return res.status(401).json('Invalid credentials');
			}

			jwt.sign({ userID: user.id }, config.get('jwtSecret'), { expiresIn: 360000 }, (err, token) => {
				if (err) throw err;
				res.json({ token });
			});
		} catch (err) {
			res.status(400).json('Registration error');
		}
	}
);
module.exports = router;
