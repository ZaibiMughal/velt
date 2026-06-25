'use client';

import { useState, useRef, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import Badge from '@/components/ui/Badge';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Button from '@/components/ui/Button';
import GuidedBrief from '@/components/sections/GuidedBrief';
import { cn } from '@/lib/utils';

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
  'w-full bg-black/40 border border-white/[0.08] rounded-lg px-4 py-3',
  'text-sm text-white placeholder-white/25',
  'focus:outline-none focus:ring-1 focus:ring-[#6366f1]/60 focus:border-[#6366f1]/60',
  'transition-colors duration-200 cursor-none'
);

const inputError = 'border-red-500/60 focus:ring-red-500/40';
const labelClass = 'block text-xs text-white/50 uppercase tracking-wider mb-2';

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
          'text-left flex items-center justify-between gap-2 cursor-none',
          hasError && inputError,
          !value && 'text-white/25'
        )}
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
            color: 'rgba(255,255,255,0.3)',
          }}
        >
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="absolute z-50 mt-1.5 w-full rounded-lg overflow-hidden"
            style={{
              background: 'rgba(14,14,18,0.97)',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.7), 0 0 0 1px rgba(99,102,241,0.1)',
              backdropFilter: 'blur(12px)',
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
                    color: selected ? '#a5b4fc' : 'rgba(255,255,255,0.65)',
                    background: selected ? 'rgba(99,102,241,0.12)' : 'transparent',
                  }}
                  onMouseEnter={e => { if (!selected) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'; }}
                  onMouseLeave={e => { if (!selected) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                >
                  {selected && (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
                      <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
        className="w-16 h-16 rounded-full flex items-center justify-center"
        style={{ background: 'rgba(99,102,241,0.15)' }}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#6366f1"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-white">Message sent!</h3>
      <p className="text-sm text-white/50">
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
      setSubmitted(true);
    } catch {
      setErrorMessage('Something went wrong. Please try again.');
    }
  }

  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <AnimatedSection className="flex flex-col items-center text-center gap-4 mb-16">
          <Badge>{"Let's Build"}</Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            {"Let's build your next product"}
          </h2>
          <p className="text-white/50 max-w-lg">
            Tell us about your project. {"We'll"} review it and get back within 24 hours.
          </p>
        </AnimatedSection>

        {/* Form card */}
        <AnimatedSection delay={0.1} className="max-w-xl mx-auto">
          <div
            className="rounded-2xl p-8 md:p-10 border border-white/[0.08]"
            style={{ background: '#111113' }}
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
                    <label htmlFor="contact-name" className={labelClass}>Name</label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="Your name"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'contact-name-error' : undefined}
                      className={cn(inputBase, errors.name && inputError)}
                      {...register('name')}
                    />
                    {errors.name && (
                      <p id="contact-name-error" role="alert" className="mt-1.5 text-xs text-red-400">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="contact-email" className={labelClass}>Email</label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="you@company.com"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'contact-email-error' : undefined}
                      className={cn(inputBase, errors.email && inputError)}
                      {...register('email')}
                    />
                    {errors.email && (
                      <p id="contact-email-error" role="alert" className="mt-1.5 text-xs text-red-400">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Company */}
                  <div>
                    <label htmlFor="contact-company" className={labelClass}>
                      Company{' '}
                      <span className="normal-case text-white/25">(optional)</span>
                    </label>
                    <input
                      id="contact-company"
                      type="text"
                      placeholder="Your company"
                      className={inputBase}
                      {...register('company')}
                    />
                  </div>

                  {/* Budget + Project Type — 2 col */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    {/* Budget */}
                    <div>
                      <label htmlFor="contact-budget" className={labelClass}>Budget</label>
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
                        <p id="contact-budget-error" role="alert" className="mt-1.5 text-xs text-red-400">
                          {errors.budget.message}
                        </p>
                      )}
                    </div>

                    {/* Project Type */}
                    <div>
                      <label htmlFor="contact-type" className={labelClass}>Project Type</label>
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
                        <p id="contact-type-error" role="alert" className="mt-1.5 text-xs text-red-400">
                          {errors.projectType.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label htmlFor="contact-description" className={labelClass}>Project Description</label>
                    <textarea
                      id="contact-description"
                      rows={4}
                      placeholder="Describe your project, goals, and timeline"
                      aria-invalid={!!errors.description}
                      aria-describedby={errors.description ? 'contact-description-error' : undefined}
                      className={cn(inputBase, 'resize-none', errors.description && inputError)}
                      {...register('description')}
                    />
                    {errors.description && (
                      <p id="contact-description-error" role="alert" className="mt-1.5 text-xs text-red-400">
                        {errors.description.message}
                      </p>
                    )}
                  </div>

                  {/* Network error */}
                  {errorMessage && (
                    <p role="alert" aria-live="assertive" className="text-sm text-red-400 text-center">
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
                    <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
                    <span className="text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>or</span>
                    <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
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
