const express = require('express');
const router = express.Router();
const Settings = require('../models/Settings');

// Helper to get or create settings document
const getSettingsDoc = async () => {
  let settings = await Settings.findOne();
  if (!settings) {
    settings = new Settings();
    await settings.save();
  }
  return settings;
};

// GET settings
router.get('/', async (req, res) => {
  try {
    const settings = await getSettingsDoc();
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT settings
router.put('/', async (req, res) => {
  try {
    const { categories, materials, deliveryPrice } = req.body;
    const settings = await getSettingsDoc();
    
    if (categories) settings.categories = categories;
    if (materials) settings.materials = materials;
    if (deliveryPrice !== undefined) settings.deliveryPrice = deliveryPrice;

    await settings.save();
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
