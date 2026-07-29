import { useState } from "react";
import { Priority, Task } from "../types";

interface TaskFormProps {
  onAdd: (task: Task) => void;
}

function TaskForm({ onAdd }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [duration, setDuration] = useState("30");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim()) {
      setError("Give the task a name.");
      return;
    }
    if (!dueDate) {
      setError("Pick a due date.");
      return;
    }
    const durationNum = Number(duration);
    if (!durationNum || durationNum <= 0) {
      setError("Duration needs to be a positive number of minutes.");
      return;
    }

    onAdd({
      id: crypto.randomUUID(),
      title: title.trim(),
      dueDate,
      priority,
      duration: durationNum,
      done: false,
      createdAt: Date.now(),
    });

    // Reset for the next entry
    setTitle("");
    setDueDate("");
    setPriority("medium");
    setDuration("30");
    setError("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-ink/10 bg-white p-6 shadow-sm"
    >
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-ink/60">
        Add a task
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="col-span-full flex flex-col gap-1 text-sm text-ink/80">
          Task
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What's next..."
            className="rounded-lg border border-ink/15 bg-surface px-3 py-2 text-ink outline-none focus:border-ink/40"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm text-ink/80">
          Due date
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="rounded-lg border border-ink/15 bg-surface px-3 py-2 text-ink outline-none focus:border-ink/40"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm text-ink/80">
          Estimated minutes
          <input
            type="number"
            min={1}
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="rounded-lg border border-ink/15 bg-surface px-3 py-2 text-ink outline-none focus:border-ink/40"
          />
        </label>

        <label className="col-span-full flex flex-col gap-1 text-sm text-ink/80 sm:col-span-1">
          Priority
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
            className="rounded-lg border border-ink/15 bg-surface px-3 py-2 text-ink outline-none focus:border-ink/40"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
      </div>

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        className="mt-5 rounded-lg bg-ink px-4 py-2 text-sm font-medium text-white transition hover:bg-ink/90"
      >
        Add task
      </button>
    </form>
  );
}

export default TaskForm;