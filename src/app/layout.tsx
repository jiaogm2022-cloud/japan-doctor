import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Providers from "@/components/Providers";
import TawkTo from "@/components/TawkTo";
import FloatingContact from "@/components/FloatingContact";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Japan Doctor | 日本远程医疗 - 在线问诊·药物配送",
  description:
    "Japan Doctor 为在日外国人及游客提供多语言远程医疗服务。在线视频问诊、处方药物配送到府，支持中文、英语、日语。内科、皮肤科、耳鼻喉科、儿科等全科诊疗。",
  keywords:
    "日本医疗,远程问诊,在线医生,药物配送,日本看病,Japan telemedicine,online doctor Japan",
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
          <Providers>{children}</Providers>
          <TawkTo />
          <FloatingContact />
        </body>
    </html>
  );
}
