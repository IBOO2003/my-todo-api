import { pgTable, serial, text, boolean, integer } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
});

export const todos = pgTable("todos", {
  id: serial("id").primaryKey(),
  todoTitle: text("todo_title").notNull(),
  description: text("description"),
  isCompleted: boolean("is_completed").default(false),

  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});
