import { isNull } from "drizzle-orm";
import {
  getTodos,
  getTodoById,
  createTodo,
  patchTodo,
  putTodo,
  deleteTodo,
} from "../services/todo.service.js";

export async function getAllTodos(req, res) {
  const isCompleted = req.query.isCompleted;

  const todos = await getTodos(isCompleted);

  res.status(200).json(todos);
}

export async function getTodo(req, res) {
  const todoId = Number(req.params.id);

  if (Number.isNaN(todoId)) {
    return res.status(400).json({
      message: "ID must be a number",
    });
  }

  const todo = await getTodoById(todoId);

  if (!todo) {
    return res.status(404).json({
      message: "ID not found",
    });
  }

  res.status(200).json(todo);
}

export async function createNewTodo(req, res) {
  const todo = req.body;

  if (!todo.todo_title) {
    return res.status(400).json({
      message: "todo_title is required",
    });
  }

  const newTodo = await createTodo(todo);

  res.status(201).json(newTodo);
}

export async function patchTodoById(req, res) {
  const todoId = Number(req.params.id);
  try {
    if (Number.isNaN(todoId)) {
      return res.status(400).json({
        message: "ID must be a number",
      });
    }

    const updatedTodo = await patchTodo(todoId, req.body);

    if (!updatedTodo) {
      return res.status(404).json({
        message: "ID not found",
      });
    }

    if (req.body === isNull) {
      return res.status(400).json({
        message: "",
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "internal server error",
    });
  }

  res.status(200).json(updatedTodo);
}

export async function putTodoById(req, res) {
  const todoId = Number(req.params.id);

  if (Number.isNaN(todoId)) {
    return res.status(400).json({
      message: "ID must be a number",
    });
  }

  const updatedTodo = await putTodo(todoId, req.body);

  if (!updatedTodo) {
    return res.status(404).json({
      message: "ID not found",
    });
  }

  res.status(200).json(updatedTodo);
}
export async function deleteTodoById(req, res) {
  const todoId = Number(req.params.id);
  try {
    if (Number.isNaN(todoId)) {
      return res.status(400).json({
        message: "ID must be a number",
      });
    }

    const deletedTodo = await deleteTodo(todoId);

    if (!deletedTodo) {
      return res.status(404).json({
        message: "ID not found",
      });
    }

    res.status(200).json(deletedTodo);
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
}
