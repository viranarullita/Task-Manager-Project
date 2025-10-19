import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

export interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
}

interface TaskContextType {
  tasks: Task[];
  fetchTasks: () => void;
  addTask: (title: string, description?: string) => void;
  toggleTask: (id: number) => void;
  updateTask: (id: number, title: string, description?: string) => void;
  deleteTask: (id: number) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const API_URL = "http://localhost:8000/tasks";

  const fetchTasks = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch tasks");
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error(err);
    }
  };

  const addTask = async (title: string, description?: string) => {
    try {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });
      await fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const toggleTask = async (id: number) => {
    try {
      await fetch(`${API_URL}/${id}/toggle`, { method: "PATCH" });
      await fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const updateTask = async (id: number, title: string, description?: string) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });
      await fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      await fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider
      value={{ tasks, fetchTasks, addTask, toggleTask, updateTask, deleteTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must be used within TaskProvider");
  return context;
};
