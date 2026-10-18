import express from "express";
import "dotenv/config";
import cors from "cors";
import helmet from "helmet";

import "./db.js";
import todosRouter from "./routes/todos.js";
import authRouter from "./routes/auth.js";
import { apiLimiter, authLimiter } from "./midllewares/rateLimit.middleware.js";

const app = express();

// Trust Railway reverse proxy for correct client IP detection
app.set("trust proxy", 1);

// Global Security and Parsing Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "15kb" }));
app.use(express.urlencoded({ extended: true, limit: "15kb" }));

// Routes
app.use("/auth", authLimiter, authRouter);
app.use("/todos", apiLimiter, todosRouter);

// Health check endpoint (for deployment platforms)
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// 404 Handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ message: `Cannot ${req.method} ${req.originalUrl}` });
});

// Centralized Error-Handling Middleware
app.use((err, req, res, next) => {
  console.error("Unhandled Application Error:", err);
  res.status(err.status || 500).json({
    message: err.message || "Internal server error",
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`APP IS RUNNING ON PORT: ${PORT}`);
});

export default app;
