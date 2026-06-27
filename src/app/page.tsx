import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Packages from '@/components/sections/Packages';
import HowWeWork from '@/components/sections/HowWeWork';
import WhyVelt from '@/components/sections/WhyVelt';
import Portfolio from '@/components/sections/Portfolio';
import Partners from '@/components/sections/Partners';
import FAQ from '@/components/sections/FAQ';
import PaymentStructure from '@/components/sections/PaymentStructure';
import Contact from '@/components/sections/Contact';
import Testimonials from '@/components/sections/Testimonials';
import { getAllCaseStudies, getAllPartners, getAllTestimonials } from '@/lib/data';

export const metadata: Metadata = {
  title: { absolute: 'Velt | Ship Your Product Without Building a Full Team' },
  description:
    'Fixed-price software development for founders and enterprises. Flutter mobile apps, React Native, Next.js web platforms, and SaaS ecosystems — shipped in weeks, not months. 30+ products delivered across 3 continents.',
  keywords: [
    'hire Flutter developer', 'hire React Native developer', 'hire Next.js developer',
    'custom mobile app development', 'MVP development agency', 'SaaS platform development',
    'fixed price app development', 'software development for startups',
    'outsource software development', 'product development studio',
  ],
  alternates: { canonical: 'https://veltstudio.com' },
  openGraph: {
    title: 'Velt | Ship Your Product Without Building a Full Team',
    description:
      'Flutter, React Native, Next.js, SaaS — shipped at a fixed price. 30+ products built for founders and enterprise clients worldwide.',
    url: 'https://veltstudio.com',
  },
};

export default async function Home() {
  const [caseStudies, partners, testimonials] = await Promise.all([
    getAllCaseStudies(),
    getAllPartners(),
    getAllTestimonials(),
  ]);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Packages />
        <HowWeWork />
        <WhyVelt />
        <Portfolio caseStudies={caseStudies} />
        <Testimonials testimonials={testimonials} />
        <Partners partners={partners} />
        <FAQ />
        <PaymentStructure />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
