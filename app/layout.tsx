import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bilinguistik | Sworn Translation Services",
  description: "Officially certified sworn translation services in Sri Lanka. English, German, Spanish and more. Fast, accurate, and confidential.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col text-slate-100 selection:bg-[#FF6B35] selection:text-white">
        {/* Navbar and Footer are handled inside individual page.tsx files to allow unique designs for Landing Page vs Dashboard */}
        <main className="flex-1 flex flex-col">{children}</main>
      </body>
    </html>
  );
}