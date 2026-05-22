"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { EmptyState } from "../../../components/empty-state";
import { LoadingSkeleton } from "../../../components/loading-skeleton";
import { PageHeader } from "../../../components/page-header";
import { ResultCard } from "../../../components/result-card";
import { StatusBadge } from "../../../components/status-badge";
import { WorkspaceNav } from "../../../components/workspace-nav";
import {
  getDocument,
  getDocumentFileUrl,
  parseInvoiceData,
  type DocumentDetail,
} from "../../../lib/api";

export default function DocumentDetailPage() {
  const [document, setDocument] = useState<DocumentDetail | null>(null);
  const [error, setError] = useState("");
  const [fileError, setFileError] = useState("");
  const [openingFile, setOpeningFile] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("id");

    if (!id) {
      setError("Missing document id.");
      setLoading(false);
      return;
    }

    getDocument(id)
      .then(setDocument)
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load document."))
      .finally(() => setLoading(false));
  }, []);

  const invoiceData = parseInvoiceData(document?.structured_data);

  async function openFile() {
    if (!document) {
      return;
    }

    try {
      setOpeningFile(true);
      setFileError("");
      const file = await getDocumentFileUrl(document.id);
      window.open(file.url, "_blank", "noopener,noreferrer");
    } catch (err) {
      setFileError(err instanceof Error ? err.message : "Failed to open file.");
    } finally {
      setOpeningFile(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[1440px] flex-col gap-7 px-5 py-5 sm:px-8 lg:py-7">
      <WorkspaceNav />
      <PageHeader
        eyebrow="AI review workspace"
        title={document?.filename ?? "Document"}
        description="Inspect the original file, extracted fields, structured JSON, and raw AI response in one review surface."
        action={{ href: "/documents", label: "Back to documents" }}
      >
        {document ? (
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <StatusBadge status={document.status} />
            <span className="rounded-full border border-[#E6E9EF] bg-white px-3 py-1.5 text-xs font-semibold text-[#4B5563]">
              96% confidence
            </span>
            <span className="text-sm text-[#9CA3AF]">
              Created {formatDate(document.created_at)}
            </span>
          </div>
        ) : null}
      </PageHeader>

      {loading ? <LoadingSkeleton rows={5} /> : null}

      {error ? (
        <section className="rounded-[24px] border border-[#E6E9EF] bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
          <EmptyState title="Unable to load document" description={error} />
        </section>
      ) : null}

      {document && !loading ? (
        <div className="grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,1fr)]">
          <section className="rounded-[22px] border border-white/80 bg-white/90 p-4 shadow-[0_16px_48px_rgba(15,23,42,0.07)] backdrop-blur lg:sticky lg:top-6 lg:self-start">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold tracking-tight text-[#1F2937]">Document preview</h2>
                <p className="mt-1 text-sm text-[#6B7280]">Original file metadata and OCR response preview.</p>
              </div>
              {document.file_key ? (
                <button
                  type="button"
                  onClick={openFile}
                  disabled={openingFile}
                  className="inline-flex h-11 items-center justify-center rounded-[14px] bg-[#5B7FFF] px-5 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(91,127,255,0.25)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#4A6EF2] disabled:cursor-not-allowed disabled:bg-[#9CA3AF]"
                >
                  {openingFile ? "Opening..." : "Open file"}
                </button>
              ) : (
                <Link
                  href="/documents"
                  className="inline-flex h-11 items-center justify-center rounded-[14px] border border-[#E6E9EF] bg-white px-5 text-sm font-semibold text-[#111827]"
                >
                  Done
                </Link>
              )}
            </div>

            <div className="mt-4 rounded-[20px] border border-[#E6E9EF] bg-gradient-to-b from-white to-[#F3F5F7] p-5">
              <div className="flex min-h-48 flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-[22px] bg-[#E8EEFF] text-lg font-bold text-[#5B7FFF]">
                  DOC
                </div>
                <h3 className="mt-4 max-w-md break-words text-base font-semibold text-[#1F2937]">
                  {document.filename}
                </h3>
                <p className="mt-2 text-sm text-[#4B5563]">
                  {document.mime_type || "Unknown type"} - {formatBytes(document.file_size)}
                </p>
              </div>
            </div>

            {fileError ? (
              <p className="mt-4 rounded-2xl border border-red-200 bg-[#FFE5E5] px-4 py-3 text-sm text-red-800">
                {fileError}
              </p>
            ) : null}

            <div className="mt-4 rounded-[18px] border border-[#E6E9EF] bg-[#F7F8FA] p-3.5">
              <h3 className="text-sm font-semibold text-[#111827]">AI status timeline</h3>
              <div className="mt-3 space-y-2.5">
                {["Upload Complete", "OCR Analysis", "Structuring Data", "Validation Ready"].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm text-[#4B5563]">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#5B7FFF]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <pre className="mt-4 max-h-[320px] overflow-auto whitespace-pre-wrap rounded-[18px] bg-[#182033] p-4 text-sm leading-6 text-[#EAF8FF]">
              {document.raw_text || "No raw response stored."}
            </pre>
          </section>

          <div className="space-y-5">
            <ResultCard data={invoiceData} />
            <section className="rounded-[20px] border border-white/80 bg-white/90 p-5 shadow-[0_10px_30px_rgba(15,23,42,0.05)] backdrop-blur">
              <h2 className="text-lg font-semibold tracking-tight text-[#1F2937]">Review guidance</h2>
              <p className="mt-2 text-sm leading-6 text-[#4B5563]">
                Review the extracted fields before using the CSV export. Empty values indicate the AI could not confidently locate that field.
              </p>
            </section>
          </div>
        </div>
      ) : null}
    </main>
  );
}

function formatDate(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value || "-";
  }

  return date.toLocaleString();
}

function formatBytes(bytes: number | null): string {
  if (!bytes) {
    return "-";
  }

  if (bytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
