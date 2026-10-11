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
  try {
    const todo = req.body;

    if (!todo.todo_title) {
      return res.status(400).json({
        message: "todo_title must be a non empty string",
      });
    }
    // if (!todo.description || typeof description !== "string") {
    //   return res.status(400).json({
    //     message: "description must be a non empty string",
    //   });
    // }

    const newTodo = await createTodo(todo);

    res.status(201).json(newTodo);
  } catch (error) {
    console.error("Error creating todo: ", error);
    return res.status(500).json({
      message: "internal server error",
    });
  }
}

export async function patchTodoById(req, res) {
  const todoId = Number(req.params.id);

  if (!Number.isInteger(todoId) || todoId <= 0) {
    return res.status(400).json({
      message: "ID must be a positive integer",
    });
  }

  try {
    const todo = req.body ?? {};

    if (Object.keys(todo).length === 0) {
      return res.status(400).json({
        message: "Request body cannot be empty",
      });
    }

    const updatedTodo = await patchTodo(todoId, todo);

    if (!updatedTodo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    return res.status(200).json(updatedTodo);
  } catch (error) {
    console.error("Error updating todo:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
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
