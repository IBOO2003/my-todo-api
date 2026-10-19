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

    const userId = req.user?.id;

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

  // 1. Validate todo ID
  if (!Number.isInteger(todoId) || todoId <= 0) {
    return res.status(400).json({
      message: "ID must be a positive integer",
    });
  }

  try {
    // 2. Get request body safely
    const todoUpdates = req.body ?? {};

    // 3. Validate request body type
    if (typeof todoUpdates !== "object" || Array.isArray(todoUpdates)) {
      return res.status(400).json({
        message: "Request body must be an object",
      });
    }

    // 4. Reject empty request body
    if (Object.keys(todoUpdates).length === 0) {
      return res.status(400).json({
        message: "Request body cannot be empty",
      });
    }

    // 5. Validate allowed fields
    const allowedFields = ["todoTitle", "description", "isCompleted"];

    const invalidFields = Object.keys(todoUpdates).filter(
      (field) => !allowedFields.includes(field),
    );

    if (invalidFields.length > 0) {
      return res.status(400).json({
        message: "Invalid fields provided",
        invalidFields,
      });
    }

    // 6. Validate field types
    if (
      todoUpdates.todoTitle !== undefined &&
      typeof todoUpdates.todoTitle !== "string"
    ) {
      return res.status(400).json({
        message: "todoTitle must be a string",
      });
    }

    if (
      todoUpdates.description !== undefined &&
      typeof todoUpdates.description !== "string"
    ) {
      return res.status(400).json({
        message: "description must be a string",
      });
    }

    if (
      todoUpdates.isCompleted !== undefined &&
      typeof todoUpdates.isCompleted !== "boolean"
    ) {
      return res.status(400).json({
        message: "isCompleted must be a boolean",
      });
    }

    // 7. Get authenticated user ID
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    // 8. Update todo
    const updatedTodo = await patchTodo(todoId, userId, todoUpdates);

    // 9. Check whether todo exists
    if (!updatedTodo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    // 10. Return updated todo
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

  // 1. Validate ID
  if (!Number.isInteger(todoId) || todoId <= 0) {
    return res.status(400).json({
      message: "ID must be a positive integer",
    });
  }

  try {
    // 2. Validate request body
    const todo = req.body;

    if (!todo || typeof todo !== "object" || Array.isArray(todo)) {
      return res.status(400).json({
        message: "Request body must be an object",
      });
    }

    // 3. Validate required fields
    if (typeof todo.todoTitle !== "string" || todo.todoTitle.trim() === "") {
      return res.status(400).json({
        message: "todoTitle is required and must be a non-empty string",
      });
    }

    if (
      todo.description !== undefined &&
      todo.description !== null &&
      typeof todo.description !== "string"
    ) {
      return res.status(400).json({
        message: "description must be a string or null",
      });
    }

    if (
      todo.isCompleted !== undefined &&
      typeof todo.isCompleted !== "boolean"
    ) {
      return res.status(400).json({
        message: "isCompleted must be a boolean",
      });
    }

    // 4. Check authentication
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    // 5. Update todo
    const updatedTodo = await putTodo(todoId, userId, todo);

    if (!updatedTodo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    // 6. Return updated todo
    return res.status(200).json(updatedTodo);
  } catch (error) {
    console.error("Error updating todo:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
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
