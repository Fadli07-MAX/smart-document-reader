"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { API_BASE_URL, getDocuments, parseInvoiceData, type DocumentRow } from "../lib/api";
import { EmptyState } from "./empty-state";
import { LoadingSkeleton } from "./loading-skeleton";
import { StatusBadge } from "./status-badge";

export function DocumentTable() {
  const [documents, setDocuments] = useState<DocumentRow[]>([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const filteredDocuments = documents.filter((document) =>
    document.filename.toLowerCase().includes(query.toLowerCase()),
  );

  useEffect(() => {
    getDocuments()
      .then(setDocuments)
      .catch((err) => {
        setError(err instanceof Error ? err.message : "Failed to load documents.");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="rounded-[22px] border border-white/80 bg-white/85 p-4 shadow-[0_16px_48px_rgba(15,23,42,0.06)] backdrop-blur sm:p-5">
      <div className="flex flex-col gap-4 border-b border-[#E6E9EF] pb-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-[#1F2937]">Document workspace</h2>
          <p className="mt-1 text-sm leading-5 text-[#6B7280]">
            Search saved extractions, review AI summaries, and export structured records.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="search"
            placeholder="Search filename..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="h-10 rounded-[12px] border border-[#E6E9EF] bg-[#F7F8FA] px-3.5 text-sm text-[#1F2937] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#5B7FFF] focus:bg-white focus:ring-4 focus:ring-[#E8EEFF]"
          />
          <a
            href={`${API_BASE_URL}/documents/export/csv`}
            className="inline-flex h-10 items-center justify-center rounded-[12px] border border-[#E6E9EF] bg-white px-4 text-sm font-semibold text-[#4B5563] shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition duration-200 hover:-translate-y-0.5 hover:text-[#111827] hover:shadow-[0_8px_24px_rgba(15,23,42,0.05)] focus:outline-none focus:ring-4 focus:ring-[#E8EEFF]"
          >
            Export CSV
          </a>
        </div>
      </div>

      {loading ? <LoadingSkeleton rows={5} /> : null}

      {error ? (
        <p className="mt-5 rounded-2xl border border-red-200 bg-[#FFE5E5] px-4 py-3 text-sm text-red-800">
          {error}
        </p>
      ) : null}

      {!loading && !error ? (
        <div className="mt-4 grid gap-3">
          {filteredDocuments.map((document) => {
            const data = parseInvoiceData(document.structured_data);

            return (
              <Link
                key={document.id}
                href={`/documents/detail?id=${document.id}`}
                className="group rounded-[18px] border border-[#E6E9EF] bg-white p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#C9D3E5] hover:shadow-[0_14px_34px_rgba(15,23,42,0.07)] focus:outline-none focus:ring-4 focus:ring-[#E8EEFF] sm:p-4"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex min-w-0 items-start gap-3.5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#E8EEFF] to-[#EAF8FF] text-xs font-bold text-[#5B7FFF]">
                      DOC
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="truncate text-base font-semibold text-[#111827] group-hover:text-[#5B7FFF]">
                          {document.filename}
                        </h3>
                        <StatusBadge status={document.status} />
                      </div>
                      <p className="mt-1 text-xs text-[#9CA3AF]">
                        Extracted {formatDate(document.created_at)}
                      </p>
                      <p className="mt-2 max-w-2xl text-sm leading-5 text-[#4B5563]">
                        AI summary: {data.vendor || "Vendor not found"} invoice
                        {data.total ? ` for ${data.total}` : ""}.
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-3 rounded-2xl bg-[#F7F8FA] p-3 sm:grid-cols-3 lg:min-w-[390px]">
                    <SummaryField label="Vendor" value={data.vendor || "Not found"} />
                    <SummaryField label="Total" value={data.total || "Not found"} />
                    <SummaryField label="Confidence" value="96%" />
                  </div>
                </div>
              </Link>
            );
          })}

          {filteredDocuments.length === 0 ? (
            <EmptyState
              title={documents.length === 0 ? "No documents yet" : "No matching documents"}
              description={
                documents.length === 0
                  ? "Upload your first invoice to start extracting structured AI-powered insights."
                  : "Try a different filename search or clear the filter."
              }
            />
          ) : null}
        </div>
      ) : null}
    </section>
  );
}

function SummaryField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium text-[#9CA3AF]">{label}</p>
      <p className="mt-1 truncate text-sm font-semibold text-[#111827]">{value}</p>
    </div>
  );
}

function formatDate(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value || "-";
  }

  return date.toLocaleString();
}
