import { json } from "body-parser";
import express from "express";

const router = express.Router();

// ---------------------------------------------
let todos = [];

router.get("/", (req, res) => {
  res.json(todos);
});

router.post("/bulk", (req, res) => {
  const body = req.body;
  todos.push(...body);
  res.json({
    message: "Done",
  });
});

router.post("/", (req, res) => {
  const todo = req.body;
  const requiredFields = ["id", "todo_title"];

  const missingRequiredFields = [];

  const temp = {
    name: "Dilshad",
  };

  requiredFields.map((field, index) => {
    if (todo[field] === undefined || todo[field] === null) {
      missingRequiredFields.push(field);
    }
  });

  if (missingRequiredFields.length > 0) {
    res.json({
      message: "Missnig required fields",
      fields: missingRequiredFields,
    });
  }
  todos.push(todo);
  res.status(201).json(todo);
});
router.put("/:name", (req, res) => {
  const name = req.params.name;
  const index = todos.findIndex((todo) => todo.name === name);
  if (index === -1) {
    return res.status(404).json({
      message: "message not found",
    });
  }
  todos[index] = req.body;
  res.json(todos[index]);
});

router.get("/:id", (req, res) => {
  const todoId = Number(req.params.id);
  res.status = 200;
  const getTodoById = todos.filter((todo) => todo.id === todoId);
  console.log(getTodoById);
  res.json(...getTodoById);
});

router.patch("/:id", (req, res) => {
  const id = Number(req.params.id);

  const todo = todos.find((todo) => todo.id === id);

  if (!todo) {
    message = "todo not found";
    return (res.status = 404);
  }
  Object.assign(todo, req.body);

  res.json(todo);
});
router.delete("/:id", (req, res) => {
  try {
    if (todos.length === 0) {
      res.status(404).json({
        message: "No todos found to delete",
      });
    }
    const id = Number(req.params.id);

    const index = todos.find((todo) => todo.id === id);
    if (id === -1) {
      message = "todo not found to delete";
      return (res.status = 404);
    }
    const deleteTodo = todos.splice(index, 1);
    res.json(deleteTodo[0]);
  } catch (error) {
    res.status(500).json({
      message: message || "Internal server error",
    });
  }
});
// ---------------------------------------------

export default router;
