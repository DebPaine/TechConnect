const express = require('express');
const connectDB = require('./config/db');
const user = require('./routes/api/user');
const auth = require('./routes/api/auth');
const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');

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
