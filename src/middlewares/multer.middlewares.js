import multer from "multer";
import fs from "fs";
import path from "path";
import url from "url";
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const pathName = path.join(__dirname,"../public/temp");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    fs.mkdirSync(pathName,{recursive:true}),
    cb(null, pathName);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const upload = multer({
  storage,
});
