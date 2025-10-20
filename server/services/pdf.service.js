// server/services/pdf.service.js
import pdfParse from "./pdfParse.cjs";

export async function extractTextFromPdf(buffer, maxChars = 35000) {
  const data = await pdfParse(buffer);
  let text = (data.text || "").trim();

  // נורמליזציה פשוטה
  text = text
    .replace(/\r/g, "")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n");

  if (text.length > maxChars) text = text.slice(0, maxChars);

  return {
    text,
    meta: { pages: data.numpages || undefined, info: data.info || {} },
  };
}
