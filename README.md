# 📚 Study Planner

A lightweight, browser-based task manager built for students — but one that
treats scheduling as an optimization problem instead of just sorting by due
date. No account, no backend, no setup beyond `npm install`.

Live App: https://optimized-study-planner.vercel.app/

## 🚀 Tech Stack

* React 18
* TypeScript
* Tailwind CSS
* Vite
* Local Storage API

## 🧠 Under the hood

* **Smith's Rule (WSPT)** — orders your open tasks to minimize total
  weighted completion time, using a classic exchange-argument result from
  deterministic scheduling theory
* **0/1 Knapsack** — given a fixed time budget, picks the subset of tasks
  that maximizes total priority-weighted value without exceeding the
  budget, using dynamic programming

Both are provably-optimal algorithms, not heuristics — see the comments in
`src/lib/scheduling.ts` for the correctness argument behind each one.

## ✨ Features

* ✅ Add tasks with a title, due date, priority level (Low, Medium, High),
  and estimated duration
* 📅 Filter tasks by:
  * All
  * Upcoming
  * Due Today
  * Overdue
  * Completed
* 🔍 Search tasks by title in real time
* ↕️ Sort tasks by:
  * Soonest Due Date
  * Latest Due Date
  * Recently Added
* ✔️ Mark tasks as completed, or edit them inline
* 🗑️ Delete tasks individually
* 🧮 **Optimal study order** — every open task ranked by the order that
  minimizes total weighted completion time
* ⏱️ **Today's plan** — enter how many minutes you actually have, and get
  back the best-value subset of tasks that fits
* 💾 Automatically saves tasks using `localStorage` — no account needed

## 📸 Screenshots

_Add screenshots of the dashboard, search, filtering, and the "Today's
Plan" panel here once deployed._

## 🛠️ Getting Started

Requires [Node.js](https://nodejs.org) 18 or later.

### Clone the repository

```bash
git clone https://github.com/yourusername/study-planner.git
cd study-planner
```

### Install dependencies

```bash
npm install
```

### Run the dev server

```bash
npm run dev
```

Vite will print a local URL (usually `http://localhost:5173`) — open it in
your browser. Changes to any file hot-reload instantly.

### Build for production

```bash
npm run build
```

This runs the TypeScript compiler (`tsc -b`) first, so type errors will
fail the build, then outputs static files to `dist/`, which you can host
anywhere (Vercel, Netlify, GitHub Pages, etc.). Preview the production
build locally with:

```bash
npm run preview
```

### Project structure

```
src/
  types.ts             Task, Priority, and shared type definitions
  lib/
    scheduling.ts       WSPT ordering + knapsack budget solver
    storage.ts          localStorage read/write helpers
  components/
    Hero.tsx            Header, headline, live task-completion stat
    TaskForm.tsx         Add-task form
    TaskList.tsx         Search/filter/sort controls + task list
    TaskRow.tsx          Single task row, including inline edit
    PlanPanel.tsx        Optimal order + today's plan (budget optimizer)
  App.tsx                Wires state + components together
  main.tsx               React entry point
```

## 📖 Usage

### Adding a task

1. Enter a task title.
2. Select a due date.
3. Enter an estimated duration in minutes.
4. Choose a priority.
5. Click **Add task**.

> Task title, due date, and a positive duration are all required.

### Managing tasks

* ✔️ Check the checkbox to mark a task as completed.
* ✏️ Click **Edit** to update a task's title, due date, priority, or
  duration inline.
* 🗑️ Click **Delete** to permanently remove a task.

### Filtering & searching

Use the toolbar above the task list to:

* Search tasks by title
* Filter by status (all / upcoming / due today / overdue / done)
* Sort by due date or recently added

### Planning your time

The **Today's Plan** panel lets you enter how many minutes you have
available and instantly see the optimal subset of tasks to work on, along
with the **Optimal Study Order** panel showing every open task ranked to
minimize total weighted completion time.

## 🔐 Data & privacy

Tasks persist in the browser's `localStorage` under the key
`study-planner-tasks` — this is per-browser and per-device only, never
synced or sent to any server. Clearing your browser data or opening the
app in a different browser/device starts with an empty task list.

## 🌐 Browser Support

Compatible with all modern browsers, including:

* Chrome
* Firefox
* Safari
* Microsoft Edge

## 📄 License

This project is intended for educational and portfolio purposes.
