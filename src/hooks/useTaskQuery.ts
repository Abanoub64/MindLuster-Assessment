import { useQuery } from "@tanstack/react-query";
import type { Task } from "../types/task";
import { getTasks } from "../services/taskApi";

export const useTaskQuery = () => {
  return useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });
};
