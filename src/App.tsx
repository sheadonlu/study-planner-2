import { useEffect, useState } from "react";
import { Task } from "./types";
import { loadTasks, saveTasks, seedTasks } from "./lib/storage";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import PlanPanel from "./components/PlanPanel";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Load from localStorage on first render; fall back to seed data if empty
  useEffect(() => {
    const stored = loadTasks();
    setTasks(stored.length > 0 ? stored : seedTasks());
  }, []);

  // Persist to localStorage any time tasks change
  useEffect(() => {
    if (tasks.length > 0) saveTasks(tasks);
  }, [tasks]);

  function toggleDone(id: string) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }

  function addTask(task: Task) {
    setTasks((prev) => [...prev, task]);
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
    <div style={{ fontFamily: "sans-serif", padding: "2rem" }}>
      <h1>Optimized Study Planner</h1>

      <TaskForm onAdd={addTask} />

      <TaskList
        tasks={tasks}
        onToggleDone={toggleDone}
        onDelete={deleteTask}
        onEdit={editTask}
      />

      <PlanPanel tasks={tasks} />
    </div>
  );
}

export default App;