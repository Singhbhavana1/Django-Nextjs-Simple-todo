"use client";


import { useQuery } from "@tanstack/react-query";
import { getTodos } from "./lib/api";
import TodoForm from "./components/TodoForms";
import TodoList from "./components/TodoList";

export default function Home() {
  const { data: todos = [] } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  const total = todos.length;
  const completed = todos.filter((todo) => todo.completed).length;
  const pending = total - completed;

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M5 12l4 4L19 6" />
              </svg>
            </div>

            <span className="text-lg font-bold tracking-tight text-slate-900">
              TaskFlow
            </span>
          </div>

          <div className="text-sm text-slate-500">
            My Tasks
          </div>
        </div>
      </header>

      {/* Main */}
      <div className="mx-auto max-w-5xl px-5 py-10">
        {/* Heading */}
        <section className="mb-8">
          <p className="mb-2 text-sm font-medium text-blue-600">
            Stay productive
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Good afternoon 👋
          </h1>

          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            Organize your tasks and focus on what matters.
          </p>
        </section>

        {/* Add task */}
        <TodoForm />

        {/* Stats */}
        <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Total Tasks
            </p>

            <p className="mt-2 text-2xl font-bold text-slate-900">
              {total}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Completed
            </p>

            <p className="mt-2 text-2xl font-bold text-green-600">
              {completed}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Pending
            </p>

            <p className="mt-2 text-2xl font-bold text-amber-500">
              {pending}
            </p>
          </div>
        </section>

        {/* Tasks */}
        <section className="mt-10">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                My Tasks
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Keep track of everything you need to accomplish.
              </p>
            </div>

            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
              {pending} pending
            </span>
          </div>

          <TodoList />
        </section>
      </div>
    </main>
  );
}