import mongoose from "mongoose";
const { Schema, model } = mongoose;

const DocumentSchema = new Schema(
  {
    ownerId: { type: Schema.Types.ObjectId, ref: "User", required: false },
    title: { type: String, required: true },
    rawText: { type: String, required: true },
    charCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

DocumentSchema.pre("save", function (next) {
  this.charCount = (this.rawText || "").length;
  next();
});

export default model("Document", DocumentSchema);
