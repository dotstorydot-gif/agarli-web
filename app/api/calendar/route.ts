import { NextResponse } from 'next/server';
import { getContent } from '@/lib/content';

export async function GET() {
  const c = getContent();
  const calId = c.site.googleCalendarId;
  if (!calId) {
    return NextResponse.json({ events: [] });
  }
  try {
    // Public calendar feed (works without auth for public calendars)
    const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calId)}/events?maxResults=10&orderBy=startTime&singleEvents=true&timeMin=${new Date().toISOString()}&key=${process.env.GOOGLE_CALENDAR_API_KEY || ''}`;
    const res = await fetch(url);
    if (!res.ok) return NextResponse.json({ events: [] });
    const data = await res.json();
    const events = (data.items || []).map((e: any) => ({
      id: e.id,
      summary: e.summary || 'Consultation',
      start: e.start?.dateTime || e.start?.date,
      end: e.end?.dateTime || e.end?.date,
      description: e.description,
    }));
    return NextResponse.json({ events });
  } catch {
    return NextResponse.json({ events: [] });
  }
}
