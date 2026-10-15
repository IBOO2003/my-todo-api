import "dotenv/config";
import express from "express";
import cors from "cors";
import "./db.js";
import bodyParser from "body-parser";
import todosRouter from "./routes/todos.js";
import authRouter from "./routes/auth.js";
import { apiLimiter, authLimiter } from "./midllewares/rateLimit.middleware.js";
import helmet from "helmet";

const app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(express.json({ limit: "15kb" }));
app.use(express.urlencoded({ extended: true, limit: "15kb" }));
app.use("/auth", authLimiter, authRouter);
app.use("/todos", apiLimiter, todosRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`APP IS RUNNING ON PORT: ${PORT}`);
});

export default app;
