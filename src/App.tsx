import { useEffect, useState } from "react";
import { Task } from "./types";
import { loadTasks, saveTasks } from "./lib/storage";
import Hero from "./components/Hero";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import PlanPanel from "./components/PlanPanel";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  // Load from localStorage on first render; fall back to seed data if empty
  useEffect(() => {
    const stored = loadTasks();
    setTasks(stored);
    setHasLoaded(true);
  }, []);

  // Persist to localStorage any time tasks change — but only after the
  // initial load has completed, so we don't overwrite real saved data
  // with an empty array before loadTasks() has had a chance to run.
  useEffect(() => {
    if (hasLoaded) saveTasks(tasks);
  }, [tasks, hasLoaded]);

  function addTask(task: Task) {
    setTasks((prev) => [...prev, task]);
  }

  function toggleDone(id: string) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }

  function deleteTask(id: string) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  function editTask(id: string, updates: Partial<Task>) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-6">
        <Hero
          taskCount={tasks.length}
          doneCount={tasks.filter((t) => t.done).length}
        />

        <main className="flex flex-col gap-8 py-8">
          <TaskForm onAdd={addTask} />

          <TaskList
            tasks={tasks}
            onToggleDone={toggleDone}
            onDelete={deleteTask}
            onEdit={editTask}
          />

          <PlanPanel tasks={tasks} />
        </main>
      </div>
    </div>
  );
}

export default App;