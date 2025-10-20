import multer from "multer";

const maxMb = parseInt(process.env.MAX_UPLOAD_MB || "10", 10);
const limits = { fileSize: maxMb * 1024 * 1024 };

function fileFilter(req, file, cb) {
  // נקבל רק PDF
  if (
    file.mimetype === "application/pdf" ||
    file.originalname.toLowerCase().endsWith(".pdf")
  ) {
    return cb(null, true);
  }
  cb(new Error("Only PDF files are allowed"));
}

export const uploadPdf = multer({
  storage: multer.memoryStorage(),
  limits,
  fileFilter,
});
