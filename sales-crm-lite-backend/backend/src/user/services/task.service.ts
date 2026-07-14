import { Task } from "../../models/task.model";

export const TaskService = {
  createTask: async (userId: string, payload: Record<string, unknown>) => {
    return Task.create({
      ...payload,
      assignedTo: userId,
      dueDate: payload.dueDate ? new Date(String(payload.dueDate)) : undefined
    });
  },

  getMyTasks: async (userId: string) => {
    return Task.find({ assignedTo: userId }).sort({ createdAt: -1 });
  }
};
