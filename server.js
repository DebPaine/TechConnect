const express = require('express');
const db = require('./config/db');

const app = express();

db.connectDB();

app.get('/', (req, res) => res.json('This is the root page'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
