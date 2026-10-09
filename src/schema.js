import { pgTable, serial, text, boolean } from "drizzle-orm/pg-core";

export const todos = pgTable("todos", {
  id: serial("id").primaryKey(),

  todoTitle: text("todo_title").notNull(),

  description: text("description"),

  isCompleted: boolean("is_completed").default(false),
});
