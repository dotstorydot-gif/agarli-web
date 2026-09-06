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
        <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }} className="hidden md:flex">
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

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label="Toggle menu"
          className="md:hidden"
          onClick={() => setMenuOpen(v => !v)}
          style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem',
            color: solid ? '#1B2D45' : '#fff',
          }}
        >
          {menuOpen ? <X style={{ width: '1.375rem', height: '1.375rem' }} /> : <Menu style={{ width: '1.375rem', height: '1.375rem' }} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          background: '#0B1A30',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          padding: '1.5rem clamp(1.5rem,5vw,4rem)',
          display: 'flex', flexDirection: 'column', gap: '1.25rem',
        }}>
          {links.map(l => (
            <Link key={l.href} href={l.href} style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem', fontWeight: 500 }}>
              {l.label}
            </Link>
          ))}
          <a href={formsUrl || '#consultation'} data-open-consultation="true" className="btn-base btn-gold" style={{ textAlign: 'center' }}>
            Book a Consultation
          </a>
        </div>
      )}
    </header>
  );
}
