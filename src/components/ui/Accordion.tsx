'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
      className="shrink-0 text-white/40"
    >
      <polyline points="6 9 12 15 18 9" />
    </motion.svg>
  );
}

export default function Accordion({ items, className }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(index: number) {
    setOpenIndex((prev) => (prev === index ? null : index));
  }

  return (
    <div className={cn('divide-y divide-white/[0.06]', className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const btnId = `faq-btn-${index}`;
        const panelId = `faq-panel-${index}`;
        return (
          <div key={item.question}>
            <button
              id={btnId}
              onClick={() => toggle(index)}
              className={cn(
                'w-full flex items-center justify-between gap-4 py-5 text-left transition-colors duration-200 cursor-none',
                isOpen ? 'text-white' : 'text-white/60 hover:text-white',
              )}
              aria-expanded={isOpen}
              aria-controls={panelId}
            >
              <span className="text-sm font-medium leading-snug">
                {item.question}
              </span>
              <ChevronIcon open={isOpen} />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  key="answer"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-5 text-sm text-white/60 leading-relaxed">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
