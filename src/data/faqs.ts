export interface FAQ {
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  { question: 'How does payment work?', answer: 'We use a 30/40/30 structure: 30% to start, 40% at a mid-project milestone, and 30% before final handover. This keeps both parties aligned throughout the project.' },
  { question: 'What is included in the handover?', answer: 'Full source code, repository access with all branches, deployment credentials, environment documentation, and a knowledge transfer session.' },
  { question: 'Who owns the source code?', answer: 'You do. 100%. From the moment the final payment is made, all code and assets belong to you with no licensing restrictions.' },
  { question: 'Do you provide support after launch?', answer: 'Yes, every package includes 30 days of post-launch support covering bug fixes, deployment issues, and launch assistance at no extra charge.' },
  { question: 'Can you work with existing products?', answer: "Absolutely. We can extend, rebuild, or integrate with existing platforms. We'll assess your codebase in the discovery session and scope accordingly." },
  { question: 'Can you build both web and mobile apps?', answer: 'Yes. We build React Native mobile apps alongside Next.js web applications. The SaaS Platform package includes both.' },
  { question: 'How do revisions work?', answer: 'During design and development, feedback rounds are included. We iterate until the product meets the agreed scope. Changes beyond scope are quoted separately.' },
];
