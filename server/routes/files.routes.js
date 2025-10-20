import { Router } from "express";
import {
  pasteTextAndCreateDoc,
  uploadPdfAndCreateDoc,
} from "../controllers/files.controller.js";
import { uploadPdf } from "../middleware/upload.js";

const router = Router();

// העלאת PDF (field name = "file")
router.post("/upload", uploadPdf.single("file"), uploadPdfAndCreateDoc);

// הדבקת טקסט (JSON)
router.post("/paste", pasteTextAndCreateDoc);

export default router;
