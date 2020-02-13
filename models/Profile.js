const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
	userID: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user'
	},
	company: String,
	website: String,
	location: String,
	status: {
		type: String,
		requried: true
	},
	skills: {
		type: [ String ],
		required: true
	},
	bio: String,
	githubusername: String,
	experience: [
		{
			title: {
				type: String,
				required: true
			},
			company: {
				type: String,
				required: true
			},
			location: String,
			from: {
				type: Date,
				required: true
			},
			current: {
				type: Boolean,
				default: false
			},
			to: {
				type: Date,
				required: true
			},
			description: String
		}
	],
	education: [
		{
			school: {
				type: String,
				required: true
			},
			degree: {
				type: String,
				required: true
			},
			fieldofstudy: {
				type: String,
				required: true
			},
			from: {
				type: Date,
				required: true
			},
			current: {
				type: Boolean,
				default: false
			},
			to: {
				type: Date,
				required: true
			},
			description: String
		}
	],
	social: {
		youtube: String,
		twitter: String,
		facebook: String,
		linkedin: String,
		instagram: String
	},
	Date: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('profile', ProfileSchema);
