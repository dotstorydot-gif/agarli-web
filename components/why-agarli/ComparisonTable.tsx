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
          <div style={{ marginTop: '3rem' }}>
            {/* ── Desktop Table (Visible on md and up) ── */}
            <div className="comparison-table-desktop" style={{ borderRadius: '1.5rem', border: '1px solid rgba(11,26,48,0.12)', background: '#fff', overflow: 'hidden' }}>
              {/* Header */}
              <div style={{
                display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr',
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
                  display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr',
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

            {/* ── Mobile Comparison Table (Visible ONLY on mobile: Unified, crystal-clear side-by-side layout) ── */}
            <div
              className="comparison-table-mobile"
              style={{
                display: 'none',
                background: '#ffffff',
                borderRadius: '1.25rem',
                border: '1px solid rgba(11,26,48,0.12)',
                boxShadow: '0 8px 30px rgba(11,26,48,0.06)',
                overflow: 'hidden',
              }}
            >
              {/* Header */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '0.85fr 1.15fr 1fr',
                  background: '#0B1A30',
                  color: '#ffffff',
                  padding: '0.875rem 0.625rem',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Standard
                </div>
                <div
                  style={{
                    background: 'linear-gradient(135deg, #C9A96E 0%, #DFCA9E 100%)',
                    color: '#0B1A30',
                    fontWeight: 700,
                    fontSize: '0.725rem',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '9999px',
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.25rem',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                  }}
                >
                  <span>★ Agarli</span>
                </div>
                <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: '#94A3B8', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Traditional
                </div>
              </div>

              {/* Rows */}
              {rows.map((row, idx) => (
                <div
                  key={row.label}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '0.85fr 1.15fr 1fr',
                    gap: '0.5rem',
                    padding: '0.875rem 0.625rem',
                    alignItems: 'center',
                    background: idx % 2 === 1 ? 'rgba(247,245,242,0.45)' : '#ffffff',
                    borderBottom: idx === rows.length - 1 ? 'none' : '1px solid rgba(11,26,48,0.06)',
                  }}
                >
                  {/* Standard / Feature Label */}
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0B1A30', lineHeight: 1.25 }}>
                    {row.label}
                  </div>

                  {/* Agarli Column (Highlighted) */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.35rem',
                      background: 'rgba(201,169,110,0.08)',
                      border: '1px solid rgba(201,169,110,0.25)',
                      borderRadius: '0.5rem',
                      padding: '0.5rem 0.45rem',
                    }}
                  >
                    <Check style={{ height: '0.85rem', width: '0.85rem', flexShrink: 0, color: '#16A34A', marginTop: '1px' }} />
                    <span style={{ fontSize: '0.725rem', fontWeight: 600, color: '#0B1A30', lineHeight: 1.3 }}>
                      {row.agarli}
                    </span>
                  </div>

                  {/* Traditional Column (Muted) */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.35rem',
                      padding: '0.5rem 0.25rem',
                    }}
                  >
                    <Minus style={{ height: '0.85rem', width: '0.85rem', flexShrink: 0, color: '#94A3B8', marginTop: '1px' }} />
                    <span style={{ fontSize: '0.725rem', color: '#64748B', lineHeight: 1.3 }}>
                      {row.traditional}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Responsive CSS */}
        <style>{`
          @media (max-width: 768px) {
            .comparison-table-desktop {
              display: none !important;
            }
            .comparison-table-mobile {
              display: block !important;
            }
          }
          @media (min-width: 769px) {
            .comparison-table-desktop {
              display: block !important;
            }
            .comparison-table-mobile {
              display: none !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
}
