const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv').config();

app.use(express.json());
app.use(cors());
app.use(express.json());   

// Login endpoint
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'mySecret123';
const USERS = {
  u1: { id: 'u1', role: 'user' },
  u2: { id: 'u2', role: 'admin' }
};

app.post('/login', (req, res) => {
  const { id } = req.body;
  const user = USERS[id];
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ id: user.id, role: user.role }, SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// Attach posts routes
app.use('/posts', require('./routes/posts'));

module.exports = app;
