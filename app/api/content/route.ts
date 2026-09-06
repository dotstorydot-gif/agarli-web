import { NextRequest, NextResponse } from 'next/server';
import { getContent, writeContent } from '@/lib/content';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

export async function GET() {
  const c = getContent();
  return NextResponse.json(c);
}

export async function PUT(req: NextRequest) {
  const cookieStore = await cookies();
  const auth = cookieStore.get('admin_auth');
  if (!auth || auth.value !== 'authenticated') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const body = await req.json();
  writeContent(body);

  // Invalidate Next.js cache so changes immediately reflect everywhere
  revalidatePath('/', 'layout');
  revalidatePath('/');
  revalidatePath('/pricing');
  revalidatePath('/why-agarli');
  revalidatePath('/founders');

  return NextResponse.json({ ok: true });
}

