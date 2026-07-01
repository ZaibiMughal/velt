import { z } from 'zod';
import { sendBriefEmail } from '@/lib/email';
import { supabase } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

const schema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email(),
  projectTypes: z.array(z.string().max(100)).min(1).max(10),
  stage: z.string().min(1).max(100),
  description: z.string().min(10).max(10000),
  features: z.array(z.string().max(100)).max(20),
  budget: z.string().min(1).max(50),
  timeline: z.string().min(1).max(50),
  success: z.string().min(5).max(10000),
  filePaths: z.array(z.string().max(500)).max(20),
});

export async function POST(req: NextRequest): Promise<NextResponse> {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: 'Invalid JSON in request body.' }, { status: 400 });
  }

  const result = schema.safeParse(body);
  if (!result.success) {
    const message = result.error.issues.map((issue) => issue.message).join(', ');
    return NextResponse.json({ message }, { status: 400 });
  }

  const data = result.data;

  // Signed download links for the owner email (7-day expiry)
  const fileLinks: { name: string; url: string }[] = [];
  if (supabase && data.filePaths.length > 0) {
    for (const path of data.filePaths) {
      const { data: signed } = await supabase.storage
        .from('brief-uploads')
        .createSignedUrl(path, 60 * 60 * 24 * 7);
      if (signed) {
        fileLinks.push({ name: path.split('/').pop() ?? path, url: signed.signedUrl });
      }
    }
  }

  try {
    await sendBriefEmail({
      name: data.name,
      email: data.email,
      projectTypes: data.projectTypes,
      stage: data.stage,
      description: data.description,
      features: data.features,
      budget: data.budget,
      timeline: data.timeline,
      success: data.success,
      fileLinks,
    });
  } catch (err: unknown) {
    console.error('[brief] Email send failed:', err instanceof Error ? `${err.name}: ${err.message}` : err);
    return NextResponse.json({ message: 'Failed to submit brief. Please try again.' }, { status: 500 });
  }

  // Save to Supabase (non-blocking: email already sent)
  if (supabase) {
    const { error } = await supabase.from('brief_submissions').insert({
      name: data.name,
      email: data.email,
      project_types: data.projectTypes,
      stage: data.stage,
      description: data.description,
      features: data.features,
      budget: data.budget,
      timeline: data.timeline,
      success: data.success,
      file_paths: data.filePaths,
    });
    if (error) {
      console.error('[brief] Supabase insert failed:', error.message);
    }
  }

  return NextResponse.json({ ok: true });
}
