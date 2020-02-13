const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');
//gets JSON from default.json, folder name should also be config along with default.json

module.exports = async () => {
	try {
		await mongoose.connect(db, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true
		});
		console.log('MongoDB connected!');
	} catch (err) {
		console.error('MongoDB not connected');
		process.exit(1);
	}
};
