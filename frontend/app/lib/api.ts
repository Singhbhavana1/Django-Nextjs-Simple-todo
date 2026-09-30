import type { Todo } from "../src/types/todo";

const API_URL = "https://django-nextjs-simple-todo.onrender.com/api";
export async function getTodos(): Promise<Todo[]> {
  const response = await fetch(`${API_URL}/todo/`);

  if (!response.ok) {
    throw new Error("Failed to fetch todos");
  }

  return response.json();
}

export async function createTodo(
  title: string
): Promise<Todo> {
  const response = await fetch(`${API_URL}/todo/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      completed: false,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create todo");
  }

  return response.json();
}

export async function updateTodo(
  id: number,
  data: Partial<Todo>
): Promise<Todo> {
  const response = await fetch(`${API_URL}/todo/${id}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update todo");
  }

  return response.json();
}

export async function deleteTodo(
  id: number
): Promise<void> {
  const response = await fetch(`${API_URL}/todo/${id}/`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete todo");
  }
}