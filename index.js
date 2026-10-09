import express from "express";
import cors from "cors";
import "./db.js";
import bodyParser from "body-parser";
import todosRouter from "./routes/todos.js";

const app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cors());

app.use("/todos", todosRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`APP IS RUNNING ON PORT: ${PORT}`);
});

export default app;
