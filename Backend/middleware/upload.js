const multer = require("multer");
const fs = require("fs");

const UPLOAD_FOLDER = "static/uploads";
fs.mkdirSync(UPLOAD_FOLDER, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_FOLDER),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({ storage });

module.exports = upload;
