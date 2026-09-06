'use client';

import { useState, useEffect, useCallback, useContext, createContext } from 'react';
import {
  Save,
  CheckCircle,
  Upload,
  ExternalLink,
  Plus,
  Trash2,
  Home,
  Sparkles,
  DollarSign,
  Globe,
  Settings,
  AlertCircle,
  RefreshCw,
  Users
} from 'lucide-react';

type TabKey = 'home' | 'whyAgarli' | 'pricing' | 'founders' | 'global' | 'settings';

interface TabItem {
  key: TabKey;
  label: string;
  badge: string;
  icon: React.ComponentType<{ style?: React.CSSProperties; className?: string }>;
  previewUrl: string;
}

const TABS: TabItem[] = [
  { key: 'home', label: 'Home Page', badge: '/', icon: Home, previewUrl: '/' },
  { key: 'whyAgarli', label: 'Why Agarli', badge: '/why-agarli', icon: Sparkles, previewUrl: '/why-agarli' },
  { key: 'pricing', label: 'Pricing', badge: '/pricing', icon: DollarSign, previewUrl: '/pricing' },
  { key: 'founders', label: 'Founders', badge: '/founders', icon: Users, previewUrl: '/founders' },
  { key: 'global', label: 'Global & Footer', badge: 'Site-wide', icon: Globe, previewUrl: '/' },
  { key: 'settings', label: 'Settings & SEO', badge: 'Config', icon: Settings, previewUrl: '/' },
];

// ─── Editor Context (fixes input focus-loss / "jumping" on re-render) ─────────
type EditorCtx = {
  content: any;
  update: (path: (string | number)[], value: any) => void;
  uploading: string | null;
  handleFileUpload: (path: (string | number)[], file: File) => Promise<void>;
};
const EditorContext = createContext<EditorCtx | null>(null);
const useEditor = () => useContext(EditorContext)!;

// ─── Field ───────────────────────────────────────────────────────────────────
function Field({
  label,
  path,
  multiline = false,
  placeholder = '',
  hint = '',
}: {
  label: string;
  path: (string | number)[];
  multiline?: boolean;
  placeholder?: string;
  hint?: string;
}) {
  const { content, update } = useEditor();
  const val = path.reduce((o: any, k) => o?.[k], content) ?? '';
  return (
    <div style={{ marginBottom: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.375rem' }}>
        <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#4B5563', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
          {label}
        </label>
        {hint && <span style={{ fontSize: '0.72rem', color: '#9CA3AF' }}>{hint}</span>}
      </div>
      {multiline ? (
        <textarea
          value={val}
          placeholder={placeholder}
          onChange={e => update(path, e.target.value)}
          rows={3}
          style={{
            width: '100%',
            padding: '0.75rem 0.875rem',
            border: '1.5px solid #E5E7EB',
            borderRadius: '0.625rem',
            fontSize: '0.875rem',
            fontFamily: 'inherit',
            color: '#1B2D45',
            background: '#fff',
            outline: 'none',
            resize: 'vertical',
            boxSizing: 'border-box',
            lineHeight: 1.6,
            transition: 'border-color 0.2s',
          }}
          onFocus={e => (e.target.style.borderColor = '#C9A96E')}
          onBlur={e => (e.target.style.borderColor = '#E5E7EB')}
        />
      ) : (
        <input
          type="text"
          value={val}
          placeholder={placeholder}
          onChange={e => update(path, e.target.value)}
          style={{
            width: '100%',
            padding: '0.65rem 0.875rem',
            border: '1.5px solid #E5E7EB',
            borderRadius: '0.625rem',
            fontSize: '0.875rem',
            fontFamily: 'inherit',
            color: '#1B2D45',
            background: '#fff',
            outline: 'none',
            boxSizing: 'border-box',
            transition: 'border-color 0.2s',
          }}
          onFocus={e => (e.target.style.borderColor = '#C9A96E')}
          onBlur={e => (e.target.style.borderColor = '#E5E7EB')}
        />
      )}
    </div>
  );
}

// ─── ImageField ──────────────────────────────────────────────────────────────
function ImageField({
  label,
  path,
  hint = '',
  darkPreview = false,
}: {
  label: string;
  path: (string | number)[];
  hint?: string;
  darkPreview?: boolean;
}) {
  const { content, update, uploading, handleFileUpload } = useEditor();
  const val = path.reduce((o: any, k) => o?.[k], content) ?? '';
  const key = path.join('.');
  const isUp = uploading === key;
  return (
    <div style={{ marginBottom: '1.5rem', background: '#F9FAFB', padding: '1.25rem', borderRadius: '0.875rem', border: '1px solid #E5E7EB' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
        <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#1B2D45', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
          🖼️ {label}
        </label>
        {hint && <span style={{ fontSize: '0.72rem', color: '#6B7280' }}>{hint}</span>}
      </div>
      {val && (
        <div style={{ marginBottom: '0.875rem', padding: '0.75rem', background: darkPreview ? '#0B1A30' : '#FFFFFF', borderRadius: '0.5rem', border: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img src={val} alt="Preview" style={{ height: '70px', maxWidth: '140px', objectFit: 'contain', borderRadius: '0.375rem', border: darkPreview ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E5E7EB' }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: darkPreview ? '#fff' : '#1B2D45' }}>Current Asset:</div>
            <div style={{ fontSize: '0.75rem', color: darkPreview ? 'rgba(255,255,255,0.6)' : '#6B7280', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{val}</div>
          </div>
        </div>
      )}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
        <input
          type="text"
          value={val}
          onChange={e => update(path, e.target.value)}
          placeholder="Image path (e.g. /images/hero-villa.jpg or https://...)"
          style={{ flex: '1 1 200px', minWidth: '160px', padding: '0.55rem 0.75rem', border: '1.5px solid #E5E7EB', borderRadius: '0.5rem', fontSize: '0.85rem', fontFamily: 'inherit', color: '#1B2D45', background: '#fff' }}
        />
        <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', padding: '0.55rem 1rem', background: isUp ? '#9CA3AF' : '#1B2D45', color: '#fff', borderRadius: '0.5rem', fontSize: '0.8rem', fontWeight: 600, cursor: isUp ? 'not-allowed' : 'pointer', whiteSpace: 'nowrap', transition: 'background 0.2s' }}>
          <Upload style={{ width: '0.875rem', height: '0.875rem' }} />
          {isUp ? 'Uploading...' : 'Upload Image'}
          <input type="file" accept="image/*" disabled={isUp} onChange={e => { if (e.target.files?.[0]) handleFileUpload(path, e.target.files[0]); }} style={{ display: 'none' }} />
        </label>
      </div>
    </div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────
function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <div style={{ background: '#fff', borderRadius: '1.25rem', padding: 'clamp(1.25rem, 3.5vw, 2rem)', marginBottom: '1.75rem', border: '1px solid #E5E7EB', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
      <div style={{ marginBottom: '1.5rem', paddingBottom: '0.875rem', borderBottom: '1px solid #F3F4F6' }}>
        <h2 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#1B2D45', margin: 0 }}>{title}</h2>
        {description && <p style={{ color: '#6B7280', fontSize: '0.825rem', marginTop: '0.25rem', margin: 0 }}>{description}</p>}
      </div>
      {children}
    </div>
  );
}

export default function ContentEditorPage() {
  const [content, setContent] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState<string | null>(null);

  const fetchContent = useCallback(async () => {
    try {
      const res = await fetch('/api/content');
      const data = await res.json();
      setContent(data);
      setHasChanges(false);
    } catch {
      setError('Could not load website content.');
    }
  }, []);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  // Handle Ctrl+S / Cmd+S
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        save();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [content, saving]);

  const update = (path: (string | number)[], value: any) => {
    setContent((prev: any) => {
      const next = JSON.parse(JSON.stringify(prev));
      let obj = next;
      for (let i = 0; i < path.length - 1; i++) {
        const key = path[i];
        if (obj[key] === undefined || obj[key] === null) {
          obj[key] = typeof path[i + 1] === 'number' ? [] : {};
        }
        obj = obj[key];
      }
      obj[path[path.length - 1]] = value;
      return next;
    });
    setHasChanges(true);
    setSaved(false);
  };

  const handleFileUpload = async (path: (string | number)[], file: File) => {
    const key = path.join('.');
    setUploading(key);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.url) {
        update(path, data.url);
      } else {
        alert(data.error || 'Upload failed');
      }
    } catch {
      alert('Error uploading image. Please check your connection.');
    } finally {
      setUploading(null);
    }
  };

  const save = async () => {
    if (!content || saving) return;
    setSaving(true);
    setError('');
    try {
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });
      if (res.ok) {
        setSaved(true);
        setHasChanges(false);
        setTimeout(() => setSaved(false), 4000);
      } else {
        const errData = await res.json().catch(() => ({}));
        setError(errData.error || 'Failed to save changes. Please try again.');
      }
    } catch {
      setError('Connection error while saving.');
    } finally {
      setSaving(false);
    }
  };

  if (!content) {
    return (
      <div style={{ padding: '4rem', display: 'flex', alignItems: 'center', gap: '1rem', color: '#6B7280' }}>
        <RefreshCw style={{ width: '1.25rem', height: '1.25rem', animation: 'spin 1s linear infinite' }} />
        <span>Loading Content Editor...</span>
      </div>
    );
  }

  const currentTab = TABS.find(t => t.key === activeTab) || TABS[0];

  return (
    <EditorContext.Provider value={{ content, update, uploading, handleFileUpload }}>
    <div style={{ padding: 'clamp(1rem, 3.5vw, 2.5rem)', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Sticky Header with Page switcher & Save Button */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 40,
          background: 'rgba(247, 245, 242, 0.95)',
          backdropFilter: 'blur(12px)',
          padding: '1.25rem 0',
          marginBottom: '1.5rem',
          borderBottom: '1px solid rgba(11,26,48,0.08)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
            <h1 style={{ fontSize: '1.625rem', fontWeight: 600, color: '#1B2D45', margin: 0 }}>Content & Media Editor</h1>
            {hasChanges && (
              <span
                style={{
                  background: '#FEF3C7',
                  color: '#92400E',
                  fontSize: '0.725rem',
                  fontWeight: 600,
                  padding: '0.2rem 0.6rem',
                  borderRadius: '999px',
                }}
              >
                Unsaved changes
              </span>
            )}
          </div>
          <p style={{ color: '#6B7280', fontSize: '0.85rem', marginTop: '0.25rem', margin: 0 }}>
            Currently editing: <strong style={{ color: '#1B2D45' }}>{currentTab.label}</strong> ({currentTab.badge})
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Direct Live Preview link for the current page */}
          <a
            href={currentTab.previewUrl}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.375rem',
              padding: '0.65rem 1rem',
              background: '#fff',
              color: '#1B2D45',
              border: '1.5px solid #E5E7EB',
              borderRadius: '999px',
              fontSize: '0.825rem',
              fontWeight: 500,
              textDecoration: 'none',
              transition: 'all 0.2s',
            }}
          >
            <span>View {currentTab.label}</span>
            <ExternalLink style={{ width: '0.85rem', height: '0.85rem' }} />
          </a>

          {/* Save Button */}
          <button
            onClick={save}
            disabled={saving}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.65rem 1.35rem',
              background: saved ? '#10B981' : '#C9A96E',
              color: saved ? '#fff' : '#0B1A30',
              border: 'none',
              borderRadius: '999px',
              fontSize: '0.875rem',
              fontWeight: 600,
              cursor: saving ? 'wait' : 'pointer',
              fontFamily: 'inherit',
              boxShadow: '0 4px 12px rgba(201, 169, 110, 0.25)',
              transition: 'all 0.25s ease',
            }}
          >
            {saved ? (
              <CheckCircle style={{ width: '1.05rem', height: '1.05rem' }} />
            ) : saving ? (
              <RefreshCw style={{ width: '1.05rem', height: '1.05rem', animation: 'spin 1s linear infinite' }} />
            ) : (
              <Save style={{ width: '1.05rem', height: '1.05rem' }} />
            )}
            {saving ? 'Saving...' : saved ? 'Saved & Synced!' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div
          style={{
            padding: '1rem 1.25rem',
            background: '#FEF2F2',
            border: '1px solid #F87171',
            borderRadius: '0.75rem',
            color: '#DC2626',
            marginBottom: '1.5rem',
            fontSize: '0.875rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <AlertCircle style={{ width: '1.1rem', height: '1.1rem', flexShrink: 0 }} />
          <span>{error}</span>
        </div>
      )}

      {/* Page Tabs Navigation Bar */}
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          overflowX: 'auto',
          paddingBottom: '0.75rem',
          marginBottom: '2rem',
          borderBottom: '2px solid #E5E7EB',
        }}
      >
        {TABS.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.625rem',
                padding: '0.75rem 1.25rem',
                borderRadius: '0.75rem',
                border: isActive ? '1.5px solid #1B2D45' : '1.5px solid transparent',
                background: isActive ? '#1B2D45' : '#FFFFFF',
                color: isActive ? '#F7F5F2' : '#4B5563',
                fontSize: '0.875rem',
                fontWeight: isActive ? 600 : 500,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease',
                boxShadow: isActive ? '0 4px 14px rgba(27,45,69,0.15)' : 'none',
              }}
            >
              <Icon style={{ width: '1.05rem', height: '1.05rem', color: isActive ? '#C9A96E' : '#6B7280' }} />
              <span>{tab.label}</span>
              <span
                style={{
                  fontSize: '0.7rem',
                  padding: '0.125rem 0.45rem',
                  borderRadius: '999px',
                  background: isActive ? 'rgba(201,169,110,0.25)' : '#F3F4F6',
                  color: isActive ? '#C9A96E' : '#9CA3AF',
                }}
              >
                {tab.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* ============================================================ */}
      {/* TAB 1: HOME PAGE */}
      {/* ============================================================ */}
      {activeTab === 'home' && (
        <div>
          <Section
            title="🏠 Hero Section"
            description="The first view visitors see when arriving on the website. Includes high-resolution background imagery and core headline."
          >
            <ImageField
              label="Hero Background Image"
              path={['home', 'hero', 'heroImage']}
              hint="Recommended: 1920x1080 high-res architectural or luxury villa photo"
            />
            <Field label="Image Alt Text (Accessibility & SEO)" path={['home', 'hero', 'heroImageAlt']} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <Field label="Eyebrow Tagline" path={['home', 'hero', 'eyebrow']} />
              <Field label="CTA Button Label" path={['home', 'hero', 'ctaLabel']} />
            </div>
            <Field label="Main Headline (Top Line)" path={['home', 'hero', 'headline']} />
            <Field label="Headline Accent (Second Line)" path={['home', 'hero', 'headlineAccent']} />
            <Field label="Hero Body Description" path={['home', 'hero', 'body']} multiline />
            <Field label="Secondary Button Label (Optional)" path={['home', 'hero', 'learnMoreLabel']} />
          </Section>

          <Section
            title="⚡ How It Works Section"
            description="The 3 structured steps explaining the Agarli management onboarding process."
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <Field label="Section Eyebrow" path={['home', 'howItWorks', 'eyebrow']} />
              <Field label="Section Headline" path={['home', 'howItWorks', 'headline']} />
            </div>

            {[0, 1, 2].map(i => (
              <div
                key={i}
                style={{
                  marginTop: '1.25rem',
                  padding: '1.25rem',
                  background: '#F9FAFB',
                  borderRadius: '0.75rem',
                  border: '1px solid #E5E7EB',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <span
                    style={{
                      height: '1.5rem',
                      width: '1.5rem',
                      borderRadius: '50%',
                      background: '#1B2D45',
                      color: '#fff',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      display: 'grid',
                      placeItems: 'center',
                    }}
                  >
                    0{i + 1}
                  </span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1B2D45' }}>STEP 0{i + 1}</span>
                </div>
                <Field label="Step Title" path={['home', 'howItWorks', 'steps', i, 'title']} />
                <Field label="Step Description" path={['home', 'howItWorks', 'steps', i, 'body']} multiline />
              </div>
            ))}
          </Section>

          <Section
            title="🎯 Call-To-Action Banner"
            description="The large conversion banner located towards the bottom of the home page."
          >
            <ImageField
              label="Banner Background Image"
              path={['home', 'ctaBanner', 'bgImage']}
              hint="Dark ambient architectural image"
            />
            <Field label="Image Alt Text" path={['home', 'ctaBanner', 'bgImageAlt']} />
            <Field label="Headline (Primary)" path={['home', 'ctaBanner', 'headline']} />
            <Field label="Headline Subtitle / Accent" path={['home', 'ctaBanner', 'headlineAccent']} />
            <Field label="Action Button Label" path={['home', 'ctaBanner', 'ctaLabel']} />
          </Section>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 2: WHY AGARLI PAGE */}
      {/* ============================================================ */}
      {activeTab === 'whyAgarli' && (
        <div>
          <Section
            title="✨ Why Agarli Header"
            description="The introductory headline and statement on the Why Agarli page."
          >
            <Field label="Page Eyebrow" path={['whyAgarli', 'page', 'eyebrow']} />
            <Field label="Main Headline" path={['whyAgarli', 'page', 'headline']} />
            <Field label="Intro Body Text" path={['whyAgarli', 'page', 'body']} multiline />
          </Section>

          <Section
            title="🛡️ The 6 Core Commitments (Feature Cards)"
            description="The six hallmark value pillars presented in the features grid."
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '1.25rem' }}>
              {(content.whyAgarli?.features || []).map((_: any, i: number) => (
                <div
                  key={i}
                  style={{
                    padding: '1.25rem',
                    background: '#F9FAFB',
                    borderRadius: '0.75rem',
                    border: '1px solid #E5E7EB',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#C9A96E' }}>FEATURE CARD {i + 1}</span>
                    <span style={{ fontSize: '0.72rem', color: '#9CA3AF' }}>Icon key: {content.whyAgarli?.features?.[i]?.icon}</span>
                  </div>
                  <Field label="Feature Title" path={['whyAgarli', 'features', i, 'title']} />
                  <Field label="Description" path={['whyAgarli', 'features', i, 'body']} multiline />
                </div>
              ))}
            </div>
          </Section>

          <Section
            title="⚖️ Model Comparison Table"
            description="Comparison matrix between the Agarli professional model and traditional rent collection."
          >
            <Field label="Table Headline" path={['whyAgarli', 'comparison', 'headline']} />

            <div style={{ marginTop: '1.5rem' }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1.2fr 2fr 2fr 40px',
                  gap: '0.75rem',
                  padding: '0.5rem 0.75rem',
                  background: '#F3F4F6',
                  borderRadius: '0.5rem',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: '#4B5563',
                  textTransform: 'uppercase',
                }}
              >
                <span>Category / Dimension</span>
                <span>Agarli Standard</span>
                <span>Traditional Model</span>
                <span></span>
              </div>

              {(content.whyAgarli?.comparison?.rows || []).map((row: any, i: number) => (
                <div
                  key={i}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1.2fr 2fr 2fr 40px',
                    gap: '0.75rem',
                    alignItems: 'center',
                    padding: '0.75rem',
                    borderBottom: '1px solid #E5E7EB',
                  }}
                >
                  <input
                    type="text"
                    value={row.label || ''}
                    onChange={e => update(['whyAgarli', 'comparison', 'rows', i, 'label'], e.target.value)}
                    placeholder="Dimension (e.g. Legal)"
                    style={{
                      padding: '0.45rem 0.6rem',
                      border: '1px solid #E5E7EB',
                      borderRadius: '0.375rem',
                      fontSize: '0.825rem',
                    }}
                  />
                  <input
                    type="text"
                    value={row.agarli || ''}
                    onChange={e => update(['whyAgarli', 'comparison', 'rows', i, 'agarli'], e.target.value)}
                    placeholder="Agarli approach"
                    style={{
                      padding: '0.45rem 0.6rem',
                      border: '1px solid #E5E7EB',
                      borderRadius: '0.375rem',
                      fontSize: '0.825rem',
                    }}
                  />
                  <input
                    type="text"
                    value={row.traditional || ''}
                    onChange={e => update(['whyAgarli', 'comparison', 'rows', i, 'traditional'], e.target.value)}
                    placeholder="Traditional approach"
                    style={{
                      padding: '0.45rem 0.6rem',
                      border: '1px solid #E5E7EB',
                      borderRadius: '0.375rem',
                      fontSize: '0.825rem',
                    }}
                  />
                  <button
                    type="button"
                    title="Remove row"
                    onClick={() => {
                      const nextRows = [...content.whyAgarli.comparison.rows];
                      nextRows.splice(i, 1);
                      update(['whyAgarli', 'comparison', 'rows'], nextRows);
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#EF4444',
                      padding: '0.25rem',
                      display: 'grid',
                      placeItems: 'center',
                    }}
                  >
                    <Trash2 style={{ width: '0.9rem', height: '0.9rem' }} />
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() => {
                  const nextRows = [
                    ...(content.whyAgarli?.comparison?.rows || []),
                    { label: 'New Dimension', agarli: 'Agarli standard', traditional: 'Traditional standard' },
                  ];
                  update(['whyAgarli', 'comparison', 'rows'], nextRows);
                }}
                style={{
                  marginTop: '1rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  padding: '0.5rem 0.875rem',
                  borderRadius: '0.5rem',
                  background: '#F3F4F6',
                  color: '#1B2D45',
                  border: '1px solid #D1D5DB',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                <Plus style={{ width: '0.85rem', height: '0.85rem' }} />
                Add Comparison Row
              </button>
            </div>
          </Section>

          <Section title="📣 Bottom Consultation Banner" description="The closing banner encouraging owners to partner with Agarli.">
            <Field label="Banner Headline" path={['whyAgarli', 'cta', 'headline']} />
            <Field label="Button Label" path={['whyAgarli', 'cta', 'ctaLabel']} />
          </Section>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 3: PRICING PAGE */}
      {/* ============================================================ */}
      {activeTab === 'pricing' && (
        <div>
          <Section
            title="💰 Pricing Page Header"
            description="The headline and opening description introducing the single-fee model."
          >
            <Field label="Page Eyebrow" path={['pricing', 'page', 'eyebrow']} />
            <Field label="Main Headline" path={['pricing', 'page', 'headline']} />
            <Field label="Intro Body Text" path={['pricing', 'page', 'body']} multiline />
          </Section>

          <Section
            title="🏷️ Management Fee Card"
            description="The dark primary pricing card showing the percentage commission."
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <Field label="Card Eyebrow" path={['pricing', 'feeCard', 'eyebrow']} />
              <Field label="Fee Percentage Number (%)" path={['pricing', 'feeCard', 'percentage']} hint="e.g. 15" />
            </div>
            <Field label="Fee Description" path={['pricing', 'feeCard', 'description']} multiline />
            <Field label="Footnote (Under Fee)" path={['pricing', 'feeCard', 'footnote']} />
            <Field label="Card Button Label" path={['pricing', 'feeCard', 'ctaLabel']} />
          </Section>

          <Section
            title="📋 What's Included Card"
            description="The checklist of all services and protections covered under the single fee."
          >
            <Field label="Card Eyebrow" path={['pricing', 'included', 'eyebrow']} />
            <Field label="Footnote" path={['pricing', 'included', 'footnote']} />

            <div style={{ marginTop: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#4B5563', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                Included Service Items ({(content.pricing?.included?.items || []).length} items)
              </label>

              {(content.pricing?.included?.items || []).map((item: string, idx: number) => (
                <div key={idx} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', alignItems: 'center' }}>
                  <input
                    type="text"
                    value={item}
                    onChange={e => {
                      const next = [...content.pricing.included.items];
                      next[idx] = e.target.value;
                      update(['pricing', 'included', 'items'], next);
                    }}
                    style={{
                      flex: 1,
                      padding: '0.5rem 0.75rem',
                      border: '1.5px solid #E5E7EB',
                      borderRadius: '0.5rem',
                      fontSize: '0.85rem',
                    }}
                  />
                  <button
                    type="button"
                    title="Remove item"
                    onClick={() => {
                      const next = [...content.pricing.included.items];
                      next.splice(idx, 1);
                      update(['pricing', 'included', 'items'], next);
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#EF4444',
                      cursor: 'pointer',
                      padding: '0.375rem',
                    }}
                  >
                    <Trash2 style={{ width: '0.9rem', height: '0.9rem' }} />
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() => {
                  const next = [...(content.pricing?.included?.items || []), 'New included service'];
                  update(['pricing', 'included', 'items'], next);
                }}
                style={{
                  marginTop: '0.5rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  padding: '0.45rem 0.75rem',
                  borderRadius: '0.5rem',
                  background: '#F3F4F6',
                  color: '#1B2D45',
                  border: '1px solid #D1D5DB',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                <Plus style={{ width: '0.85rem', height: '0.85rem' }} />
                Add Included Service
              </button>
            </div>
          </Section>

          <Section
            title="🧮 Rental Yield & Compounding Calculator"
            description="Control the interactive sliders, rent ranges, and fee breakdown on the pricing page."
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <Field label="Calculator Eyebrow" path={['pricing', 'calculator', 'eyebrow']} />
              <Field label="Calculator Headline" path={['pricing', 'calculator', 'headline']} />
            </div>
            <Field label="Description / Subtitle" path={['pricing', 'calculator', 'body']} multiline />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
              <Field label="Year 1 Agarli Fee (%)" path={['pricing', 'calculator', 'year1Fee']} placeholder="15" />
              <Field label="Year 2+ Agarli Fee (%)" path={['pricing', 'calculator', 'year2Fee']} placeholder="5" />
              <Field label="Annual Rent Increase (%)" path={['pricing', 'calculator', 'annualIncrease']} placeholder="10" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
              <Field label="Min Monthly Rent (EGP)" path={['pricing', 'calculator', 'minRent']} placeholder="2000" />
              <Field label="Max Monthly Rent (EGP)" path={['pricing', 'calculator', 'maxRent']} placeholder="250000" />
              <Field label="Default Monthly Rent (EGP)" path={['pricing', 'calculator', 'defaultRent']} placeholder="35000" />
            </div>
          </Section>

          <Section
            title="❓ Frequently Asked Questions (FAQ)"
            description="Accordion questions and clear answers explaining contract terms and pass-through costs."
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <Field label="FAQ Section Eyebrow" path={['pricing', 'faq', 'eyebrow']} />
              <Field label="FAQ Section Headline" path={['pricing', 'faq', 'headline']} />
            </div>

            <div style={{ marginTop: '1.25rem' }}>
              {(content.pricing?.faq?.items || []).map((faq: any, i: number) => (
                <div
                  key={i}
                  style={{
                    padding: '1.25rem',
                    background: '#F9FAFB',
                    borderRadius: '0.75rem',
                    border: '1px solid #E5E7EB',
                    marginBottom: '1rem',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#1B2D45' }}>QUESTION #{i + 1}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const next = [...content.pricing.faq.items];
                        next.splice(i, 1);
                        update(['pricing', 'faq', 'items'], next);
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#EF4444',
                        cursor: 'pointer',
                        fontSize: '0.75rem',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                      }}
                    >
                      <Trash2 style={{ width: '0.8rem', height: '0.8rem' }} />
                      Delete Question
                    </button>
                  </div>
                  <Field label="Question" path={['pricing', 'faq', 'items', i, 'question']} />
                  <Field label="Answer" path={['pricing', 'faq', 'items', i, 'answer']} multiline />
                </div>
              ))}

              <button
                type="button"
                onClick={() => {
                  const next = [
                    ...(content.pricing?.faq?.items || []),
                    { question: 'New Question?', answer: 'Detailed plain answer here.' },
                  ];
                  update(['pricing', 'faq', 'items'], next);
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  padding: '0.5rem 0.875rem',
                  borderRadius: '0.5rem',
                  background: '#1B2D45',
                  color: '#fff',
                  border: 'none',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                <Plus style={{ width: '0.85rem', height: '0.85rem' }} />
                Add FAQ Question
              </button>
            </div>
          </Section>

          <Section
            title="🎯 Bottom Consultation Banner"
            description="The closing CTA banner on the pricing page with background architectural imagery."
          >
            <ImageField
              label="Banner Background Image"
              path={['pricing', 'cta', 'bgImage']}
              hint="Recommended: Clean architectural interior or staircase"
            />
            <Field label="Image Alt Text" path={['pricing', 'cta', 'bgImageAlt']} />
            <Field label="Headline" path={['pricing', 'cta', 'headline']} />
            <Field label="Button Label" path={['pricing', 'cta', 'ctaLabel']} />
          </Section>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB: FOUNDERS */}
      {/* ============================================================ */}
      {activeTab === 'founders' && (
        <div>
          <Section
            title="📄 Founders Page Header"
            description="Page title, eyebrow, and introductory overview for the leadership page."
          >
            <Field label="Eyebrow" path={['founders', 'page', 'eyebrow']} />
            <Field label="Main Headline" path={['founders', 'page', 'headline']} />
            <Field label="Introductory Body" path={['founders', 'page', 'body']} multiline />
          </Section>

          <Section
            title="👔 Co-Founders & Bios"
            description="Manage portraits, executive titles, bios, emails, and experience credentials for Agarli founders."
          >
            {(content?.founders?.items || []).map((_: any, idx: number) => (
              <div
                key={idx}
                style={{
                  marginBottom: '2rem',
                  padding: '1.5rem',
                  background: '#F9FAFB',
                  borderRadius: '1rem',
                  border: '1.5px solid #E5E7EB',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                  <span style={{ fontWeight: 700, color: '#1B2D45', fontSize: '1rem' }}>
                    Founder #{idx + 1}: {content?.founders?.items?.[idx]?.name || 'Founder'}
                  </span>
                  <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem', borderRadius: '999px', background: 'rgba(201,169,110,0.15)', color: '#C9A96E', fontWeight: 600 }}>
                    {content?.founders?.items?.[idx]?.role || 'Leadership'}
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                  <Field label="Full Name" path={['founders', 'items', idx, 'name']} />
                  <Field label="Role / Title" path={['founders', 'items', idx, 'role']} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                  <Field label="Direct Email" path={['founders', 'items', idx, 'email']} hint="Clickable mailto and copy button" />
                </div>

                <ImageField
                  label="Executive Portrait"
                  path={['founders', 'items', idx, 'image']}
                  hint="Square high-resolution executive portrait (1:1 ratio recommended)"
                />

                <Field
                  label="Biography"
                  path={['founders', 'items', idx, 'bio']}
                  multiline
                  hint="Full professional background and leadership experience"
                />

                <div style={{ marginTop: '1rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#4B5563', letterSpacing: '0.04em', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
                    Key Highlights & Credentials
                  </label>
                  {(content?.founders?.items?.[idx]?.highlights || []).map((_: any, hIdx: number) => (
                    <div key={hIdx} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <input
                        type="text"
                        value={content?.founders?.items?.[idx]?.highlights?.[hIdx] || ''}
                        onChange={e => update(['founders', 'items', idx, 'highlights', hIdx], e.target.value)}
                        style={{
                          flex: 1,
                          padding: '0.5rem 0.75rem',
                          border: '1.5px solid #E5E7EB',
                          borderRadius: '0.5rem',
                          fontSize: '0.825rem',
                          fontFamily: 'inherit',
                          color: '#1B2D45',
                          background: '#fff',
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const current = [...(content?.founders?.items?.[idx]?.highlights || [])];
                          current.splice(hIdx, 1);
                          update(['founders', 'items', idx, 'highlights'], current);
                        }}
                        style={{
                          background: '#FEE2E2',
                          border: 'none',
                          color: '#EF4444',
                          borderRadius: '0.5rem',
                          padding: '0.5rem',
                          cursor: 'pointer',
                        }}
                      >
                        <Trash2 style={{ width: '0.875rem', height: '0.875rem' }} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      const current = [...(content?.founders?.items?.[idx]?.highlights || [])];
                      current.push('New Credential');
                      update(['founders', 'items', idx, 'highlights'], current);
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: '#1B2D45',
                      background: '#F3F4F6',
                      border: '1px solid #E5E7EB',
                      borderRadius: '0.5rem',
                      padding: '0.35rem 0.75rem',
                      cursor: 'pointer',
                      marginTop: '0.25rem',
                    }}
                  >
                    <Plus style={{ width: '0.75rem', height: '0.75rem' }} /> Add Highlight
                  </button>
                </div>
              </div>
            ))}
          </Section>

          <Section
            title="🎯 Leadership Philosophy & Standards"
            description="The core stewardship commitments displayed on the founders page."
          >
            <Field label="Section Eyebrow" path={['founders', 'philosophy', 'eyebrow']} />
            <Field label="Section Headline" path={['founders', 'philosophy', 'headline']} />

            {(content?.founders?.philosophy?.cards || []).map((_: any, idx: number) => (
              <div
                key={idx}
                style={{
                  marginBottom: '1rem',
                  padding: '1.25rem',
                  background: '#F9FAFB',
                  borderRadius: '0.75rem',
                  border: '1px solid #E5E7EB',
                }}
              >
                <div style={{ fontWeight: 600, color: '#1B2D45', fontSize: '0.875rem', marginBottom: '0.75rem' }}>
                  Commitment #{idx + 1}
                </div>
                <Field label="Title" path={['founders', 'philosophy', 'cards', idx, 'title']} />
                <Field label="Description" path={['founders', 'philosophy', 'cards', idx, 'body']} multiline />
              </div>
            ))}
          </Section>

          <Section
            title="📣 Bottom CTA Banner"
            description="Consultation call-to-action at the base of the founders page."
          >
            <Field label="Headline" path={['founders', 'cta', 'headline']} />
            <Field label="Button Label" path={['founders', 'cta', 'ctaLabel']} />
            <ImageField
              label="Background Image"
              path={['founders', 'cta', 'bgImage']}
              hint="Architectural background image for the CTA banner"
            />
          </Section>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 4: GLOBAL & FOOTER */}
      {/* ============================================================ */}
      {activeTab === 'global' && (
        <div>
          <Section
            title="🖼️ Brand Logos & Visual Identity"
            description="Logos rendered across headers, navigation, footer, and admin panel."
          >
            <ImageField
              label="Navy Logo (Light Backgrounds)"
              path={['site', 'logoNavy']}
              hint="Used on solid/scrolled headers, login page, and light surfaces"
              darkPreview={false}
            />
            <ImageField
              label="White Logo (Dark Backgrounds)"
              path={['site', 'logoWhite']}
              hint="Used on transparent hero header, dark footer, and sidebar"
              darkPreview={true}
            />
          </Section>

          <Section
            title="📞 Contact Information"
            description="Primary communication channels displayed in the footer and consultation links."
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <Field label="Phone Number (Display)" path={['contact', 'phone']} placeholder="+20 100 000 0000" />
              <Field label="Phone Dial Link (tel:)" path={['contact', 'phoneHref']} placeholder="tel:+201000000000" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <Field label="Email Address" path={['contact', 'email']} placeholder="info@agarli.com" />
              <Field label="WhatsApp Direct Link" path={['contact', 'whatsapp']} placeholder="https://wa.me/..." />
            </div>
            <Field label="Location / Territory" path={['contact', 'location']} placeholder="Cairo · Egypt" />
          </Section>

          <Section
            title="💬 Floating WhatsApp Widget"
            description="Manage the persistent floating WhatsApp button displayed on the bottom right of every page across the website."
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <Field
                label="WhatsApp Phone Number"
                path={['floatingWhatsapp', 'phone']}
                placeholder="+201020130946"
                hint="Displayed in tooltips or details"
              />
              <Field
                label="Direct WhatsApp Link"
                path={['floatingWhatsapp', 'url']}
                placeholder="https://wa.me/201020130946"
                hint="Click target (e.g., https://wa.me/201020130946)"
              />
            </div>
            <Field
              label="Interactive Button Label"
              path={['floatingWhatsapp', 'label']}
              placeholder="Chat with Agarli"
              hint="Label displayed when visitors hover over the floating icon"
            />
          </Section>

          <Section
            title="🗒️ Footer Details"
            description="Tagline, copyright year, and regulatory/license information in the footer."
          >
            <Field label="Footer Mission Tagline" path={['footer', 'tagline']} multiline />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <Field label="Copyright Year" path={['footer', 'copyright']} placeholder="2026" />
              <Field label="License / Accreditation Note" path={['footer', 'license']} placeholder="Licensed residential asset management · Egypt" />
            </div>
          </Section>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 5: SETTINGS & SEO */}
      {/* ============================================================ */}
      {activeTab === 'settings' && (
        <div>
          <Section
            title="🔍 Search Engine Optimization (SEO) & Social Sharing"
            description="Meta titles and descriptions that appear on Google Search and social media cards."
          >
            <Field label="Website Title (<title>)" path={['site', 'title']} />
            <Field label="Meta Description" path={['site', 'description']} multiline />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <Field label="OpenGraph (Social) Title" path={['site', 'ogTitle']} />
              <Field label="OpenGraph (Social) Description" path={['site', 'ogDescription']} multiline />
            </div>
          </Section>

          <Section
            title="🔗 Integrations & External Links"
            description="Tracking IDs and external scheduling/form destinations."
          >
            <Field
              label="Booking Consultation Form URL"
              path={['site', 'googleFormsUrl']}
              hint="Link attached to all 'Book a Consultation' buttons across the site"
            />
            <Field
              label="Google Analytics Measurement ID"
              path={['site', 'googleAnalyticsId']}
              placeholder="G-XXXXXXXXXX"
              hint="Leave blank to disable analytics tracking"
            />
            <Field
              label="Google Calendar ID"
              path={['site', 'googleCalendarId']}
              placeholder="primary or calendar-id@group.calendar.google.com"
              hint="Used for synchronizing bookings with the admin calendar"
            />
          </Section>

          <Section
            title="🔒 Admin Security"
            description="Password used to sign into the Agarli management dashboard."
          >
            <Field
              label="Admin Password"
              path={['site', 'adminPassword']}
              hint="Keep this secure. Used to authenticate at /admin/login"
            />
          </Section>
        </div>
      )}
    </div>
    </EditorContext.Provider>
  );
}
