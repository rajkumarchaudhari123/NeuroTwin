import mongoose from "mongoose";

const ScanSchema = new mongoose.Schema({
  text: String,
  filename: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Scan || mongoose.model("Scan", ScanSchema);
