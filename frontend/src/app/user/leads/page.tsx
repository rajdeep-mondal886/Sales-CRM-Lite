"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import UserLayout from "@/components/user/UserLayout";
import { getErrorMessage } from "@/lib/api";
import * as leadService from "@/services/lead.service";
import { LEAD_STAGES, type CreateLeadInput, type Lead } from "@/types/api";

const emptyForm: CreateLeadInput = {
  title: "",
  company: "",
  contactEmail: "",
  value: 0,
  stage: "qualified",
};

export default function UserLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [form, setForm] = useState<CreateLeadInput>(emptyForm);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

  const loadLeads = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await leadService.getMyLeads();
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const payload: CreateLeadInput = {
        title: form.title.trim(),
        company: form.company.trim(),
        stage: form.stage,
        value: Number(form.value) || 0,
      };
      if (form.contactEmail?.trim()) {
        payload.contactEmail = form.contactEmail.trim();
      }
      await leadService.createLead(payload);
      setForm(emptyForm);
      setShowForm(false);
      await loadLeads();
    } catch (err) {
      setError(getErrorMessage(err, "Failed to create lead"));
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
            <h1 className="text-3xl font-bold text-black">My Leads</h1>
            <p className="text-sm text-gray-500 mt-1">
              Create and track leads assigned to you
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowForm((v) => !v)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
          >
            {showForm ? "Cancel" : "+ New lead"}
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
            <div>
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
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Company
              </label>
              <input
                className={inputClass}
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Contact email
              </label>
              <input
                type="email"
                className={inputClass}
                value={form.contactEmail ?? ""}
                onChange={(e) =>
                  setForm({ ...form, contactEmail: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Value ($)
              </label>
              <input
                type="number"
                min={0}
                className={inputClass}
                value={form.value ?? 0}
                onChange={(e) =>
                  setForm({ ...form, value: Number(e.target.value) })
                }
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Stage
              </label>
              <select
                className={inputClass}
                value={form.stage}
                onChange={(e) => setForm({ ...form, stage: e.target.value })}
              >
                {LEAD_STAGES.map((stage) => (
                  <option key={stage} value={stage}>
                    {stage}
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
                {submitting ? "Saving..." : "Save lead"}
              </button>
            </div>
          </form>
        )}

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          {loading ? (
            <p className="p-6 text-sm text-gray-500">Loading leads...</p>
          ) : leads.length === 0 ? (
            <p className="p-6 text-sm text-gray-500">
              No leads yet. Create your first lead to get started.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-left text-gray-600">
                  <tr>
                    <th className="px-4 py-3 font-medium">Title</th>
                    <th className="px-4 py-3 font-medium">Company</th>
                    <th className="px-4 py-3 font-medium">Email</th>
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
                      <td className="px-4 py-3 text-gray-500">
                        {lead.contactEmail || "—"}
                      </td>
                      <td className="px-4 py-3 text-gray-700">
                        ${lead.value.toLocaleString()}
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-block px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs capitalize">
                          {lead.stage}
                        </span>
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
    </UserLayout>
  );
}
