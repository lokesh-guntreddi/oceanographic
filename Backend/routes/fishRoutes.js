const express = require("express");
const upload = require("../middleware/upload.js");
const { uploadFishImage, exportPDF } = require("../controllers/fishController.js");
// const { exportPDF } = require("../controllers/fishController.js");


const router = express.Router();
router.post("/export", exportPDF);
router.post("/upload", upload.single("image"), uploadFishImage);


module.exports = router;
