import mongoose from "mongoose";

export async function connectDB(uri) {
  if (!uri) throw new Error("MONGO_URI is missing");
  mongoose.set("strictQuery", true);

  try {
    await mongoose.connect(uri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 15000,
    });
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }

  process.on("SIGINT", async () => {
    await mongoose.connection.close();
    console.log("MongoDB disconnected on app termination");
    process.exit(0);
  });
}
