const mongoose = require('mongoose');
const config = require('config');
//gets JSON from default.json, folder name should also be config along with default.json

module.exports = async () => {
	try {
		await mongoose.connect(config.get('mongoURI'), {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false
		});
		console.log('MongoDB connected!');
	} catch (err) {
		console.error('MongoDB not connected');
		process.exit(1);
	}
};
