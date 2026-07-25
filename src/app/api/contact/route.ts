import { z } from 'zod';
import { sendContactEmail } from '@/lib/email';
import { supabase } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

const schema = z.object({
  plan: z.string().max(40).optional(),
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  budget: z.enum(['$5K–$10K', '$10K–$25K', '$25K–$50K', '$50K+']),
  projectType: z.enum([
    'Mobile App',
    'Web Application',
    'SaaS Platform',
    'Admin Dashboard',
    'Other',
  ]),
  description: z.string().min(20),
});

export async function POST(req: NextRequest): Promise<NextResponse> {
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { message: 'Invalid JSON in request body.' },
      { status: 400 },
    );
  }

  const result = schema.safeParse(body);
  if (!result.success) {
    const message = result.error.issues
      .map((issue) => issue.message)
      .join(', ');
    return NextResponse.json({ message }, { status: 400 });
  }

  try {
    await sendContactEmail(result.data);
  } catch (err: unknown) {
    console.error('[contact] Email send failed:', err instanceof Error ? `${err.name}: ${err.message}` : err);
    return NextResponse.json({ message: 'Failed to send message. Please try again.' }, { status: 500 });
  }

  // Save submission to Supabase (non-blocking — email already sent)
  if (supabase) {
    const { error } = await supabase.from('contact_submissions').insert({
      name: result.data.name,
      email: result.data.email,
      company: result.data.company ?? null,
      budget: result.data.budget,
      project_type: result.data.projectType,
      // No dedicated column for the selected plan; prefix it into the
      // description so the DB record keeps it without a migration.
      description:
        result.data.plan && result.data.plan !== 'Not sure yet'
          ? `[Plan: ${result.data.plan}]\n\n${result.data.description}`
          : result.data.description,
    });
    if (error) {
      console.error('[contact] Supabase insert failed:', error.message);
    }
  }

  return NextResponse.json({ ok: true });
}
