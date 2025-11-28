import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ai-shokugyou-shindan.vercel.app';

export const metadata: Metadata = {
  title: "2030年 AI適職診断 | あなたにぴったりのAI未来職を見つけよう",
  description: "40の質問に答えるだけで、MBTIベースのAI職種とキャラ画像がわかります。あなたの適性に合ったAI時代のキャリアを診断しましょう。",
  openGraph: {
    title: "2030年 AI適職診断",
    description: "40の質問に答えるだけで、あなたにぴったりのAI時代の職業がわかる！",
    url: siteUrl,
    siteName: "2030年 AI適職診断",
    images: [
      {
        url: `${siteUrl}/api/og/default`,
        width: 1200,
        height: 630,
        alt: "2030年 AI適職診断",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "2030年 AI適職診断",
    description: "40の質問に答えるだけで、あなたにぴったりのAI時代の職業がわかる！",
    images: [`${siteUrl}/api/og/default`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
