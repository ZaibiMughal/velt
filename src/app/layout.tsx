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
    default: 'Velt | Software Development Studio — Mobile Apps, Web & SaaS',
    template: '%s | Velt Studio',
  },
  description:
    'Velt is a software development studio with 30+ products shipped for startups and multinational enterprises. We build Flutter mobile apps, React Native apps, Next.js web platforms, and full SaaS ecosystems at a fixed price.',
  keywords: [
    'software development studio', 'mobile app development', 'Flutter developer',
    'React Native developer', 'Next.js developer', 'SaaS development',
    'web application development', 'MVP development', 'fixed price software development',
    'full stack developer', 'product development studio', 'custom software development',
    'startup app development', 'enterprise software development',
  ],
  authors: [{ name: 'Velt Studio' }],
  creator: 'Velt Studio',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://veltstudio.com',
    siteName: 'Velt Studio',
    title: 'Velt | Software Development Studio — 30+ Products Shipped',
    description:
      'Flutter mobile apps, Next.js platforms, and SaaS ecosystems — built for founders and enterprise clients at a fixed price. 30+ products shipped across 3 continents.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Velt Studio — Software Development' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Velt | Software Development Studio — 30+ Products Shipped',
    description:
      'Flutter mobile apps, Next.js platforms, and SaaS ecosystems at a fixed price. 30+ products for founders and enterprises.',
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
