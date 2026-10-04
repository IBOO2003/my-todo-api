let todos = [];

export function getTodos(isCompleted) {
  if (isCompleted === "true") {
    return todos.filter((todo) => {
      return todo.isCompleted === true;
    });
  }

  if (isCompleted === "false") {
    return todos.filter((todo) => {
      return todo.isCompleted === false;
    });
  }

  return todos;
}

export function getTodoById(id) {
  return todos.find((todo) => todo.id === id);
}

export function createTodo(todo) {
  todos.push(todo);

  return todo;
}

export function createBulkTodos(newTodos) {
  todos.push(...newTodos);

  return newTodos;
}

export function updateTodo(id, data) {
  const index = todos.findIndex((todo) => todo.id === id);

  if (index === -1) {
    return null;
  }

  todos[index] = {
    id,
    ...data,
  };

  return todos[index];
}

export function patchTodo(id, data) {
  const index = todos.findIndex((todo) => todo.id === id);

  if (index === -1) {
    return null;
  }

  todos[index] = {
    ...todos[index],
    ...data,
    id,
  };

  return todos[index];
}

export function deleteTodo(id) {
  const index = todos.findIndex((todo) => todo.id === id);

  if (index === -1) {
    return null;
  }

  const deletedTodo = todos.splice(index, 1);

  return deletedTodo[0];
}

export function todoExists(id) {
  return todos.some((todo) => todo.id === id);
}
