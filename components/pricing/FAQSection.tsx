'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Reveal from '@/components/shared/Reveal';

type Item = { question: string; answer: string };
type Props = { eyebrow: string; headline: string; items: Item[] };

export default function FAQSection({ eyebrow, headline, items }: Props) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section style={{ background: 'rgba(247,245,242,0.6)', padding: '6rem 0' }}>
      <div className="container-editorial" style={{ display: 'grid', gap: '4rem', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
        <div>
          <Reveal delay={0}>
            <div className="eyebrow" style={{ color: '#C9A96E' }}>{eyebrow}</div>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="display-lg" style={{ marginTop: '1.5rem', color: '#1B2D45' }}>{headline}</h2>
          </Reveal>
        </div>
        <div style={{ borderTop: '1px solid rgba(11,26,48,0.12)' }}>
          {items.map((item, i) => (
            <Reveal key={i} delay={i * 90}>
              <div style={{ borderBottom: '1px solid rgba(11,26,48,0.12)' }}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  style={{
                    width: '100%', textAlign: 'left', padding: '2rem 0',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontSize: '1.0625rem', fontWeight: 500, color: '#1B2D45',
                    fontFamily: 'inherit',
                  }}
                >
                  {item.question}
                  <ChevronDown style={{
                    height: '1.25rem', width: '1.25rem', flexShrink: 0, color: '#C9A96E',
                    transform: open === i ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease',
                  }} />
                </button>
                {open === i && (
                  <p style={{ paddingBottom: '2rem', fontSize: '0.95rem', lineHeight: 1.7, color: '#6B7280' }}>
                    {item.answer}
                  </p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
