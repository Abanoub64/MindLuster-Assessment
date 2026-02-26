import { useUIStore } from "../store/useUIStore";
import { useTaskQuery } from "./useTaskQuery";

export const useGroupedTasks = () => {
  const { searchTerm } = useUIStore();
  const { data: tasks = [] } = useTaskQuery();
  // Filter tasks by title or description (Assessment Requirement)
  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const grouped = {
    backlog: filteredTasks.filter((t) => t.column === "backlog"),
    in_progress: filteredTasks.filter((t) => t.column === "in_progress"),
    review: filteredTasks.filter((t) => t.column === "review"),
    done: filteredTasks.filter((t) => t.column === "done"),
  };

  return grouped;
};
