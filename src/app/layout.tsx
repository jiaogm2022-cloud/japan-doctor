import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Providers from "@/components/Providers";
import { SITE_URL } from "@/lib/constants";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0EA5E9",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Japan Doctor | 日本远程医疗 - 在线问诊·药物配送",
    template: "%s | Japan Doctor",
  },
  description:
    "Japan Doctor 为全球用户提供多语言远程医疗服务。在线视频问诊日本持证医生、处方药物国际配送到府，支持中文、英语、日语。内科、皮肤科、耳鼻喉科、儿科、妇科等全科诊疗，24/7全天候服务。",
  keywords: [
    "日本医疗",
    "远程问诊",
    "在线医生",
    "药物配送",
    "日本看病",
    "Japan telemedicine",
    "online doctor Japan",
    "日本遠隔医療",
    "オンライン診療",
    "prescription delivery Japan",
    "中文医生",
    "海外就医",
  ],
  authors: [{ name: "Japan Doctor" }],
  creator: "Japan Doctor",
  publisher: "Japan Doctor",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      "zh-CN": SITE_URL,
      "en": SITE_URL,
      "ja": SITE_URL,
      "ko": SITE_URL,
      "vi": SITE_URL,
    },
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    alternateLocale: ["en_US", "ja_JP", "ko_KR", "vi_VN"],
    url: SITE_URL,
    siteName: "Japan Doctor",
    title: "Japan Doctor | 日本远程医疗 - 在线问诊·药物配送",
    description:
      "全球随时连线日本医生。视频问诊、处方药物国际配送，支持中/英/日三语。内科、皮肤科、儿科等全科诊疗，24/7在线。",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Japan Doctor - 日本远程医疗服务",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Japan Doctor | 日本远程医疗 - 在线问诊·药物配送",
    description:
      "全球随时连线日本医生。视频问诊、处方药物国际配送，24/7在线服务。",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  verification: {
    // google: "your-google-verification-code",  // TODO: Add after Google Search Console setup
    // other: { "msvalidate.01": "your-bing-code" },
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
