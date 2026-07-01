import { z } from 'zod';
import { supabase } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

const MAX_SIZES: { match: (type: string, name: string) => boolean; max: number }[] = [
  { match: (t) => t.startsWith('image/'), max: 20 * 1024 * 1024 },
  { match: (t) => t.startsWith('video/'), max: 200 * 1024 * 1024 },
  { match: (t) => t === 'application/pdf', max: 5 * 1024 * 1024 },
  { match: (t, n) => t.includes('zip') || n.endsWith('.zip'), max: 200 * 1024 * 1024 },
];

const schema = z.object({
  fileName: z.string().min(1).max(200),
  fileType: z.string().min(1).max(100),
  fileSize: z.number().int().positive(),
});

export async function POST(req: NextRequest): Promise<NextResponse> {
  if (!supabase) {
    return NextResponse.json({ message: 'Storage unavailable.' }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: 'Invalid JSON.' }, { status: 400 });
  }

  const result = schema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ message: 'Invalid file metadata.' }, { status: 400 });
  }

  const { fileName, fileType, fileSize } = result.data;

  const rule = MAX_SIZES.find((r) => r.match(fileType, fileName.toLowerCase()));
  if (!rule) {
    return NextResponse.json({ message: 'Unsupported file type.' }, { status: 400 });
  }
  if (fileSize > rule.max) {
    return NextResponse.json({ message: 'File exceeds the size limit.' }, { status: 400 });
  }

  const safeName = fileName.replace(/[^a-zA-Z0-9._-]/g, '_');
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}/${safeName}`;

  const { data, error } = await supabase.storage
    .from('brief-uploads')
    .createSignedUploadUrl(path);

  if (error || !data) {
    console.error('[brief/upload-url] Signed URL failed:', error?.message);
    return NextResponse.json({ message: 'Could not prepare upload.' }, { status: 500 });
  }

  return NextResponse.json({ path: data.path, signedUrl: data.signedUrl });
}
