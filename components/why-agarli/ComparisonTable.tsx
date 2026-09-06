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

            {/* ── Mobile Comparison Cards (Visible ONLY on mobile, zero horizontal scrolling!) ── */}
            <div className="comparison-cards-mobile" style={{ display: 'none', flexDirection: 'column', gap: '1rem' }}>
              {rows.map(row => (
                <div
                  key={row.label}
                  style={{
                    background: '#ffffff',
                    borderRadius: '1.25rem',
                    padding: '1.25rem',
                    border: '1px solid rgba(11,26,48,0.08)',
                    boxShadow: '0 2px 10px rgba(11,26,48,0.03)',
                  }}
                >
                  <div
                    style={{
                      fontSize: '0.95rem',
                      fontWeight: 700,
                      color: '#1B2D45',
                      marginBottom: '0.875rem',
                      paddingBottom: '0.5rem',
                      borderBottom: '1px solid rgba(11,26,48,0.06)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span>{row.label}</span>
                    <span style={{ fontSize: '0.65rem', letterSpacing: '0.12em', color: '#6B7280', textTransform: 'uppercase' }}>
                      Comparison
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    {/* Agarli Pill */}
                    <div
                      style={{
                        background: 'rgba(201,169,110,0.08)',
                        border: '1px solid rgba(201,169,110,0.3)',
                        borderRadius: '0.875rem',
                        padding: '0.875rem 0.75rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          color: '#0B1A30',
                          fontWeight: 700,
                          fontSize: '0.75rem',
                          marginBottom: '0.35rem',
                        }}
                      >
                        <Check style={{ width: '0.85rem', height: '0.85rem', color: '#2DBD7A', flexShrink: 0 }} />
                        <span>Agarli</span>
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#1B2D45', lineHeight: 1.45, fontWeight: 500 }}>
                        {row.agarli}
                      </div>
                    </div>

                    {/* Traditional Pill */}
                    <div
                      style={{
                        background: 'rgba(247,245,242,0.7)',
                        border: '1px solid rgba(11,26,48,0.06)',
                        borderRadius: '0.875rem',
                        padding: '0.875rem 0.75rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          color: '#6B7280',
                          fontWeight: 600,
                          fontSize: '0.75rem',
                          marginBottom: '0.35rem',
                        }}
                      >
                        <Minus style={{ width: '0.85rem', height: '0.85rem', color: '#9CA3AF', flexShrink: 0 }} />
                        <span>Traditional</span>
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#6B7280', lineHeight: 1.45 }}>
                        {row.traditional}
                      </div>
                    </div>
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
            .comparison-cards-mobile {
              display: flex !important;
            }
          }
          @media (min-width: 769px) {
            .comparison-table-desktop {
              display: block !important;
            }
            .comparison-cards-mobile {
              display: none !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
}
