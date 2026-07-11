import { Task } from "../types";

const STORAGE_KEY = "study-planner-tasks";

export function loadTasks(): Task[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Task[]) : [];
  } catch (err) {
    console.error("Failed to parse stored tasks", err);
    return [];
  }
}

export function saveTasks(tasks: Task[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export function seedTasks(): Task[] {
  const isoDaysFromNow = (n: number) => {
    const d = new Date();
    d.setDate(d.getDate() + n);
    return d.toISOString().split("T")[0];
  };

  return [
    {
      id: crypto.randomUUID(),
      title: "Read Ch. 4 — Thermodynamics",
      dueDate: isoDaysFromNow(1),
      priority: "high",
      duration: 45,
      done: false,
      createdAt: Date.now() - 3000,
    },
    {
      id: crypto.randomUUID(),
      title: "Problem set 3",
      dueDate: isoDaysFromNow(3),
      priority: "medium",
      duration: 60,
      done: false,
      createdAt: Date.now() - 2000,
    },
    {
      id: crypto.randomUUID(),
      title: "Flashcards — vocab",
      dueDate: isoDaysFromNow(0),
      priority: "low",
      duration: 20,
      done: false,
      createdAt: Date.now() - 1000,
    },
  ];
}