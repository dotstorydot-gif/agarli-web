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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.75rem' }}>
                  <label style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#1B2D45', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    1. Initial Monthly Rent
                  </label>
                  <span style={{ fontSize: '1.625rem', fontWeight: 700, color: '#1B2D45', letterSpacing: '-0.02em' }}>
                    {formatCurrency(monthlyRent)}
                    <span style={{ fontSize: '0.85rem', fontWeight: 500, color: '#6B7280' }}> / mo</span>
                  </span>
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

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.75rem', color: '#9CA3AF' }}>
                  <span>2k EGP</span>
                  <span>50k EGP</span>
                  <span>100k EGP</span>
                  <span>175k EGP</span>
                  <span>250k EGP</span>
                </div>

                {/* Quick Preset Buttons */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.75rem', color: '#6B7280', fontWeight: 600 }}>Quick Presets:</span>
                  {PRESETS.map(preset => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setMonthlyRent(preset)}
                      style={{
                        padding: '0.3rem 0.7rem',
                        borderRadius: '9999px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        border: monthlyRent === preset ? '1px solid #1B2D45' : '1px solid #E5E7EB',
                        background: monthlyRent === preset ? '#1B2D45' : '#F9FAFB',
                        color: monthlyRent === preset ? '#ffffff' : '#4B5563',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {preset >= 1000 ? `${preset / 1000}k` : preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* SLIDER 2: Investment Horizon (Years) */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.75rem' }}>
                  <label style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#1B2D45', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    2. Projection Horizon
                  </label>
                  <span style={{ fontSize: '1.625rem', fontWeight: 700, color: '#1B2D45', letterSpacing: '-0.02em' }}>
                    {years} {years === 1 ? 'Year' : 'Years'}
                  </span>
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

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.75rem', color: '#9CA3AF' }}>
                  <span>1 Year</span>
                  <span>2 Years</span>
                  <span>3 Years</span>
                  <span>4 Years</span>
                  <span>5 Years</span>
                  <span>6 Years</span>
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
              padding: 'clamp(2rem, 4vw, 3rem)',
              background: 'linear-gradient(180deg, #FFFFFF 0%, #FAF8F5 100%)',
            }}
          >
            {/* Total Net Payout Hero Card */}
            <div
              style={{
                background: '#0B1A30',
                color: '#ffffff',
                borderRadius: '1.75rem',
                padding: 'clamp(2.25rem, 5vw, 3.25rem)',
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

              <div className="eyebrow" style={{ color: '#C9A96E', fontSize: '0.8125rem', letterSpacing: '0.18em' }}>
                Total Net Payout To You ({years} {years === 1 ? 'Year' : 'Years'})
              </div>

              <div
                style={{
                  fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                  fontWeight: 700,
                  color: '#ffffff',
                  marginTop: '0.75rem',
                  letterSpacing: '-0.035em',
                  lineHeight: 1.05,
                }}
              >
                {formatCurrency(totalNetOwner)}
              </div>

              <div
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
                  Rule: <strong>15% Y1 · 5% Y2+ · +10% rent appreciation/yr</strong>
                </span>
              </div>

              {/* Consultation CTA Button */}
              <div style={{ marginTop: '2.25rem' }}>
                <a
                  href="#consultation"
                  data-open-consultation="true"
                  className="btn-base btn-gold"
                  style={{ padding: '0.95rem 2.25rem', fontSize: '0.95rem' }}
                >
                  <span>Book a Consultation For This Property</span>
                  <ArrowRight style={{ width: '1.1rem', height: '1.1rem' }} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
