const mongoose = require("mongoose");

const marineLogSchema = new mongoose.Schema({
  scientificName: String, // e.g., Sardinella longiceps
  commonName: String,     // e.g., Oil Sardine
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number] // [Longitude, Latitude]
  },
  depth: Number,
  temperature: Number,
  salinity: Number,
  abundance: Number,
  season: String,         // e.g., "Pre-monsoon"
  timestamp: { type: Date, default: Date.now }
});

// IMPORTANT: Geospatial Index for map queries
marineLogSchema.index({ location: '2dsphere' });

module.exports = mongoose.model("MarineLog", marineLogSchema);