import { PRIORITY_WEIGHT, Task } from "../types";

/**
 * ---------------------------------------------------------------------------
 * 1. Smith's Rule (Weighted Shortest Processing Time first / WSPT)
 * ---------------------------------------------------------------------------
 * Problem: single machine (you), n jobs (tasks), each with a processing time
 * (duration) and a weight (priority). Goal: order the jobs to minimize total
 * WEIGHTED completion time — sum of (weight_j * completion_time_j).
 *
 * Claim: sorting by weight/duration descending is optimal.
 *
 * Proof sketch (exchange argument): take any schedule with an adjacent
 * out-of-order pair (i before j, but w_i/p_i < w_j/p_j). Swapping them leaves
 * every other job's completion time unchanged, and strictly decreases the
 * pair's contribution to the objective by (w_j*p_i - w_i*p_j) > 0. So no
 * optimal schedule can contain an out-of-order adjacent pair — meaning the
 * fully sorted order is the unique local (and therefore global) optimum.
 *
 * This is the weighted generalization of SPT (shortest-processing-time-first,
 * the special case where every weight is equal).
 * ---------------------------------------------------------------------------
 */
export function optimalStudyOrder(taskList: Task[]): Task[] {
  const active = taskList.filter((t) => !t.done && t.duration > 0);

  return [...active].sort((a, b) => {
    const ratioA = PRIORITY_WEIGHT[a.priority] / a.duration;
    const ratioB = PRIORITY_WEIGHT[b.priority] / b.duration;
    return ratioB - ratioA; // descending
  });
}

/**
 * ---------------------------------------------------------------------------
 * 2. 0/1 Knapsack — "I only have N minutes today, what should I do?"
 * ---------------------------------------------------------------------------
 * Problem: given a fixed time budget and a set of tasks each with a duration
 * (weight, in knapsack terms) and a priority (value), choose the subset that
 * maximizes total value without exceeding the budget. Each task is either
 * fully included or excluded (no partial credit for partially studying).
 *
 * Classic DP with optimal substructure:
 *   dp[i][b] = best achievable value using the first i tasks with budget b
 *   dp[i][b] = max(
 *     dp[i-1][b],                                   // skip task i
 *     dp[i-1][b - duration_i] + value_i             // take task i (if it fits)
 *   )
 *
 * This works because the best solution for i tasks and budget b is built
 * entirely out of best solutions to smaller subproblems (optimal
 * substructure) — the same property that makes DP valid for cutting stock,
 * resource allocation, etc.
 * ---------------------------------------------------------------------------
 */
export function bestTasksForBudget(
  taskList: Task[],
  minutesAvailable: number
): { chosen: Task[]; totalValue: number; totalMinutes: number } {
  const active = taskList.filter((t) => !t.done && t.duration > 0);
  const n = active.length;
  const budget = Math.max(0, Math.floor(minutesAvailable));

  // dp[i][b] = max value using first i tasks with budget b
  const dp: number[][] = Array.from({ length: n + 1 }, () =>
    new Array(budget + 1).fill(0)
  );

  for (let i = 1; i <= n; i++) {
    const task = active[i - 1];
    const duration = task.duration; // a task that doesn't fit (duration > budget)
    const value = PRIORITY_WEIGHT[task.priority]; // is simply never eligible to be "taken" below

    for (let b = 0; b <= budget; b++) {
      const skip = dp[i - 1][b];
      const take = b >= duration ? dp[i - 1][b - duration] + value : -Infinity;
      dp[i][b] = Math.max(skip, take);
    }
  }

  // Walk back through the table to recover which tasks were actually chosen
  const chosen: Task[] = [];
  let remaining = budget;
  for (let i = n; i >= 1; i--) {
    if (dp[i][remaining] !== dp[i - 1][remaining]) {
      const task = active[i - 1];
      chosen.push(task);
      remaining -= task.duration;
    }
  }

  return {
    chosen: chosen.reverse(),
    totalValue: dp[n][budget],
    totalMinutes: chosen.reduce((sum, t) => sum + t.duration, 0),
  };
}