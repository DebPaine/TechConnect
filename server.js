const express = require('express');
const connectDB = require('./config/db');
const user = require('./routes/user');
const auth = require('./routes/auth');
const posts = require('./routes/posts');
const profile = require('./routes/profile');

const app = express();

connectDB();

app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.json('This is the root page'));

app.use('/register', user);
app.use('/auth', auth);
app.use('/posts', posts);
app.use('/profile', profile);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
