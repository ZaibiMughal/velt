import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Trust from '@/components/sections/Trust';
import Rescue from '@/components/sections/Rescue';
import Packages from '@/components/sections/Packages';
import HowWeWork from '@/components/sections/HowWeWork';
import WhyHexspire from '@/components/sections/WhyHexspire';
import Portfolio from '@/components/sections/Portfolio';
import Partners from '@/components/sections/Partners';
import FAQ from '@/components/sections/FAQ';
import AskAI from '@/components/sections/AskAI';
import SecretToast from '@/components/ui/SecretToast';
import PaymentStructure from '@/components/sections/PaymentStructure';
import Contact from '@/components/sections/Contact';
import Testimonials from '@/components/sections/Testimonials';
import { getAllCaseStudies, getAllPartners, getAllTestimonials, getSignedImageUrl } from '@/lib/data';

export const metadata: Metadata = {
  title: { absolute: 'Hexspire | Ship Your Product Without Building a Full Team' },
  description:
    'Fixed-price software development for founders. Flutter, React Native, and Next.js apps and SaaS platforms shipped in weeks. 30+ products delivered.',
  keywords: [
    'hire Flutter developer', 'hire React Native developer', 'hire Next.js developer',
    'custom mobile app development', 'MVP development agency', 'SaaS platform development',
    'fixed price app development', 'software development for startups',
    'outsource software development', 'product development studio',
    'finish my app', 'fix my app', 'take over app development', 'rescue software project',
  ],
  alternates: { canonical: 'https://hexspire.io' },
  openGraph: {
    title: 'Hexspire | Ship Your Product Without Building a Full Team',
    description:
      'Flutter, React Native, Next.js, SaaS, shipped at a fixed price. 30+ products built for founders and enterprise clients worldwide.',
    url: 'https://hexspire.io',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Hexspire, Software Development' }],
  },
};

export default async function Home() {
  const [caseStudies, partners, testimonials] = await Promise.all([
    getAllCaseStudies(),
    getAllPartners(),
    getAllTestimonials(),
  ]);

  // Signed cover URLs for the 3 featured portfolio cards: shown inside the
  // illustrated device frames so the cards display the real products.
  const coverUrls = await Promise.all(
    caseStudies.slice(0, 3).map((s) => getSignedImageUrl(s.cover_image)),
  );

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Portfolio caseStudies={caseStudies} coverUrls={coverUrls} />
        <Trust />
        <Rescue />
        <Partners partners={partners} />
        <Testimonials testimonials={testimonials} />
        <HowWeWork />
        <WhyHexspire />
        <Packages />
        <PaymentStructure />
        <FAQ />
        <AskAI />
        <Contact />
        <SecretToast />
      </main>
      <Footer />
    </>
  );
}
