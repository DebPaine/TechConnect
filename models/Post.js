const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user'
	},
	name: String,
	text: {
		type: String,
		required: true
	},
	avatar: String,
	likes: [
		{
			user: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'user'
			}
		}
	],
	comments: [
		{
			user: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'user'
			},
			text: {
				type: String,
				requried: true
			},
			name: String,
			avatar: String,
			date: {
				type: Date,
				default: Date.now
			}
		}
	],
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('post', postSchema);
