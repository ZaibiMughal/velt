import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import PageTransition from "@/components/ui/PageTransition";
import JsonLd from "@/components/JsonLd";
import MobileStickyCTA from "@/components/ui/MobileStickyCTA";
import AdTracking from "@/components/ui/AdTracking";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://hexspire.io'),
  title: {
    default: 'Hexspire | Mobile, Web & SaaS Development Studio',
    template: '%s | Hexspire',
  },
  description:
    'Hexspire is a software development studio for founders. Flutter mobile apps, React Native, Next.js platforms, and SaaS ecosystems at a fixed price.',
  keywords: [
    'software development studio', 'mobile app development', 'Flutter developer',
    'React Native developer', 'Next.js developer', 'SaaS development',
    'web application development', 'MVP development', 'fixed price software development',
    'full stack developer', 'product development studio', 'custom software development',
    'startup app development', 'enterprise software development',
  ],
  authors: [{ name: 'Hexspire' }],
  creator: 'Hexspire',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://hexspire.io',
    siteName: 'Hexspire',
    title: 'Hexspire | Software Development Studio',
    description:
      'Flutter mobile apps, Next.js platforms, and SaaS ecosystems built for founders and enterprises at a fixed price. 30+ products shipped worldwide.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Hexspire, Software Development' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hexspire | Software Development Studio',
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
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable}`}
      suppressHydrationWarning
    >
      <head>
        <JsonLd />
      </head>
      <body suppressHydrationWarning>
        <PageTransition>{children}</PageTransition>
        <MobileStickyCTA />
        <Analytics />
        <AdTracking />
      </body>
    </html>
  );
}
