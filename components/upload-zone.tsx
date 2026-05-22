"use client";

import type { DragEvent, FormEvent } from "react";
import { useRef, useState } from "react";
import { uploadDocument, type InvoiceData } from "../lib/api";
import { ResultCard } from "./result-card";

type UploadResult = {
  id: string;
  filename: string;
  status: string;
  fileKey: string;
  fileSize: number;
  mimeType: string;
  structuredData: InvoiceData;
  createdAt: string;
};

const allowedExtensions = ".pdf,.png,.jpg,.jpeg,.webp";
const chips = ["PDF", "PNG", "JPG", "WebP", "8MB max"];
const stages = ["Upload", "OCR", "Structure", "Validate", "Ready"];

export function UploadZone() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<UploadResult | null>(null);
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [phase, setPhase] = useState("");
  const [stageIndex, setStageIndex] = useState(0);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setResult(null);

    if (!file) {
      setError("Choose a PDF or image invoice first.");
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];

    try {
      setLoading(true);
      setStageIndex(0);
      setPhase("Uploading securely to storage...");

      timers.push(
        setTimeout(() => {
          setStageIndex(1);
          setPhase("Reading document layout...");
        }, 650),
        setTimeout(() => {
          setStageIndex(2);
          setPhase("Structuring fields with Gemini 2.5 Flash...");
        }, 1400),
        setTimeout(() => {
          setStageIndex(3);
          setPhase("Validating extracted invoice data...");
        }, 2200),
      );

      const response = await uploadDocument(file);
      timers.forEach((timer) => clearTimeout(timer));
      setStageIndex(4);
      setPhase("Extraction complete.");
      setResult(response);
    } catch (err) {
      timers.forEach((timer) => clearTimeout(timer));
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setLoading(false);
      setTimeout(() => setPhase(""), 1200);
    }
  }

  function handleDrop(event: DragEvent<HTMLButtonElement>) {
    event.preventDefault();
    setDragging(false);
    setFile(event.dataTransfer.files[0] ?? null);
  }

  return (
    <div className="space-y-4">
      <form
        onSubmit={handleSubmit}
        className="rounded-[24px] border border-white/80 bg-white/85 p-3 shadow-[0_16px_48px_rgba(15,23,42,0.07)] backdrop-blur sm:p-4"
      >
        <input
          ref={inputRef}
          type="file"
          accept={allowedExtensions}
          className="sr-only"
          onChange={(event) => setFile(event.target.files?.[0] ?? null)}
        />

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(event) => {
            event.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          aria-label="Choose or drop a document for AI extraction"
          className={`group relative flex min-h-[250px] w-full overflow-hidden rounded-[22px] border px-5 py-7 text-left transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#E8EEFF] sm:min-h-[280px] sm:px-7 ${
            dragging
              ? "scale-[1.005] border-[#5B7FFF] bg-[#E8EEFF] shadow-[0_16px_44px_rgba(91,127,255,0.14)]"
              : "border-[#E6E9EF] bg-gradient-to-br from-white via-[#FBFCFF] to-[#F3F5F7] hover:-translate-y-0.5 hover:border-[#AFC0FF] hover:shadow-[0_16px_44px_rgba(91,127,255,0.10)]"
          }`}
        >
          <span className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(91,127,255,0.14),transparent_34%),radial-gradient(circle_at_85%_80%,rgba(14,165,233,0.10),transparent_32%)] opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
          <span className="absolute right-5 top-5 rounded-full border border-[#E6E9EF] bg-white/80 px-3 py-1 text-xs font-semibold text-[#5B7FFF] shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
            Gemini 2.5 Flash
          </span>

          <div className="relative grid w-full gap-6 sm:grid-cols-[1fr_220px] sm:items-center">
            <div>
              <span className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-[#E8EEFF] text-base font-semibold text-[#5B7FFF] shadow-[0_10px_24px_rgba(15,23,42,0.05)]">
                AI
              </span>
              <span className="mt-5 block text-xl font-semibold tracking-tight text-[#1F2937]">
                Drop a document to extract data
              </span>
              <span className="mt-2 block max-w-xl text-sm leading-6 text-[#4B5563]">
                The worker validates the file, stores it, and asks AI to structure invoice fields for review.
              </span>
              <div className="mt-5 flex flex-wrap items-center gap-2">
                {chips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-[#E6E9EF] bg-white/90 px-3 py-1 text-xs font-semibold text-[#4B5563]"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-[20px] border border-white/80 bg-white/75 p-4 shadow-[0_10px_30px_rgba(15,23,42,0.05)] backdrop-blur">
              <p className="text-xs font-semibold text-[#9CA3AF]">Extraction pipeline</p>
              <div className="mt-3 space-y-2">
                {["Validate file", "Read layout", "Parse fields"].map((item, index) => (
                  <span key={item} className="flex items-center gap-2 text-sm font-medium text-[#4B5563]">
                    <span className={`h-2 w-2 rounded-full ${index === 0 ? "bg-[#5B7FFF]" : "bg-[#D1D5DB]"}`} />
                    {item}
                  </span>
                ))}
              </div>
              <span className="mt-4 inline-flex h-10 items-center justify-center rounded-[12px] bg-[#5B7FFF] px-4 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(91,127,255,0.22)] transition duration-200 group-hover:-translate-y-0.5 group-hover:bg-[#4A6EF2]">
                Choose file
              </span>
            </div>
          </div>

          {file ? (
            <span className="absolute bottom-5 left-5 rounded-full border border-[#E6E9EF] bg-white px-3 py-1.5 text-xs font-semibold text-[#374151] shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
              {file.name} - {formatBytes(file.size)}
            </span>
          ) : null}
        </button>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm leading-5 text-[#6B7280]">
            Secure upload, AI extraction, D1 metadata, and CSV export.
          </p>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex h-11 items-center justify-center rounded-[13px] bg-[#5B7FFF] px-5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(91,127,255,0.22)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#4A6EF2] disabled:cursor-not-allowed disabled:bg-[#9CA3AF] disabled:shadow-none"
          >
            {loading ? "Processing..." : "Upload and extract"}
          </button>
        </div>

        {loading || phase ? (
          <div className="mt-4 rounded-[18px] border border-[#E6E9EF] bg-[#F7F8FA] p-3.5">
            <p className="text-sm font-semibold text-[#1F2937]">{phase}</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-5">
              {stages.map((stage, index) => {
                const done = index < stageIndex;
                const active = index === stageIndex;

                return (
                  <div
                    key={stage}
                    className={`rounded-xl border p-2.5 text-xs font-semibold transition ${
                      done
                        ? "border-emerald-200 bg-[#DDF7E8] text-emerald-800"
                        : active
                          ? "border-blue-200 bg-[#E8EEFF] text-blue-800"
                          : "border-[#E6E9EF] bg-white text-[#9CA3AF]"
                    }`}
                  >
                    <span className="mb-1.5 block h-1 rounded-full bg-current opacity-30" />
                    {stage}
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}

        {error ? (
          <p className="mt-4 rounded-2xl border border-red-200 bg-[#FFE5E5] px-4 py-3 text-sm text-red-800">
            {error}
          </p>
        ) : null}
      </form>

      {result ? <ResultCard data={result.structuredData} /> : null}
    </div>
  );
}

function formatBytes(bytes: number): string {
  if (bytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
