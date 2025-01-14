function createTodo(
  title,
  details,
  dueDate,
  priority = "none",
  notes,
  todoStatus = "todo",
  project
) {
  return { title, details, dueDate, priority, notes, todoStatus, project };
}

export { createTodo };
