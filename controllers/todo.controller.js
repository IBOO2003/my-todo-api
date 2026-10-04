import {
  getTodos,
  getTodoById,
  createTodo,
  createBulkTodos,
  updateTodo,
  patchTodo,
  deleteTodo,
  todoExists,
} from "../services/todo.service.js";

export function getAllTodos(req, res) {
  const isCompleted = req.query.isCompleted;

  const todos = getTodos(isCompleted);

  res.status(200).json(todos);
}

export function getTodo(req, res) {
  const todoId = Number(req.params.id);

  if (Number.isNaN(todoId)) {
    return res.status(400).json({
      message: "ID must be a number",
    });
  }

  const todo = getTodoById(todoId);

  if (!todo) {
    return res.status(404).json({
      message: "ID not found",
    });
  }

  res.status(200).json(todo);
}

export function createNewTodo(req, res) {
  const todo = req.body;

  const requiredFields = ["id", "todo_title"];
  const missingRequiredFields = [];

  requiredFields.forEach((field) => {
    if (todo[field] === undefined || todo[field] === null) {
      missingRequiredFields.push(field);
    }
  });

  if (missingRequiredFields.length > 0) {
    return res.status(400).json({
      message: "Missing required fields",
      fields: missingRequiredFields,
    });
  }

  if (typeof todo.id !== "number") {
    return res.status(400).json({
      message: "ID must be a number",
    });
  }

  if (todoExists(todo.id)) {
    return res.status(409).json({
      message: "Todo with this ID already exists",
    });
  }

  const newTodo = createTodo(todo);

  res.status(201).json(newTodo);
}

export function createBulk(req, res) {
  const body = req.body;

  if (!Array.isArray(body)) {
    return res.status(400).json({
      message: "The body must be an array",
    });
  }

  if (body.length === 0) {
    return res.status(400).json({
      message: "The array cannot be empty",
    });
  }

  const requiredFields = ["id", "todo_title"];

  for (const todo of body) {
    for (const field of requiredFields) {
      if (todo[field] === undefined || todo[field] === null) {
        return res.status(400).json({
          message: "Missing required fields",
          field,
        });
      }
    }

    if (typeof todo.id !== "number") {
      return res.status(400).json({
        message: "ID must be a number",
        id: todo.id,
      });
    }
  }

  const ids = body.map((todo) => todo.id);
  const uniqueIds = new Set(ids);

  if (uniqueIds.size !== ids.length) {
    return res.status(409).json({
      message: "Cannot add todos with duplicate IDs",
    });
  }

  for (const todo of body) {
    if (todoExists(todo.id)) {
      return res.status(409).json({
        message: `Todo with ID ${todo.id} already exists`,
      });
    }
  }

  const newTodos = createBulkTodos(body);

  res.status(201).json(newTodos);
}

export function putTodo(req, res) {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({
      message: "ID must be a number",
    });
  }

  const existingTodo = getTodoById(id);

  if (!existingTodo) {
    return res.status(404).json({
      message: "Todo not found",
    });
  }

  const updatedTodo = updateTodo(id, req.body);

  res.status(200).json(updatedTodo);
}

export function patchTodoById(req, res) {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({
      message: "ID must be a number",
    });
  }

  const existingTodo = getTodoById(id);

  if (!existingTodo) {
    return res.status(404).json({
      message: "Todo not found",
    });
  }

  const { id: ignoreId, ...data } = req.body;

  const updatedTodo = patchTodo(id, data);

  res.status(200).json(updatedTodo);
}

export function deleteTodoById(req, res) {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({
      message: "ID must be a number",
    });
  }

  const deletedTodo = deleteTodo(id);

  if (!deletedTodo) {
    return res.status(404).json({
      message: "Todo not found to delete",
    });
  }

  res.status(200).json(deletedTodo);
}
