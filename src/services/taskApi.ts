import axios from "axios";
import type { CreateTask, Task } from "../types/task";

const API_URL = "http://localhost:3000/tasks";

// todo: maybe add try catch later if we have time
const getTasks = async (): Promise<Task[]> => {
  const res = await axios.get(API_URL);
  return res.data;
};
const updateTask = async (id: string, data: Partial<Task>): Promise<Task> => {
  const res = await axios.patch(`${API_URL}/${id}`, data);
  return res.data;
};

const deleteTask = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
const createTask = async (data: CreateTask): Promise<Task> => {
  const res = await axios.post(API_URL, data);
  return res.data;
};

export { createTask, getTasks, updateTask, deleteTask };
