'use client';

import { useState, useMemo } from 'react';
import Reveal from '@/components/shared/Reveal';
import { TrendingUp, Sparkles, Shield, ArrowRight, CheckCircle, Calculator, ChevronRight } from 'lucide-react';

type CalculatorConfig = {
  eyebrow?: string;
  headline?: string;
  body?: string;
  minRent?: number;
  maxRent?: number;
  defaultRent?: number;
  year1Fee?: number;
  year2Fee?: number;
  annualIncrease?: number;
};

type Props = {
  config?: CalculatorConfig;
};

const PRESETS = [15000, 35000, 60000, 100000, 180000];

export default function IncomeCalculator({ config }: Props) {
  const min = config?.minRent ?? 2000;
  const max = config?.maxRent ?? 250000;
  const defaultRent = config?.defaultRent ?? 35000;
  const year1FeeRate = (config?.year1Fee ?? 15) / 100;
  const year2FeeRate = (config?.year2Fee ?? 5) / 100;
  const annualIncreaseRate = (config?.annualIncrease ?? 10) / 100;

  const [monthlyRent, setMonthlyRent] = useState<number>(defaultRent);
  const [years, setYears] = useState<number>(5);

  // Calculate year by year breakdown
  const yearlyData = useMemo(() => {
    const data = [];
    let currentMonthlyRent = monthlyRent;

    for (let yr = 1; yr <= 10; yr++) {
      if (yr > 1) {
        currentMonthlyRent = currentMonthlyRent * (1 + annualIncreaseRate);
      }

      const feeRate = yr === 1 ? year1FeeRate : year2FeeRate;
      const annualGross = currentMonthlyRent * 12;
      const agarliFee = annualGross * feeRate;
      const netToOwner = annualGross - agarliFee;
      const monthlyNet = netToOwner / 12;

      data.push({
        year: yr,
        monthlyGross: Math.round(currentMonthlyRent),
        annualGross: Math.round(annualGross),
        feeRate: feeRate * 100,
        agarliFee: Math.round(agarliFee),
        netToOwner: Math.round(netToOwner),
        monthlyNet: Math.round(monthlyNet),
      });
    }
    return data;
  }, [monthlyRent, year1FeeRate, year2FeeRate, annualIncreaseRate]);

  // Selected period totals
  const selectedPeriodData = yearlyData.slice(0, years);
  const totalNetOwner = selectedPeriodData.reduce((acc, y) => acc + y.netToOwner, 0);
  const totalGross = selectedPeriodData.reduce((acc, y) => acc + y.annualGross, 0);
  const totalAgarliFee = selectedPeriodData.reduce((acc, y) => acc + y.agarliFee, 0);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-EG', { maximumFractionDigits: 0 }).format(Math.round(val)) + ' EGP';
  };

  const formatShort = (val: number) => {
    if (val >= 1000000) {
      return (val / 1000000).toFixed(2) + 'M EGP';
    }
    if (val >= 1000) {
      return Math.round(val / 1000) + 'k EGP';
    }
    return val + ' EGP';
  };

  return (
    <section style={{ padding: '6rem 0', background: '#FAF8F5' }}>
      <div className="container-editorial">
        {/* Header */}
        <div style={{ maxWidth: '46rem', margin: '0 auto', textAlign: 'center', marginBottom: '3.5rem' }}>
          <Reveal delay={0}>
            <div className="eyebrow" style={{ color: '#C9A96E' }}>
              {config?.eyebrow || 'Yield & Appreciation Calculator'}
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h2
              className="display-lg"
              style={{ marginTop: '1.25rem', color: '#1B2D45', letterSpacing: '-0.03em' }}
            >
              {config?.headline || 'Calculate Your Rental Income Over Time'}
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="lead" style={{ marginTop: '1.25rem' }}>
              {config?.body ||
                "Watch your property's yield compound with scheduled 10% annual rent appreciation and Agarli's reduced 5% management fee starting Year 2."}
            </p>
          </Reveal>
        </div>

        {/* Main Interactive Calculator Card */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: '2rem',
            border: '1px solid rgba(11, 26, 48, 0.08)',
            boxShadow: '0 24px 60px -20px rgba(11, 26, 48, 0.1)',
            overflow: 'hidden',
          }}
        >
          {/* Top Control Bar: Sliders */}
          <div
            style={{
              padding: 'clamp(2rem, 4vw, 3rem)',
              borderBottom: '1px solid rgba(11, 26, 48, 0.07)',
              background: '#ffffff',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                gap: 'clamp(1.75rem, 4vw, 3rem)',
                alignItems: 'start',
              }}
            >
              {/* SLIDER 1: Monthly Rent */}
              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                    marginBottom: '0.875rem',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#C9A96E', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      Step 1
                    </div>
                    <label style={{ fontSize: '0.925rem', fontWeight: 700, color: '#0B1A30' }}>
                      Initial Monthly Rent
                    </label>
                  </div>
                  <div style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                    <span style={{ fontSize: 'clamp(1.25rem, 4.5vw, 1.625rem)', fontWeight: 800, color: '#0B1A30', letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>
                      {formatCurrency(monthlyRent)}
                    </span>
                    <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#64748B', whiteSpace: 'nowrap' }}> / mo</span>
                  </div>
                </div>

                {/* Range Slider */}
                <input
                  type="range"
                  min={min}
                  max={max}
                  step={1000}
                  value={monthlyRent}
                  onChange={e => setMonthlyRent(Number(e.target.value))}
                  aria-label="Initial Monthly Rent"
                  style={{
                    width: '100%',
                    height: '8px',
                    borderRadius: '999px',
                    accentColor: '#C9A96E',
                    cursor: 'pointer',
                    background: `linear-gradient(to right, #C9A96E 0%, #C9A96E ${((monthlyRent - min) / (max - min)) * 100}%, #E5E7EB ${((monthlyRent - min) / (max - min)) * 100}%, #E5E7EB 100%)`,
                  }}
                />

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.725rem', color: '#94A3B8' }}>
                  <span>2k</span>
                  <span>50k</span>
                  <span>100k</span>
                  <span>175k</span>
                  <span>250k EGP</span>
                </div>

                {/* Redesigned Luxury Segmented Quick Presets */}
                <div style={{ marginTop: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem' }}>
                    <span style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      Popular Rent Tiers
                    </span>
                    <span style={{ fontSize: '0.7rem', color: '#C9A96E', fontWeight: 600 }}>
                      Quick select
                    </span>
                  </div>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(5, 1fr)',
                      gap: '0.35rem',
                      background: '#F1F5F9',
                      padding: '0.25rem',
                      borderRadius: '0.75rem',
                      border: '1px solid rgba(11,26,48,0.06)',
                    }}
                  >
                    {PRESETS.map(preset => {
                      const isSelected = monthlyRent === preset;
                      return (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => setMonthlyRent(preset)}
                          style={{
                            padding: '0.5rem 0.15rem',
                            borderRadius: '0.5rem',
                            fontSize: '0.75rem',
                            fontWeight: isSelected ? 700 : 600,
                            border: isSelected ? '1px solid #0B1A30' : '1px solid transparent',
                            background: isSelected ? '#0B1A30' : '#FFFFFF',
                            color: isSelected ? '#ffffff' : '#334155',
                            boxShadow: isSelected ? '0 2px 6px rgba(11,26,48,0.2)' : '0 1px 2px rgba(0,0,0,0.04)',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease',
                            textAlign: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            lineHeight: 1.15,
                          }}
                        >
                          <span>{preset >= 1000 ? `${preset / 1000}k` : preset}</span>
                          <span
                            style={{
                              fontSize: '0.575rem',
                              color: isSelected ? '#C9A96E' : '#94A3B8',
                              fontWeight: 500,
                              marginTop: '0.1rem',
                            }}
                          >
                            EGP
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* SLIDER 2: Investment Horizon (Years) */}
              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                    marginBottom: '0.875rem',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#C9A96E', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      Step 2
                    </div>
                    <label style={{ fontSize: '0.925rem', fontWeight: 700, color: '#0B1A30' }}>
                      Projection Horizon
                    </label>
                  </div>
                  <div style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                    <span style={{ fontSize: 'clamp(1.25rem, 4.5vw, 1.625rem)', fontWeight: 800, color: '#0B1A30', letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>
                      {years} {years === 1 ? 'Year' : 'Years'}
                    </span>
                  </div>
                </div>

                {/* Range Slider for Years */}
                <input
                  type="range"
                  min={1}
                  max={7}
                  step={1}
                  value={years}
                  onChange={e => setYears(Number(e.target.value))}
                  aria-label="Projection Years"
                  style={{
                    width: '100%',
                    height: '8px',
                    borderRadius: '999px',
                    accentColor: '#1B2D45',
                    cursor: 'pointer',
                    background: `linear-gradient(to right, #1B2D45 0%, #1B2D45 ${((years - 1) / 6) * 100}%, #E5E7EB ${((years - 1) / 6) * 100}%, #E5E7EB 100%)`,
                  }}
                />

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.725rem', color: '#94A3B8' }}>
                  <span>1Y</span>
                  <span>2Y</span>
                  <span>3Y</span>
                  <span>4Y</span>
                  <span>5Y</span>
                  <span>6Y</span>
                  <span>7 Years</span>
                </div>

                {/* Growth Rule Explainer Pill */}
                <div
                  style={{
                    marginTop: '1.25rem',
                    padding: '0.75rem 1rem',
                    borderRadius: '0.75rem',
                    background: '#FAF8F5',
                    border: '1px solid rgba(201, 169, 110, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    fontSize: '0.8rem',
                    color: '#1B2D45',
                  }}
                >
                  <Sparkles style={{ width: '1.1rem', height: '1.1rem', color: '#C9A96E', flexShrink: 0 }} />
                  <div>
                    <strong>Agarli Advantage:</strong> Year 1 fee is 15%. From <strong>Year 2 onwards, fee drops to only 5%</strong> with <strong>+10% annual rent appreciation</strong>.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Summary Section: JUST THE TOTAL PAYOUT */}
          <div
            style={{
              padding: 'clamp(1.25rem, 3.5vw, 3rem)',
              background: 'linear-gradient(180deg, #FFFFFF 0%, #FAF8F5 100%)',
            }}
          >
            {/* Total Net Payout Hero Card */}
            <div
              style={{
                background: '#0B1A30',
                color: '#ffffff',
                borderRadius: '1.75rem',
                padding: 'clamp(1.75rem, 4.5vw, 3.25rem) clamp(1.25rem, 4vw, 2.5rem)',
                boxShadow: '0 24px 50px -15px rgba(11, 26, 48, 0.3)',
                position: 'relative',
                overflow: 'hidden',
                textAlign: 'center',
              }}
            >
              {/* Background ambient lighting */}
              <div
                style={{
                  position: 'absolute',
                  top: '-40%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '32rem',
                  height: '32rem',
                  background: 'radial-gradient(circle, rgba(201,169,110,0.22) 0%, transparent 70%)',
                  borderRadius: '50%',
                  pointerEvents: 'none',
                }}
              />

              <div className="eyebrow" style={{ color: '#C9A96E', fontSize: 'clamp(0.7rem, 2vw, 0.8125rem)', letterSpacing: '0.18em' }}>
                Total Net Payout To You ({years} {years === 1 ? 'Year' : 'Years'})
              </div>

              <div
                style={{
                  fontSize: 'clamp(2rem, 7.5vw, 4.5rem)',
                  fontWeight: 700,
                  color: '#ffffff',
                  marginTop: '0.75rem',
                  letterSpacing: '-0.035em',
                  lineHeight: 1.05,
                }}
              >
                {formatCurrency(totalNetOwner)}
              </div>

              {/* Desktop Breakdown (Inline row with dots) */}
              <div
                className="calculator-metrics-desktop"
                style={{
                  marginTop: '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  fontSize: '0.925rem',
                  color: 'rgba(255,255,255,0.8)',
                }}
              >
                <span>
                  Average Net: <strong style={{ color: '#ffffff' }}>{formatCurrency(totalNetOwner / (years * 12))}</strong> / month
                </span>
                <span style={{ opacity: 0.35 }}>•</span>
                <span>
                  Initial Rent: <strong style={{ color: '#ffffff' }}>{formatCurrency(monthlyRent)}</strong> / month
                </span>
                <span style={{ opacity: 0.35 }}>•</span>
                <span>
                  Formula: <strong style={{ color: '#ffffff' }}>[15% Year 1] → [5% Year 2+] + [10% Annual Rent Appreciation]</strong>
                </span>
              </div>

              {/* Mobile Breakdown (Clean organized stacked pills, no loose dots, zero wrapping) */}
              <div
                className="calculator-metrics-mobile"
                style={{
                  display: 'none',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  marginTop: '1.25rem',
                  textAlign: 'left',
                }}
              >
                <div
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '0.75rem',
                    padding: '0.625rem 0.875rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.8rem',
                    color: 'rgba(255,255,255,0.8)',
                  }}
                >
                  <span style={{ whiteSpace: 'nowrap' }}>Average Net Payout:</span>
                  <span style={{ color: '#C9A96E', fontWeight: 700, fontSize: '0.85rem', whiteSpace: 'nowrap', flexShrink: 0 }}>
                    {formatCurrency(totalNetOwner / (years * 12))}
                    <span style={{ fontSize: '0.75rem', fontWeight: 500, opacity: 0.85 }}> / mo</span>
                  </span>
                </div>

                <div
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '0.75rem',
                    padding: '0.625rem 0.875rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.8rem',
                    color: 'rgba(255,255,255,0.8)',
                  }}
                >
                  <span style={{ whiteSpace: 'nowrap' }}>Initial Rent:</span>
                  <span style={{ color: '#ffffff', fontWeight: 700, fontSize: '0.85rem', whiteSpace: 'nowrap', flexShrink: 0 }}>
                    {formatCurrency(monthlyRent)}
                    <span style={{ fontSize: '0.75rem', fontWeight: 500, opacity: 0.85 }}> / mo</span>
                  </span>
                </div>

                {/* Clear bracketed formula tags - zero decimal confusion */}
                <div
                  style={{
                    background: 'rgba(201,169,110,0.1)',
                    border: '1px solid rgba(201,169,110,0.25)',
                    borderRadius: '0.75rem',
                    padding: '0.7rem 0.75rem',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#C9A96E', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>
                    Agarli Advantage Formula
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.35rem', flexWrap: 'wrap', fontSize: '0.75rem', fontWeight: 700 }}>
                    <span style={{ background: 'rgba(255,255,255,0.1)', color: '#ffffff', padding: '0.2rem 0.45rem', borderRadius: '0.375rem', border: '1px solid rgba(255,255,255,0.15)' }}>
                      [15% Year 1]
                    </span>
                    <span style={{ color: '#C9A96E', fontSize: '0.8rem' }}>→</span>
                    <span style={{ background: 'rgba(255,255,255,0.1)', color: '#ffffff', padding: '0.2rem 0.45rem', borderRadius: '0.375rem', border: '1px solid rgba(255,255,255,0.15)' }}>
                      [5% Year 2+]
                    </span>
                    <span style={{ color: '#C9A96E', fontSize: '0.8rem' }}>+</span>
                    <span style={{ background: 'rgba(201,169,110,0.2)', color: '#DFCA9E', padding: '0.2rem 0.45rem', borderRadius: '0.375rem', border: '1px solid rgba(201,169,110,0.35)' }}>
                      [+10% Appreciation/yr]
                    </span>
                  </div>
                </div>
              </div>

              {/* Consultation CTA Button */}
              <div style={{ marginTop: '1.75rem' }}>
                <a
                  href="#consultation"
                  data-open-consultation="true"
                  className="btn-base btn-gold calculator-cta-btn"
                  style={{
                    padding: '0.95rem 2rem',
                    fontSize: '0.95rem',
                    display: 'inline-flex',
                  }}
                >
                  <span>Book a Consultation For This Property</span>
                  <ArrowRight style={{ width: '1.1rem', height: '1.1rem', flexShrink: 0 }} />
                </a>
              </div>
            </div>

            {/* Responsive styles */}
            <style>{`
              @media (max-width: 640px) {
                .calculator-metrics-desktop {
                  display: none !important;
                }
                .calculator-metrics-mobile {
                  display: flex !important;
                }
                .calculator-cta-btn {
                  width: 100% !important;
                  display: flex !important;
                  justify-content: center !important;
                  text-align: center !important;
                  white-space: normal !important;
                  padding: 0.875rem 1rem !important;
                  font-size: 0.9rem !important;
                }
              }
              @media (min-width: 641px) {
                .calculator-metrics-desktop {
                  display: flex !important;
                }
                .calculator-metrics-mobile {
                  display: none !important;
                }
              }
              input[type=range] {
                -webkit-appearance: none;
                appearance: none;
              }
              input[type=range]::-webkit-slider-thumb {
                -webkit-appearance: none;
                height: 20px;
                width: 20px;
                border-radius: 50%;
                background: #ffffff;
                border: 2px solid #0B1A30;
                box-shadow: 0 2px 5px rgba(0,0,0,0.2);
                cursor: pointer;
                margin-top: -6px;
              }
              input[type=range]::-moz-range-thumb {
                height: 20px;
                width: 20px;
                border-radius: 50%;
                background: #ffffff;
                border: 2px solid #0B1A30;
                box-shadow: 0 2px 5px rgba(0,0,0,0.2);
                cursor: pointer;
              }
            `}</style>
          </div>
        </div>
      </div>
    </section>
  );
}
