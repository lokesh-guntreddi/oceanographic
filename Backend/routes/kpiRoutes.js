const express = require("express");
const{ getKPI } =require("../controllers/kpiController.js");

const router = express.Router();

router.get("/", getKPI);

module.exports = router;