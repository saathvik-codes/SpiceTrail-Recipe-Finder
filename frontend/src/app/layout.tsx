import type { Metadata } from "next";
import { AuthProvider } from "@/context/AuthContext";
import { Navbar } from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "SpiceTrail — Recipe Finder",
  description: "Search recipes, view ingredients and instructions, and save your favorites.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          <main className="mx-auto max-w-5xl px-4 py-6">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
