const multer = require("multer");
const path = require("path");

// Configure o local onde os arquivos serão salvos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const time = new Date().getTime();

    cb(null, time + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
