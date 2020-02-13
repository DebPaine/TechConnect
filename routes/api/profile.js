const express = require('express');
const router = express.Router();
const Profile = require('../../models/Profile');
const authMiddleware = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

// Access my profile
router.get('/me', authMiddleware, async (req, res) => {
	try {
		const profile = await Profile.findOne({ userID: req.userID }).populate('user', [
			'name',
			'avatar'
		]);

		if (!profile) {
			return res.status(400).json('No profile of the given user exits');
		}
		res.json(profile);
	} catch (err) {
		res.status(400).json('Server error');
	}
});

// Create new profile
router.post(
	'/',
	[
		authMiddleware,
		[
			check('status', "Status can't be empty").notEmpty().isString(),
			check('skills', "Skills can't be empty").notEmpty().isString()
		]
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json(errors);
		}
		const {
			company,
			website,
			location,
			bio,
			status,
			githubusername,
			skills,
			youtube,
			facebook,
			twitter,
			instagram,
			linkedin
		} = req.body;

		// Check if the various profile fields are empty or not, if empty, then dont store in profile object
		const profileFields = {};
		profileFields.userID = req.userID;
		if (company) profileFields.company = company;
		if (website) profileFields.website = website;
		if (location) profileFields.location = location;
		if (bio) profileFields.bio = bio;
		if (status) profileFields.status = status;
		if (githubusername) profileFields.githubusername = githubusername;
		if (skills) {
			profileFields.skills = skills.split(',').map((skill) => skill.trim());
		}
		profileFields.social = {};
		if (youtube) profileFields.social.youtube = youtube;
		if (twitter) profileFields.social.twitter = twitter;
		if (facebook) profileFields.social.facebook = facebook;
		if (linkedin) profileFields.social.linkedin = linkedin;
		if (instagram) profileFields.social.instagram = instagram;

		try {
			let profile = await Profile.findOne({ userID: req.userID });
			if (profile) {
				// Update profile
				profile = await Profile.findOneAndUpdate({ userID: req.userID });
			}
		} catch (err) {
			res.status(400).json('Error');
		}
	}
);

module.exports = router;
