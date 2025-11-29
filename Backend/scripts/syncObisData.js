const axios = require('axios');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const MarineLife = require('../models/MarineLife');
const connectDB = require('../config/db');

dotenv.config();

// Configuration
const INDIAN_OCEAN_GEOMETRY = 'POLYGON((68 6, 98 6, 98 36, 68 36, 68 6))';
const TARGET_SPECIES = [
  { scientific: 'Sardinella longiceps', common: 'Oil Sardine' },
  { scientific: 'Rastrelliger kanagurta', common: 'Indian Mackerel' },
  { scientific: 'Katsuwonus pelamis', common: 'Skipjack Tuna' },
  { scientific: 'Pampus argenteus', common: 'Silver Pomfret' }
];

// Helper: Determine season based on month
const getSeason = (dateObj) => {
  if (!dateObj || isNaN(dateObj)) return 'unknown';
  
  const month = dateObj.getMonth(); // 0-11
  if (month >= 5 && month <= 8) return 'monsoon';      // June-Sept
  if (month >= 9 && month <= 11) return 'post-monsoon'; // Oct-Dec
  if (month >= 0 && month <= 1) return 'winter';        // Jan-Feb
  return 'pre-monsoon';                                 // March-May
};

const syncData = async () => {
  try {
    await connectDB();
    console.log("🌊 Starting Data Sync from OBIS...");

    // Optional: Clear old data
    await MarineLife.deleteMany({});
    console.log("🧹 Old data cleared.");

    for (const species of TARGET_SPECIES) {
      console.log(`🎣 Fetching ${species.common}...`);
      
      const url = `https://api.obis.org/v3/occurrence`;
      try {
        const response = await axios.get(url, {
          params: {
            scientificname: species.scientific,
            geometry: INDIAN_OCEAN_GEOMETRY,
            size: 100
          }
        });

        const validRecords = [];

        for (const record of response.data.results) {
          // VALIDATION: Skip records with no date or invalid date strings
          if (!record.eventDate) continue;

          const dateObj = new Date(record.eventDate);
          if (isNaN(dateObj.getTime())) {
            // console.warn(`Skipping invalid date: ${record.eventDate}`);
            continue; 
          }

          validRecords.push({
            scientificName: record.scientificName,
            commonName: species.common,
            location: {
              type: 'Point',
              coordinates: [record.decimalLongitude, record.decimalLatitude]
            },
            depth: record.depth || 0,
            observedDate: dateObj,
            season: getSeason(dateObj),
            apiId: record.id
          });
        }

        if (validRecords.length > 0) {
          await MarineLife.insertMany(validRecords);
          console.log(`✅ Saved ${validRecords.length} records for ${species.common}`);
        } else {
          console.log(`⚠️ No valid data found for ${species.common}`);
        }

      } catch (err) {
        console.error(`❌ Error fetching ${species.common}:`, err.message);
      }
    }

    console.log("🎉 Data Sync Complete!");
    process.exit();

  } catch (error) {
    console.error("❌ Critical Sync Error:", error.message);
    process.exit(1);
  }
};

syncData();