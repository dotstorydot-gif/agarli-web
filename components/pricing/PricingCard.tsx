import { Check } from 'lucide-react';
import Reveal from '@/components/shared/Reveal';

type Props = {
  feeCard: { eyebrow: string; percentage: string; description: string; footnote: string; ctaLabel: string };
  included: { eyebrow: string; items: string[]; footnote: string };
  formsUrl: string;
};

export default function PricingCard({ feeCard, included, formsUrl }: Props) {
  return (
    <section style={{ paddingBottom: '6rem' }}>
      <div className="container-editorial">
        <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          {/* Fee card */}
          <Reveal delay={0}>
            <div className="surface-card" style={{
              height: '100%', padding: '2.5rem',
              background: '#1B2D45', color: '#F7F5F2',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            }}>
              <div>
                <div className="eyebrow" style={{ color: 'rgba(201,169,110,0.85)' }}>{feeCard.eyebrow}</div>
                <div style={{ marginTop: '2.5rem', display: 'flex', alignItems: 'flex-end', gap: '0.5rem' }}>
                  <span style={{ fontSize: '5rem', lineHeight: 1, fontWeight: 500, letterSpacing: '-0.02em' }}>{feeCard.percentage}</span>
                  <span style={{ marginBottom: '0.75rem', fontSize: '1.5rem', color: '#C9A96E' }}>%</span>
                </div>
                <p style={{ marginTop: '1.25rem', fontSize: '0.875rem', lineHeight: 1.7, color: 'rgba(247,245,242,0.65)' }}>
                  {feeCard.description}
                </p>
              </div>
              <div style={{ marginTop: '3rem', borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: '2rem' }}>
                <p style={{ fontSize: '0.875rem', color: 'rgba(247,245,242,0.6)' }}>{feeCard.footnote}</p>
                <a href={formsUrl || '#consultation'} data-open-consultation="true" className="btn-base btn-gold" style={{ marginTop: '1.75rem', width: '100%', justifyContent: 'center' }}>
                  {feeCard.ctaLabel}
                </a>
              </div>
            </div>
          </Reveal>

          {/* Included */}
          <Reveal delay={140}>
            <div className="surface-card" style={{ height: '100%', padding: '2.5rem' }}>
              <div className="eyebrow" style={{ color: '#C9A96E' }}>{included.eyebrow}</div>
              <ul style={{ marginTop: '2.25rem', display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
                {included.items.map(item => (
                  <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.95rem', color: '#1B2D45' }}>
                    <Check style={{ height: '1rem', width: '1rem', flexShrink: 0, color: '#2DBD7A', marginTop: '2px' }} />
                    {item}
                  </li>
                ))}
              </ul>
              <p style={{ marginTop: '2.25rem', fontSize: '0.75rem', color: '#6B7280' }}>{included.footnote}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
