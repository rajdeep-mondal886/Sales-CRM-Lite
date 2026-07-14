"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import UserLayout from "@/components/user/UserLayout";
import { getErrorMessage } from "@/lib/api";
import * as leadService from "@/services/lead.service";
import * as taskService from "@/services/task.service";
import type { CreateTaskInput, Lead, Task } from "@/types/api";

const emptyForm: CreateTaskInput = {
  title: "",
  description: "",
  dueDate: "",
  lead: "",
};

function formatDate(value?: string) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString();
}

export default function UserTasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [form, setForm] = useState<CreateTaskInput>(emptyForm);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

  const loadTasks = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [taskData, leadData] = await Promise.all([
        taskService.getMyTasks(),
        leadService.getMyLeads(),
      ]);
      setTasks(taskData);
      setLeads(leadData);
    } catch (err) {
      setError(getErrorMessage(err, "Failed to load tasks"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const payload: CreateTaskInput = {
        title: form.title.trim(),
      };
      if (form.description?.trim()) payload.description = form.description.trim();
      if (form.dueDate) payload.dueDate = form.dueDate;
      if (form.lead) payload.lead = form.lead;
      await taskService.createTask(payload);
      setForm(emptyForm);
      setShowForm(false);
      await loadTasks();
    } catch (err) {
      setError(getErrorMessage(err, "Failed to create task"));
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <UserLayout>
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-black">My Tasks</h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage tasks linked to your leads
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowForm((v) => !v)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
          >
            {showForm ? "Cancel" : "+ New task"}
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg px-4 py-3">
            {error}
          </div>
        )}

        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Title
              </label>
              <input
                className={inputClass}
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Description
              </label>
              <textarea
                className={inputClass}
                rows={3}
                value={form.description ?? ""}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Due date
              </label>
              <input
                type="date"
                className={inputClass}
                value={form.dueDate ?? ""}
                onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Related lead
              </label>
              <select
                className={inputClass}
                value={form.lead ?? ""}
                onChange={(e) => setForm({ ...form, lead: e.target.value })}
              >
                <option value="">None</option>
                {leads.map((lead) => (
                  <option key={lead._id} value={lead._id}>
                    {lead.title} — {lead.company}
                  </option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2 flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-60"
              >
                {submitting ? "Saving..." : "Save task"}
              </button>
            </div>
          </form>
        )}

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          {loading ? (
            <p className="p-6 text-sm text-gray-500">Loading tasks...</p>
          ) : tasks.length === 0 ? (
            <p className="p-6 text-sm text-gray-500">
              No tasks yet. Create one to stay on top of your work.
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
    </UserLayout>
  );
}
