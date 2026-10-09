import express from "express";

import {
  getAllTodos,
  getTodo,
  createNewTodo,
  patchTodoById,
  putTodoById,
  deleteTodoById,
} from "../controllers/todo.controller.js";

const router = express.Router();

router.get("/", getAllTodos);
router.get("/:id", getTodo);
router.post("/", createNewTodo);
router.patch("/:id", patchTodoById);
router.put("/:id", putTodoById);
router.delete("/:id", deleteTodoById);
export default router;
