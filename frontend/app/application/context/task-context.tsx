import { useState, useEffect, createContext, useContext } from "react";
import { Task, TaskStatus, TaskPriority } from "../../../../shared/types";
import { customFetch } from "@/lib/api";

type TaskContextType = {
  tasks: Task | null;
  setTasks: React.Dispatch<React.SetStateAction<Task | null>>;
};

const TaskContext = createContext<TaskContextType | null>(null);

export function TaskContextProvider() {
  const [tasks, setTasks] = useState<Task | null>(null);
  const [taskInputs, setTasknputs] = useState<{
    name: string;
    description: string;
    priority: TaskPriority;
    status: TaskStatus;
  }>({
    name: "",
    description: "",
    priority: TaskPriority.LOW,
    status: TaskStatus.TODO,
   });
  async function fetchTask() {}
  async function addTask() {}

  async function deleteTask() {}

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}></TaskContext.Provider>
  );
}

export default function useTask() {
  const context = useContext(TaskContext);
  if (!context)
    throw new Error("useContext must be used inside <TaskContextProvider>");
}
