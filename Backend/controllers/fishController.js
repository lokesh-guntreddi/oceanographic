const { analyzeFishImage } = require("../services/geminiService.js");
const { generateFishPDF } = require( "../services/pdfService.js");

const exportPDF = async (req, res) => {
  try {
    const { analysis } = req.body;

    if (!analysis) {
      return res.status(400).json({ error: "Analysis data missing" });
    }

    const pdfPath = await generateFishPDF(analysis);

    return res.json({
      success: true,
      url: pdfPath,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
 const uploadFishImage = async (req, res) => {
  try {
    console.log("📥 Incoming request for fish upload");

    console.log("➡ req.file =", req.file);

    if (!req.file) {
      console.log("❌ No file uploaded");
      return res.status(400).json({ success: false, error: "No file uploaded" });
    }

    const imagePath = req.file.path.replace(/\\/g, "/");
    console.log("📸 Image saved at:", imagePath);

    const data = await analyzeFishImage(imagePath);

    console.log("📤 Gemini response:", data);

    if (data.error) {
      console.log("❌ Gemini returned error:", data.error);
      return res.status(500).json({ success: false, error: data.error });
    }

    return res.json({
      success: true,
      image_url: "/" + imagePath,
      analysis: data,
    });

  } catch (err) {
    console.log("❌ Server crashed:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {
  uploadFishImage,
  exportPDF,
};

