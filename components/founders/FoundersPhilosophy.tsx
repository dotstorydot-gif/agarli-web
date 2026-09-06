'use client';

import { ShieldCheck, TrendingUp, UserCheck } from 'lucide-react';
import Reveal from '@/components/shared/Reveal';

type Card = {
  title: string;
  body: string;
};

type PhilosophyProps = {
  eyebrow: string;
  headline: string;
  cards: Card[];
};

const ICONS = [UserCheck, ShieldCheck, TrendingUp];

export default function FoundersPhilosophy({ eyebrow, headline, cards }: PhilosophyProps) {
  return (
    <section style={{ padding: '5rem 0 6rem', background: '#F0ECE4' }}>
      <div className="container-editorial">
        <div style={{ maxWidth: '44rem', margin: '0 auto', textAlign: 'center', marginBottom: '4rem' }}>
          <Reveal delay={0}>
            <div className="eyebrow" style={{ color: '#C9A96E' }}>{eyebrow}</div>
          </Reveal>
          <Reveal delay={120}>
            <h2
              className="display-lg"
              style={{ marginTop: '1.25rem', color: '#1B2D45', letterSpacing: '-0.03em' }}
            >
              {headline}
            </h2>
          </Reveal>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
          }}
        >
          {cards.map((card, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <Reveal key={card.title} delay={i * 120}>
                <div
                  style={{
                    background: '#ffffff',
                    borderRadius: '1.5rem',
                    padding: '2.5rem 2rem',
                    height: '100%',
                    border: '1px solid rgba(11,26,48,0.06)',
                    boxShadow: '0 4px 20px -8px rgba(11,26,48,0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.borderColor = 'rgba(201,169,110,0.4)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.borderColor = 'rgba(11,26,48,0.06)';
                  }}
                >
                  <div
                    style={{
                      width: '3rem',
                      height: '3rem',
                      borderRadius: '50%',
                      background: 'rgba(201,169,110,0.12)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#C9A96E',
                      marginBottom: '1.5rem',
                    }}
                  >
                    <Icon style={{ width: '1.4rem', height: '1.4rem' }} />
                  </div>
                  <h3
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      color: '#1B2D45',
                      marginBottom: '0.85rem',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.925rem',
                      lineHeight: 1.7,
                      color: '#6B7280',
                    }}
                  >
                    {card.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
