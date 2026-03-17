import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Resume Creator — Generate Deployable Resume Websites",
  description:
    "Upload your resume, pick a style, and generate a deployable website in minutes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
