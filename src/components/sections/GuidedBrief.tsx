'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ── constants ─────────────────────────────────────────────────────────── */

const TOTAL = 7;

const PROJECT_TYPES = [
  'A mobile app (iPhone & Android)',
  'A website or web app',
  'A subscription / SaaS product',
  'An internal tool for my team',
  'Something else',
];

const STAGES = [
  { label: "It's in my head",            sub: 'I know what I want, just needs building' },
  { label: 'I have sketches or mockups', sub: 'Notes, wireframes, or rough designs are ready' },
  { label: 'An existing product',        sub: 'Already live, want to extend or improve it' },
  { label: 'Start fresh on something',   sub: 'Rebuild or redesign from the ground up' },
];

const FEATURES = [
  'Sign up / log in',
  'Payments or subscriptions',
  'Email or push notifications',
  'Reports & dashboards',
  'Connect with other apps',
  'Works without internet',
  'AI-powered features',
  'Admin panel to manage users',
];

const FEATURES_IMPROVE = [
  'Speed it up',
  'Redesign the look and feel',
  'Add new features',
  'Fix bugs and issues',
  'Build a mobile version',
  'Better reports and data',
  'Connect with more tools',
  'Support more users',
];

const BUDGETS   = ['$5K–$10K', '$10K–$25K', '$25K–$50K', '$50K+'];
const TIMELINES = ['ASAP (1-2 weeks)', '3-4 weeks', '5-6 weeks', "I'm flexible"];

const STEP_TITLES = [
  'What do you want to build?',
  'How far along is your idea?',
  '', // dynamic — see getStep3Content
  '', // dynamic — see getStep4Content
  'Budget & timeline',
  '', // dynamic — see getStep6Content
  'One last thing. How do we reach you?',
];

const STEP_SUBS = [
  'Pick all that apply.',
  'Pick whichever fits best.',
  '', // dynamic
  '', // dynamic
  'Rough numbers are completely fine.',
  '', // dynamic
  "We'll review your brief and get back within 24 hours.",
];

/* Step 3 adapts based on what the client picked in step 2 */
function getStep3Content(stage: string): { title: string; sub: string; placeholder: string } {
  switch (stage) {
    case "It's in my head":
      return {
        title: 'Describe your idea',
        sub: 'What does it do and who is it for? Plain English is perfect.',
        placeholder: "e.g. I want to build an app where dog owners can find and book local walkers nearby. The walker gets notified, they chat through the app, and payment happens automatically.",
      };
    case 'I have sketches or mockups':
      return {
        title: 'Tell us what you have',
        sub: 'Walk us through what you have so far. Attach your files below.',
        placeholder: "e.g. I have wireframes for a 5-screen mobile app. The main flow is booking and payment. I can share the Figma link or export the screens as images.",
      };
    case 'An existing product':
      return {
        title: 'What needs improving?',
        sub: 'Tell us what the product does today and what you want to change or add.',
        placeholder: "e.g. We have a web app that lets customers book appointments. It works but feels outdated and the booking flow is confusing. We want a redesign and a new notifications feature.",
      };
    case 'Start fresh on something':
      return {
        title: 'Tell us about it',
        sub: 'What exists now and what should the new version look like?',
        placeholder: "e.g. We have an old PHP system from 2012. We want to rebuild it as a modern web app with a cleaner design, faster performance, and a mobile version.",
      };
    default:
      return {
        title: 'Tell us about it',
        sub: 'Plain English is perfect, no tech jargon needed.',
        placeholder: "e.g. I want to build a platform where users can...",
      };
  }
}

/* Step 4 adapts based on stage */
function getStep4Content(stage: string): { title: string; sub: string; features: string[] } {
  switch (stage) {
    case 'I have sketches or mockups':
      return {
        title: "What's already in your designs?",
        sub: 'Tick what you have planned. Add anything else you want too.',
        features: FEATURES,
      };
    case 'An existing product':
      return {
        title: 'What would you like to change?',
        sub: 'Pick what you want us to focus on. You can choose more than one.',
        features: FEATURES_IMPROVE,
      };
    case 'Start fresh on something':
      return {
        title: 'What should the new version have?',
        sub: 'Tick everything the rebuild needs to include.',
        features: FEATURES,
      };
    default:
      return {
        title: 'What should people be able to do?',
        sub: 'Based on your idea, tick whatever sounds right.',
        features: FEATURES,
      };
  }
}

/* Step 6 adapts based on stage */
function getStep6Content(stage: string): { title: string; sub: string; placeholder: string } {
  switch (stage) {
    case 'I have sketches or mockups':
      return {
        title: 'What does a successful launch look like?',
        sub: 'Beyond just going live — what would make this worth it?',
        placeholder: "e.g. 100 people sign up in the first week, we get great early feedback, or we hit our first 10 paying customers.",
      };
    case 'An existing product':
      return {
        title: 'What would make this update a success?',
        sub: 'Think 3 months after we finish. What would you be happy about?',
        placeholder: "e.g. Support tickets drop by half, the team stops using workarounds, or customers actually start using the new feature we added.",
      };
    default:
      return {
        title: 'What does success look like?',
        sub: 'Think 6 months after launch. What would make this a real win?',
        placeholder: "e.g. 500 people using it every day, my team saving 3 hours a week, or our first 50 paying customers within a month of launch.",
      };
  }
}

/* ── file helpers ──────────────────────────────────────────────────────── */

const ACCEPT = '.jpg,.jpeg,.png,.gif,.webp,.pdf,.zip,.mp4,.mov,.avi,.mkv';

function getFileLimit(file: File): { max: number; label: string } | null {
  const t = file.type;
  if (t.startsWith('image/'))  return { max: 20  * 1024 * 1024, label: '20MB' };
  if (t.startsWith('video/'))  return { max: 200 * 1024 * 1024, label: '200MB' };
  if (t === 'application/pdf') return { max: 5   * 1024 * 1024, label: '5MB' };
  if (t.includes('zip') || file.name.endsWith('.zip')) return { max: 200 * 1024 * 1024, label: '200MB' };
  return null;
}

function fmtBytes(b: number) {
  return b < 1024 * 1024 ? `${(b / 1024).toFixed(0)} KB` : `${(b / (1024 * 1024)).toFixed(1)} MB`;
}

/* ── SVG icons (replacing emojis) ─────────────────────────────────────── */

function FileTypeIcon({ file }: { file: File }) {
  const color = 'rgba(165,180,252,0.7)';
  const size  = 16;

  if (file.type.startsWith('image/')) return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  );

  if (file.type.startsWith('video/')) return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <rect x="2" y="6" width="14" height="12" rx="2" />
      <path d="M16 10l6-4v12l-6-4" />
    </svg>
  );

  if (file.type === 'application/pdf') return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="8" y1="13" x2="16" y2="13" />
      <line x1="8" y1="17" x2="16" y2="17" />
    </svg>
  );

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <polyline points="21 8 21 21 3 21 3 8" />
      <rect x="1" y="3" width="22" height="5" />
      <line x1="10" y1="12" x2="14" y2="12" />
    </svg>
  );
}

function WarnIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

/* ── types ─────────────────────────────────────────────────────────────── */

interface BriefData {
  projectTypes: string[];
  stage: string;
  description: string;
  files: File[];
  features: string[];
  budget: string;
  timeline: string;
  success: string;
  name: string;
  email: string;
}

const INITIAL: BriefData = {
  projectTypes: [], stage: '', description: '', files: [],
  features: [], budget: '', timeline: '', success: '', name: '', email: '',
};

function canAdvance(step: number, data: BriefData): boolean {
  switch (step) {
    case 1: return data.projectTypes.length > 0;
    case 2: return data.stage !== '';
    case 3: return data.description.trim().length >= 10;
    case 4: return true;
    case 5: return data.budget !== '' && data.timeline !== '';
    case 6: return data.success.trim().length >= 5;
    case 7: return data.name.trim().length > 0 && /\S+@\S+\.\S+/.test(data.email);
    default: return false;
  }
}

/* ── shared input style ─────────────────────────────────────────────────── */

const INPUT: React.CSSProperties = {
  width: '100%', boxSizing: 'border-box',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 12, padding: '13px 16px',
  color: 'white', fontSize: 15, outline: 'none',
  fontFamily: 'inherit', lineHeight: 1.6,
  transition: 'border-color 0.15s ease',
};

function toggle(arr: string[], v: string) {
  return arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v];
}

/* ── chip ──────────────────────────────────────────────────────────────── */

function Chip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} style={{
      padding: '10px 18px', borderRadius: 10, cursor: 'pointer', fontFamily: 'inherit',
      border: active ? '1px solid rgba(99,102,241,0.7)' : '1px solid rgba(255,255,255,0.1)',
      background: active ? 'rgba(99,102,241,0.18)' : 'rgba(255,255,255,0.04)',
      color: active ? '#a5b4fc' : 'rgba(255,255,255,0.65)',
      fontSize: 14, fontWeight: active ? 500 : 400,
      transition: 'all 0.15s ease', textAlign: 'left',
    }}>{label}</button>
  );
}

/* ── file upload zone ──────────────────────────────────────────────────── */

function FileUploadZone({ files, data, setData }: { files: File[]; data: BriefData; setData: (d: BriefData) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  function addFiles(list: FileList | null) {
    if (!list) return;
    const errs: string[] = [];
    const toAdd: File[] = [];

    Array.from(list).forEach(file => {
      const limit = getFileLimit(file);
      if (!limit) { errs.push(`"${file.name}" is an unsupported file type`); return; }
      if (file.size > limit.max) { errs.push(`"${file.name}" exceeds the ${limit.label} limit`); return; }
      if (files.some(f => f.name === file.name && f.size === file.size)) return;
      toAdd.push(file);
    });

    setErrors(errs);
    if (toAdd.length) setData({ ...data, files: [...files, ...toAdd] });
  }

  return (
    <div style={{ marginTop: 22 }}>
      <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', letterSpacing: '0.09em', margin: '0 0 10px' }}>
        Attach files <span style={{ textTransform: 'none', color: 'rgba(255,255,255,0.16)' }}>(optional)</span>
      </p>

      <div
        role="button" tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={e => e.key === 'Enter' && inputRef.current?.click()}
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={e => { e.preventDefault(); setDragging(false); addFiles(e.dataTransfer.files); }}
        style={{
          border: `1.5px dashed ${dragging ? 'rgba(99,102,241,0.65)' : 'rgba(255,255,255,0.12)'}`,
          borderRadius: 12, padding: '22px 24px', cursor: 'pointer',
          background: dragging ? 'rgba(99,102,241,0.07)' : 'rgba(255,255,255,0.02)',
          transition: 'all 0.15s ease', textAlign: 'center', outline: 'none',
        }}
      >
        <input ref={inputRef} type="file" multiple accept={ACCEPT} style={{ display: 'none' }}
          onChange={e => { addFiles(e.target.files); e.target.value = ''; }} />

        <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
          stroke={dragging ? 'rgba(99,102,241,0.7)' : 'rgba(255,255,255,0.22)'}
          strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
          style={{ margin: '0 auto 10px', display: 'block', transition: 'stroke 0.15s ease' }}>
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>

        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', margin: '0 0 10px' }}>
          Drag & drop or{' '}
          <span style={{ color: '#818cf8', fontWeight: 500 }}>browse files</span>
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '4px 20px' }}>
          {[['Images', '20 MB'], ['PDF', '5 MB'], ['Video', '200 MB'], ['ZIP', '200 MB']].map(([type, limit]) => (
            <span key={type} style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', whiteSpace: 'nowrap' }}>
              {type} · {limit} max
            </span>
          ))}
        </div>
      </div>

      {/* Errors */}
      {errors.length > 0 && (
        <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 5 }}>
          {errors.map((e, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 7 }}>
              <WarnIcon />
              <span style={{ fontSize: 12, color: '#f87171', lineHeight: 1.4 }}>{e}</span>
            </div>
          ))}
        </div>
      )}

      {/* File list */}
      {files.length > 0 && (
        <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 7 }}>
          {files.map((file, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '9px 14px', borderRadius: 9,
              background: 'rgba(99,102,241,0.09)',
              border: '1px solid rgba(99,102,241,0.18)',
            }}>
              <FileTypeIcon file={file} />
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {file.name}
              </span>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', flexShrink: 0 }}>
                {fmtBytes(file.size)}
              </span>
              <button type="button"
                onClick={() => setData({ ...data, files: files.filter((_, j) => j !== i) })}
                style={{
                  background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)',
                  cursor: 'pointer', fontSize: 17, lineHeight: 1, padding: '0 2px', flexShrink: 0,
                  transition: 'color 0.12s ease',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#f87171'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.3)'; }}
              >×</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── step content ──────────────────────────────────────────────────────── */

function StepContent({ step, data, setData }: { step: number; data: BriefData; setData: (d: BriefData) => void }) {
  if (step === 1) return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
      {PROJECT_TYPES.map(t => (
        <Chip key={t} label={t} active={data.projectTypes.includes(t)}
          onClick={() => setData({ ...data, projectTypes: toggle(data.projectTypes, t) })} />
      ))}
    </div>
  );

  if (step === 2) return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {STAGES.map(s => {
        const active = data.stage === s.label;
        return (
          <button key={s.label} type="button" onClick={() => setData({ ...data, stage: s.label, features: [] })}
            style={{
              padding: '14px 18px', borderRadius: 12, textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit',
              border: active ? '1px solid rgba(99,102,241,0.7)' : '1px solid rgba(255,255,255,0.1)',
              background: active ? 'rgba(99,102,241,0.12)' : 'rgba(255,255,255,0.03)',
              display: 'flex', alignItems: 'center', gap: 16, transition: 'all 0.15s ease',
            }}>
            <span style={{
              width: 20, height: 20, borderRadius: '50%', flexShrink: 0, boxSizing: 'border-box',
              border: active ? '6px solid #6366f1' : '2px solid rgba(255,255,255,0.2)',
              transition: 'all 0.15s ease',
            }} />
            <span>
              <span style={{ display: 'block', fontSize: 15, color: active ? '#e0e7ff' : 'rgba(255,255,255,0.75)', fontWeight: active ? 500 : 400 }}>
                {s.label}
              </span>
              <span style={{ display: 'block', fontSize: 12, color: 'rgba(255,255,255,0.28)', marginTop: 3 }}>
                {s.sub}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );

  if (step === 3) {
    const { placeholder } = getStep3Content(data.stage);
    return (
      <div>
        <textarea
          placeholder={placeholder}
          value={data.description}
          onChange={e => setData({ ...data, description: e.target.value })}
          rows={5}
          style={{ ...INPUT, resize: 'none' }}
          onFocus={e => { e.target.style.borderColor = 'rgba(99,102,241,0.5)'; }}
          onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; }}
        />
        <FileUploadZone files={data.files} data={data} setData={setData} />
      </div>
    );
  }

  if (step === 4) {
    const { features: list } = getStep4Content(data.stage);
    const allSelected = data.features.length === list.length;
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
          <button type="button"
            onClick={() => setData({ ...data, features: allSelected ? [] : [...list] })}
            style={{
              background: 'none', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 7,
              color: allSelected ? '#a5b4fc' : 'rgba(255,255,255,0.38)', cursor: 'pointer',
              padding: '5px 12px', fontSize: 12, fontFamily: 'inherit', transition: 'all 0.15s ease',
              borderColor: allSelected ? 'rgba(99,102,241,0.4)' : 'rgba(255,255,255,0.1)',
            }}>
            {allSelected ? 'Clear all' : 'Select all'}
          </button>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {list.map(f => (
            <Chip key={f} label={f} active={data.features.includes(f)}
              onClick={() => setData({ ...data, features: toggle(data.features, f) })} />
          ))}
        </div>
      </div>
    );
  }

  if (step === 5) return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
      {([
        { label: 'Budget', key: 'budget' as const, opts: BUDGETS },
        { label: 'Timeline', key: 'timeline' as const, opts: TIMELINES },
      ] as const).map(({ label, key, opts }) => (
        <div key={key}>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 12px', textAlign: 'center' }}>
            {label}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9, justifyContent: 'center' }}>
            {opts.map(o => {
              const active = data[key] === o;
              return (
                <button key={o} type="button" onClick={() => setData({ ...data, [key]: o })}
                  style={{
                    padding: '10px 20px', borderRadius: 10, cursor: 'pointer', fontFamily: 'inherit',
                    border: active ? '1px solid rgba(99,102,241,0.7)' : '1px solid rgba(255,255,255,0.1)',
                    background: active ? 'rgba(99,102,241,0.16)' : 'rgba(255,255,255,0.04)',
                    color: active ? '#a5b4fc' : 'rgba(255,255,255,0.6)',
                    fontSize: 14, transition: 'all 0.15s ease',
                  }}>{o}</button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );

  if (step === 6) {
    const { placeholder } = getStep6Content(data.stage);
    return (
      <textarea
        placeholder={placeholder}
        value={data.success}
        onChange={e => setData({ ...data, success: e.target.value })}
        rows={5}
        style={{ ...INPUT, resize: 'none' }}
        onFocus={e => { e.target.style.borderColor = 'rgba(99,102,241,0.5)'; }}
        onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; }}
      />
    );
  }

  if (step === 7) return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <input type="text" placeholder="Your name"
        value={data.name} onChange={e => setData({ ...data, name: e.target.value })}
        style={INPUT}
        onFocus={e => { e.target.style.borderColor = 'rgba(99,102,241,0.5)'; }}
        onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; }}
      />
      <input type="email" placeholder="your@email.com"
        value={data.email} onChange={e => setData({ ...data, email: e.target.value })}
        style={INPUT}
        onFocus={e => { e.target.style.borderColor = 'rgba(99,102,241,0.5)'; }}
        onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; }}
      />
    </div>
  );

  return null;
}

/* ── main ──────────────────────────────────────────────────────────────── */

export default function GuidedBrief() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [dir,  setDir]  = useState(1);
  const [data, setData] = useState<BriefData>(INITIAL);
  const [done, setDone] = useState(false);

  const ready = canAdvance(step, data);
  const pct   = Math.round((step / TOTAL) * 100);

  const close = useCallback(() => {
    setOpen(false);
    setTimeout(() => { setStep(1); setData(INITIAL); setDone(false); setDir(1); }, 380);
  }, []);

  function next() {
    if (!ready) return;
    if (step < TOTAL) { setDir(1); setStep(s => s + 1); }
    else setDone(true);
  }

  function back() {
    if (step > 1) { setDir(-1); setStep(s => s - 1); }
  }

  function getTitle(s: number) {
    if (s === 3) return getStep3Content(data.stage).title;
    if (s === 4) return getStep4Content(data.stage).title;
    if (s === 6) return getStep6Content(data.stage).title;
    return STEP_TITLES[s - 1];
  }
  function getSub(s: number) {
    if (s === 3) return getStep3Content(data.stage).sub;
    if (s === 4) return getStep4Content(data.stage).sub;
    if (s === 6) return getStep6Content(data.stage).sub;
    return STEP_SUBS[s - 1];
  }

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') { close(); return; }
      if (e.key === 'Enter' && !(e.target instanceof HTMLTextAreaElement) && ready) next();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, ready, step, close]);

  return (
    <>
      {/* trigger */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        style={{
          background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
          color: 'rgba(255,255,255,0.38)', fontSize: 14, padding: 0,
          display: 'inline-flex', alignItems: 'center', gap: 5,
          transition: 'color 0.2s ease',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.7)'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.38)'; }}
      >
        Ready to give us the full picture?{' '}
        <span style={{ color: '#818cf8', fontWeight: 500 }}>Start the guided brief</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
        </svg>
      </button>

      {/* full-screen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="guided-brief"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 300,
              background: '#060608',
              display: 'flex', flexDirection: 'column',
              fontFamily: 'inherit',
            }}
          >
            {/* Progress bar */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'rgba(255,255,255,0.06)', zIndex: 1 }}>
              <motion.div
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                style={{ height: '100%', background: 'linear-gradient(90deg, #6366f1, #7c3aed)', boxShadow: '0 0 12px rgba(99,102,241,0.55)' }}
              />
            </div>

            {/* Top bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '28px 48px 0', position: 'relative', zIndex: 1 }}>
              <span style={{ fontSize: 15, fontWeight: 800, color: 'white', letterSpacing: '-0.02em' }}>
                velt<span style={{ color: '#6366f1' }}>.</span>
              </span>
              <button type="button" onClick={close} style={{
                background: 'none', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8,
                color: 'rgba(255,255,255,0.35)', cursor: 'pointer', padding: '6px 14px',
                fontSize: 12, fontFamily: 'inherit', transition: 'all 0.15s ease',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.25)'; (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.6)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.1)'; (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.35)'; }}
              >
                Esc
              </button>
            </div>

            {/* Content */}
            <div style={{
              flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
              padding: '0 48px', maxWidth: 800, margin: '0 auto', width: '100%',
              overflowY: 'auto',
            }}>
              <AnimatePresence mode="wait" custom={dir}>
                {done ? (
                  <motion.div key="brief-success"
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    style={{ textAlign: 'center', padding: '40px 0' }}
                  >
                    <div style={{
                      width: 64, height: 64, borderRadius: '50%', margin: '0 auto 24px',
                      background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 700, color: 'white', margin: '0 0 12px', letterSpacing: '-0.025em' }}>
                      Brief submitted.
                    </h2>
                    <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.4)', margin: '0 0 32px', lineHeight: 1.6 }}>
                      We'll review everything and get back to you within 24 hours.
                    </p>
                    <button type="button" onClick={close} style={{
                      background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
                      borderRadius: 10, color: 'rgba(255,255,255,0.55)', cursor: 'pointer',
                      padding: '10px 28px', fontSize: 14, fontFamily: 'inherit',
                    }}>Close</button>
                  </motion.div>
                ) : (
                  <motion.div
                    key={step}
                    custom={dir}
                    variants={{
                      enter: (d: number) => ({ y: d * 30, opacity: 0 }),
                      center: { y: 0, opacity: 1 },
                      exit:  (d: number) => ({ y: d * -30, opacity: 0 }),
                    }}
                    initial="enter" animate="center" exit="exit"
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    style={{ paddingTop: 8, paddingBottom: 24 }}
                  >
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 24 }}>
                      <span style={{ fontSize: 'clamp(2.8rem, 5vw, 4.5rem)', fontWeight: 800, color: 'rgba(99,102,241,0.2)', lineHeight: 1, letterSpacing: '-0.04em' }}>
                        {String(step).padStart(2, '0')}
                      </span>
                      <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.16)' }}>/ {TOTAL}</span>
                    </div>

                    <h2 style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2.4rem)', fontWeight: 700, color: 'white', margin: '0 0 6px', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                      {getTitle(step)}
                    </h2>
                    <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.3)', margin: '0 0 28px', lineHeight: 1.55 }}>
                      {getSub(step)}
                    </p>

                    <StepContent step={step} data={data} setData={setData} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom nav */}
            {!done && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 48px 36px' }}>
                <button type="button" onClick={back} disabled={step === 1} style={{
                  background: 'none', border: 'none', cursor: step === 1 ? 'default' : 'pointer',
                  color: step === 1 ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.4)',
                  fontSize: 14, fontFamily: 'inherit', transition: 'color 0.15s ease',
                }}>Back</button>

                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  {step === 4 && (
                    <button type="button" onClick={() => { setDir(1); setStep(s => s + 1); }} style={{
                      background: 'none', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8,
                      color: 'rgba(255,255,255,0.32)', cursor: 'pointer',
                      padding: '10px 18px', fontSize: 13, fontFamily: 'inherit',
                    }}>Skip</button>
                  )}
                  {step !== 3 && step !== 6 && step !== 7 && (
                    <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.16)' }}>
                      or press{' '}
                      <kbd style={{
                        padding: '2px 7px', borderRadius: 5, fontSize: 10,
                        border: '1px solid rgba(255,255,255,0.12)',
                        color: 'rgba(255,255,255,0.22)', background: 'rgba(255,255,255,0.04)',
                        fontFamily: 'inherit',
                      }}>Enter</kbd>
                    </span>
                  )}
                  <button type="button" onClick={next} disabled={!ready} style={{
                    padding: '11px 30px', borderRadius: 10, cursor: ready ? 'pointer' : 'default',
                    background: ready ? 'linear-gradient(135deg, #6366f1, #7c3aed)' : 'rgba(255,255,255,0.06)',
                    color: ready ? 'white' : 'rgba(255,255,255,0.2)',
                    border: 'none', fontSize: 14, fontWeight: 500, fontFamily: 'inherit',
                    transition: 'all 0.2s ease',
                    boxShadow: ready ? '0 4px 20px rgba(99,102,241,0.45)' : 'none',
                  }}>
                    {step === TOTAL ? 'Submit Brief' : 'Next'}
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
