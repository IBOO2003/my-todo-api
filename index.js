import express from "express";
import "dotenv/config";
import cors from "cors";
import "./db.js";
import todosRouter from "./routes/todos.js";
import authRouter from "./routes/auth.js";
import helmet from "helmet";

const app = express();

app.set("trust proxy", 1);

// Security middleware
app.use(helmet());
app.use(cors());

// Body parsing with a 15 KB limit
app.use(express.json({ limit: "15kb" }));
app.use(express.urlencoded({ extended: true, limit: "15kb" }));

// Routes
app.use("/auth", authRouter);
app.use("/todos", todosRouter);

// Handle request bodies larger than 15 KB
app.use((err, req, res, next) => {
  if (err.status === 413) {
    return res.status(413).json({
      message: "Request body is too large. Maximum size is 15 KB.",
    });
  }

  next(err);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`APP IS RUNNING ON PORT: ${PORT}`);
});

export default app;
