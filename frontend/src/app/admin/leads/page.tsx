"use client";

import { useCallback, useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { getErrorMessage } from "@/lib/api";
import * as leadService from "@/services/lead.service";
import { LEAD_STAGES, type Lead, type LeadOwner } from "@/types/api";

function getOwnerName(owner: Lead["owner"]): string {
  if (typeof owner === "object" && owner !== null && "name" in owner) {
    return (owner as LeadOwner).name;
  }
  return "—";
}

function getOwnerEmail(owner: Lead["owner"]): string {
  if (typeof owner === "object" && owner !== null && "email" in owner) {
    return (owner as LeadOwner).email;
  }
  return "—";
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const loadLeads = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await leadService.getAllLeads();
      setLeads(data);
    } catch (err) {
      setError(getErrorMessage(err, "Failed to load leads"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadLeads();
  }, [loadLeads]);

  const handleStageChange = async (leadId: string, stage: string) => {
    setUpdatingId(leadId);
    setError("");
    try {
      const updated = await leadService.updateLeadStage(leadId, { stage });
      setLeads((prev) =>
        prev.map((lead) => (lead._id === leadId ? { ...lead, ...updated } : lead)),
      );
    } catch (err) {
      setError(getErrorMessage(err, "Failed to update lead stage"));
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-black">All Leads</h1>
          <p className="text-sm text-gray-500 mt-1">
            View and update pipeline stages across the team
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg px-4 py-3">
            {error}
          </div>
        )}

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          {loading ? (
            <p className="p-6 text-sm text-gray-500">Loading leads...</p>
          ) : leads.length === 0 ? (
            <p className="p-6 text-sm text-gray-500">No leads in the system yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-left text-gray-600">
                  <tr>
                    <th className="px-4 py-3 font-medium">Title</th>
                    <th className="px-4 py-3 font-medium">Company</th>
                    <th className="px-4 py-3 font-medium">Owner</th>
                    <th className="px-4 py-3 font-medium">Value</th>
                    <th className="px-4 py-3 font-medium">Stage</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead._id} className="border-t border-gray-100">
                      <td className="px-4 py-3 font-medium text-gray-900">
                        {lead.title}
                      </td>
                      <td className="px-4 py-3 text-gray-700">{lead.company}</td>
                      <td className="px-4 py-3 text-gray-700">
                        <div>{getOwnerName(lead.owner)}</div>
                        <div className="text-xs text-gray-400">
                          {getOwnerEmail(lead.owner)}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-700">
                        ${lead.value.toLocaleString()}
                      </td>
                      <td className="px-4 py-3">
                        <select
                          className="border border-gray-200 rounded-lg px-2 py-1 text-xs capitalize disabled:opacity-60"
                          value={lead.stage}
                          disabled={updatingId === lead._id}
                          onChange={(e) =>
                            handleStageChange(lead._id, e.target.value)
                          }
                        >
                          {LEAD_STAGES.map((stage) => (
                            <option key={stage} value={stage}>
                              {stage}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-3 text-gray-500 capitalize">
                        {lead.status}
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
