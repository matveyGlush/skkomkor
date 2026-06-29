import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Archidomo — Architecture Agency",
  description:
    "Our architecture agency designs exceptional residences in rare locations, in France and around the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-white text-[#0b080d]">
        {children}
      </body>
    </html>
  );
}
