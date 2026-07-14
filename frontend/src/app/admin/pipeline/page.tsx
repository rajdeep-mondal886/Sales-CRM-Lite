"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { getErrorMessage } from "@/lib/api";
import * as leadService from "@/services/lead.service";
import * as pipelineService from "@/services/pipeline.service";
import { LEAD_STAGES, type Lead, type LeadOwner, type Pipeline } from "@/types/api";

function getOwnerName(owner: Lead["owner"]): string {
  if (typeof owner === "object" && owner !== null && "name" in owner) {
    return (owner as LeadOwner).name;
  }
  return "—";
}

export default function AdminPipelinePage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [pipelines, setPipelines] = useState<Pipeline[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadData = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [leadData, pipelineData] = await Promise.all([
        leadService.getAllLeads(),
        pipelineService.getPipelines(),
      ]);
      setLeads(leadData);
      setPipelines(pipelineData);
    } catch (err) {
      setError(getErrorMessage(err, "Failed to load pipeline"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const stages = useMemo(() => {
    const defaultPipeline = pipelines.find((p) => p.isDefault) ?? pipelines[0];
    if (defaultPipeline?.stages?.length) {
      return [...defaultPipeline.stages]
        .sort((a, b) => a.order - b.order)
        .map((s) => s.name);
    }
    return [...LEAD_STAGES];
  }, [pipelines]);

  const leadsByStage = useMemo(() => {
    const map = new Map<string, Lead[]>();
    for (const stage of stages) map.set(stage, []);
    for (const lead of leads) {
      const list = map.get(lead.stage) ?? [];
      list.push(lead);
      map.set(lead.stage, list);
    }
    return map;
  }, [leads, stages]);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-black">Pipeline Tables</h1>
          <p className="text-sm text-gray-500 mt-1">
            All team leads organized by pipeline stage
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg px-4 py-3">
            {error}
          </div>
        )}

        {loading ? (
          <p className="text-sm text-gray-500">Loading pipeline...</p>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-2">
            {stages.map((stage) => {
              const stageLeads = leadsByStage.get(stage) ?? [];
              return (
                <div
                  key={stage}
                  className="min-w-[280px] flex-shrink-0 bg-white rounded-xl border border-gray-100 shadow-sm"
                >
                  <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="text-sm font-semibold capitalize text-gray-800">
                      {stage}
                    </h2>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                      {stageLeads.length}
                    </span>
                  </div>
                  <div className="p-3 space-y-2 min-h-[120px]">
                    {stageLeads.length === 0 ? (
                      <p className="text-xs text-gray-400 text-center py-4">
                        No leads
                      </p>
                    ) : (
                      stageLeads.map((lead) => (
                        <div
                          key={lead._id}
                          className="border border-gray-100 rounded-lg p-3 bg-gray-50"
                        >
                          <p className="text-sm font-medium text-gray-900">
                            {lead.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {lead.company}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {getOwnerName(lead.owner)}
                          </p>
                          <p className="text-xs text-blue-600 mt-2">
                            ${lead.value.toLocaleString()}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
