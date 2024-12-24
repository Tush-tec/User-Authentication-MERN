import express from 'express';
import Message from '../models/Message.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Create a new message
router.post('/', protect, async (req, res) => {
    try {
        const { content } = req.body;

        // Validation
        if (!content) {
            return res.status(400).json({ error: 'Message content is required' });
        }

        const message = await Message.create({
            sender: req.user.id,
            content,
        });

        res.status(201).json(message);
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ error: 'Failed to send message' });
    }
});

// Get all messages
router.get('/', protect, async (req, res) => {
    try {
        const messages = await Message.find()
            .populate('sender', 'name email') // Populate sender details
            .sort({ createdAt: -1 }); // Sort by most recent messages first

        res.status(200).json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
});

export default router;
