import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/index.js";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

// CORS
app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || "http://localhost:3000",
}));

app.use(express.json());

// Health check
app.get("/ping", (req, res) => res.json({ ok: true }));

// Routes
app.use("/", routes);

// Error handler (סוף השרשרת)
app.use(errorHandler);

export default app;
