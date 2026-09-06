'use client';
import { useState, useEffect } from 'react';
import { Users, Eye, TrendingUp, Smartphone, Globe, BarChart2 } from 'lucide-react';

type Props = { gaId: string };

// Mock analytics data for demo (replace with real GA4 Data API)
const mockData = {
  sessions: 1842,
  pageViews: 5263,
  avgDuration: '2m 34s',
  bounceRate: '38%',
  topPages: [
    { page: '/', views: 2840, label: 'Home' },
    { page: '/why-agarli', views: 1420, label: 'Why Agarli' },
    { page: '/pricing', views: 1003, label: 'Pricing' },
    { page: '/founders', views: 760, label: 'Founders' },
  ],
  sources: [
    { source: 'Organic Search', sessions: 820, pct: 45 },
    { source: 'Direct', sessions: 550, pct: 30 },
    { source: 'Social', sessions: 275, pct: 15 },
    { source: 'Referral', sessions: 197, pct: 10 },
  ],
  devices: [
    { device: 'Mobile', pct: 62, color: '#C9A96E' },
    { device: 'Desktop', pct: 31, color: '#1B2D45' },
    { device: 'Tablet', pct: 7, color: '#2DBD7A' },
  ],
  dailySessions: [120, 145, 98, 167, 201, 188, 132, 155, 178, 210, 195, 160, 142, 175],
};

export default function AnalyticsDashboard({ gaId }: Props) {
  const isConnected = !!gaId;

  const Card = ({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) => (
    <div style={{ background: '#fff', borderRadius: '1.25rem', padding: '1.5rem', border: '1px solid #E5E7EB', ...style }}>
      {children}
    </div>
  );

  const MetricCard = ({ icon: Icon, label, value, sub, color }: { icon: any; label: string; value: string | number; sub?: string; color: string }) => (
    <Card>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <p style={{ fontSize: '0.75rem', color: '#6B7280', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</p>
          <p style={{ fontSize: '2rem', fontWeight: 700, color: '#1B2D45', marginTop: '0.375rem', lineHeight: 1 }}>{value}</p>
          {sub && <p style={{ fontSize: '0.75rem', color: '#6B7280', marginTop: '0.375rem' }}>{sub}</p>}
        </div>
        <div style={{ background: color + '18', borderRadius: '0.75rem', padding: '0.75rem' }}>
          <Icon style={{ height: '1.25rem', width: '1.25rem', color }} />
        </div>
      </div>
    </Card>
  );

  if (!isConnected) {
    return (
      <div>
        {/* Demo banner */}
        <div style={{ background: 'linear-gradient(135deg, rgba(201,169,110,0.15), rgba(201,169,110,0.05))', border: '1px solid rgba(201,169,110,0.3)', borderRadius: '1rem', padding: '1.25rem 1.5rem', marginBottom: '1.75rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <BarChart2 style={{ height: '1.5rem', width: '1.5rem', color: '#C9A96E', flexShrink: 0 }} />
          <div>
            <p style={{ fontWeight: 600, color: '#1B2D45', fontSize: '0.875rem' }}>Showing demo data</p>
            <p style={{ color: '#6B7280', fontSize: '0.8rem' }}>
              Add your GA4 Measurement ID in <a href="/admin/content" style={{ color: '#C9A96E' }}>Content Editor → Site Settings</a> to see real analytics.
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 160px), 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          <MetricCard icon={Users} label="Sessions" value={mockData.sessions.toLocaleString()} sub="Last 30 days" color="#C9A96E" />
          <MetricCard icon={Eye} label="Page Views" value={mockData.pageViews.toLocaleString()} sub="Last 30 days" color="#1B2D45" />
          <MetricCard icon={TrendingUp} label="Avg. Duration" value={mockData.avgDuration} sub="Per session" color="#2DBD7A" />
          <MetricCard icon={Globe} label="Bounce Rate" value={mockData.bounceRate} sub="All pages" color="#8B5CF6" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1.5rem' }}>
          {/* Top Pages */}
          <Card>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1B2D45', marginBottom: '1.25rem' }}>Top Pages</h3>
            {mockData.topPages.map(p => (
              <div key={p.page} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div>
                  <p style={{ fontWeight: 500, color: '#1B2D45', fontSize: '0.875rem' }}>{p.label}</p>
                  <p style={{ color: '#9CA3AF', fontSize: '0.75rem' }}>{p.page}</p>
                </div>
                <span style={{ fontWeight: 700, color: '#C9A96E', fontSize: '0.9rem' }}>{p.views.toLocaleString()}</span>
              </div>
            ))}
          </Card>

          {/* Traffic Sources */}
          <Card>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1B2D45', marginBottom: '1.25rem' }}>Traffic Sources</h3>
            {mockData.sources.map(s => (
              <div key={s.source} style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
                  <span style={{ fontSize: '0.8rem', color: '#1B2D45' }}>{s.source}</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#6B7280' }}>{s.sessions}</span>
                </div>
                <div style={{ height: '6px', background: '#F3F4F6', borderRadius: '999px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${s.pct}%`, background: '#C9A96E', borderRadius: '999px', transition: 'width 1s ease' }} />
                </div>
              </div>
            ))}
          </Card>

          {/* Device breakdown */}
          <Card>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1B2D45', marginBottom: '1.25rem' }}>Devices</h3>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <div style={{ position: 'relative', width: '80px', height: '80px', flexShrink: 0 }}>
                <svg viewBox="0 0 80 80" style={{ transform: 'rotate(-90deg)' }}>
                  {mockData.devices.reduce((acc, d, i) => {
                    const offset = acc.offset;
                    const circ = 2 * Math.PI * 30;
                    const dash = (d.pct / 100) * circ;
                    const gap = circ - dash;
                    const el = (
                      <circle key={d.device} cx="40" cy="40" r="30" fill="none" stroke={d.color}
                        strokeWidth="16" strokeDasharray={`${dash} ${gap}`}
                        strokeDashoffset={-offset} />
                    );
                    acc.offset += dash;
                    acc.els.push(el);
                    return acc;
                  }, { offset: 0, els: [] as React.ReactNode[] }).els}
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                {mockData.devices.map(d => (
                  <div key={d.device} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: d.color, flexShrink: 0 }} />
                    <span style={{ fontSize: '0.8rem', color: '#1B2D45', flex: 1 }}>{d.device}</span>
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#6B7280' }}>{d.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', background: '#fff', borderRadius: '1.25rem', border: '1px solid #E5E7EB', textAlign: 'center' }}>
      <p style={{ color: '#6B7280' }}>Connected to GA4: <strong style={{ color: '#1B2D45' }}>{gaId}</strong></p>
      <p style={{ color: '#9CA3AF', fontSize: '0.875rem', marginTop: '0.5rem' }}>Real-time data requires Google Service Account credentials. Demo data shown above as reference.</p>
    </div>
  );
}
