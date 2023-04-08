const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

exports.TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp");
exports.UPLOADS_FOLDER = path.resolve(this.TMP_FOLDER, "uploads");

exports.MULTER = {
  storage: multer.diskStorage({
    destination: this.TMP_FOLDER,
    filename(req, file, callback) {
      const fileHash = crypto.randomBytes(10).toString("hex");
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
