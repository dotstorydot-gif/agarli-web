'use client';
import Reveal from '@/components/shared/Reveal';

type Step = { number: string; title: string; body: string };
type Props = { eyebrow: string; headline: string; steps: Step[] };

export default function HowItWorksSection({ eyebrow, headline, steps }: Props) {
  return (
    <section style={{ background: '#F7F5F2', padding: '6rem 0' }}>
      <div className="container-editorial">
        <div style={{ maxWidth: '42rem' }}>
          <Reveal delay={0}>
            <div className="eyebrow" style={{ color: '#C9A96E' }}>{eyebrow}</div>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="display-lg" style={{ marginTop: '1.5rem', color: '#1B2D45' }}>{headline}</h2>
          </Reveal>
        </div>

        <div style={{ position: 'relative', marginTop: '4rem' }}>
          {/* Connector line */}
          <div style={{
            position: 'absolute', top: '3.6rem', left: '12%', right: '12%',
            height: '1px',
            background: 'linear-gradient(to right, transparent, rgba(201,169,110,0.45), transparent)',
          }} className="hidden md:block" />

          <div style={{ display: 'grid', gap: '1.75rem', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
            {steps.map((step, i) => (
              <Reveal key={step.number} delay={i * 160}>
                <article className="surface-card" style={{
                  height: '100%', padding: '2.5rem',
                  transition: 'all 0.5s cubic-bezier(0.22,1,0.36,1)',
                  cursor: 'default',
                }}
                  onMouseOver={e => {
                    const el = e.currentTarget;
                    el.style.transform = 'translateY(-8px)';
                    el.style.borderColor = 'rgba(201,169,110,0.45)';
                    el.style.boxShadow = '0 28px 70px -32px rgba(11,26,48,0.35)';
                    const num = el.querySelector('.step-num') as HTMLElement;
                    if (num) { num.style.background = '#C9A96E'; num.style.color = '#0B1A30'; }
                  }}
                  onMouseOut={e => {
                    const el = e.currentTarget;
                    el.style.transform = '';
                    el.style.borderColor = '';
                    el.style.boxShadow = '';
                    const num = el.querySelector('.step-num') as HTMLElement;
                    if (num) { num.style.background = '#1B2D45'; num.style.color = '#F7F5F2'; }
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span className="step-num" style={{
                      display: 'grid', placeItems: 'center',
                      height: '3rem', width: '3rem',
                      borderRadius: '50%',
                      background: '#1B2D45', color: '#F7F5F2',
                      fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em',
                      transition: 'all 0.5s',
                    }}>{step.number}</span>
                    <span style={{ flex: 1, height: '1px', background: 'rgba(11,26,48,0.12)', transition: 'background 0.5s' }} />
                  </div>
                  <h3 style={{ marginTop: '2.5rem', fontSize: '1.5rem', lineHeight: 1.25, fontWeight: 500, color: '#1B2D45' }}>
                    {step.title}
                  </h3>
                  <p style={{ marginTop: '1.25rem', fontSize: '0.95rem', lineHeight: 1.7, color: '#6B7280' }}>
                    {step.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
