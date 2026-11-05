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
  title: "KriyaLoka AI - Bali DigiFest 2026",
  description: "From Local Hands to Global Lands: AI Export & Cultural Storytelling Copilot for Balinese Artisans",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div id="main-content" className="w-full flex-1 flex flex-col">
          {children}
        </div>
        <div id="print-root" className="hidden" aria-hidden="true" />
      </body>
    </html>
  );
}
