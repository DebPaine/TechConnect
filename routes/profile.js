const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const request = require('request');
const config = require('config');
const Profile = require('../models/Profile');
const User = require('../models/User');
const Post = require('../models/Post');
const authMiddleware = require('../middleware/auth');

// Access my profile
router.get('/me', authMiddleware, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.userID }).populate('user', [ 'name', 'avatar' ]);
		if (!profile) {
			return res.status(400).json('No profile of the given user exits');
		}
		res.json(profile);
	} catch (err) {
		console.error(err.message);
		res.status(500).json('Server Error');
	}
});

// Get all profiles
router.get('/all', async (req, res) => {
	try {
		const profiles = await Profile.find().populate('user', [ 'name', 'avatar' ]);
		if (!profiles) {
			return res.status(400).json('Profiles not available');
		}
		res.json(profiles);
	} catch (err) {
		console.error(err.message);
		res.status(500).json('Server error');
	}
});

// Get profile by userID (viewing other people's profile)
router.get('/user/:user_id', async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', [ 'name', 'avatar' ]);
		if (!profile) {
			return res.status(400).json('No profile with the given user ID');
		}
		res.json(profile);
	} catch (err) {
		console.error(err.message);
		if (err.kind === 'ObjectId') {
			return res.status(400).json('No profile with the given user ID');
		}
		res.status(500).json('Server error');
	}
});

// Create new profile
router.post(
	'/',
	[
		authMiddleware,
		[ check('status', "Status can't be empty").notEmpty(), check('skills', "Skills can't be empty").notEmpty() ]
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

		// Check if the various profile fields are empty or not, if empty, then don't store in profile object
		const profileFields = {};
		profileFields.user = req.userID;

		company ? (profileFields.company = company) : (profileFields.company = '');
		website ? (profileFields.website = website) : (profileFields.website = '');
		location ? (profileFields.location = location) : (profileFields.location = '');
		bio ? (profileFields.bio = bio) : (profileFields.bio = '');
		status ? (profileFields.status = status) : (profileFields.status = '');
		githubusername ? (profileFields.githubusername = githubusername) : (profileFields.githubusername = '');
		skills
			? (profileFields.skills = Array.isArray(skills)
					? skills
					: skills.split(',').map((skill) => ' ' + skill.trim()))
			: (profileFields.skills = '');
		profileFields.social = {};
		youtube ? (profileFields.social.youtube = youtube) : (profileFields.social.youtube = '');
		twitter ? (profileFields.social.twitter = twitter) : (profileFields.social.twitter = '');
		facebook ? (profileFields.social.facebook = facebook) : (profileFields.social.facebook = '');
		linkedin ? (profileFields.social.linkedin = linkedin) : (profileFields.social.linkedin = '');
		instagram ? (profileFields.social.instagram = instagram) : (profileFields.social.instagram = '');

		try {
			let profile = await Profile.findOne({ user: req.userID });
			// Update profile if profile found
			if (profile) {
				profile = await Profile.findOneAndUpdate({ user: req.userID }, { $set: profileFields }, { new: true });
				return res.json(profile);
			}

			// Create new profile if profile not found
			profile = new Profile(profileFields);

			await profile.save();
			res.json(profile);
		} catch (err) {
			console.error(err.message);
			res.status(500).json('Server error');
		}
	}
);

// Add profile experience
router.put(
	'/experience',
	[
		authMiddleware,
		[
			check('title', "Title can't be empty").notEmpty(),
			check('company', "Company name can't be empty").notEmpty(),
			check('from', "From date can't be empty").notEmpty()
		]
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json(errors);
		}

		const { title, company, location, from, current, to, description } = req.body;

		const newExperience = { title, company, location, from, current, to, description };

		try {
			const profile = await Profile.findOne({ user: req.userID });

			profile.experience.unshift(newExperience);
			await profile.save();

			res.json(profile);
		} catch (err) {
			console.error(err.message);
			res.status(500).json('Server error');
		}
	}
);

//Delete profile experience
router.delete('/experience/:exp_id', authMiddleware, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.userID });

		if (profile.experience.length === 0) {
			return res.status(400).json('No experience present');
		}

		// Deleting the matching experience
		const removeIndex = profile.experience.map((item) => item.id).indexOf(req.params.exp_id);
		// For indexOf method, if wrong id is present, then it returns -1(and keeps deleting the last experience in the array)
		if (removeIndex >= 0) {
			profile.experience.splice(removeIndex, 1);

			await profile.save();
			return res.json(profile);
		}
		res.status(400).json('Experience is not present');
	} catch (err) {
		console.error(err.message);
		if (err.kind === 'ObjectId') {
			return res.status(400).json('Experience is not present');
		}
		res.status(500).json('Server error');
	}
});

// Add profile education
router.put(
	'/education',
	[
		authMiddleware,
		[
			check('school', "School can't be empty").notEmpty(),
			check('degree', "Degree can't be empty").notEmpty(),
			check('fieldofstudy', "Field of study can't be empty").notEmpty(),
			check('from', "From date can't be empty").notEmpty(),
			check('current', "Current status can't be empty").notEmpty()
		]
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json(errors);
		}

		const { school, degree, fieldofstudy, from, current, to, description } = req.body;

		const newEducation = { school, degree, fieldofstudy, from, current, to, description };

		try {
			const profile = await Profile.findOne({ user: req.userID });

			profile.education.unshift(newEducation);
			await profile.save();

			res.json(profile);
		} catch (err) {
			console.error(err.message);
			res.status(500).json('Server error');
		}
	}
);

//Delete profile education
router.delete('/education/:edu_id', authMiddleware, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.userID });

		if (profile.education.length === 0) {
			return res.status(400).json('No education present');
		}

		// Deleting the matching education
		const removeIndex = profile.education.map((item) => item.id).indexOf(req.params.edu_id);
		// For indexOf method, if wrong id is present, then it returns -1(and keeps deleting the last education in the array)
		if (removeIndex >= 0) {
			profile.education.splice(removeIndex, 1);

			await profile.save();
			return res.json(profile);
		}
		res.status(400).json('Education is not present');
	} catch (err) {
		console.error(err.message);
		if (err.kind === 'ObjectId') {
			return res.status(400).json('Education is not present');
		}
		res.status(500).json('Server error');
	}
});

// Delete posts, profile and user
router.delete('/', authMiddleware, async (req, res) => {
	try {
		// Delete user's posts
		await Post.deleteMany({ user: req.userID });

		// Delete profile
		await Profile.findOneAndDelete({ user: req.userID });

		// Delete user
		await User.findOneAndDelete({ _id: req.userID });

		res.json('User deleted');
	} catch (err) {
		console.error(err.message);
		res.status(500).json('Server error');
	}
});

//Get github repos for profile
router.get('/github/:username', async (req, res) => {
	try {
		const options = {
			url: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`,
			method: 'GET',
			headers: {
				'user-agent': 'node.js',
				Authorization: `token ${process.env.OAUTH-TOKEN}`
			}
		};

		request(options, (error, response, body) => {
			if (error) console.error(error);

			if (response.statusCode !== 200) {
				return res.status(404).json('No Github profile found');
			}

			res.json(JSON.parse(body));
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).json('Server error');
	}
});

module.exports = router;
