const mongoose = require('mongoose');

const MarineLifeSchema = new mongoose.Schema({
  // Identification
  scientificName: { type: String, required: true, index: true },
  commonName: String,
  
  // Geospatial Data (Crucial for Map)
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number] // Format: [Longitude, Latitude]
  },
  
  // Biological & Physical Context
  depth: Number,
  observedDate: Date,
  season: { 
    type: String, 
    enum: ['pre-monsoon', 'monsoon', 'post-monsoon', 'winter'] 
  },
  
  // Metadata
  datasetSource: { type: String, default: 'OBIS/CMLRE' },
  apiId: String // Original ID from OBIS
});

// 2dsphere index allows us to search "find fish within 500km of this point"
MarineLifeSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('MarineLife', MarineLifeSchema);