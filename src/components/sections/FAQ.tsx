import Badge from '@/components/ui/Badge';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Accordion from '@/components/ui/Accordion';
import { faqs } from '@/data/faqs';

export default function FAQ() {
  return (
    <section id="faq" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <AnimatedSection className="flex flex-col items-center text-center gap-4 mb-16">
          <Badge>FAQ</Badge>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight" style={{ color: 'var(--color-text)' }}>
            Common questions
          </h2>
        </AnimatedSection>

        {/* Accordion */}
        <AnimatedSection delay={0.1} className="max-w-2xl mx-auto">
          <Accordion items={faqs} />
        </AnimatedSection>

        {/* Contextual CTA */}
        <AnimatedSection delay={0.15} className="max-w-2xl mx-auto mt-10 text-center">
          <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
            Still have a question?{' '}
            <a
              href="#contact"
              className="font-medium transition-colors"
              style={{ color: 'var(--color-primary)' }}
            >
              Ask us directly →
            </a>
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
