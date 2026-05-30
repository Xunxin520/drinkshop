import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CartSidebar from "@/components/CartSidebar";
import Footer from "@/components/Footer";
import Toast from "@/components/Toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DrinkShop - 精选饮品，畅享每一口",
  description: "精选全球好饮品，冷萃咖啡、鲜榨果汁、进口气泡水、手作茶饮，线上下单配送到家。",
  openGraph: {
    title: "DrinkShop - 精选饮品",
    description: "精选全球好饮品，线上下单配送到家。",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <CartSidebar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toast />
      </body>
    </html>
  );
}
