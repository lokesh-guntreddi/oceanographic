const axios = require("axios");
const fs = require("fs");
const { GEMINI_URL } = require("../config/geminiConfig.js");


const prompt = `
You are a marine biology expert.
"Given this fish image, provide the following details in a clear, structured, visually appealing format (like ChatGPT):\n"
        "1. Predict fish name (highlight the name)\n"
        "2. Taxonomy (as a neat bullet list)\n"
        "3. Location (bullets or short paragraph)\n"
        "4. Oceanography details\n"
        "5. Species diversity\n"
        "6. Fish abundance\n"
        "7. Eco morphology\n"
        "8. Otolith morphology\n"
        "9. Life history traits\n\n"
        "Do NOT include eDNA sequences or otolith image sections. Use bold for section titles and highlights. Use Markdown formatting."
Analyze this fish image and return the result STRICTLY in this EXACT JSON format:

{
  "commonName": "",
  "species": "",
  "confidence": 0,
  "family": "",
  "habitat": "",
  "characteristics": [],
  "measurements": {
    "estimatedLength": "",
    "estimatedWeight": "",
    "bodyDepth": ""
  },
  "distribution": "",
  "conservationStatus": "",
  "commercialValue": "",
  "similarSpecies": [
    { "name": "", "confidence": 0 }
  ]
}

RULES:
- Confidence MUST be a number between 0–100
- Measurements MUST be approximate real-world values based on fish morphology
- Characteristics MUST be short descriptions
- Do NOT add markdown
- Do NOT add explanation text
- Reply ONLY with valid JSON
`;

 async function analyzeFishImage(imagePath) {
  try {
    const imgBuffer = fs.readFileSync(imagePath);
    const base64Image = imgBuffer.toString("base64");

    const payload = {
      contents: [
        {
          parts: [
            { text: prompt },
            {
              inline_data: {
                mime_type: "image/jpeg",
                data: base64Image,
              },
            },
          ],
        },
      ],
    };

    const response = await axios.post(GEMINI_URL, payload, {
      headers: { "Content-Type": "application/json" },
    });

    let text = response.data.candidates[0].content.parts[0].text;

    // Try to extract JSON safely
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("JSON not found in Gemini response");

    const result = JSON.parse(jsonMatch[0]);

    return result;

  } catch (err) {
    console.error("Gemini Error:", err);
    return { error: err.message };
  }
}
module.exports =  { analyzeFishImage };