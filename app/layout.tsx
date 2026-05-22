import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Smart Document Reader",
  description: "AI-native invoice extraction MVP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-[#F7F8FA] text-[#111827]">{children}</body>
    </html>
  );
}
