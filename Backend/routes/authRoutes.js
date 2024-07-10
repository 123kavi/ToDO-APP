
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 8);
    const user = await User.create({ username, password: hashedPassword });
    const token = jwt.sign({ id: user.id }, 'secretkey');
    res.status(201).send({ user, token });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Registration failed' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user || !await bcrypt.compare(password, user.password)) {
      throw new Error('Invalid credentials');
    }
    const token = jwt.sign({ id: user.id }, 'secretkey');
    res.send({ user, token });
  } catch (error) {
    console.error(error);
    res.status(401).send({ error: 'Login failed' });
  }
});

module.exports = router;
