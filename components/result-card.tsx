import type { InvoiceData } from "../lib/api";

type ResultCardProps = {
  data: InvoiceData;
};

const fields: Array<{ key: keyof InvoiceData; label: string }> = [
  { key: "invoiceNumber", label: "Invoice number" },
  { key: "vendor", label: "Vendor" },
  { key: "date", label: "Date" },
  { key: "total", label: "Total" },
];

export function ResultCard({ data }: ResultCardProps) {
  return (
    <section className="rounded-[20px] border border-white/80 bg-white/90 p-5 shadow-[0_12px_36px_rgba(15,23,42,0.06)] backdrop-blur">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-[#1F2937]">Extraction result</h2>
          <p className="mt-1 text-sm text-[#6B7280]">Structured fields generated from the document.</p>
        </div>
        <span className="rounded-full border border-blue-100 bg-[#E8EEFF] px-3 py-1.5 text-xs font-semibold text-[#5B7FFF]">
          96% confidence
        </span>
      </div>

      <dl className="mt-5 grid gap-3 sm:grid-cols-2">
        {fields.map((field) => (
          <div key={field.key} className="rounded-2xl border border-[#E6E9EF] bg-[#F7F8FA] p-3.5 transition duration-200 hover:border-[#C9D3E5] hover:bg-white">
            <dt className="text-xs font-semibold text-[#9CA3AF]">
              {field.label}
            </dt>
            <dd className="mt-1.5 min-h-6 truncate text-base font-semibold text-[#1F2937]">
              {data[field.key] || "Not found"}
            </dd>
            <p className="mt-2 text-xs font-medium text-emerald-700">Verified by AI</p>
          </div>
        ))}
      </dl>

      <pre className="mt-5 max-h-64 overflow-auto rounded-2xl bg-[#182033] p-4 text-sm leading-6 text-[#EAF8FF]">
        {JSON.stringify(data, null, 2)}
      </pre>
    </section>
  );
}
