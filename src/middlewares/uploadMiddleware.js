const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: process.env.UPLOAD_PATH,
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDFs are allowed!"), false);
  }
};

module.exports = multer({ storage, fileFilter });
