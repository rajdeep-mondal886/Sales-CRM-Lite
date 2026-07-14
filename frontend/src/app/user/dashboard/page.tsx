"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import UserLayout from "@/components/user/UserLayout";
import { getErrorMessage } from "@/lib/api";
import * as leadService from "@/services/lead.service";
import * as taskService from "@/services/task.service";
import type { Lead, Task } from "@/types/api";

function StatCard({
  label,
  value,
  href,
}: {
  label: string;
  value: number;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:border-blue-200 transition"
    >
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
    </Link>
  );
}

export default function UserDashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadData = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [leadData, taskData] = await Promise.all([
        leadService.getMyLeads(),
        taskService.getMyTasks(),
      ]);
      setLeads(leadData);
      setTasks(taskData);
    } catch (err) {
      setError(getErrorMessage(err, "Failed to load dashboard"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const pendingTasks = useMemo(
    () => tasks.filter((t) => !t.isDone).length,
    [tasks],
  );

  const upcomingFollowups = useMemo(
    () =>
      tasks.filter(
        (t) => !t.isDone && t.dueDate && new Date(t.dueDate) >= new Date(),
      ).length,
    [tasks],
  );

  const pipelineValue = useMemo(
    () => leads.reduce((sum, lead) => sum + (lead.value || 0), 0),
    [leads],
  );

  return (
    <UserLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-black">User Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            Overview of your leads and tasks
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg px-4 py-3">
            {error}
          </div>
        )}

        {loading ? (
          <p className="text-sm text-gray-500">Loading dashboard...</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard label="Total leads" value={leads.length} href="/user/leads" />
              <StatCard
                label="Pending tasks"
                value={pendingTasks}
                href="/user/tasks"
              />
              <StatCard
                label="Upcoming follow-ups"
                value={upcomingFollowups}
                href="/user/followups"
              />
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <p className="text-sm text-gray-500">Pipeline value</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  ${pipelineValue.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Recent leads
              </h2>
              {leads.length === 0 ? (
                <p className="text-sm text-gray-500">No leads yet.</p>
              ) : (
                <ul className="divide-y divide-gray-100">
                  {leads.slice(0, 5).map((lead) => (
                    <li
                      key={lead._id}
                      className="py-3 flex items-center justify-between gap-4"
                    >
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {lead.title}
                        </p>
                        <p className="text-xs text-gray-500">{lead.company}</p>
                      </div>
                      <span className="text-xs capitalize bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
                        {lead.stage}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        )}
      </div>
    </UserLayout>
  );
}
