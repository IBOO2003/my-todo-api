import express from "express";

import {
  getAllTodos,
  createNewTodo,
  patchTodoById,
  putTodoById,
  deleteTodoById,
} from "../controllers/todo.controller.js";
import { requireAuth } from "../midllewares/auth.middlewares.js";

const router = express.Router();

router.get("/", requireAuth, getAllTodos);
router.post("/", requireAuth, createNewTodo);
router.patch("/:id", requireAuth, patchTodoById);
router.put("/:id", requireAuth, putTodoById);
router.delete("/:id", requireAuth, deleteTodoById);
export default router;
