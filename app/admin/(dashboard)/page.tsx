import { getContent } from '@/lib/content';
import AnalyticsDashboard from '@/components/admin/AnalyticsDashboard';

export default function AdminDashboard() {
  const c = getContent();
  return (
    <div style={{ padding: '2.5rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 600, color: '#1B2D45', marginBottom: '0.375rem' }}>Dashboard</h1>
        <p style={{ color: '#6B7280', fontSize: '0.875rem' }}>
          {c.site.googleAnalyticsId ? 'Live analytics from Google Analytics 4' : 'Connect Google Analytics in Settings to see live data'}
        </p>
      </div>
      <AnalyticsDashboard gaId={c.site.googleAnalyticsId} />
    </div>
  );
}
