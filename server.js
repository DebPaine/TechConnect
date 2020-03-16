const express = require('express');
const connectDB = require('./config/db');
const user = require('./routes/user');
const auth = require('./routes/auth');
const posts = require('./routes/posts');
const profile = require('./routes/profile');
const path = require('path');

const app = express();

connectDB();

app.use(express.json({ extended: false }));

app.use('/register', user);
app.use('/auth', auth);
app.use('/posts', posts);
app.use('/profile', profile);

// Serve static assets  in production
if (process.env.NODE_ENV === 'production') {
	// Set static folder
	app.use(express.static('frontend/build'));

	app.get('/*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
	});
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
