'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Coins, ShieldCheck, Scale, TrendingUp, KeyRound } from 'lucide-react';

const CARD_ITEMS = [
  { Icon: Coins, label: 'Guaranteed Income', note: 'Monthly, on time' },
  { Icon: ShieldCheck, label: 'Asset Protected', note: 'Inspected quarterly' },
  { Icon: Scale, label: 'Legal Compliance', note: 'Contracts & permits' },
  { Icon: TrendingUp, label: 'Transparent Reporting', note: 'Every statement' },
  { Icon: KeyRound, label: 'Fully Managed', note: 'End to end' },
];

type HeroData = {
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  body: string;
  ctaLabel: string;
  learnMoreLabel: string;
  heroImage: string;
  heroImageAlt: string;
};

type Props = { data: HeroData; formsUrl: string };

export default function HeroSection({ data, formsUrl }: Props) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => {
      if (imgRef.current) {
        imgRef.current.style.transform = `translateY(${window.scrollY * 0.3}px) scale(1.08)`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section style={{ position: 'relative', minHeight: '100svh', display: 'flex', alignItems: 'flex-end', overflow: 'hidden' }}>
      {/* Parallax background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <img
          ref={imgRef}
          src={data.heroImage}
          alt={data.heroImageAlt}
          style={{ width: '100%', height: '115%', objectFit: 'cover', display: 'block', transform: 'scale(1.08)', transformOrigin: 'center top' }}
        />
        {/* Gradient overlay — matches Lovable: dark bottom, lighter top */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(11,26,48,0.92) 0%, rgba(11,26,48,0.55) 45%, rgba(11,26,48,0.35) 100%)',
        }} />
      </div>

      {/* Content */}
      <div className="container-editorial" style={{ position: 'relative', zIndex: 1, paddingTop: '8rem', paddingBottom: '5rem', width: '100%' }}>
        <div style={{
          display: 'grid',
          gap: '3rem',
          alignItems: 'flex-end',
          gridTemplateColumns: 'minmax(0,1.1fr) minmax(0,0.85fr)',
        }} className="hero-grid">

          {/* LEFT — Text */}
          <div style={{ maxWidth: '44rem' }}>
            <div className="eyebrow" style={{ color: 'rgba(201,169,110,0.9)' }}>{data.eyebrow}</div>

            <h1 className="display-xl" style={{ marginTop: '1.5rem', color: '#fff' }}>
              {data.headline}
              <br />
              <span style={{ color: 'rgba(255,255,255,0.6)' }}>{data.headlineAccent}</span>
            </h1>

            <p style={{
              marginTop: '1.75rem',
              fontSize: 'clamp(0.9375rem, 1.2vw, 1.0625rem)',
              lineHeight: 1.75,
              color: 'rgba(255,255,255,0.65)',
              maxWidth: '34rem',
            }}>{data.body}</p>

            <div style={{ marginTop: '2.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.875rem' }}>
              <a href={formsUrl || '#consultation'} data-open-consultation="true" className="btn-base btn-gold">
                {data.ctaLabel}
              </a>
              <Link href="/why-agarli" className="btn-base btn-ghost-light">
                {data.learnMoreLabel} <ArrowRight style={{ width: '1rem', height: '1rem' }} />
              </Link>
            </div>
          </div>

          {/* RIGHT — Floating card */}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div
              className="animate-float"
              style={{
                borderRadius: '1.5rem',
                background: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(28px)',
                border: '1px solid rgba(255,255,255,0.18)',
                padding: '1.75rem',
                width: '100%',
                maxWidth: '360px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <span className="eyebrow" style={{ color: 'rgba(255,255,255,0.5)' }}>Your Property, Managed</span>
                <span style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#2DBD7A', fontWeight: 600 }}>Active</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.125rem' }}>
                {CARD_ITEMS.map(({ Icon, label, note }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{
                      display: 'grid', placeItems: 'center',
                      width: '2.25rem', height: '2.25rem', flexShrink: 0,
                      borderRadius: '50%',
                      border: '1px solid rgba(255,255,255,0.2)',
                      color: '#C9A96E',
                    }}>
                      <Icon style={{ width: '1rem', height: '1rem' }} />
                    </span>
                    <span style={{ flex: 1, fontSize: '0.9rem', fontWeight: 500, color: '#fff' }}>{label}</span>
                    <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', whiteSpace: 'nowrap' }}>{note}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile grid fix */}
      <style>{`
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
          .hero-grid > div:last-child {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
