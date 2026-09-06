'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  FileEdit,
  Calendar,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';

const links = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/content', label: 'Content Editor', icon: FileEdit },
  { href: '/admin/calendar', label: 'Calendar', icon: Calendar },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const logout = async () => {
    await fetch('/api/auth', { method: 'DELETE' });
    router.push('/admin/login');
  };

  const currentLink = links.find(l => l.href === pathname) || { label: 'Admin Panel' };

  return (
    <div style={{ minHeight: '100vh', background: '#F1F0EE', display: 'flex', flexDirection: 'column' }}>
      {/* ── Mobile Top Header (Visible on < 1024px) ── */}
      <header
        className="admin-mobile-header"
        style={{
          display: 'none',
          position: 'sticky',
          top: 0,
          zIndex: 90,
          background: '#0B1A30',
          color: '#fff',
          padding: '0.875rem 1.25rem',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(v => !v)}
            aria-label="Toggle navigation menu"
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              borderRadius: '0.5rem',
              color: '#fff',
              padding: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            {mobileMenuOpen ? <X style={{ width: '1.25rem', height: '1.25rem' }} /> : <Menu style={{ width: '1.25rem', height: '1.25rem' }} />}
          </button>
          <img
            src="/images/agarli-logo-white.png"
            alt="Agarli"
            style={{ height: '1.85rem', width: 'auto', objectFit: 'contain' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.75rem', color: '#C9A96E', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {currentLink.label}
          </span>
        </div>
      </header>

      {/* ── Mobile Drawer Backdrop ── */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="admin-drawer-backdrop"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(11,26,48,0.7)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            zIndex: 99,
          }}
        />
      )}

      {/* ── Sidebar (Fixed on desktop, Slide drawer on mobile) ── */}
      <aside
        className={`admin-sidebar ${mobileMenuOpen ? 'open' : ''}`}
        style={{
          width: '260px',
          background: '#0B1A30',
          color: '#F7F5F2',
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 100,
          overflowY: 'auto',
          transition: 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        {/* Logo & Close for Mobile */}
        <div
          style={{
            padding: '1.5rem',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <img
              src="/images/agarli-logo-white.png"
              alt="Agarli"
              style={{ height: '2.5rem', width: 'auto', objectFit: 'contain' }}
            />
            <p
              style={{
                fontSize: '0.6875rem',
                color: 'rgba(247,245,242,0.4)',
                marginTop: '0.375rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              Admin Panel
            </p>
          </div>

          <button
            type="button"
            className="admin-sidebar-close"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
            style={{
              display: 'none',
              background: 'rgba(255,255,255,0.08)',
              border: 'none',
              borderRadius: '50%',
              color: '#fff',
              padding: '0.4rem',
              cursor: 'pointer',
            }}
          >
            <X style={{ width: '1.1rem', height: '1.1rem' }} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav style={{ padding: '1rem 0.75rem', flex: 1 }}>
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  borderRadius: '0.75rem',
                  marginBottom: '0.35rem',
                  textDecoration: 'none',
                  color: active ? '#0B1A30' : 'rgba(247,245,242,0.7)',
                  background: active ? '#C9A96E' : 'transparent',
                  fontSize: '0.875rem',
                  fontWeight: active ? 600 : 400,
                  transition: 'all 0.2s',
                }}
              >
                <Icon style={{ height: '1.1rem', width: '1.1rem', flexShrink: 0 }} />
                <span style={{ flex: 1 }}>{label}</span>
                {active && <ChevronRight style={{ width: '0.85rem', height: '0.85rem', opacity: 0.6 }} />}
              </Link>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div style={{ padding: '1rem 0.75rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1rem',
              borderRadius: '0.75rem',
              marginBottom: '0.25rem',
              color: 'rgba(247,245,242,0.6)',
              fontSize: '0.875rem',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
          >
            <ExternalLink style={{ height: '1.1rem', width: '1.1rem' }} />
            <span>View Website</span>
          </a>

          <button
            onClick={logout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1rem',
              borderRadius: '0.75rem',
              width: '100%',
              color: 'rgba(247,245,242,0.6)',
              background: 'none',
              border: 'none',
              fontSize: '0.875rem',
              cursor: 'pointer',
              fontFamily: 'inherit',
              transition: 'color 0.2s',
              textAlign: 'left',
            }}
          >
            <LogOut style={{ height: '1.1rem', width: '1.1rem' }} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ── Main Content Area ── */}
      <main className="admin-main-content">
        {children}
      </main>

      {/* ── Mobile Responsive CSS ── */}
      <style>{`
        @media (max-width: 1023px) {
          .admin-mobile-header {
            display: flex !important;
          }
          .admin-sidebar {
            transform: translateX(-100%);
            box-shadow: 10px 0 30px rgba(0,0,0,0.3);
          }
          .admin-sidebar.open {
            transform: translateX(0) !important;
          }
          .admin-sidebar-close {
            display: flex !important;
          }
          .admin-main-content {
            margin-left: 0 !important;
            width: 100% !important;
            padding: 0 !important;
            overflow-x: hidden;
          }
        }
        @media (min-width: 1024px) {
          .admin-sidebar {
            transform: translateX(0) !important;
          }
          .admin-main-content {
            margin-left: 260px !important;
            min-height: 100vh;
            flex: 1;
            overflow-x: hidden;
          }
        }
      `}</style>
    </div>
  );
}
