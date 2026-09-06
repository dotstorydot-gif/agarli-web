'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Reveal from '@/components/shared/Reveal';
import { CheckCircle2, MessageSquare, Phone, Mail, User, ShieldCheck, ArrowRight, Loader2, Sparkles, Building2, Coins } from 'lucide-react';

export default function ConsultationPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [propertyLocation, setPropertyLocation] = useState('New Cairo (Tagamoa)');
  const [propertyType, setPropertyType] = useState('Standalone Villa');
  const [notes, setNotes] = useState('');

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

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
      if (!res.ok) throw new Error(data.error || 'Failed to submit request.');
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const waChatUrl = `https://wa.me/201020130946?text=${encodeURIComponent(
    `Hello Agarli, I would like to schedule a consultation for my property in ${propertyLocation} (${propertyType}).`
  )}`;

  return (
    <>
      <Header formsUrl="#consultation" />

      <main style={{ paddingTop: '8.5rem', paddingBottom: '6rem', minHeight: '80vh' }}>
        <div className="container-editorial">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '4rem',
              alignItems: 'start',
            }}
          >
            {/* Left Column: Context & Trust Pillars */}
            <div>
              <Reveal delay={0}>
                <div className="eyebrow" style={{ color: '#C9A96E' }}>Complimentary Review</div>
              </Reveal>
              <Reveal delay={100}>
                <h1
                  className="display-xl"
                  style={{ marginTop: '1.25rem', color: '#1B2D45', lineHeight: 1.05 }}
                >
                  Turn Your Property Into A Performing Asset.
                </h1>
              </Reveal>
              <Reveal delay={200}>
                <p className="lead" style={{ marginTop: '1.75rem', maxWidth: '34rem' }}>
                  Request a confidential consultation with Agarli’s leadership team. We analyze your asset’s rental yield, legal structure, and management roadmap.
                </p>
              </Reveal>

              {/* Trust badges */}
              <div style={{ marginTop: '3rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <Reveal delay={280}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div
                      style={{
                        width: '2.75rem',
                        height: '2.75rem',
                        borderRadius: '50%',
                        background: 'rgba(201, 169, 110, 0.15)',
                        color: '#C9A96E',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Coins style={{ width: '1.25rem', height: '1.25rem' }} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#1B2D45' }}>No Obligation or Upfront Cost</h3>
                      <p style={{ fontSize: '0.875rem', color: '#6B7280', marginTop: '0.25rem' }}>
                        Our initial property evaluation and yield projection are completely complimentary.
                      </p>
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={340}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div
                      style={{
                        width: '2.75rem',
                        height: '2.75rem',
                        borderRadius: '50%',
                        background: 'rgba(45, 189, 122, 0.15)',
                        color: '#2DBD7A',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <ShieldCheck style={{ width: '1.25rem', height: '1.25rem' }} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#1B2D45' }}>Institutional Asset Security</h3>
                      <p style={{ fontSize: '0.875rem', color: '#6B7280', marginTop: '0.25rem' }}>
                        Rigorous occupant vetting, compliant legal contracts, and preventive maintenance.
                      </p>
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={400}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div
                      style={{
                        width: '2.75rem',
                        height: '2.75rem',
                        borderRadius: '50%',
                        background: 'rgba(27, 45, 69, 0.08)',
                        color: '#1B2D45',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Building2 style={{ width: '1.25rem', height: '1.25rem' }} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#1B2D45' }}>Named Asset Manager</h3>
                      <p style={{ fontSize: '0.875rem', color: '#6B7280', marginTop: '0.25rem' }}>
                        One accountable senior executive personally manages your property stewardship.
                      </p>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>

            {/* Right Column: Form Card */}
            <div>
              <div
                className="surface-card"
                style={{
                  background: '#ffffff',
                  borderRadius: '1.75rem',
                  padding: '2.5rem',
                  border: '1px solid rgba(11, 26, 48, 0.08)',
                  boxShadow: '0 20px 50px -20px rgba(11, 26, 48, 0.12)',
                }}
              >
                {submitted ? (
                  <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                    <div
                      style={{
                        width: '4rem',
                        height: '4rem',
                        borderRadius: '50%',
                        background: 'rgba(45, 189, 122, 0.15)',
                        color: '#2DBD7A',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1.5rem',
                      }}
                    >
                      <CheckCircle2 style={{ width: '2.25rem', height: '2.25rem' }} />
                    </div>
                    <div className="eyebrow" style={{ color: '#C9A96E' }}>Submission Received</div>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: 600, color: '#1B2D45', marginTop: '0.5rem' }}>
                      Thank You, {name}.
                    </h2>
                    <p style={{ fontSize: '0.95rem', color: '#6B7280', lineHeight: 1.7, marginTop: '0.85rem' }}>
                      We have received your property consultation request. A senior Agarli asset manager will contact you within 2 business hours.
                    </p>

                    <div style={{ marginTop: '2.5rem' }}>
                      <a
                        href={waChatUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-base"
                        style={{
                          width: '100%',
                          background: '#25D366',
                          color: '#ffffff',
                          boxShadow: '0 10px 25px -6px rgba(37, 211, 102, 0.4)',
                        }}
                      >
                        <MessageSquare style={{ width: '1.1rem', height: '1.1rem' }} />
                        <span>Chat Instantly on WhatsApp</span>
                      </a>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#1B2D45', letterSpacing: '-0.02em' }}>
                      Schedule Your Asset Review
                    </h2>
                    <p style={{ fontSize: '0.875rem', color: '#6B7280', marginTop: '0.35rem', lineHeight: 1.5 }}>
                      Fill in your contact and property information below:
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

                    <form onSubmit={handleSubmit} style={{ marginTop: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#4B5563', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.4rem' }}>
                          Full Name *
                        </label>
                        <div style={{ position: 'relative' }}>
                          <User style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', width: '1rem', height: '1rem', color: '#9CA3AF' }} />
                          <input
                            type="text"
                            required
                            placeholder="e.g. Tarek Mahmoud"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            style={{
                              width: '100%',
                              padding: '0.75rem 0.85rem 0.75rem 2.4rem',
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

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#4B5563', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.4rem' }}>
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
                                padding: '0.75rem 0.85rem 0.75rem 2.4rem',
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
                          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#4B5563', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.4rem' }}>
                            Email Address *
                          </label>
                          <div style={{ position: 'relative' }}>
                            <Mail style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', width: '1rem', height: '1rem', color: '#9CA3AF' }} />
                            <input
                              type="email"
                              required
                              placeholder="tarek@example.com"
                              value={email}
                              onChange={e => setEmail(e.target.value)}
                              style={{
                                width: '100%',
                                padding: '0.75rem 0.85rem 0.75rem 2.4rem',
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

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#4B5563', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.4rem' }}>
                            Property Location
                          </label>
                          <select
                            value={propertyLocation}
                            onChange={e => setPropertyLocation(e.target.value)}
                            style={{
                              width: '100%',
                              padding: '0.75rem 0.85rem',
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
                          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#4B5563', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.4rem' }}>
                            Property Type
                          </label>
                          <select
                            value={propertyType}
                            onChange={e => setPropertyType(e.target.value)}
                            style={{
                              width: '100%',
                              padding: '0.75rem 0.85rem',
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

                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#4B5563', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.4rem' }}>
                          Additional Property Notes (Optional)
                        </label>
                        <textarea
                          rows={3}
                          placeholder="Condition, compound name, target timeline, or special requirements..."
                          value={notes}
                          onChange={e => setNotes(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '0.75rem 0.85rem',
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

                      <button
                        type="submit"
                        disabled={loading}
                        className="btn-base btn-gold"
                        style={{
                          marginTop: '0.75rem',
                          padding: '1rem',
                          width: '100%',
                          opacity: loading ? 0.7 : 1,
                          cursor: loading ? 'not-allowed' : 'pointer',
                        }}
                      >
                        {loading ? (
                          <>
                            <Loader2 className="animate-spin" style={{ width: '1.1rem', height: '1.1rem' }} />
                            <span>Submitting...</span>
                          </>
                        ) : (
                          <>
                            <span>Request Private Consultation</span>
                            <ArrowRight style={{ width: '1rem', height: '1rem' }} />
                          </>
                        )}
                      </button>

                      <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#9CA3AF', margin: 0 }}>
                        🔒 Privacy guaranteed. Zero unsolicited spam.
                      </p>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer
        tagline="Residential asset management for owners who expect their property to perform like an investment—and be cared for like a home."
        copyright="2026"
        license="Licensed residential asset management · Egypt"
        phone="+20 102 013 0946"
        phoneHref="tel:+201020130946"
        email="info@agarli.com"
        whatsapp="https://wa.me/201020130946"
        location="Cairo · Egypt"
        formsUrl="#consultation"
      />
    </>
  );
}
