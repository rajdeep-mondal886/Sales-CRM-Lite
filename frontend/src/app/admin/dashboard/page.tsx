"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { getErrorMessage } from "@/lib/api";
import * as analyticsService from "@/services/analytics.service";
import type { AnalyticsOverview } from "@/types/api";

function StatCard({
  label,
  value,
  href,
}: {
  label: string;
  value: number;
  href?: string;
}) {
  const content = (
    <>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:border-blue-200 transition block"
      >
        {content}
      </Link>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
      {content}
    </div>
  );
}

export default function AdminDashboardPage() {
  const [overview, setOverview] = useState<AnalyticsOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadData = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await analyticsService.getOverview();
      setOverview(data);
    } catch (err) {
      setError(getErrorMessage(err, "Failed to load dashboard"));
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
          <h1 className="text-3xl font-bold text-black">Admin Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            Team-wide metrics at a glance
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg px-4 py-3">
            {error}
          </div>
        )}

        {loading ? (
          <p className="text-sm text-gray-500">Loading dashboard...</p>
        ) : overview ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                label="Total users"
                value={overview.users}
                href="/admin/users"
              />
              <StatCard
                label="Total leads"
                value={overview.leads}
                href="/admin/leads"
              />
              <StatCard label="Total tasks" value={overview.tasks} href="/admin/tasks" />
              <StatCard
                label="Pipeline stages"
                value={overview.stageBreakdown.length}
                href="/admin/pipeline"
              />
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Leads by stage
              </h2>
              {overview.stageBreakdown.length === 0 ? (
                <p className="text-sm text-gray-500">No stage data yet.</p>
              ) : (
                <ul className="space-y-3">
                  {overview.stageBreakdown.map((item) => (
                    <li
                      key={item.stage}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="capitalize text-gray-700">
                        {item.stage}
                      </span>
                      <span className="font-medium text-gray-900">
                        {item.count}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        ) : null}
      </div>
    </AdminLayout>
  );
}
