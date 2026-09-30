import express from "express";
import bodyParser from "body-parser";
import todosRouter from "./routes/todos.js";
// define our app from express
const app = express();

const PORT = 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());
// parse application/json
app.use(bodyParser.json());

app.use("/todos", todosRouter);

app.listen(PORT, "0.0.0.0", () => {
  console.log("APP IS RUNNING ON PORT: 3000");
});

export default app;
