import StoreProvider from "@/components/StoreProvider";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EnlightenU",
  description: "Learn and Apply with EnlightenU",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <StoreProvider>
        <body className={inter.className}>
          <Navbar />
          {children}
        </body>
      </StoreProvider>
    </html>
  );
}
