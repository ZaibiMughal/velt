'use client';

import { useState, useRef, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import Badge from '@/components/ui/Badge';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Button from '@/components/ui/Button';
import TechDeck from '@/components/ui/TechDeck';
import GuidedBrief from '@/components/sections/GuidedBrief';
import { cn } from '@/lib/utils';
import { CAL_URL, BOOKING_ENABLED } from '@/lib/site';
import { trackConversion } from '@/lib/tracking';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().optional(),
  budget: z.enum(['$5K–$10K', '$10K–$25K', '$25K–$50K', '$50K+'], {
    error: () => ({ message: 'Please select a budget range' }),
  }),
  projectType: z.enum(
    ['Mobile App', 'Web Application', 'SaaS Platform', 'Admin Dashboard', 'Other'],
    { error: () => ({ message: 'Please select a project type' }) }
  ),
  description: z
    .string()
    .min(20, 'Please provide at least 20 characters describing your project'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const inputBase = cn(
  'w-full rounded-lg px-4 py-3 border-2',
  'text-sm placeholder:opacity-100',
  'focus:outline-none',
  'transition-colors duration-150'
);

const inputBaseStyle = {
  background: 'var(--color-bg)',
  borderColor: 'var(--color-border-muted)',
  color: 'var(--color-text)',
} as const;

const inputError = 'border-red-500/70';
const labelClass = 'block text-xs uppercase tracking-wider mb-2';

/* ── Custom themed dropdown ────────────────────────────────────────── */

interface SelectProps {
  id: string;
  options: string[];
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  hasError?: boolean;
  ariaDescribedBy?: string;
}

function CustomSelect({ id, options, placeholder, value, onChange, hasError, ariaDescribedBy }: SelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        id={id}
        onClick={() => setOpen(v => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-describedby={ariaDescribedBy}
        className={cn(
          inputBase,
          'text-left flex items-center justify-between gap-2',
          hasError && inputError,
        )}
        style={{ ...inputBaseStyle, color: value ? 'var(--color-text)' : 'var(--color-muted)' }}
      >
        <span>{value || placeholder}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
          style={{
            flexShrink: 0,
            transition: 'transform 0.2s ease',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            color: 'var(--color-muted)',
          }}
        >
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="absolute z-50 mt-1.5 w-full rounded-lg overflow-hidden border-2"
            style={{
              background: 'var(--color-surface)',
              borderColor: 'var(--color-border-emphasis)',
            }}
          >
            {options.map(opt => {
              const selected = value === opt;
              return (
                <li
                  key={opt}
                  role="option"
                  aria-selected={selected}
                  onClick={() => { onChange(opt); setOpen(false); }}
                  className="px-4 py-2.5 text-sm cursor-pointer transition-colors duration-150 flex items-center gap-2"
                  style={{
                    color: selected ? 'var(--color-primary)' : 'var(--color-text)',
                    background: selected ? 'var(--color-bg-accent)' : 'transparent',
                  }}
                  onMouseEnter={e => { if (!selected) (e.currentTarget as HTMLElement).style.background = 'var(--color-surface-hover)'; }}
                  onMouseLeave={e => { if (!selected) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                >
                  {selected && (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
                      <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                  <span style={{ marginLeft: selected ? 0 : 14 }}>{opt}</span>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Success state ─────────────────────────────────────────────────── */

function SuccessState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex flex-col items-center text-center gap-4 py-12"
    >
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center border-2"
        style={{ background: 'var(--color-bg-accent)', borderColor: 'var(--color-border-emphasis)' }}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold" style={{ color: 'var(--color-text)' }}>Message sent!</h3>
      <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
        {"We'll be in touch within 24 hours."}
      </p>
    </motion.div>
  );
}

/* ── Main section ──────────────────────────────────────────────────── */

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(data: ContactFormData) {
    setErrorMessage(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Server error');
      trackConversion('contact_submit');
      setSubmitted(true);
    } catch {
      setErrorMessage('Something went wrong. Please try again.');
    }
  }

  return (
    <section id="contact" className="relative py-24 md:py-32">
      {/* Cycling tech-stack deck in the form's empty left margin */}
      <div
        className="hidden xl:flex flex-col items-center gap-4"
        style={{
          position: 'absolute',
          left: 'max(32px, calc(50% - 590px))',
          top: '52%',
          pointerEvents: 'none',
        }}
      >
        <p
          className="text-[10px] font-bold uppercase"
          style={{ letterSpacing: '0.18em', color: 'var(--color-muted-dark)' }}
        >
          We build with
        </p>
        <TechDeck />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <AnimatedSection className="flex flex-col items-center text-center gap-4 mb-16">
          <Badge>{"Let's Build"}</Badge>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight" style={{ color: 'var(--color-text)' }}>
            {"Let's build your next product"}
          </h2>
          <p className="max-w-lg" style={{ color: 'var(--color-muted)' }}>
            Tell us about your project. A real engineer reads every message and replies within 24 hours.
          </p>

          {/* Direct booking option — only shown while cal.com booking is enabled */}
          {BOOKING_ENABLED && (
            <>
              <a
                href={CAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-2.5 rounded-full px-6 py-3 text-sm font-semibold text-white border-2"
                style={{ background: 'var(--color-primary)', borderColor: 'var(--color-border-emphasis)' }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Book a free 15-minute call
              </a>
              <p className="text-xs" style={{ color: 'var(--color-muted-dark)' }}>Pick a time that suits you. No commitment, no sales pitch.</p>
            </>
          )}
        </AnimatedSection>

        {/* Form card */}
        <AnimatedSection delay={0.1} className="max-w-xl mx-auto">
          <div
            className="rounded-2xl p-8 md:p-10 border-2"
            style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border-muted)' }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <SuccessState key="success" />
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  className="flex flex-col gap-5"
                >
                  {/* Name */}
                  <div>
                    <label htmlFor="contact-name" className={labelClass} style={{ color: 'var(--color-muted)' }}>Name</label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="Your name"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'contact-name-error' : undefined}
                      className={cn(inputBase, errors.name && inputError)}
                      style={inputBaseStyle}
                      {...register('name')}
                    />
                    {errors.name && (
                      <p id="contact-name-error" role="alert" className="mt-1.5 text-xs text-red-500">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="contact-email" className={labelClass} style={{ color: 'var(--color-muted)' }}>Email</label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="you@company.com"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'contact-email-error' : undefined}
                      className={cn(inputBase, errors.email && inputError)}
                      style={inputBaseStyle}
                      {...register('email')}
                    />
                    {errors.email && (
                      <p id="contact-email-error" role="alert" className="mt-1.5 text-xs text-red-500">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Company */}
                  <div>
                    <label htmlFor="contact-company" className={labelClass} style={{ color: 'var(--color-muted)' }}>
                      Company{' '}
                      <span className="normal-case" style={{ color: 'var(--color-muted-dark)' }}>(optional)</span>
                    </label>
                    <input
                      id="contact-company"
                      type="text"
                      placeholder="Your company"
                      className={inputBase}
                      style={inputBaseStyle}
                      {...register('company')}
                    />
                  </div>

                  {/* Budget + Project Type — 2 col */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    {/* Budget */}
                    <div>
                      <label htmlFor="contact-budget" className={labelClass} style={{ color: 'var(--color-muted)' }}>Budget</label>
                      <Controller
                        name="budget"
                        control={control}
                        render={({ field }) => (
                          <CustomSelect
                            id="contact-budget"
                            options={['$5K–$10K', '$10K–$25K', '$25K–$50K', '$50K+']}
                            placeholder="Select range"
                            value={field.value ?? ''}
                            onChange={field.onChange}
                            hasError={!!errors.budget}
                            ariaDescribedBy={errors.budget ? 'contact-budget-error' : undefined}
                          />
                        )}
                      />
                      {errors.budget && (
                        <p id="contact-budget-error" role="alert" className="mt-1.5 text-xs text-red-500">
                          {errors.budget.message}
                        </p>
                      )}
                    </div>

                    {/* Project Type */}
                    <div>
                      <label htmlFor="contact-type" className={labelClass} style={{ color: 'var(--color-muted)' }}>Project Type</label>
                      <Controller
                        name="projectType"
                        control={control}
                        render={({ field }) => (
                          <CustomSelect
                            id="contact-type"
                            options={['Mobile App', 'Web Application', 'SaaS Platform', 'Admin Dashboard', 'Other']}
                            placeholder="Select type"
                            value={field.value ?? ''}
                            onChange={field.onChange}
                            hasError={!!errors.projectType}
                            ariaDescribedBy={errors.projectType ? 'contact-type-error' : undefined}
                          />
                        )}
                      />
                      {errors.projectType && (
                        <p id="contact-type-error" role="alert" className="mt-1.5 text-xs text-red-500">
                          {errors.projectType.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label htmlFor="contact-description" className={labelClass} style={{ color: 'var(--color-muted)' }}>Project Description</label>
                    <textarea
                      id="contact-description"
                      rows={4}
                      placeholder="Describe your project, goals, and timeline"
                      aria-invalid={!!errors.description}
                      aria-describedby={errors.description ? 'contact-description-error' : undefined}
                      className={cn(inputBase, 'resize-none', errors.description && inputError)}
                      style={inputBaseStyle}
                      {...register('description')}
                    />
                    {errors.description && (
                      <p id="contact-description-error" role="alert" className="mt-1.5 text-xs text-red-500">
                        {errors.description.message}
                      </p>
                    )}
                  </div>

                  {/* Network error */}
                  {errorMessage && (
                    <p role="alert" aria-live="assertive" className="text-sm text-red-500 text-center">
                      {errorMessage}
                    </p>
                  )}

                  {/* Submit */}
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full justify-center"
                  >
                    {isSubmitting ? 'Sending…' : 'Send Message'}
                  </Button>

                  {/* Guided brief CTA */}
                  <div className="flex items-center gap-3 pt-1">
                    <div className="flex-1 h-px" style={{ background: 'var(--color-border-muted)' }} />
                    <span className="text-xs" style={{ color: 'var(--color-muted-dark)' }}>or</span>
                    <div className="flex-1 h-px" style={{ background: 'var(--color-border-muted)' }} />
                  </div>
                  <div className="text-center">
                    <GuidedBrief />
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
