import multer from "multer";

import path from "path";

// CONFIGURATION FOR MULTER
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + path.extname(file.originalname));
  },
});

export const upload = multer({ storage });
