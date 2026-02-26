export type ColumnType = "backlog" | "in_progress" | "review" | "done";
export type priorityType = "LOW" | "HIGH" | "MEDIUM" | string;
export type Task = {
  id: string;
  title: string;
  description: string;
  priority: priorityType;
  column: ColumnType;
};

// task typs for the app
export type CreateTask = Omit<Task, "id">;
