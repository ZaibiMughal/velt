export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export const features: Feature[] = [
  { icon: 'lock', title: 'Fixed Pricing', description: 'No surprises. Agree on price before we start.' },
  { icon: 'zap', title: 'Fast Delivery', description: 'From 2 weeks to 6 weeks depending on scope.' },
  { icon: 'code', title: 'Modern Technology', description: 'Built with Next.js, React Native, Flutter, and production-grade tools.' },
  { icon: 'git', title: 'Source Code Ownership', description: 'You own everything. Full repository access on delivery.' },
  { icon: 'eye', title: 'Transparent Process', description: 'Regular updates. You see progress every step of the way.' },
  { icon: 'message', title: 'Dedicated Communication', description: 'Direct access to the team throughout the project.' },
  { icon: 'layers', title: 'Scalable Architecture', description: 'Built to grow with your business from day one.' },
  { icon: 'handshake', title: 'Long-Term Partnership', description: 'We stay involved after launch. Not just a vendor.' },
];
