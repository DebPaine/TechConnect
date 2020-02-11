const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const Register = require('../../models/Register');

//Access = public
router.post(
	'/',
	[
		check('name', 'Name is required').notEmpty(),
		check('email', 'Please include a valid email').isEmail(),
		check('password', 'Please enter a password with 5 or more characters').isLength({ min: 5 })
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.status(400).json({ errorssss: errors.array() });
		}
		try {
			const { name, email, password } = req.body;

			// finds documents(users) with the email address
			let userEmail = await Register.findOne({ email });
			if (userEmail) {
				res.status(400).json('User already exists');
			}

			const avatar = gravatar.url(email, {
				s: '200',
				r: 'pg',
				d: 'mm'
			});

			// creates instance of model(document),creates new user
			const user = new Register({
				name,
				email,
				password,
				avatar
			});

			//Encrypt password before storing in database
			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);

			await user.save();

			res.json('User registered');
		} catch (err) {
			res.status(400).json('Registration error');
		}
	}
);

module.exports = router;
