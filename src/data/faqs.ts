export interface FAQ {
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  { question: 'How does payment work?', answer: 'Simple two-part structure: 30% to start, 70% on final handover. You pay the balance only when the product is finished and you are satisfied with it, not a day before.' },
  { question: '$5,000 seems like a lot for an MVP. Why not build it myself?', answer: 'You can, plenty of founders do. What you are paying for here is speed and certainty: a senior team building your product full time, live in 2 weeks, instead of nights and weekends spent learning a stack from scratch. If the idea is worth building, the weeks you save usually matter more than the money.' },
  { question: 'How is this cheaper than a typical agency quote?', answer: 'Most agencies price in discovery workshops, account managers, and design cycles that stretch a build to 8 to 12 weeks. Fixed-scope packages skip all of that: one senior team, a defined feature set, a 2 week timeline for the Launch MVP. You are paying for the build, not the overhead around it.' },
  { question: 'What if I am not happy with the result?', answer: 'You are protected by the payment structure itself. 70% of the price is only paid at handover, after you have seen and tested the finished product. During the build you get weekly check-ins and staging access, so there are no surprises at the end.' },
  { question: 'Who will actually build my product?', answer: 'A senior engineering team, not a rotating cast of juniors behind an account manager. You get one direct point of contact who writes code on your project and answers your messages personally.' },
  { question: 'I am not technical. How do I know what to ask for?', answer: 'You do not need a spec or a feature list to start. Tell us what problem you are trying to solve and who it is for, and we will turn that into the right feature set during the guided brief or an intro call. Most founders who come to us are non-technical, so this part of the process is built for that, not an afterthought.' },
  { question: 'What is included in the handover?', answer: 'Full source code, repository access with all branches, deployment credentials, environment documentation, and a knowledge transfer session.' },
  { question: 'Who owns the source code?', answer: 'You do. 100%. From the moment the final payment is made, all code and assets belong to you with no licensing restrictions.' },
  { question: 'Do you provide support after launch?', answer: 'Yes, every package includes 30 days of post-launch support covering bug fixes, deployment issues, and launch assistance at no extra charge.' },
  { question: 'Can you work with existing products?', answer: "Absolutely. We can extend, rebuild, or integrate with existing platforms. We'll assess your codebase in the discovery session and scope accordingly." },
  { question: 'Can you build both web and mobile apps?', answer: 'Yes. We build Flutter and React Native mobile apps alongside Next.js web applications. The SaaS Platform package includes both.' },
  { question: 'How do revisions work?', answer: 'During design and development, feedback rounds are included. We iterate until the product meets the agreed scope. Changes beyond scope are quoted separately.' },
];
