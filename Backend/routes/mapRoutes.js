const express = require("express");
const { getMapData } = require("../controllers/mapController");
const router = express.Router();
const MarineLife = require('../models/MarineLife');
router.get("/data", getMapData);
// GET /api/map/occurrences?species=Sardinella&season=monsoon
router.get('/occurrences', async (req, res) => {
  try {
    const { species, season } = req.query;
    let query = {};

    // Filter by Scientific or Common Name
    if (species && species !== 'all') {
      query.$or = [
        { scientificName: { $regex: species, $options: 'i' } },
        { commonName: { $regex: species, $options: 'i' } }
      ];
    }

    // Filter by Season
    if (season && season !== 'all') {
      query.season = season;
    }

    const data = await MarineLife.find(query).limit(500); // Limit for performance

    // Transform for Frontend Leaflet Map
    const mapPoints = data.map(item => ({
      id: item._id,
      name: item.commonName,
      scientific: item.scientificName,
      lat: item.location.coordinates[1], // Mongo is [Lng, Lat], Leaflet needs [Lat, Lng]
      lng: item.location.coordinates[0],
      depth: item.depth,
      season: item.season,
      // Simulate abundance/health since OBIS often lacks this specific field
      abundance: Math.floor(Math.random() * 500) + 50, 
      populationLevel: 'good' 
    }));

    res.json(mapPoints);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;