import express from 'express';
import { Url } from '../models/Url.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Create URL
router.post('/', auth, async (req, res) => {
  try {
    const { originalUrl, customPath, notes } = req.body;
    
    const existingUrl = await Url.findOne({ customPath });
    if (existingUrl) {
      return res.status(400).json({ message: 'Custom path already taken' });
    }

    const url = new Url({
      originalUrl,
      customPath,
      notes,
      userId: req.user.id,
    });

    await url.save();
    res.status(201).json(url);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's URLs
router.get('/', auth, async (req, res) => {
  try {
    const urls = await Url.find({ userId: req.user.id });
    res.json(urls);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update URL
router.put('/:id', auth, async (req, res) => {
  try {
    const url = await Url.findOne({ _id: req.params.id, userId: req.user.id });
    if (!url) {
      return res.status(404).json({ message: 'URL not found' });
    }

    Object.assign(url, req.body, { lastModified: new Date() });
    await url.save();
    res.json(url);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get URL by custom path (public)
router.get('/redirect/:customPath', async (req, res) => {
  try {
    const url = await Url.findOne({ customPath: req.params.customPath });
    if (!url) {
      return res.status(404).json({ message: 'URL not found' });
    }
    res.json({ originalUrl: url.originalUrl });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export const urlRouter = router;