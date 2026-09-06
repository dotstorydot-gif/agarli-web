'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Inbox, FileEdit, Calendar, Settings, LogOut, ExternalLink } from 'lucide-react';
import Image from 'next/image';

const links = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/content', label: 'Content Editor', icon: FileEdit },
  { href: '/admin/calendar', label: 'Calendar', icon: Calendar },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    await fetch('/api/auth', { method: 'DELETE' });
    router.push('/admin/login');
  };

  return (
    <aside style={{
      width: '260px', background: '#0B1A30', color: '#F7F5F2',
      position: 'fixed', top: 0, left: 0, height: '100vh',
      display: 'flex', flexDirection: 'column', zIndex: 100,
      overflowY: 'auto',
    }}>
      {/* Logo */}
      <div style={{ padding: '1.75rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <img src="/images/agarli-logo-white.png" alt="Agarli" style={{ height: '2.75rem', width: 'auto', objectFit: 'contain' }} />
        <p style={{ fontSize: '0.7rem', color: 'rgba(247,245,242,0.4)', marginTop: '0.5rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Admin Panel</p>
      </div>

      {/* Nav */}
      <nav style={{ padding: '1rem 0.75rem', flex: 1 }}>
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link key={href} href={href} style={{
              display: 'flex', alignItems: 'center', gap: '0.75rem',
              padding: '0.75rem 1rem', borderRadius: '0.75rem',
              marginBottom: '0.25rem', textDecoration: 'none',
              color: active ? '#0B1A30' : 'rgba(247,245,242,0.7)',
              background: active ? '#C9A96E' : 'transparent',
              fontSize: '0.875rem', fontWeight: active ? 600 : 400,
              transition: 'all 0.2s',
            }}>
              <Icon style={{ height: '1.1rem', width: '1.1rem', flexShrink: 0 }} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div style={{ padding: '1rem 0.75rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <a href="/" target="_blank" rel="noreferrer" style={{
          display: 'flex', alignItems: 'center', gap: '0.75rem',
          padding: '0.75rem 1rem', borderRadius: '0.75rem', marginBottom: '0.25rem',
          color: 'rgba(247,245,242,0.5)', fontSize: '0.875rem', textDecoration: 'none',
          transition: 'color 0.2s',
        }}>
          <ExternalLink style={{ height: '1.1rem', width: '1.1rem' }} />
          View Website
        </a>
        <button onClick={logout} style={{
          display: 'flex', alignItems: 'center', gap: '0.75rem',
          padding: '0.75rem 1rem', borderRadius: '0.75rem', width: '100%',
          color: 'rgba(247,245,242,0.5)', background: 'none', border: 'none',
          fontSize: '0.875rem', cursor: 'pointer', fontFamily: 'inherit',
          transition: 'color 0.2s', textAlign: 'left',
        }}>
          <LogOut style={{ height: '1.1rem', width: '1.1rem' }} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
