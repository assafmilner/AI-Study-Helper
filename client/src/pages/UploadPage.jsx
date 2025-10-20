import { useState } from "react";

export default function UploadPage() {
  const [docId, setDocId] = useState("");
  const [status, setStatus] = useState("");

  async function onPdfChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const fd = new FormData();
    fd.append("file", file);
    setStatus("מעלה וקולט טקסט...");

    try {
      const res = await fetch("http://localhost:5001/files/upload", {
        method: "POST",
        body: fd,
      });
      const j = await res.json();
      if (!j.ok) throw new Error(j.error || "Upload failed");
      setDocId(j.docId);
      setStatus(`נוצר מסמך: ${j.title} (תווים: ${j.charCount})`);
    } catch (err) {
      setStatus("שגיאה: " + err.message);
    }
  }

  async function onPasteSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value.trim() || "Pasted Text";
    const rawText = form.rawText.value;

    try {
      const res = await fetch("http://localhost:5001/files/paste", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, rawText }),
      });
      const j = await res.json();
      if (!j.ok) throw new Error(j.error || "Paste failed");
      setDocId(j.docId);
      setStatus(`נוצר מסמך: ${j.title} (תווים: ${j.charCount})`);
    } catch (err) {
      setStatus("שגיאה: " + err.message);
    }
  }

  return (
    <div style={{ padding: 24, maxWidth: 720, margin: "0 auto" }}>
      <h2>העלאת PDF או הדבקת טקסט</h2>

      <div style={{ margin: "16px 0" }}>
        <input
          type="file"
          accept="application/pdf,.pdf"
          onChange={onPdfChange}
        />
      </div>

      <form onSubmit={onPasteSubmit}>
        <input
          name="title"
          placeholder="כותרת למסמך (לא חובה)"
          style={{ display: "block", width: "100%", marginBottom: 8 }}
        />
        <textarea
          name="rawText"
          placeholder="הדבק כאן טקסט..."
          rows={8}
          style={{ width: "100%" }}
        />
        <button type="submit" style={{ marginTop: 8 }}>
          צור מסמך מטקסט
        </button>
      </form>

      <p style={{ marginTop: 16 }}>{status}</p>
      {docId && <p>docId: {docId}</p>}
    </div>
  );
}
