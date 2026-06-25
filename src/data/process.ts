export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  { step: '01', title: 'Discovery', description: 'We understand your goals, users, and requirements.' },
  { step: '02', title: 'Planning & Scope', description: 'We define deliverables, timeline, and technical architecture.' },
  { step: '03', title: 'Project Kickoff', description: '30% advance payment. Project officially starts.' },
  { step: '04', title: 'Design & Development', description: 'Regular progress updates. Transparent communication.' },
  { step: '05', title: 'Testing & Launch', description: 'Quality assurance, deployment, and final review.' },
  { step: '06', title: 'Handover', description: 'Source code, repository access, documentation, and admin credentials.' },
  { step: '07', title: 'Post-Launch Support', description: '30 days included support, bug fixes, and launch assistance.' },
];
