'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

type Props = {
  formsUrl: string;
  logoNavy?: string;
  logoWhite?: string;
};

const links = [
  { label: 'Home', href: '/' },
  { label: 'Why Agarli', href: '/why-agarli' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Founders', href: '/founders' },
];

export default function Header({ formsUrl, logoNavy = '/images/agarli-logo-navy.png', logoWhite = '/images/agarli-logo-white.png' }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHero = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const solid = scrolled || !isHero;
  const linkColor = solid ? 'rgba(27,45,69,0.75)' : 'rgba(255,255,255,0.85)';
  const linkHover = solid ? '#1B2D45' : '#fff';

  return (
    <header style={{
      position: 'fixed', inset: '0 0 auto 0', zIndex: 50,
      transition: 'all 0.5s cubic-bezier(0.22,1,0.36,1)',
      borderBottom: solid ? '1px solid rgba(11,26,48,0.1)' : '1px solid transparent',
      background: solid ? 'rgba(247,245,242,0.92)' : 'transparent',
      backdropFilter: solid ? 'blur(24px)' : 'none',
    }}>
      <nav className="container-editorial" style={{ display: 'flex', height: '84px', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <img
            src={solid ? logoNavy : logoWhite}
            alt="Agarli"
            style={{ height: 'clamp(2.75rem, 5vw, 3.5rem)', width: 'auto', maxHeight: '56px', objectFit: 'contain' }}
          />
        </Link>

        {/* Desktop Nav */}
        <div className="header-desktop-nav">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className="nav-link"
              style={{ color: pathname === l.href ? (solid ? '#1B2D45' : '#fff') : linkColor }}
              onMouseEnter={e => (e.currentTarget.style.color = linkHover)}
              onMouseLeave={e => (e.currentTarget.style.color = pathname === l.href ? (solid ? '#1B2D45' : '#fff') : linkColor)}
            >
              {l.label}
            </Link>
          ))}
          <a
            href={formsUrl || '#consultation'}
            data-open-consultation="true"
            className="btn-base btn-gold"
            style={{ padding: '0.65rem 1.25rem', fontSize: '0.82rem' }}
          >
            Book a Consultation
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          className="header-mobile-toggle"
          onClick={() => setMenuOpen(v => !v)}
          style={{
            background: solid ? 'rgba(27,45,69,0.06)' : 'rgba(255,255,255,0.12)',
            border: 'none',
            borderRadius: '0.625rem',
            cursor: 'pointer',
            padding: '0.625rem',
            color: solid ? '#1B2D45' : '#fff',
            transition: 'all 0.2s ease',
          }}
        >
          {menuOpen ? (
            <X style={{ width: '1.625rem', height: '1.625rem' }} />
          ) : (
            <Menu style={{ width: '1.625rem', height: '1.625rem' }} />
          )}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div
          style={{
            background: '#0B1A30',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            padding: '1.75rem clamp(1.5rem, 5vw, 2.5rem) 2.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
            animation: 'fadeIn 0.2s ease-out',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {links.map(l => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    color: active ? '#C9A96E' : 'rgba(255,255,255,0.88)',
                    fontSize: '1.1rem',
                    fontWeight: active ? 600 : 500,
                    padding: '0.75rem 0',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>{l.label}</span>
                  {active && (
                    <span style={{ fontSize: '0.7rem', color: '#C9A96E', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                      Current
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          <a
            href={formsUrl || '#consultation'}
            data-open-consultation="true"
            onClick={() => setMenuOpen(false)}
            className="btn-base btn-gold"
            style={{
              marginTop: '0.75rem',
              width: '100%',
              justifyContent: 'center',
              padding: '0.875rem',
              fontSize: '0.95rem',
            }}
          >
            Book a Consultation
          </a>
        </div>
      )}

      {/* Embedded CSS for reliable responsive switching */}
      <style>{`
        @media (min-width: 861px) {
          .header-desktop-nav {
            display: flex !important;
            align-items: center;
            gap: 2.25rem;
          }
          .header-mobile-toggle {
            display: none !important;
          }
        }
        @media (max-width: 860px) {
          .header-desktop-nav {
            display: none !important;
          }
          .header-mobile-toggle {
            display: flex !important;
            align-items: center;
            justify-content: center;
          }
        }
      `}</style>
    </header>
  );
}
