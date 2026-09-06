'use client';
import { Check, Minus } from 'lucide-react';
import Reveal from '@/components/shared/Reveal';

type Row = { label: string; agarli: string; traditional: string };
type Props = { headline: string; rows: Row[] };

export default function ComparisonTable({ headline, rows }: Props) {
  return (
    <section style={{ background: 'rgba(247,245,242,0.6)', padding: '5rem 0' }}>
      <div className="container-editorial">
        <Reveal delay={0}>
          <h2 className="display-lg" style={{ maxWidth: '28rem', color: '#1B2D45' }}>{headline}</h2>
        </Reveal>
        <Reveal delay={140}>
          <div style={{ marginTop: '3rem', overflow: 'hidden', borderRadius: '1.5rem', border: '1px solid rgba(11,26,48,0.12)', background: '#fff' }}>
            {/* Header */}
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
              gap: '1rem', borderBottom: '1px solid rgba(11,26,48,0.12)',
              padding: '1.25rem 2.5rem', alignItems: 'center',
            }}>
              <span className="eyebrow" style={{ color: '#6B7280' }}>Standard</span>
              <span style={{ fontSize: '0.875rem', fontWeight: 600, letterSpacing: '-0.01em', color: '#1B2D45' }}>Agarli</span>
              <span style={{ fontSize: '0.875rem', fontWeight: 500, color: '#6B7280' }}>Traditional</span>
            </div>
            {/* Rows */}
            {rows.map(row => (
              <div key={row.label} style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
                gap: '1rem', borderBottom: '1px solid rgba(11,26,48,0.07)',
                padding: '1.25rem 2.5rem', alignItems: 'flex-start',
                transition: 'background 0.2s',
              }}
                onMouseOver={e => (e.currentTarget.style.background = 'rgba(247,245,242,0.5)')}
                onMouseOut={e => (e.currentTarget.style.background = '')}
              >
                <span style={{ fontSize: '0.875rem', fontWeight: 500, color: '#1B2D45' }}>{row.label}</span>
                <span style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem', fontSize: '0.875rem', color: '#1B2D45' }}>
                  <Check style={{ height: '1rem', width: '1rem', flexShrink: 0, color: '#2DBD7A', marginTop: '2px' }} />
                  {row.agarli}
                </span>
                <span style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem', fontSize: '0.875rem', color: '#6B7280' }}>
                  <Minus style={{ height: '1rem', width: '1rem', flexShrink: 0, marginTop: '2px' }} />
                  {row.traditional}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
