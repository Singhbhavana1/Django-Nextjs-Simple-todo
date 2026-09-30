"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Todo } from "../src/types/todo";
import { deleteTodo, updateTodo } from "../lib/api";


interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: (completed: boolean) =>
      updateTodo(todo.id, { completed }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteTodo(todo.id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });

  return (
    <div className="group flex items-center gap-4 px-5 py-4 transition hover:bg-slate-50">
      {/* Checkbox */}
      <button
        type="button"
        onClick={() => updateMutation.mutate(!todo.completed)}
        disabled={updateMutation.isPending}
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition ${
          todo.completed
            ? "border-blue-600 bg-blue-600"
            : "border-slate-300 hover:border-blue-500"
        }`}
      >
        {todo.completed && (
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="3"
          >
            <path d="M5 12l4 4L19 6" />
          </svg>
        )}
      </button>

      {/* Todo content */}
      <div className="min-w-0 flex-1">
        <p
          className={`truncate text-sm font-medium ${
            todo.completed
              ? "text-slate-400 line-through"
              : "text-slate-800"
          }`}
        >
          {todo.title}
        </p>

        <p className="mt-1 text-xs text-slate-400">
          {todo.completed ? "Completed" : "Pending"}
        </p>
      </div>

      {/* Delete */}
      <button
        type="button"
        onClick={() => deleteMutation.mutate()}
        disabled={deleteMutation.isPending}
        className="rounded-lg p-2 text-slate-400 opacity-0 transition hover:bg-red-50 hover:text-red-500 group-hover:opacity-100"
        title="Delete task"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path d="M3 6h18" />
          <path d="M8 6V4h8v2" />
          <path d="M19 6l-1 15H6L5 6" />
          <path d="M10 11v6" />
          <path d="M14 11v6" />
        </svg>
      </button>
    </div>
  );
}