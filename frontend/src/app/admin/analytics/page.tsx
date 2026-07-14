"use client";

import { useCallback, useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { getErrorMessage } from "@/lib/api";
import * as analyticsService from "@/services/analytics.service";
import type { AnalyticsOverview } from "@/types/api";

export default function AdminAnalyticsPage() {
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
      setError(getErrorMessage(err, "Failed to load analytics"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const maxCount = overview
    ? Math.max(...overview.stageBreakdown.map((s) => s.count), 1)
    : 1;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-black">Analytics Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            Detailed breakdown of CRM activity
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg px-4 py-3">
            {error}
          </div>
        )}

        {loading ? (
          <p className="text-sm text-gray-500">Loading analytics...</p>
        ) : overview ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <p className="text-sm text-gray-500">Users</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {overview.users}
                </p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <p className="text-sm text-gray-500">Leads</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {overview.leads}
                </p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <p className="text-sm text-gray-500">Tasks</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {overview.tasks}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Pipeline stage breakdown
              </h2>
              {overview.stageBreakdown.length === 0 ? (
                <p className="text-sm text-gray-500">No leads in pipeline yet.</p>
              ) : (
                <div className="space-y-4">
                  {overview.stageBreakdown.map((item) => (
                    <div key={item.stage}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="capitalize text-gray-700">
                          {item.stage}
                        </span>
                        <span className="font-medium text-gray-900">
                          {item.count}
                        </span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600 rounded-full"
                          style={{
                            width: `${(item.count / maxCount) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        ) : null}
      </div>
    </AdminLayout>
  );
}
