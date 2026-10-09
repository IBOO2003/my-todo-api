import { eq, asc } from "drizzle-orm";
import { db } from "../db.js";
import { todos } from "../src/schema.js";

export async function getTodos(isCompleted) {
  let query = db.select().from(todos);

  if (isCompleted !== undefined) {
    query = query.where(eq(todos.isCompleted, isCompleted === "true"));
  }

  query = query.orderBy(asc(todos.id));

  return await query;
}

export async function getTodoById(id) {
  const result = await db.select().from(todos).where(eq(todos.id, id));
  return result[0];
}

export async function createTodo(todo) {
  try {
    const result = await db
      .insert(todos)
      .values({
        todoTitle: todo.todo_title,
        description: todo.description,
        isCompleted: todo.is_completed ?? false,
      })
      .returning();

    return result[0];
  } catch (error) {
    console.error("ERROR:", error);
    throw error;
  }
}

export async function patchTodo(id, todo) {
  const result = await db
    .update(todos)
    .set({
      todoTitle: todo.todoTitle,
      isCompleted: todo.is_completed,
      description: todo.description,
    })
    .where(eq(todos.id, id))
    .returning();

  return result[0];
}
export async function putTodo(id, todo) {
  const result = await db
    .update(todos)
    .set({
      todoTitle: todo.todo_title,
      description: todo.description,
      isCompleted: todo.is_completed,
    })
    .where(eq(todos.id, id))
    .returning();

  return result[0];
}

export async function deleteTodo(id) {
  const result = await db.delete(todos).where(eq(todos.id, id)).returning();

  return result[0];
}
