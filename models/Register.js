const mongoose = require('mongoose');

const RegisterSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	avatar: String,
	date: {
		type: Date,
		default: Date.now
	}
});

const Register = mongoose.model('register', RegisterSchema);

module.exports = Register;
