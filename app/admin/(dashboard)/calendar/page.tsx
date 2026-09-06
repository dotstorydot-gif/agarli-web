'use client';
import { useState, useEffect } from 'react';
import { Calendar, ExternalLink, Clock, User } from 'lucide-react';

type CalEvent = { id: string; summary: string; start: string; end: string; description?: string };

export default function CalendarPage() {
  const [events, setEvents] = useState<CalEvent[]>([]);
  const [calendarId, setCalendarId] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/content').then(r => r.json()).then(d => {
      setCalendarId(d.site.googleCalendarId || '');
    });
    fetch('/api/calendar').then(r => r.json()).then(d => {
      setEvents(d.events || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const embedUrl = calendarId
    ? `https://calendar.google.com/calendar/embed?src=${encodeURIComponent(calendarId)}&ctz=Africa%2FCairo&mode=AGENDA&showTitle=0&showNav=1&showPrint=0&showTabs=0&showCalendars=0`
    : null;

  return (
    <div style={{ padding: 'clamp(1.25rem, 3.5vw, 2.5rem)' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 600, color: '#1B2D45', marginBottom: '0.375rem' }}>Consultation Calendar</h1>
        <p style={{ color: '#6B7280', fontSize: '0.875rem' }}>View and manage upcoming consultation bookings</p>
      </div>

      {!calendarId ? (
        <div style={{ background: '#fff', borderRadius: '1.25rem', padding: '3rem', textAlign: 'center', border: '1px solid #E5E7EB' }}>
          <Calendar style={{ height: '3rem', width: '3rem', color: '#C9A96E', margin: '0 auto 1rem' }} />
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#1B2D45', marginBottom: '0.75rem' }}>Connect Your Calendar</h3>
          <p style={{ color: '#6B7280', fontSize: '0.875rem', marginBottom: '1.5rem', maxWidth: '24rem', margin: '0 auto 1.5rem' }}>
            Add your Google Calendar ID in Content Editor → Site Settings to display bookings here.
          </p>
          <a href="/admin/content" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', background: '#C9A96E', color: '#0B1A30', borderRadius: '999px', fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none' }}>
            Go to Settings
          </a>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {/* Embedded calendar */}
          <div style={{ background: '#fff', borderRadius: '1.25rem', overflow: 'hidden', border: '1px solid #E5E7EB' }}>
            <div style={{ padding: '1.25rem 1.75rem', borderBottom: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '1rem', fontWeight: 600, color: '#1B2D45' }}>Calendar View</h2>
              <a href={`https://calendar.google.com/calendar/r?cid=${calendarId}`} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.8rem', color: '#C9A96E', textDecoration: 'none' }}>
                Open in Google Calendar <ExternalLink style={{ height: '0.875rem', width: '0.875rem' }} />
              </a>
            </div>
            <iframe
              src={embedUrl!}
              style={{ width: '100%', height: '600px', border: 'none' }}
              title="Google Calendar"
            />
          </div>

          {/* Upcoming events */}
          {events.length > 0 && (
            <div style={{ background: '#fff', borderRadius: '1.25rem', border: '1px solid #E5E7EB', overflow: 'hidden' }}>
              <div style={{ padding: '1.25rem 1.75rem', borderBottom: '1px solid #F3F4F6' }}>
                <h2 style={{ fontSize: '1rem', fontWeight: 600, color: '#1B2D45' }}>Upcoming Bookings</h2>
              </div>
              {events.map(ev => (
                <div key={ev.id} style={{ padding: '1.25rem 1.75rem', borderBottom: '1px solid #F9FAFB', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ background: '#F7F5F2', borderRadius: '0.75rem', padding: '0.75rem', flexShrink: 0 }}>
                    <Calendar style={{ height: '1.25rem', width: '1.25rem', color: '#C9A96E' }} />
                  </div>
                  <div>
                    <p style={{ fontWeight: 600, color: '#1B2D45', fontSize: '0.9rem' }}>{ev.summary}</p>
                    <p style={{ color: '#6B7280', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                      {new Date(ev.start).toLocaleDateString('en-EG', { weekday: 'long', month: 'long', day: 'numeric' })} at {new Date(ev.start).toLocaleTimeString('en-EG', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    {ev.description && <p style={{ color: '#9CA3AF', fontSize: '0.75rem', marginTop: '0.25rem' }}>{ev.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
