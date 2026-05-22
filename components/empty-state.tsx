type EmptyStateProps = {
  title: string;
  description: string;
};

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="px-6 py-10 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-[18px] bg-gradient-to-br from-[#E8EEFF] to-[#EAF8FF] text-base font-bold text-[#5B7FFF] shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
        AI
      </div>
      <h3 className="mt-4 text-base font-semibold tracking-tight text-[#1F2937]">{title}</h3>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#4B5563]">
        {description}
      </p>
    </div>
  );
}
