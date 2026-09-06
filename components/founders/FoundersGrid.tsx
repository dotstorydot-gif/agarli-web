'use client';

import { useState } from 'react';
import { Mail, Check, Copy, Shield, Award, Briefcase, ChevronRight } from 'lucide-react';
import Reveal from '@/components/shared/Reveal';

type Founder = {
  name: string;
  role: string;
  email: string;
  bio: string;
  image: string;
  highlights: string[];
};

type Props = {
  founders: Founder[];
};

export default function FoundersGrid({ founders }: Props) {
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const handleCopy = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => {
      setCopiedEmail(null);
    }, 2000);
  };

  return (
    <section style={{ paddingBottom: '6rem' }}>
      <div className="container-editorial">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: '2.5rem',
            alignItems: 'stretch',
          }}
        >
          {founders.map((f, i) => (
            <Reveal key={f.name} delay={i * 150}>
              <article
                className="surface-card"
                style={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '1.75rem',
                  overflow: 'hidden',
                  background: '#ffffff',
                  border: '1px solid rgba(11,26,48,0.08)',
                  boxShadow: '0 4px 20px -6px rgba(11,26,48,0.06), 0 20px 40px -15px rgba(11,26,48,0.08)',
                  transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s ease, border-color 0.4s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.borderColor = 'rgba(201,169,110,0.45)';
                  e.currentTarget.style.boxShadow = '0 28px 70px -25px rgba(11,26,48,0.18)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.borderColor = 'rgba(11,26,48,0.08)';
                  e.currentTarget.style.boxShadow = '0 4px 20px -6px rgba(11,26,48,0.06), 0 20px 40px -15px rgba(11,26,48,0.08)';
                }}
              >
                {/* Profile Header with Image & Badge */}
                <div
                  style={{
                    position: 'relative',
                    padding: 'clamp(1.5rem, 4vw, 2.25rem) clamp(1.25rem, 4vw, 2.25rem) 1.5rem',
                    background: 'linear-gradient(180deg, #FAF8F5 0%, #FFFFFF 100%)',
                    borderBottom: '1px solid rgba(11,26,48,0.05)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    {/* Executive Portrait */}
                    <div
                      style={{
                        position: 'relative',
                        width: '96px',
                        height: '96px',
                        borderRadius: '1.25rem',
                        overflow: 'hidden',
                        flexShrink: 0,
                        border: '2px solid rgba(201,169,110,0.6)',
                        boxShadow: '0 8px 24px -6px rgba(11,26,48,0.15)',
                      }}
                    >
                      <img
                        src={f.image}
                        alt={f.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                        }}
                      />
                    </div>

                    {/* Name & Title */}
                    <div>
                      <div
                        className="eyebrow"
                        style={{
                          color: '#C9A96E',
                          fontWeight: 700,
                          fontSize: '0.6875rem',
                          letterSpacing: '0.16em',
                        }}
                      >
                        {f.role}
                      </div>
                      <h2
                        style={{
                          marginTop: '0.35rem',
                          fontSize: '1.625rem',
                          fontWeight: 600,
                          color: '#1B2D45',
                          letterSpacing: '-0.025em',
                        }}
                      >
                        {f.name}
                      </h2>
                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          marginTop: '0.4rem',
                          fontSize: '0.75rem',
                          color: '#2DBD7A',
                          fontWeight: 600,
                        }}
                      >
                        <Shield style={{ width: '0.875rem', height: '0.875rem' }} />
                        <span>Agarli Founding Executive</span>
                      </div>
                    </div>
                  </div>

                  {/* Highlights Pills */}
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.5rem',
                      marginTop: '1.25rem',
                    }}
                  >
                    {f.highlights.map((highlight, hIdx) => (
                      <span
                        key={hIdx}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          padding: '0.3rem 0.65rem',
                          borderRadius: '9999px',
                          background: 'rgba(27,45,69,0.04)',
                          border: '1px solid rgba(27,45,69,0.08)',
                          fontSize: '0.75rem',
                          fontWeight: 500,
                          color: '#1B2D45',
                        }}
                      >
                        {hIdx === 0 ? (
                          <Briefcase style={{ width: '0.75rem', height: '0.75rem', color: '#C9A96E' }} />
                        ) : (
                          <Award style={{ width: '0.75rem', height: '0.75rem', color: '#C9A96E' }} />
                        )}
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bio Body */}
                <div
                  style={{
                    padding: '1.75rem clamp(1.25rem, 4vw, 2.25rem)',
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <p
                    style={{
                      fontSize: '0.975rem',
                      lineHeight: 1.8,
                      color: '#4B5563',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {f.bio}
                  </p>

                  {/* Direct Contact Bar */}
                  <div
                    style={{
                      marginTop: '2rem',
                      paddingTop: '1.5rem',
                      borderTop: '1px solid rgba(11,26,48,0.07)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '0.75rem',
                    }}
                  >
                    <a
                      href={`mailto:${f.email}`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        color: '#1B2D45',
                        padding: '0.5rem 0.85rem',
                        borderRadius: '0.75rem',
                        background: 'rgba(27,45,69,0.04)',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = '#1B2D45';
                        e.currentTarget.style.color = '#ffffff';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'rgba(27,45,69,0.04)';
                        e.currentTarget.style.color = '#1B2D45';
                      }}
                    >
                      <Mail style={{ width: '0.95rem', height: '0.95rem', color: '#C9A96E' }} />
                      <span>{f.email}</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => handleCopy(f.email)}
                      aria-label={`Copy ${f.name}'s email`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        fontSize: '0.775rem',
                        fontWeight: 500,
                        color: copiedEmail === f.email ? '#2DBD7A' : '#6B7280',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '0.35rem 0.6rem',
                        borderRadius: '0.5rem',
                        transition: 'color 0.2s ease',
                      }}
                    >
                      {copiedEmail === f.email ? (
                        <>
                          <Check style={{ width: '0.875rem', height: '0.875rem' }} />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy style={{ width: '0.875rem', height: '0.875rem' }} />
                          <span>Copy Email</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
