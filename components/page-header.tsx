import Link from "next/link";
import type { ReactNode } from "react";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  action?: {
    href: string;
    label: string;
  };
  children?: ReactNode;
};

export function PageHeader({ eyebrow, title, description, action, children }: PageHeaderProps) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-3xl">
        <p className="text-sm font-medium text-[#5B7FFF]">
          {eyebrow}
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#1F2937] sm:text-4xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#4B5563] sm:text-base">
            {description}
          </p>
        ) : null}
        {children}
      </div>

      {action ? (
        <Link
          href={action.href}
          className="inline-flex h-10 items-center justify-center rounded-[12px] border border-[#E6E9EF] bg-white px-4 text-sm font-semibold text-[#374151] shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition duration-200 hover:-translate-y-0.5 hover:border-[#C9D3E5] hover:text-[#111827] hover:shadow-[0_10px_30px_rgba(15,23,42,0.05)] focus:outline-none focus:ring-4 focus:ring-[#E8EEFF]"
        >
          {action.label}
        </Link>
      ) : null}
    </header>
  );
}
