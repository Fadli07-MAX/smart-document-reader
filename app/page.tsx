import { PageHeader } from "../components/page-header";
import { UploadZone } from "../components/upload-zone";
import { WorkspaceNav } from "../components/workspace-nav";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-7 px-5 py-5 sm:px-8 lg:py-7">
      <WorkspaceNav />

      <section className="mx-auto w-full max-w-5xl">
        <PageHeader
          eyebrow="AI document operations"
          title="AI-Powered Document Intelligence"
          description="Upload invoices, receipts, and documents. Extract structured data with AI-powered OCR and intelligent parsing."
          action={{ href: "/documents", label: "View workspace" }}
        />
      </section>

      <div className="mx-auto grid w-full max-w-6xl gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
        <UploadZone />
        <aside className="rounded-[20px] border border-white/80 bg-white/80 p-5 shadow-[0_10px_30px_rgba(15,23,42,0.05)] backdrop-blur">
          <h2 className="text-lg font-semibold tracking-tight text-[#1F2937]">Operational flow</h2>
          <div className="mt-4 space-y-3">
            {[
              ["01", "Capture", "Upload invoices and receipts through a validated edge pipeline."],
              ["02", "Structure", "Gemini 2.5 Flash returns deterministic invoice fields."],
              ["03", "Review", "Inspect results, source file links, and export CSV."],
            ].map(([step, title, text]) => (
              <div key={step} className="rounded-2xl border border-[#E6E9EF] bg-white p-3.5">
                <p className="text-xs font-semibold text-[#5B7FFF]">{step}</p>
                <p className="mt-1 font-semibold text-[#1F2937]">{title}</p>
                <p className="mt-1 text-sm leading-5 text-[#6B7280]">{text}</p>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </main>
  );
}
