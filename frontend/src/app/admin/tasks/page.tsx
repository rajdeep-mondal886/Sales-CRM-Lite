"use client";

import { useCallback, useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { getErrorMessage } from "@/lib/api";
import * as analyticsService from "@/services/analytics.service";
import * as taskService from "@/services/task.service";
import type { Task } from "@/types/api";

function formatDate(value?: string) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString();
}

export default function AdminTasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [totalTasks, setTotalTasks] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadData = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [taskData, overview] = await Promise.all([
        taskService.getMyTasks(),
        analyticsService.getOverview(),
      ]);
      setTasks(taskData);
      setTotalTasks(overview.tasks);
    } catch (err) {
      setError(getErrorMessage(err, "Failed to load tasks"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-black">Tasks</h1>
          <p className="text-sm text-gray-500 mt-1">
            Team has {totalTasks} total task{totalTasks !== 1 ? "s" : ""} in the
            system
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg px-4 py-3">
            {error}
          </div>
        )}

        <div className="bg-blue-50 border border-blue-100 text-blue-800 text-sm rounded-lg px-4 py-3">
          Showing tasks assigned to your admin account. A team-wide task list
          is not yet available in the API.
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          {loading ? (
            <p className="p-6 text-sm text-gray-500">Loading tasks...</p>
          ) : tasks.length === 0 ? (
            <p className="p-6 text-sm text-gray-500">
              No tasks assigned to you.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-left text-gray-600">
                  <tr>
                    <th className="px-4 py-3 font-medium">Title</th>
                    <th className="px-4 py-3 font-medium">Description</th>
                    <th className="px-4 py-3 font-medium">Due date</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task) => (
                    <tr key={task._id} className="border-t border-gray-100">
                      <td className="px-4 py-3 font-medium text-gray-900">
                        {task.title}
                      </td>
                      <td className="px-4 py-3 text-gray-500 max-w-xs truncate">
                        {task.description || "—"}
                      </td>
                      <td className="px-4 py-3 text-gray-700">
                        {formatDate(task.dueDate)}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-xs ${
                            task.isDone
                              ? "bg-green-50 text-green-700"
                              : "bg-amber-50 text-amber-700"
                          }`}
                        >
                          {task.isDone ? "Done" : "Pending"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
