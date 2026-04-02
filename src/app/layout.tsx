import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Molecules/Navbar/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PatiphanAK",
  description: "Welcome to my portfolio website.",
  keywords: ["portfolio", "web developer", "typescript", "nextjs", "dinosaur"],
  authors: [{ name: "Patiphan Akkahadsri" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth suppressHydrationWarning">
      <body className={`${inter.className} antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
