const mongoose=  require("mongoose");

const kpiSchema = new mongoose.Schema({
  surveysCompleted: { type: Number, default: 0 },
  surveysGrowth: { type: String, default: "0%" },

  uniqueSpecies: { type: Number, default: 0 },
  speciesGrowth: { type: String, default: "0%" },

  otolithImages: { type: Number, default: 0 },
  otolithGrowth: { type: String, default: "0%" },

  ednaMatches: { type: Number, default: 0 },
  ednaGrowth: { type: String, default: "0%" },

  updatedAt: { type: Date, default: Date.now }
});

// Allow only one KPI document in DB (optional but recommended)
module.exports=  mongoose.model("KPI", kpiSchema);


