const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
	const token = req.header('x-auth-token');
	if (!token) {
		return res.status(401).json('No token received, authorization denied');
	}
	try {
		const decoded = jwt.verify(token, process.env.jwtSecret);
		req.userID = decoded.userID;
		next();
	} catch (err) {
		res.status(401).json('Please sign in again (session expired)');
	}
};
