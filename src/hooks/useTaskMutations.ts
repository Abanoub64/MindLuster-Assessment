import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateTask, Task } from "../types/task";
import { createTask, deleteTask, updateTask } from "../services/taskApi";

// handling all the mutations for tasks here
// we use optimistic updates so it feels fast when drag and droping
export const useTaskMutations = () => {
  const queryClient = useQueryClient();

  const createTaskMutation = useMutation({
    mutationFn: (data: CreateTask) => createTask(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
  
  //optimistic updates 
  const updateTaskMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Task> }) =>
      updateTask(id, data),

    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });

      const previousTasks = queryClient.getQueryData<Task[]>(["tasks"]);

      queryClient.setQueryData<Task[]>(
        ["tasks"],
        (old) =>
          old?.map((task) => (task.id === id ? { ...task, ...data } : task)) ||
          [],
      );

      return { previousTasks };
    },

    onError: (_err, _variables, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(["tasks"], context.previousTasks);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: (id: string) => deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  return {
    createTask: createTaskMutation.mutate,
    isCreated: createTaskMutation.isPending,

    updateTaskMutation: updateTaskMutation.mutate,
    deleteTask: deleteTaskMutation.mutate,

    isUpdating: updateTaskMutation.isPending,
    isDeleting: deleteTaskMutation.isPending,
  };
};
