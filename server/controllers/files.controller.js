import { createDocument } from "../services/documents.service.js";
import { extractTextFromPdf } from "../services/pdf.service.js";

export async function uploadPdfAndCreateDoc(req, res, next) {
  try {
    if (!req.file?.buffer) {
      return res.status(400).json({ ok: false, error: "Missing PDF file" });
    }

    const maxChars = parseInt(process.env.MAX_DOC_CHARS || "35000", 10);
    const { text, meta } = await extractTextFromPdf(req.file.buffer, maxChars);

    if (!text || text.length < 20) {
      return res.status(422).json({
        ok: false,
        error:
          "לא נמצא טקסט קריא ב-PDF (יכול להיות שזו סריקה/תמונה). נסה קובץ אחר או הדבק טקסט ידנית.",
      });
    }

    const title =
      req.file.originalname?.replace(/\.pdf$/i, "") || "Uploaded PDF";
    const doc = await createDocument({
      title,
      rawText: text,
      ownerId: req.user?.id, // כשנוסיף Auth זה יתמלא
    });

    res.json({
      ok: true,
      docId: doc._id,
      title: doc.title,
      charCount: doc.charCount,
      meta,
    });
  } catch (err) {
    next(err);
  }
}

// Fallback: הדבקת טקסט ידנית במקום PDF
export async function pasteTextAndCreateDoc(req, res, next) {
  try {
    const { title = "Pasted Text", rawText = "" } = req.body || {};
    const maxChars = parseInt(process.env.MAX_DOC_CHARS || "35000", 10);
    const clean = (rawText || "").toString().trim().slice(0, maxChars);

    if (clean.length < 20) {
      return res
        .status(400)
        .json({ ok: false, error: "נדרש טקסט באורך מינימלי (>= 20 תווים)" });
    }

    const doc = await createDocument({
      title,
      rawText: clean,
      ownerId: req.user?.id,
    });
    res.json({
      ok: true,
      docId: doc._id,
      title: doc.title,
      charCount: doc.charCount,
    });
  } catch (err) {
    next(err);
  }
}
