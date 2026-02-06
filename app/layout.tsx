import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "六木先生 - AI产品经理",
  description: "10多年产品经理与产品架构经验，现深耕 AI 与 VibeCoding 领域",
  keywords: ["AI产品经理", "VibeCoding", "产品架构", "AI", "六木先生"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
