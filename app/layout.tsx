import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({
  variable: "--font-family",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Github Intern",
  description: "Real-time AI Teaching Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased font-sans`}>
        <ClerkProvider appearance={{variables: {colorPrimary: '#fe5933'}}}>
          
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
