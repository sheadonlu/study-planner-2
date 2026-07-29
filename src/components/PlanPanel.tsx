import { useState } from "react";
import { Task } from "../types";
import { optimalStudyOrder, bestTasksForBudget } from "../lib/scheduling";

interface PlanPanelProps {
  tasks: Task[];
}

function PlanPanel({ tasks }: PlanPanelProps) {
  const [budgetMinutes, setBudgetMinutes] = useState(60);

  const order = optimalStudyOrder(tasks);
  const plan = bestTasksForBudget(tasks, budgetMinutes);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* WSPT — optimal order to work through everything */}
      <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-sm">
        <h2 className="mb-1 text-sm font-semibold uppercase tracking-wide text-ink/60">
          Optimal study order
        </h2>
        <p className="mb-4 text-xs text-ink/40">
          Sorted by priority ÷ duration — minimizes total weighted completion
          time (Smith's Rule / WSPT).
        </p>

        {order.length === 0 ? (
          <p className="py-4 text-sm text-ink/50">
            Nothing to order yet — add a task to see it here.
          </p>
        ) : (
          <ol className="flex flex-col gap-2">
            {order.map((t, i) => (
              <li
                key={t.id}
                className="flex items-center gap-3 rounded-lg bg-surface px-3 py-2 text-sm"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ink text-xs font-medium text-white">
                  {i + 1}
                </span>
                <span className="flex-1 text-ink">{t.title}</span>
                <span className="text-xs text-ink/50">{t.duration} min</span>
              </li>
            ))}
          </ol>
        )}
      </div>

      {/* Knapsack — best subset given a fixed time budget */}
      <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-sm">
        <h2 className="mb-1 text-sm font-semibold uppercase tracking-wide text-ink/60">
          Today's plan
        </h2>
        <p className="mb-4 text-xs text-ink/40">
          Given a time budget, picks the subset of tasks that maximizes
          priority coverage (0/1 knapsack).
        </p>

        <label className="mb-4 flex items-center gap-2 text-sm text-ink/80">
          Minutes available
          <input
            type="number"
            min={0}
            value={budgetMinutes}
            onChange={(e) => setBudgetMinutes(Number(e.target.value))}
            className="w-24 rounded-lg border border-ink/15 bg-surface px-2 py-1 text-sm outline-none focus:border-ink/40"
          />
        </label>

        {plan.chosen.length === 0 ? (
          <p className="py-4 text-sm text-ink/50">
            No tasks fit in that budget yet — try a bigger number or add
            shorter tasks.
          </p>
        ) : (
          <>
            <ul className="mb-4 flex flex-col gap-2">
              {plan.chosen.map((t) => (
                <li
                  key={t.id}
                  className="flex items-center gap-3 rounded-lg bg-surface px-3 py-2 text-sm"
                >
                  <span className="flex-1 text-ink">{t.title}</span>
                  <span className="text-xs text-ink/50">{t.duration} min</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-ink/50">
              Using {plan.totalMinutes} of {budgetMinutes} min · value{" "}
              {plan.totalValue}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default PlanPanel;