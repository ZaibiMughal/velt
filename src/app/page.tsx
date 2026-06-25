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
import { getAllCaseStudies, getAllPartners } from '@/lib/data';

export const metadata: Metadata = {
  title: { absolute: 'Velt | Build Your Product Without a Full Team' },
  description: 'Fixed-price software development for founders and businesses. Mobile Apps, Web Apps, SaaS Platforms from $5,000. Delivered in 2–6 weeks.',
  alternates: {
    canonical: 'https://veltstudio.com',
  },
};

export default async function Home() {
  const [caseStudies, partners] = await Promise.all([
    getAllCaseStudies(),
    getAllPartners(),
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
        <Partners partners={partners} />
        <FAQ />
        <PaymentStructure />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
