'use client';
import Reveal from '@/components/shared/Reveal';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

type Props = { headline: string; headlineAccent: string; ctaLabel: string; bgImage: string; bgImageAlt: string };

export default function CTABanner({ headline, headlineAccent, ctaLabel, bgImage, bgImageAlt }: Props) {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', background: '#0B1A30' }}>
      <div style={{ position: 'absolute', inset: 0 }}>
        <img src={bgImage} alt={bgImageAlt} style={{ height: '100%', width: '100%', objectFit: 'cover', opacity: 0.35, transform: 'scale(1.05)' }} loading="lazy" />
      </div>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(11,26,48,0.7), rgba(11,26,48,0.6), rgba(11,26,48,0.9))' }} />
      <div className="container-editorial" style={{ position: 'relative', padding: '7rem 0', textAlign: 'center' }}>
        <Reveal delay={0}>
          <h2 className="display-lg" style={{ color: '#fff', maxWidth: '48rem', margin: '0 auto' }}>
            {headline}
            <span style={{ display: 'block', color: '#C9A96E', marginTop: '0.5rem' }}>{headlineAccent}</span>
          </h2>
        </Reveal>
        <Reveal delay={180}>
          <Link href="/why-agarli" className="btn-base btn-gold" style={{ marginTop: '2.5rem', display: 'inline-flex' }}>
            {ctaLabel} <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
