"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { getErrorMessage } from "@/lib/api";
import * as taskService from "@/services/task.service";
import type { Task } from "@/types/api";

function formatDate(value?: string) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export default function AdminFollowupsPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadTasks = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await taskService.getMyTasks();
      setTasks(data);
    } catch (err) {
      setError(getErrorMessage(err, "Failed to load follow-ups"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const followups = useMemo(
    () =>
      tasks
        .filter((t) => !t.isDone && t.dueDate)
        .sort(
          (a, b) =>
            new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime(),
        ),
    [tasks],
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-black">Admin Follow-ups</h1>
          <p className="text-sm text-gray-500 mt-1">
            Your upcoming tasks with due dates
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg px-4 py-3">
            {error}
          </div>
        )}

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          {loading ? (
            <p className="p-6 text-sm text-gray-500">Loading follow-ups...</p>
          ) : followups.length === 0 ? (
            <p className="p-6 text-sm text-gray-500">
              No upcoming follow-ups on your account.
            </p>
          ) : (
            <ul className="divide-y divide-gray-100">
              {followups.map((task) => (
                <li
                  key={task._id}
                  className="px-4 py-4 flex flex-wrap items-start justify-between gap-3"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {task.title}
                    </p>
                    {task.description && (
                      <p className="text-xs text-gray-500 mt-1">
                        {task.description}
                      </p>
                    )}
                  </div>
                  <span className="text-xs font-medium bg-amber-50 text-amber-700 px-2 py-1 rounded-full">
                    Due {formatDate(task.dueDate)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
