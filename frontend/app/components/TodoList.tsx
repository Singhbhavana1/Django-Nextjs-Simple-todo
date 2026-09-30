"use client";

import { useQuery } from "@tanstack/react-query";
import TodoItem from "./TodoItems";
import { getTodos } from "../lib/api";


export default function TodoList() {
  const {
    data: todos = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  if (isLoading) {
    return (
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="flex items-center gap-4 border-b border-slate-100 px-5 py-5 last:border-0"
          >
            <div className="h-5 w-5 animate-pulse rounded-full bg-slate-200" />

            <div className="flex-1">
              <div className="h-4 w-40 animate-pulse rounded bg-slate-200" />
              <div className="mt-2 h-3 w-20 animate-pulse rounded bg-slate-100" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-center">
        <p className="text-sm font-medium text-red-600">
          {error.message}
        </p>
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
          ✓
        </div>

        <h3 className="mt-4 text-sm font-semibold text-slate-800">
          No tasks yet
        </h3>

        <p className="mt-1 text-sm text-slate-400">
          Add your first task and start getting things done.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="border-b border-slate-100 last:border-b-0"
        >
          <TodoItem todo={todo} />
        </div>
      ))}
    </div>
  );
}