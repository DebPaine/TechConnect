const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../../models/User');

router.post(
	'/',
	[
		check('name', 'Name is required').notEmpty().isString(),
		check('email', 'Please include a valid email').isEmail(),
		check('password', 'Please enter a password with 5 or more characters').isLength({ min: 5 })
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		try {
			const { name, email, password } = req.body;
			let userWithEmail = await User.findOne({ email });
			console.log(userWithEmail);
			if (userWithEmail) {
				return res.status(400).json({ error: 'User already exists' });
			}

			const avatar = gravatar.url(email, {
				s: '200',
				r: 'pg',
				d: 'mm'
			});

			const user = new User({
				name,
				password,
				email,
				avatar
			});

			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);

			await user.save();

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
