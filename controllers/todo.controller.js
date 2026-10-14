// import { isNull } from "drizzle-orm";
import {
  getTodos,
  createTodo,
  patchTodo,
  putTodo,
  deleteTodo,
} from "../services/todo.service.js";
import { getAllUserEmails } from "../services/users.service.js";

export async function getUserEmails(req, res) {
  try {
    const emails = await getAllUserEmails();
    return res.status(200).json(emails);
  } catch (error) {
    console.error("error fetching user emails: ", error);
    return res.status(500).json({
      messaage: "internal server error",
    });
  }
}

export async function getAllTodos(req, res) {
  try {
    const userId = req.user.id; // 👈 Securely grabbed from middleware
    const todos = await getTodos(userId); // 👈 Pass userId to service

    return res.status(200).json(todos);
  } catch (error) {
    console.error("Error fetching todos:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function createNewTodo(req, res) {
  try {
    const { todoTitle, description, isCompleted } = req.body;

    if (typeof todoTitle !== "string" || !todoTitle.trim()) {
      return res.status(400).json({
        message: "todoTitle must be a non-empty string",
      });
    }

    // 1. Get the authenticated user's ID from middleware
    const userId = req.user?.id;

    // 2. Pass everything (including userId) to the service
    const newTodo = await createTodo({
      todoTitle: todoTitle.trim(),
      description,
      isCompleted,
      userId,
    });

    return res.status(201).json(newTodo);
  } catch (error) {
    console.error("Error creating todo:", error);
    return res.status(500).json({
      message: "Internal server error: create new todo",
    });
  }
}

export async function patchTodoById(req, res) {
  const todoId = Number(req.params.id);

  if (!Number.isInteger(todoId) || todoId <= 0) {
    return res.status(400).json({ message: "ID must be a positive integer" });
  }

  try {
    const todoUpdates = req.body ?? {};

    if (Object.keys(todoUpdates).length === 0) {
      return res.status(400).json({ message: "Request body cannot be empty" });
    }

    const userId = req.user.id; //

    const updatedTodo = await patchTodo(todoId, userId, todoUpdates);

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    return res.status(200).json(updatedTodo);
  } catch (error) {
    console.error("Error updating todo:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function putTodoById(req, res) {
  const todoId = Number(req.params.id);

  if (Number.isNaN(todoId)) {
    return res.status(400).json({ message: "ID must be a number" });
  }

  try {
    const userId = req.user.id;
    const updatedTodo = await putTodo(todoId, userId, req.body);
    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    return res.status(200).json(updatedTodo);
  } catch (error) {
    console.error("Error updating todo:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
export async function deleteTodoById(req, res) {
  const todoId = Number(req.params.id);

  if (Number.isNaN(todoId)) {
    return res.status(400).json({ message: "ID must be a number" });
  }

  try {
    const userId = req.user.id;
    const deletedTodo = await deleteTodo(todoId, userId); // 👈 Pass userId

    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    return res.status(200).json(deletedTodo);
  } catch (error) {
    console.error("Error deleting todo:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
