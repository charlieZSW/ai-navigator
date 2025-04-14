import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "AI and Machine Learning Resources Navigator",
  description: "Curated high-quality AI and machine learning resources, including models, datasets, tutorials, and frameworks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased bg-white text-slate-800`}
      >
        {children}
      </body>
    </html>
  );
}
