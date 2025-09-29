// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Le Parfum",
  description: "E-commerce de perfumes de autor",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-neutral-950 text-neutral-200 antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
