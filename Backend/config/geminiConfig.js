 const GEMINI_MODEL = "gemini-2.5-pro";

 const GEMINI_API_KEY = "AIzaSyAVYi-GAfsB7duSMa3vibknAlsb_sNLHX0";

const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

module.exports = { GEMINI_URL , GEMINI_API_KEY,GEMINI_MODEL };