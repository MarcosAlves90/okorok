import type { Metadata } from "next";
import { Inter, Protest_Strike } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";
import { UserProvider } from '@/hooks/UserContext';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const protestStrike = Protest_Strike({
  weight: "400",
  variable: "--font-protest-strike",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Okorok",
    template: "%s - Okorok",
  },
  description: "Compartilhe e descubra receitas caseiras — Okorok",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${protestStrike.variable} antialiased font-inter`}>
        <UserProvider>
          <Navbar />
          {children}
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
