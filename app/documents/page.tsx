import { DocumentTable } from "../../components/document-table";
import { PageHeader } from "../../components/page-header";
import { WorkspaceNav } from "../../components/workspace-nav";

export default function DocumentsPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-7 px-5 py-5 sm:px-8 lg:py-7">
      <WorkspaceNav />
      <PageHeader
        eyebrow="Intelligent document workspace"
        title="Documents"
        description="Review processed invoices, inspect AI extraction status, and export structured records for downstream workflows."
        action={{ href: "/", label: "Upload document" }}
      />

      <DocumentTable />
    </main>
  );
}
