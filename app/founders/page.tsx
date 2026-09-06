import { Metadata } from 'next';
import { getContent } from '@/lib/content';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FoundersGrid from '@/components/founders/FoundersGrid';
import FoundersPhilosophy from '@/components/founders/FoundersPhilosophy';
import Reveal from '@/components/shared/Reveal';
import { ArrowRight } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const c = getContent();
  const title = `Founders — ${c.founders?.page?.headline || 'Agarli Leadership'}`;
  const description = c.founders?.page?.body || 'Meet the leadership team behind Agarli residential asset management.';
  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
}

export default function FoundersPage() {
  const c = getContent();
  const foundersData = c.founders;

  if (!foundersData) {
    return null;
  }

  const { page, items, philosophy, cta } = foundersData;

  return (
    <>
      <Header
        formsUrl={c.site.googleFormsUrl}
        logoNavy={c.site.logoNavy}
        logoWhite={c.site.logoWhite}
      />

      <main>
        {/* Page Header */}
        <section style={{ paddingTop: '10rem', paddingBottom: '4rem' }}>
          <div className="container-editorial" style={{ maxWidth: '70rem' }}>
            <Reveal delay={0}>
              <div className="eyebrow" style={{ color: '#C9A96E' }}>{page.eyebrow}</div>
            </Reveal>
            <Reveal delay={120}>
              <h1 className="display-xl" style={{ marginTop: '1.75rem', color: '#1B2D45', lineHeight: 1.02 }}>
                {page.headline}
              </h1>
            </Reveal>
            <Reveal delay={240}>
              <p className="lead" style={{ marginTop: '2rem', maxWidth: '42rem' }}>
                {page.body}
              </p>
            </Reveal>
          </div>
        </section>

        {/* Founders Profiles */}
        <FoundersGrid founders={items} />

        {/* Stewardship Philosophy */}
        {philosophy && (
          <FoundersPhilosophy
            eyebrow={philosophy.eyebrow}
            headline={philosophy.headline}
            cards={philosophy.cards}
          />
        )}

        {/* CTA Banner */}
        {cta && (
          <section style={{ position: 'relative', overflow: 'hidden', background: '#0B1A30' }}>
            {cta.bgImage && (
              <img
                src={cta.bgImage}
                alt={cta.bgImageAlt || 'Agarli Editorial Architecture'}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: 0.22,
                  transform: 'scale(1.05)',
                }}
                loading="lazy"
              />
            )}
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(11,26,48,0.72)' }} />
            <div
              className="container-editorial"
              style={{ position: 'relative', padding: '7rem 0', textAlign: 'center' }}
            >
              <Reveal delay={0}>
                <h2 className="display-lg" style={{ color: '#fff', maxWidth: '42rem', margin: '0 auto' }}>
                  {cta.headline}
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <a
                  href={c.site.googleFormsUrl || '#consultation'}
                  data-open-consultation="true"
                  className="btn-base btn-gold"
                  style={{ marginTop: '2.5rem', display: 'inline-flex' }}
                >
                  {cta.ctaLabel} <ArrowRight style={{ height: '1rem', width: '1rem' }} />
                </a>
              </Reveal>
            </div>
          </section>
        )}
      </main>

      <Footer
        tagline={c.footer.tagline}
        copyright={c.footer.copyright}
        license={c.footer.license}
        phone={c.contact.phone}
        phoneHref={c.contact.phoneHref}
        email={c.contact.email}
        whatsapp={c.contact.whatsapp}
        location={c.contact.location}
        formsUrl={c.site.googleFormsUrl}
        logoWhite={c.site.logoWhite}
      />
    </>
  );
}
