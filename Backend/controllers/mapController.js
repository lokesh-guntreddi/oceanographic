const MarineLog = require("../models/MarineLog");

const getMapData = async (req, res) => {
  try {
    const { species, season } = req.query;
    let query = {};

    if (species && species !== 'all') {
      query.scientificName = { $regex: species, $options: 'i' };
    }
    
    if (season && season !== 'all') {
      query.season = season;
    }

    const logs = await MarineLog.find(query).limit(500);
    
    // Format for Frontend
    const formatted = logs.map(log => ({
      id: log._id,
      name: log.commonName,
      scientific: log.scientificName,
      lat: log.location.coordinates[1],
      lng: log.location.coordinates[0],
      abundance: log.abundance,
      temperature: log.temperature,
      depth: log.depth,
      populationLevel: log.abundance > 1000 ? 'excellent' : 'moderate'
    }));

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getMapData };