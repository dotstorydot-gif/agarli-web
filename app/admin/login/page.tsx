'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      router.push('/admin');
    } else {
      setError('Incorrect password. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, #0B1A30 0%, #1B2D45 100%)',
      padding: '1.25rem',
    }}>
      <div style={{
        background: '#fff', borderRadius: '1.5rem', padding: 'clamp(1.75rem, 5vw, 3rem)',
        width: '100%', maxWidth: '420px', boxShadow: '0 40px 80px -20px rgba(0,0,0,0.4)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <img src="/images/agarli-logo-navy.png" alt="Agarli" style={{ height: '3.5rem', width: 'auto', margin: '0 auto 1.5rem', objectFit: 'contain' }} />
          <h1 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#1B2D45', marginBottom: '0.5rem' }}>Admin Panel</h1>
          <p style={{ color: '#6B7280', fontSize: '0.875rem' }}>Enter your password to access the dashboard</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#1B2D45', marginBottom: '0.5rem' }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter admin password"
              required
              style={{
                width: '100%', padding: '0.75rem 1rem', borderRadius: '0.75rem',
                border: '1.5px solid #E5E7EB', fontSize: '0.875rem',
                outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => (e.target.style.borderColor = '#C9A96E')}
              onBlur={e => (e.target.style.borderColor = '#E5E7EB')}
            />
          </div>
          {error && (
            <div style={{ marginBottom: '1rem', padding: '0.75rem', background: '#FEF2F2', borderRadius: '0.5rem', color: '#DC2626', fontSize: '0.875rem' }}>
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%', padding: '0.875rem', background: '#C9A96E', color: '#0B1A30',
              border: 'none', borderRadius: '999px', fontSize: '0.875rem', fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1,
              transition: 'all 0.2s', fontFamily: 'inherit',
            }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
