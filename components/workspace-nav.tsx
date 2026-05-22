import Link from "next/link";

export function WorkspaceNav() {
  return (
    <nav className="mx-auto flex w-full max-w-7xl items-center justify-between rounded-[18px] border border-white/70 bg-white/75 px-4 py-3 shadow-[0_10px_30px_rgba(15,23,42,0.04)] backdrop-blur sm:px-5">
      <Link href="/" className="flex items-center gap-3 focus:outline-none focus:ring-4 focus:ring-[#E8EEFF]">
        <span className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-[#E8EEFF] text-sm font-semibold text-[#5B7FFF]">
          AI
        </span>
        <span>
          <span className="block text-sm font-semibold text-[#1F2937]">Smart Reader</span>
          <span className="block text-xs text-[#6B7280]">Document operations</span>
        </span>
      </Link>

      <div className="flex items-center gap-1 rounded-full border border-[#E6E9EF] bg-[#F7F8FA] p-1">
        <Link
          href="/"
          className="rounded-full px-3 py-1.5 text-xs font-semibold text-[#4B5563] transition hover:bg-white hover:text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#E8EEFF]"
        >
          Upload
        </Link>
        <Link
          href="/documents"
          className="rounded-full px-3 py-1.5 text-xs font-semibold text-[#4B5563] transition hover:bg-white hover:text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#E8EEFF]"
        >
          Workspace
        </Link>
      </div>
    </nav>
  );
}
