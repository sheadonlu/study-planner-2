export type Priority = "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  dueDate: string; // ISO date string, e.g. "2026-07-08"
  priority: Priority;
  duration: number; // estimated minutes
  done: boolean;
  createdAt: number;
}

export type Filter = "all" | "upcoming" | "today" | "overdue" | "done";
export type SortKey = "dueAsc" | "dueDesc" | "createdDesc";

export const PRIORITY_WEIGHT: Record<Priority, number> = {
  low: 1,
  medium: 2,
  high: 3,
};

export const PRIORITY_LABEL: Record<Priority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
};