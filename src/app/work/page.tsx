import type { Metadata } from 'next';
import Link from 'next/link';
import type { CaseStudy } from '@/data/work/index';
import { getAllCaseStudies } from '@/lib/data';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Badge from '@/components/ui/Badge';

export const metadata: Metadata = {
  title: { absolute: 'Work | Velt' },
  description: 'Case studies from Velt. Real products shipped for real founders.',
};

const MOBILE_CATEGORIES = ['Mobile App'];

function isMobile(study: CaseStudy) {
  return MOBILE_CATEGORIES.includes(study.category);
}

function ArrowRightIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

type Filter = 'all' | 'mobile' | 'web';

const FILTERS: { label: string; value: Filter }[] = [
  { label: 'All Projects', value: 'all' },
  { label: 'Mobile Apps',  value: 'mobile' },
  { label: 'Web & SaaS',   value: 'web' },
];

export default async function WorkPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  const { filter: rawFilter } = await searchParams;
  const filter: Filter =
    rawFilter === 'mobile' ? 'mobile'
    : rawFilter === 'web' ? 'web'
    : 'all';

  const allStudies = await getAllCaseStudies();

  const studies =
    filter === 'mobile' ? allStudies.filter(isMobile)
    : filter === 'web'  ? allStudies.filter((s) => !isMobile(s))
    : allStudies;

  return (
    <>
      <Navbar />

      <main className="min-h-screen" style={{ background: '#09090b', color: '#fff' }}>
        <div className="max-w-7xl mx-auto px-6 pt-32 pb-24">

          {/* Header */}
          <div className="flex flex-col items-center text-center gap-4 mb-10">
            <Badge>Work</Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              Products we&apos;ve shipped
            </h1>
            <p className="text-white/50 max-w-lg">
              Each project is a story of a problem solved and a business launched.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center justify-center gap-2 mb-12" role="tablist" aria-label="Filter projects">
            {FILTERS.map((f) => {
              const active = f.value === filter;
              return (
                <Link
                  key={f.value}
                  href={f.value === 'all' ? '/work' : `/work?filter=${f.value}`}
                  role="tab"
                  aria-selected={active}
                  className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-none"
                  style={
                    active
                      ? { background: '#6366f1', color: '#fff' }
                      : { background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.45)', border: '1px solid rgba(255,255,255,0.08)' }
                  }
                >
                  {f.label}
                </Link>
              );
            })}
          </div>

          {/* Grid */}
          {studies.length === 0 ? (
            <p className="text-center text-white/30 py-24">No projects found.</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {studies.map((study) => (
                <article
                  key={study.slug}
                  className="group relative rounded-2xl p-6 border border-white/[0.07] flex flex-col gap-4 transition-colors duration-200 hover:border-white/[0.15]"
                  style={{ background: '#111113' }}
                >
                  {/* Full-card overlay link */}
                  <Link
                    href={`/work/${study.slug}`}
                    className="absolute inset-0 rounded-2xl cursor-none"
                    aria-label={`View case study: ${study.title}`}
                  />

                  {/* Category */}
                  <span
                    className="relative text-xs font-medium px-2.5 py-1 rounded-full border border-white/[0.08] text-white/50 self-start"
                    style={{ background: 'rgba(99,102,241,0.08)' }}
                  >
                    {study.category}
                  </span>

                  {/* Title */}
                  <h2 className="relative text-lg font-semibold text-white">{study.title}</h2>

                  {/* Challenge */}
                  <p className="relative text-sm text-white/50 leading-relaxed flex-1 line-clamp-3">
                    {study.challenge}
                  </p>

                  {/* Outcome metric */}
                  <div className="relative text-base font-semibold" style={{ color: '#6366f1' }}>
                    {study.outcome.metric}
                  </div>

                  {/* Tech stack */}
                  <div className="relative flex flex-wrap gap-1.5">
                    {study.tech.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2.5 py-1 rounded-full border border-white/[0.06] text-white/40"
                        style={{ background: 'rgba(255,255,255,0.03)' }}
                      >
                        {t}
                      </span>
                    ))}
                    {study.tech.length > 4 && (
                      <span className="text-xs px-2.5 py-1 text-white/25">
                        +{study.tech.length - 4}
                      </span>
                    )}
                  </div>

                  {/* CTA indicator */}
                  <div
                    aria-hidden="true"
                    className="relative flex items-center gap-1.5 text-sm text-white/30 group-hover:text-white/60 transition-colors duration-200 mt-1"
                  >
                    <span>View Case Study</span>
                    <ArrowRightIcon />
                  </div>
                </article>
              ))}
            </div>
          )}

        </div>
      </main>

      <Footer />
    </>
  );
}
