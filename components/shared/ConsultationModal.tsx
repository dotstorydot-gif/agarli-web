'use client';

import { useState, useEffect } from 'react';
import { X, CheckCircle2, MessageSquare, Phone, Mail, User, MapPin, Home, ArrowRight, Loader2 } from 'lucide-react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  whatsappNumber?: string;
};

export default function ConsultationModal({
  isOpen,
  onClose,
  whatsappNumber = '+201020130946',
}: Props) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [propertyLocation, setPropertyLocation] = useState('New Cairo (Tagamoa)');
  const [propertyType, setPropertyType] = useState('Standalone Villa');
  const [notes, setNotes] = useState('');

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !phone.trim() || !email.trim()) {
      setError('Please fill in your name, phone number, and email.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email,
          propertyLocation,
          propertyType,
          notes,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit inquiry.');
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const cleanWaNumber = whatsappNumber.replace(/[^0-9]/g, '');
  const waChatUrl = `https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(
    `Hello Agarli, I just submitted a consultation request for my property in ${propertyLocation} (${propertyType}).`
  )}`;

  const resetAndClose = () => {
    setSubmitted(false);
    setError('');
    setName('');
    setPhone('');
    setEmail('');
    setNotes('');
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.25rem',
        background: 'rgba(11, 26, 48, 0.78)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        animation: 'fadeIn 0.25s ease-out',
      }}
      onClick={e => {
        if (e.target === e.currentTarget) resetAndClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '34rem',
          maxHeight: '92vh',
          overflowY: 'auto',
          background: '#ffffff',
          borderRadius: '1.75rem',
          border: '1px solid rgba(201, 169, 110, 0.3)',
          boxShadow: '0 25px 70px -15px rgba(11, 26, 48, 0.35)',
          padding: '2.5rem clamp(1.5rem, 5vw, 2.5rem)',
        }}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={resetAndClose}
          aria-label="Close dialog"
          style={{
            position: 'absolute',
            top: '1.5rem',
            right: '1.5rem',
            background: 'rgba(27, 45, 69, 0.05)',
            border: 'none',
            borderRadius: '50%',
            width: '2.25rem',
            height: '2.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#1B2D45',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(27, 45, 69, 0.12)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'rgba(27, 45, 69, 0.05)')}
        >
          <X style={{ width: '1.15rem', height: '1.15rem' }} />
        </button>

        {submitted ? (
          /* Success Screen */
          <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
            <div
              style={{
                width: '4rem',
                height: '4rem',
                borderRadius: '50%',
                background: 'rgba(45, 189, 122, 0.12)',
                color: '#2DBD7A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
              }}
            >
              <CheckCircle2 style={{ width: '2.25rem', height: '2.25rem' }} />
            </div>

            <div className="eyebrow" style={{ color: '#C9A96E' }}>Request Confirmed</div>
            <h2
              id="modal-headline"
              style={{
                fontSize: '1.625rem',
                fontWeight: 600,
                color: '#1B2D45',
                marginTop: '0.5rem',
                letterSpacing: '-0.025em',
              }}
            >
              Thank You, {name || 'Valued Owner'}.
            </h2>
            <p
              style={{
                fontSize: '0.95rem',
                color: '#6B7280',
                lineHeight: 1.7,
                marginTop: '0.85rem',
                maxWidth: '26rem',
                marginInline: 'auto',
              }}
            >
              Your property details have been delivered to our management team. An asset manager will reach out within 2 business hours.
            </p>

            <div
              style={{
                marginTop: '2rem',
                padding: '1.25rem',
                borderRadius: '1rem',
                background: '#FAF8F5',
                border: '1px solid rgba(201, 169, 110, 0.2)',
                textAlign: 'left',
              }}
            >
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#C9A96E', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Summary
              </div>
              <div style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#1B2D45', lineHeight: 1.6 }}>
                <strong>Property:</strong> {propertyType} in {propertyLocation}
                <br />
                <strong>Direct Contact:</strong> {phone} · {email}
              </div>
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <a
                href={waChatUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-base"
                style={{
                  background: '#25D366',
                  color: '#ffffff',
                  boxShadow: '0 10px 25px -6px rgba(37, 211, 102, 0.4)',
                }}
              >
                <MessageSquare style={{ width: '1.1rem', height: '1.1rem' }} />
                <span>Connect Instantly on WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={resetAndClose}
                className="btn-base btn-ghost-dark"
                style={{ padding: '0.75rem' }}
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Form Screen */
          <div>
            <div className="eyebrow" style={{ color: '#C9A96E' }}>Complimentary Review</div>
            <h2
              id="modal-headline"
              style={{
                fontSize: '1.625rem',
                fontWeight: 600,
                color: '#1B2D45',
                marginTop: '0.4rem',
                letterSpacing: '-0.025em',
              }}
            >
              Book a Consultation
            </h2>
            <p
              style={{
                fontSize: '0.875rem',
                color: '#6B7280',
                lineHeight: 1.6,
                marginTop: '0.5rem',
              }}
            >
              Share your property details. Our team prepares a tailored asset strategy, rental yield analysis, and management framework with zero obligation.
            </p>

            {error && (
              <div
                style={{
                  marginTop: '1rem',
                  padding: '0.75rem 1rem',
                  background: '#FEE2E2',
                  border: '1px solid #FCA5A5',
                  borderRadius: '0.625rem',
                  color: '#991B1B',
                  fontSize: '0.825rem',
                }}
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Name */}
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#4B5563', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.35rem' }}>
                  Full Name *
                </label>
                <div style={{ position: 'relative' }}>
                  <User style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', width: '1rem', height: '1rem', color: '#9CA3AF' }} />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Omar El-Sayed"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.7rem 0.85rem 0.7rem 2.4rem',
                      border: '1.5px solid #E5E7EB',
                      borderRadius: '0.75rem',
                      fontSize: '0.875rem',
                      color: '#1B2D45',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                    onFocus={e => (e.target.style.borderColor = '#C9A96E')}
                    onBlur={e => (e.target.style.borderColor = '#E5E7EB')}
                  />
                </div>
              </div>

              {/* Phone & Email Row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#4B5563', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.35rem' }}>
                    Phone / WhatsApp *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Phone style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', width: '1rem', height: '1rem', color: '#9CA3AF' }} />
                    <input
                      type="tel"
                      required
                      placeholder="+20 100 000 0000"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.7rem 0.85rem 0.7rem 2.4rem',
                        border: '1.5px solid #E5E7EB',
                        borderRadius: '0.75rem',
                        fontSize: '0.875rem',
                        color: '#1B2D45',
                        outline: 'none',
                        boxSizing: 'border-box',
                      }}
                      onFocus={e => (e.target.style.borderColor = '#C9A96E')}
                      onBlur={e => (e.target.style.borderColor = '#E5E7EB')}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#4B5563', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.35rem' }}>
                    Email Address *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Mail style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', width: '1rem', height: '1rem', color: '#9CA3AF' }} />
                    <input
                      type="email"
                      required
                      placeholder="owner@example.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.7rem 0.85rem 0.7rem 2.4rem',
                        border: '1.5px solid #E5E7EB',
                        borderRadius: '0.75rem',
                        fontSize: '0.875rem',
                        color: '#1B2D45',
                        outline: 'none',
                        boxSizing: 'border-box',
                      }}
                      onFocus={e => (e.target.style.borderColor = '#C9A96E')}
                      onBlur={e => (e.target.style.borderColor = '#E5E7EB')}
                    />
                  </div>
                </div>
              </div>

              {/* Location & Property Type */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#4B5563', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.35rem' }}>
                    Property Location
                  </label>
                  <select
                    value={propertyLocation}
                    onChange={e => setPropertyLocation(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.7rem 0.85rem',
                      border: '1.5px solid #E5E7EB',
                      borderRadius: '0.75rem',
                      fontSize: '0.875rem',
                      color: '#1B2D45',
                      background: '#fff',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  >
                    <option value="New Cairo (Tagamoa)">New Cairo (Tagamoa)</option>
                    <option value="Sheikh Zayed">Sheikh Zayed</option>
                    <option value="6th of October">6th of October</option>
                    <option value="North Coast (Sahel)">North Coast (Sahel)</option>
                    <option value="Red Sea / El Gouna">Red Sea / El Gouna</option>
                    <option value="Maadi / Zamalek">Maadi / Zamalek</option>
                    <option value="New Administrative Capital">New Capital</option>
                    <option value="Other Location in Egypt">Other Location</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#4B5563', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.35rem' }}>
                    Property Type
                  </label>
                  <select
                    value={propertyType}
                    onChange={e => setPropertyType(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.7rem 0.85rem',
                      border: '1.5px solid #E5E7EB',
                      borderRadius: '0.75rem',
                      fontSize: '0.875rem',
                      color: '#1B2D45',
                      background: '#fff',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  >
                    <option value="Standalone Villa">Standalone Villa</option>
                    <option value="Townhouse / Twinhouse">Townhouse / Twinhouse</option>
                    <option value="Luxury Apartment">Luxury Apartment</option>
                    <option value="Penthouse / Duplex">Penthouse / Duplex</option>
                    <option value="Chalet (Sahel / Gouna)">Chalet (Sahel / Gouna)</option>
                    <option value="Other">Other Asset</option>
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#4B5563', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.35rem' }}>
                  Additional Details (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Current condition, furnishing status, or target timeline..."
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.7rem 0.85rem',
                    border: '1.5px solid #E5E7EB',
                    borderRadius: '0.75rem',
                    fontSize: '0.875rem',
                    color: '#1B2D45',
                    outline: 'none',
                    resize: 'none',
                    boxSizing: 'border-box',
                  }}
                  onFocus={e => (e.target.style.borderColor = '#C9A96E')}
                  onBlur={e => (e.target.style.borderColor = '#E5E7EB')}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="btn-base btn-gold"
                style={{
                  marginTop: '0.5rem',
                  padding: '0.9rem',
                  width: '100%',
                  opacity: loading ? 0.7 : 1,
                  cursor: loading ? 'not-allowed' : 'pointer',
                }}
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" style={{ width: '1.1rem', height: '1.1rem' }} />
                    <span>Submitting Request...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Consultation Request</span>
                    <ArrowRight style={{ width: '1rem', height: '1rem' }} />
                  </>
                )}
              </button>

              <p style={{ textAlign: 'center', fontSize: '0.725rem', color: '#9CA3AF', margin: 0 }}>
                🔒 Strict confidentiality. Your details are never shared.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
