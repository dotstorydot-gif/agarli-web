import { getContent } from "@/lib/content";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FeaturesGrid from "@/components/why-agarli/FeaturesGrid";
import ComparisonTable from "@/components/why-agarli/ComparisonTable";
import Reveal from "@/components/shared/Reveal";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function WhyAgarliPage() {
  const c = getContent();
  const { page, features, comparison, cta } = c.whyAgarli;
  return (
    <>
      <Header
        formsUrl={c.site.googleFormsUrl}
        logoNavy={c.site.logoNavy}
        logoWhite={c.site.logoWhite}
      />
      <main>
        {/* Page Header */}
        <section style={{ paddingTop: "9rem", paddingBottom: "3.5rem" }}>
          <div className="container-editorial" style={{ maxWidth: "70rem" }}>
            <Reveal delay={0}>
              <div className="eyebrow" style={{ color: "#C9A96E" }}>{page.eyebrow}</div>
            </Reveal>
            <Reveal delay={120}>
              <h1 className="display-xl" style={{ marginTop: "1.75rem", color: "#1B2D45", lineHeight: 1.02 }}>{page.headline}</h1>
            </Reveal>
            <Reveal delay={240}>
              <p className="lead" style={{ marginTop: "2rem", maxWidth: "42rem" }}>{page.body}</p>
            </Reveal>
          </div>
        </section>

        <FeaturesGrid features={features} />
        <ComparisonTable headline={comparison.headline} rows={comparison.rows} />

        {/* CTA */}
        <section style={{ background: "#0B1A30", padding: "5rem 0" }}>
          <div className="container-editorial" style={{ textAlign: "center" }}>
            <Reveal delay={0}>
              <h2 className="display-lg" style={{ color: "#fff", maxWidth: "40rem", margin: "0 auto" }}>{cta.headline}</h2>
            </Reveal>
            <Reveal delay={150}>
              <a href={c.site.googleFormsUrl || '#consultation'} data-open-consultation="true" className="btn-base btn-gold" style={{ marginTop: "2.5rem", display: "inline-flex" }}>
                {cta.ctaLabel}
              </a>
            </Reveal>
          </div>
        </section>
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
