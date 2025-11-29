const express = require("express");
const router = express.Router();
const axios = require("axios");
const UTIF = require("utif");

router.get("/convert-tiff", async (req, res) => {
  try {
    const { url } = req.query;
    if (!url) {
      return res.status(400).json({ error: "Missing TIFF URL" });
    }

    // Fetch TIFF file
    const response = await axios.get(url, { responseType: "arraybuffer" });

    // Decode TIFF
    const tiffData = new Uint8Array(response.data);
    const ifds = UTIF.decode(tiffData);
    UTIF.decodeImages(tiffData, ifds);

    // Convert first page to RGBA PNG
    const rgba = UTIF.toRGBA8(ifds[0]);

    // PNG encoding using PNGJS
    const { PNG } = require("pngjs");
    const png = new PNG({ width: ifds[0].width, height: ifds[0].height });

    png.data = Buffer.from(rgba);

    // Convert to buffer and send response
    png.pack().pipe(res.type("image/png"));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "TIFF conversion failed", details: err.message });
  }
});

module.exports = router;
