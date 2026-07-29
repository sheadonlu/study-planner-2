import { useState } from "react";
import { PRIORITY_LABEL, Task } from "../types";

interface TaskRowProps {
  task: Task;
  onToggleDone: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, updates: Partial<Task>) => void;
}

function TaskRow({ task, onToggleDone, onDelete, onEdit }: TaskRowProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(task.title);
  const [draftDueDate, setDraftDueDate] = useState(task.dueDate);
  const [draftPriority, setDraftPriority] = useState(task.priority);
  const [draftDuration, setDraftDuration] = useState(String(task.duration));

  function startEdit() {
    setDraftTitle(task.title);
    setDraftDueDate(task.dueDate);
    setDraftPriority(task.priority);
    setDraftDuration(String(task.duration));
    setIsEditing(true);
  }

  function saveEdit() {
    const durationNum = Number(draftDuration);
    onEdit(task.id, {
      title: draftTitle.trim() || task.title,
      dueDate: draftDueDate || task.dueDate,
      priority: draftPriority,
      duration: durationNum > 0 ? durationNum : task.duration,
    });
    setIsEditing(false);
  }

  const priorityColor =
    task.priority === "high"
      ? "bg-red-100 text-red-700"
      : task.priority === "medium"
      ? "bg-amber-100 text-amber-700"
      : "bg-slate-100 text-slate-600";

  if (isEditing) {
    return (
      <li className="flex flex-wrap items-center gap-2 rounded-xl border border-ink/15 bg-surface p-3">
        <input
          type="text"
          value={draftTitle}
          onChange={(e) => setDraftTitle(e.target.value)}
          className="min-w-[8rem] flex-1 rounded-lg border border-ink/15 bg-white px-2 py-1 text-sm"
        />
        <input
          type="date"
          value={draftDueDate}
          onChange={(e) => setDraftDueDate(e.target.value)}
          className="rounded-lg border border-ink/15 bg-white px-2 py-1 text-sm"
        />
        <select
          value={draftPriority}
          onChange={(e) => setDraftPriority(e.target.value as Task["priority"])}
          className="rounded-lg border border-ink/15 bg-white px-2 py-1 text-sm"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <input
          type="number"
          min={1}
          value={draftDuration}
          onChange={(e) => setDraftDuration(e.target.value)}
          className="w-20 rounded-lg border border-ink/15 bg-white px-2 py-1 text-sm"
        />
        <button
          onClick={saveEdit}
          className="rounded-lg bg-ink px-3 py-1 text-sm font-medium text-white hover:bg-ink/90"
        >
          Save
        </button>
        <button
          onClick={() => setIsEditing(false)}
          className="rounded-lg border border-ink/15 px-3 py-1 text-sm text-ink/70 hover:bg-ink/5"
        >
          Cancel
        </button>
      </li>
    );
  }

  return (
    <li className="flex flex-wrap items-center gap-3 rounded-xl border border-ink/10 bg-white p-3">
      <input
        type="checkbox"
        checked={task.done}
        onChange={() => onToggleDone(task.id)}
        className="h-4 w-4"
      />

      <span
        className={`flex-1 text-sm ${
          task.done ? "text-ink/40 line-through" : "text-ink"
        }`}
      >
        {task.title}
      </span>

      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${priorityColor}`}>
        {PRIORITY_LABEL[task.priority]}
      </span>

      <span className="text-xs text-ink/50">{task.duration} min</span>
      <span className="text-xs text-ink/50">due {task.dueDate}</span>

      <button
        onClick={startEdit}
        className="rounded-lg px-2 py-1 text-xs text-ink/60 hover:bg-ink/5"
      >
        Edit
      </button>
      <button
        onClick={() => onDelete(task.id)}
        className="rounded-lg px-2 py-1 text-xs text-red-500 hover:bg-red-50"
      >
        Delete
      </button>
    </li>
  );
}

export default TaskRow;