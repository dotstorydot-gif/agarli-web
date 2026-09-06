'use client';
import Link from 'next/link';
import Image from 'next/image';

type Props = {
  tagline: string;
  copyright: string;
  license: string;
  phone: string;
  phoneHref: string;
  email: string;
  whatsapp: string;
  location: string;
  formsUrl: string;
  logoWhite?: string;
};

export default function Footer(props: Props) {
  return (
    <footer style={{ background: '#1B2D45', color: '#F7F5F2' }}>
      <div className="container-editorial py-20">
        <div style={{ display: 'grid', gap: '3.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
          {/* Brand */}
          <div style={{ maxWidth: '22rem' }}>
            <img
              src={props.logoWhite || "/images/agarli-logo-white.png"}
              alt="Agarli"
              style={{ height: '3.25rem', width: 'auto', display: 'block', objectFit: 'contain' }}
            />
            <p style={{ marginTop: '1.25rem', fontSize: '0.875rem', lineHeight: 1.7, color: 'rgba(247,245,242,0.65)' }}>
              {props.tagline}
            </p>
            <div style={{ marginTop: '2rem', height: '1px', width: '6rem', background: 'rgba(201,169,110,0.6)' }} />
            <p style={{ marginTop: '1.5rem', fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(247,245,242,0.45)' }}>
              {props.location}
            </p>
          </div>

          {/* Navigate */}
          <div>
            <div className="eyebrow" style={{ color: 'rgba(201,169,110,0.8)' }}>Navigate</div>
            <ul style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem', color: 'rgba(247,245,242,0.7)' }}>
              {[['Home', '/'], ['Why Agarli', '/why-agarli'], ['Pricing', '/pricing'], ['Founders', '/founders']].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} style={{ transition: 'color 0.2s' }} onMouseOver={e => (e.currentTarget.style.color = '#F7F5F2')} onMouseOut={e => (e.currentTarget.style.color = '')}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="eyebrow" style={{ color: 'rgba(201,169,110,0.8)' }}>Speak with us</div>
            <ul style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem', color: 'rgba(247,245,242,0.7)' }}>
              <li><a href={props.phoneHref}>{props.phone}</a></li>
              <li><a href={`mailto:${props.email}`}>{props.email}</a></li>
              <li><a href={props.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a></li>
            </ul>
            <a href={props.formsUrl || '#consultation'} data-open-consultation="true" className="btn-base btn-gold" style={{ marginTop: '2rem', padding: '0.625rem 1.25rem', fontSize: '0.82rem', display: 'inline-flex' }}>
              Book a Consultation
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ marginTop: '4rem', display: 'flex', flexWrap: 'wrap', gap: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.75rem', fontSize: '0.75rem', color: 'rgba(247,245,242,0.45)', justifyContent: 'space-between' }}>
          <span>© {props.copyright} Agarli. All rights reserved.</span>
          <span>{props.license}</span>
        </div>
      </div>
    </footer>
  );
}
