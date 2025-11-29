const mongoose = require("mongoose");
const MarineLog = require("../models/MarineLog");
const connectDB = require("../config/db"); // Adjust path if needed
require("dotenv").config();

const sampleData = [
  { scientificName: "Sardinella longiceps", commonName: "Oil Sardine", lat: 15.2993, lng: 74.1240, season: "post-monsoon" },
  { scientificName: "Rastrelliger kanagurta", commonName: "Indian Mackerel", lat: 13.0827, lng: 80.2707, season: "winter" },
  { scientificName: "Katsuwonus pelamis", commonName: "Skipjack Tuna", lat: 10.0, lng: 76.0, season: "pre-monsoon" }
];

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  
  // Generate 50 random points around India
  const logs = [];
  for(let i=0; i<50; i++) {
    const species = sampleData[Math.floor(Math.random() * sampleData.length)];
    logs.push({
      scientificName: species.scientificName,
      commonName: species.commonName,
      location: {
        type: 'Point',
        coordinates: [
          species.lng + (Math.random() - 0.5) * 5, // Randomize location slightly
          species.lat + (Math.random() - 0.5) * 5
        ]
      },
      depth: Math.floor(Math.random() * 100),
      temperature: 26 + Math.random() * 4,
      abundance: Math.floor(Math.random() * 2000),
      season: species.season
    });
  }

  await MarineLog.deleteMany({});
  await MarineLog.insertMany(logs);
  console.log("Data seeded!");
  process.exit();
};

seed();