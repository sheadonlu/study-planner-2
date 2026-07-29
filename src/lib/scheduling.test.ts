import { optimalStudyOrder, bestTasksForBudget } from "./scheduling";
    import { Task } from "../types";

    const fakeTasks: Task[] = [
        { id: "1", title: "Read Ch. 4", dueDate: "2026-08-01", priority: "high", duration: 45, done: false, createdAt: Date.now() },
        { id: "2", title: "Problem set", dueDate: "2026-08-02", priority: "medium", duration: 30, done: false, createdAt: Date.now() },
        { id: "3", title: "Flashcards", dueDate: "2026-08-01", priority: "low", duration: 15, done: false, createdAt: Date.now() },
        { id: "4", title: "Essay draft", dueDate: "2026-08-03", priority: "high", duration: 90, done: false, createdAt: Date.now() },
        { id: "5", title: "Lab report", dueDate: "2026-08-05", priority: "high", duration: 240, done: false, createdAt: Date.now() },
    ];

    console.log("--- Optimal Study Order (WSPT) ---");
    console.log(optimalStudyOrder(fakeTasks).map(t => `${t.title} (w/p=${(t.priority)})`));

    /*console.log("\n--- Best Tasks for 60-minute Budget (Knapsack) ---");
    console.log(bestTasksForBudget(fakeTasks, 60));*/

    console.log("\n--- Edge case: 20 minute budget, only 'Lab report' has high value ---");
    console.log(bestTasksForBudget(fakeTasks, 20));