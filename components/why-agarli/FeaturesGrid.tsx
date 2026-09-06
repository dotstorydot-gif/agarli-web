'use client';
import { Coins, Sparkles, ShieldCheck, Scale, FileText, Handshake } from 'lucide-react';
import Reveal from '@/components/shared/Reveal';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  'coins': Coins,
  'sparkles': Sparkles,
  'shield-check': ShieldCheck,
  'scale': Scale,
  'file-text': FileText,
  'handshake': Handshake,
};

type Feature = { icon: string; title: string; body: string };
type Props = { features: Feature[] };

export default function FeaturesGrid({ features }: Props) {
  return (
    <section style={{ paddingBottom: '6rem' }}>
      <div className="container-editorial">
        <div style={{ display: 'grid', gap: '1.75rem', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          {features.map((f, i) => {
            const Icon = ICON_MAP[f.icon] || Coins;
            return (
              <Reveal key={f.title} delay={i * 110}>
                <article className="surface-card" style={{
                  height: '100%', padding: '2.25rem',
                  transition: 'all 0.5s cubic-bezier(0.22,1,0.36,1)',
                  cursor: 'default',
                }}
                  onMouseOver={e => {
                    const el = e.currentTarget;
                    el.style.transform = 'translateY(-8px)';
                    el.style.borderColor = 'rgba(201,169,110,0.45)';
                    el.style.boxShadow = '0 28px 70px -32px rgba(11,26,48,0.35)';
                    const icon = el.querySelector('.feature-icon') as HTMLElement;
                    if (icon) { icon.style.borderColor = 'rgba(201,169,110,0.6)'; icon.style.color = '#C9A96E'; }
                  }}
                  onMouseOut={e => {
                    const el = e.currentTarget;
                    el.style.transform = '';
                    el.style.borderColor = '';
                    el.style.boxShadow = '';
                    const icon = el.querySelector('.feature-icon') as HTMLElement;
                    if (icon) { icon.style.borderColor = 'rgba(11,26,48,0.15)'; icon.style.color = '#1B2D45'; }
                  }}
                >
                  <span className="feature-icon" style={{
                    display: 'grid', placeItems: 'center',
                    height: '2.75rem', width: '2.75rem',
                    borderRadius: '50%', border: '1px solid rgba(11,26,48,0.15)',
                    color: '#1B2D45', transition: 'all 0.5s',
                  }}>
                    <span style={{ display: 'inline-flex', height: '1.125rem', width: '1.125rem' }}><Icon /></span>
                  </span>
                  <h2 style={{ marginTop: '2rem', fontSize: '1.25rem', lineHeight: 1.25, fontWeight: 500, color: '#1B2D45' }}>
                    {f.title}
                  </h2>
                  <p style={{ marginTop: '1rem', fontSize: '0.95rem', lineHeight: 1.7, color: '#6B7280' }}>{f.body}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
