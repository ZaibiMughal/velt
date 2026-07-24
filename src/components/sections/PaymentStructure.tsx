import Badge from '@/components/ui/Badge';
import AnimatedSection from '@/components/ui/AnimatedSection';
import CheckIcon from '@/components/ui/CheckIcon';

const PAYMENT_STAGES = [
  {
    percent: '30%',
    label: 'Project Start',
    description: 'Paid upfront to kick off the project. Covers discovery, planning, and initial build.',
  },
  {
    percent: '70%',
    label: 'Final Handover',
    description: "Paid when you're fully satisfied with the delivered product. Not a day before.",
  },
];

const HANDOVER_ITEMS = [
  'Complete source code',
  'Repository access (all branches)',
  'Production deployment credentials',
  'Technical documentation',
  'Admin access to all platforms',
  'Knowledge transfer session',
];

export default function PaymentStructure() {
  return (
    <section className="py-24 md:py-32" style={{ background: 'var(--color-bg-accent)' }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <AnimatedSection className="flex flex-col items-center text-center gap-4 mb-16">
          <Badge>Transparency</Badge>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight" style={{ color: 'var(--color-text)' }}>
            Simple, structured payments
          </h2>
          <p style={{ color: 'var(--color-muted)' }} className="max-w-lg">
            Just two payments. No milestones, no surprises.
          </p>
        </AnimatedSection>

        {/* Payment stage cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-16 max-w-2xl mx-auto">
          {PAYMENT_STAGES.map((stage, index) => (
            <AnimatedSection
              key={stage.label}
              delay={index * 0.1}
              className="rounded-2xl p-8 flex flex-col gap-3"
              style={{
                background: 'var(--color-surface)',
                border: '2px solid var(--color-border-muted)',
              }}
            >
              <span
                className="font-serif text-5xl font-medium tracking-tight"
                style={{ color: 'var(--color-primary)' }}
              >
                {stage.percent}
              </span>
              <h3 className="text-base font-semibold" style={{ color: 'var(--color-text)' }}>{stage.label}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>{stage.description}</p>
            </AnimatedSection>
          ))}
        </div>

        {/* Handover checklist */}
        <AnimatedSection
          delay={0.3}
          className="max-w-2xl mx-auto rounded-2xl p-8"
          style={{ background: 'var(--color-surface)', border: '2px solid var(--color-border-muted)' }}
        >
          <h3 className="text-base font-semibold mb-6" style={{ color: 'var(--color-text)' }}>
            What you receive on handover
          </h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {HANDOVER_ITEMS.map((item) => (
              <div key={item} className="flex items-start gap-2.5 text-sm" style={{ color: 'var(--color-text)' }}>
                <CheckIcon />
                {item}
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Contextual CTA */}
        <AnimatedSection delay={0.35} className="mt-10 text-center">
          <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
            Ready to start?{' '}
            <a
              href="#contact"
              className="font-semibold transition-colors"
              style={{ color: 'var(--color-primary)' }}
            >
              Claim your build slot →
            </a>
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
