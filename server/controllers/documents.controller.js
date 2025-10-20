import {
  createDocument,
  findDocumentById,
} from "../services/documents.service.js";

export async function createDemoDocument(req, res, next) {
  try {
    const { title = "Demo Doc", rawText = "Hello Mongo!" } = req.body || {};
    const doc = await createDocument({ title, rawText, ownerId: req.user?.id });
    res.json({ ok: true, docId: doc._id, charCount: doc.charCount });
  } catch (err) {
    next(err);
  }
}

export async function getDemoDocumentById(req, res, next) {
  try {
    const doc = await findDocumentById(req.params.id);
    if (!doc) return res.status(404).json({ ok: false, error: "Not found" });
    res.json({ ok: true, doc });
  } catch (err) {
    next(err);
  }
}
