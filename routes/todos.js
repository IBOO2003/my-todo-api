import express from "express";

import {
  getAllTodos,
  getTodo,
  createNewTodo,
  createBulk,
  putTodo,
  patchTodoById,
  deleteTodoById,
} from "../controllers/todo.controller.js";

const router = express.Router();

// GET ALL TODOS
router.get("/", getAllTodos);

// GET TODO BY ID
router.get("/:id", getTodo);

// CREATE BULK TODOS
router.post("/bulk", createBulk);

// CREATE TODO
router.post("/", createNewTodo);

// PUT TODO
router.put("/:id", putTodo);

// PATCH TODO
router.patch("/:id", patchTodoById);

// DELETE TODO
router.delete("/:id", deleteTodoById);

export default router;
