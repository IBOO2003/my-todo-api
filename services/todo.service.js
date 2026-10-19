import { eq, and } from "drizzle-orm";
import { db } from "../db.js";
import { todos } from "../src/schema.js";

export async function getTodos(userId) {
  const result = await db.select().from(todos).where(eq(todos.userId, userId));
  return result;
}

export async function getTodoById(todoId, userId) {
  const result = await db
    .select()
    .from(todos)
    .where(and(eq(todos.id, todoId), eq(todos.userId, userId)));
  return result[0];
}

export async function createTodo(todoData) {
  try {
    const result = await db
      .insert(todos)
      .values({
        todoTitle: todoData.todoTitle,
        description: todoData.description,
        isCompleted: todoData.isCompleted ?? false,
        userId: todoData.userId,
      })
      .returning();

    return result[0];
  } catch (error) {
    console.error("ERROR in createTodo service:", error);
    throw error;
  }
}

export async function patchTodo(id, userId, updates) {
  const fieldsToUpdate = {};

  if (updates.todoTitle !== undefined) {
    fieldsToUpdate.todoTitle = updates.todoTitle;
  }

  if (updates.description !== undefined) {
    fieldsToUpdate.description = updates.description;
  }

  if (updates.isCompleted !== undefined) {
    fieldsToUpdate.isCompleted = updates.isCompleted;
  }

  if (Object.keys(fieldsToUpdate).length === 0) {
    return null;
  }

  const result = await db
    .update(todos)
    .set(fieldsToUpdate)
    .where(and(eq(todos.id, id), eq(todos.userId, userId)))
    .returning();

  return result[0] ?? null;
}

export async function putTodo(id, userId, todo) {
  const result = await db
    .update(todos)
    .set({
      todoTitle: todo.todoTitle,
      description: todo.description,
      isCompleted: todo.isCompleted,
    })
    .where(and(eq(todos.id, id), eq(todos.userId, userId)))
    .returning();

  return result[0] ?? null;
}

// 👈 Added userId and `and()` filter for security
export async function deleteTodo(id, userId) {
  const result = await db
    .delete(todos)
    .where(and(eq(todos.id, id), eq(todos.userId, userId))) // 👈 Dual filter
    .returning();

  return result[0];
}
