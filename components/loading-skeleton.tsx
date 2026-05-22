type LoadingSkeletonProps = {
  rows?: number;
};

export function LoadingSkeleton({ rows = 4 }: LoadingSkeletonProps) {
  return (
    <div className="space-y-3 p-4">
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className="shimmer h-16 rounded-2xl bg-slate-100" />
      ))}
    </div>
  );
}
