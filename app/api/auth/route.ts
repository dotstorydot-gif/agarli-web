import { NextRequest, NextResponse } from 'next/server';
import { getContent } from '@/lib/content';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  const c = getContent();
  if (password === c.site.adminPassword) {
    const cookieStore = await cookies();
    cookieStore.set('admin_auth', 'authenticated', {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: 'strict',
    });
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_auth');
  return NextResponse.json({ ok: true });
}
