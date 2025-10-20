import Document from "../models/Document.js";

export async function createDocument({ title, rawText, ownerId }) {
  return Document.create({ title, rawText, ownerId });
}

export async function findDocumentById(id) {
  return Document.findById(id);
}
