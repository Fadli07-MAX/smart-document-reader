type StatusBadgeProps = {
  status: string;
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const normalized = status.toLowerCase();
  const isProcessing = normalized === "processing";
  const tone =
    normalized === "completed"
      ? "border-emerald-200 bg-[#DDF7E8] text-emerald-800"
      : normalized === "failed"
        ? "border-red-200 bg-[#FFE5E5] text-red-800"
        : normalized === "reviewing"
          ? "border-amber-200 bg-[#FFF4DD] text-amber-800"
          : "border-blue-200 bg-[#E8EEFF] text-blue-800";

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${tone}`}>
      {isProcessing ? <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-600" /> : null}
      {status}
    </span>
  );
}
