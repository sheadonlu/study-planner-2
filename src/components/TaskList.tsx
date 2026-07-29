import { useMemo, useState } from "react";
import { Filter, SortKey, Task } from "../types";
import TaskRow from "./TaskRow";

interface TaskListProps {
  tasks: Task[];
  onToggleDone: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, updates: Partial<Task>) => void;
}

function isToday(dateStr: string) {
  const today = new Date().toISOString().split("T")[0];
  return dateStr === today;
}

function isOverdue(dateStr: string, done: boolean) {
  if (done) return false;
  const today = new Date().toISOString().split("T")[0];
  return dateStr < today;
}

function TaskList({ tasks, onToggleDone, onDelete, onEdit }: TaskListProps) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [sortKey, setSortKey] = useState<SortKey>("dueAsc");

  const visibleTasks = useMemo(() => {
    let result = tasks.filter((t) =>
      t.title.toLowerCase().includes(search.toLowerCase())
    );

    switch (filter) {
      case "upcoming":
        result = result.filter((t) => !t.done && !isOverdue(t.dueDate, t.done));
        break;
      case "today":
        result = result.filter((t) => isToday(t.dueDate));
        break;
      case "overdue":
        result = result.filter((t) => isOverdue(t.dueDate, t.done));
        break;
      case "done":
        result = result.filter((t) => t.done);
        break;
      // "all" — no additional filtering
    }

    const sorted = [...result].sort((a, b) => {
      switch (sortKey) {
        case "dueAsc":
          return a.dueDate.localeCompare(b.dueDate);
        case "dueDesc":
          return b.dueDate.localeCompare(a.dueDate);
        case "createdDesc":
          return b.createdAt - a.createdAt;
        default:
          return 0;
      }
    });

    return sorted;
  }, [tasks, search, filter, sortKey]);

  return (
    <div className="rounded-lg border border-ink/10 bg-white p-6">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-ink/60">
        Your tasks
      </h2>

      <div className="mb-4 flex flex-wrap gap-2">
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="min-w-[10rem] flex-1 rounded-lg border border-ink/15 bg-white px-3 py-2 text-sm outline-none focus:border-accent"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as Filter)}
          className="rounded-lg border border-ink/15 bg-white px-3 py-2 text-sm outline-none focus:border-accent"
        >
          <option value="all">All</option>
          <option value="upcoming">Upcoming</option>
          <option value="today">Due today</option>
          <option value="overdue">Overdue</option>
          <option value="done">Done</option>
        </select>

        <select
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value as SortKey)}
          className="rounded-lg border border-ink/15 bg-white px-3 py-2 text-sm outline-none focus:border-accent"
        >
          <option value="dueAsc">Due date (earliest first)</option>
          <option value="dueDesc">Due date (latest first)</option>
          <option value="createdDesc">Recently added</option>
        </select>
      </div>

      {visibleTasks.length === 0 ? (
        <p className="py-6 text-center text-sm text-ink/50">
          No tasks match here — add one above or adjust your filters.
        </p>
      ) : (
        <ul className="flex flex-col gap-2">
          {visibleTasks.map((task) => (
            <TaskRow
              key={task.id}
              task={task}
              onToggleDone={onToggleDone}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;