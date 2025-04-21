// routes/admin.js

import express from 'express';
import User from '../models/User.js';
import { verifyToken } from '../middleware/auth.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Admin login (for login purpose, to validate the admin)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const admin = await User.findOne({ email, role: 'admin' });
  if (!admin || !(await admin.comparePassword(password))) {
    return res.status(401).json({ msg: 'Login failed' });
  }

  const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token });
});

// Add new user (admin only)
router.post('/add-user', verifyToken, async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const user = new User({ name, email, password, role });
    await user.save();
    res.status(201).json({ msg: 'User added' });
  } catch (err) {
    res.status(400).json({ msg: 'User creation failed', error: err.message });
  }
});

// Get paginated users with search
router.get('/users', verifyToken, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const search = req.query.search || ''; // Get the search query if available

  try {
    const query = {
      name: { $regex: search, $options: 'i' }, // Perform case-insensitive search on `name`
    };

    const totalUsers = await User.countDocuments(query); // Count users matching the search query
    const users = await User.find(query) // Find users matching the search
      .skip((page - 1) * limit)
      .limit(limit)
      .select('name email role'); // Select only the necessary fields

    res.json({
      users,
      totalPages: Math.ceil(totalUsers / limit), // Total pages for pagination
      currentPage: page,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
});

export default router;
