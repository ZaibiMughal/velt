import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/ui/CustomCursor";
import PageTransition from "@/components/ui/PageTransition";
import GlobalBackground from "@/components/ui/GlobalBackground";
import JsonLd from "@/components/JsonLd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://veltstudio.com'),
  title: {
    default: 'Velt | Premium Software Development Studio',
    template: '%s | Velt',
  },
  description: 'Fixed-price software development for founders and businesses. We build Mobile Apps, Web Applications, SaaS Platforms, and Admin Dashboards. From MVPs to scalable products.',
  keywords: ['software development studio', 'product development studio', 'MVP development', 'SaaS development', 'mobile app development', 'web application development', 'fixed price software development'],
  authors: [{ name: 'Velt' }],
  creator: 'Velt',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://veltstudio.com',
    siteName: 'Velt',
    title: 'Velt | Premium Software Development Studio',
    description: 'Fixed-price software development for founders and businesses.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Velt | Build Without a Full Team' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Velt | Premium Software Development Studio',
    description: 'Fixed-price software development for founders and businesses.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <JsonLd />
      </head>
      <body suppressHydrationWarning>
        <GlobalBackground />
        <CustomCursor />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
