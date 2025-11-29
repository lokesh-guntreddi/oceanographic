const  KPI = require("../models/KPI.js");

 const getKPI = async (req, res) => {
  try {
    let kpi = await KPI.findOne();

    // If no document exists, create one
    if (!kpi) {
      kpi = await KPI.create({
//   "surveysCompleted": 1247,
//   "surveysGrowth": "+12%",

//   "uniqueSpecies": 8943,
//   "speciesGrowth": "+8%",

//   "otolithImages": 2400,
//   "otolithGrowth": "+6%",

//   "ednaMatches": 320,
//   "ednaGrowth": "+4%"
});
    }

    res.json(kpi);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports = { getKPI };