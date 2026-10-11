CREATE TABLE "todos" (
	"id" serial PRIMARY KEY NOT NULL,
	"todo_title" text NOT NULL,
	"description" text,
	"is_completed" boolean DEFAULT false
);
