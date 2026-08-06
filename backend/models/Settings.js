const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
  categories: { type: [String], default: ["Living Room", "Dining", "Office", "Bedroom", "Outdoor"] },
  materials: { type: [String], default: ["Wood", "Oak", "Velvet", "Leather", "Marble", "Glass", "Metal", "Fabric"] },
  deliveryPrice: { type: Number, default: 2500 },
}, { timestamps: true });

module.exports = mongoose.model('Settings', SettingsSchema);
