import { getContent } from '@/lib/content';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import CTABanner from '@/components/home/CTABanner';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function HomePage() {
  const c = getContent();
  return (
    <>
      <Header
        formsUrl={c.site.googleFormsUrl}
        logoNavy={c.site.logoNavy}
        logoWhite={c.site.logoWhite}
      />
      <main>
        <HeroSection data={c.home.hero} formsUrl={c.site.googleFormsUrl} />
        <HowItWorksSection
          eyebrow={c.home.howItWorks.eyebrow}
          headline={c.home.howItWorks.headline}
          steps={c.home.howItWorks.steps}
        />
        <CTABanner
          headline={c.home.ctaBanner.headline}
          headlineAccent={c.home.ctaBanner.headlineAccent}
          ctaLabel={c.home.ctaBanner.ctaLabel}
          bgImage={c.home.ctaBanner.bgImage}
          bgImageAlt={c.home.ctaBanner.bgImageAlt}
        />
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
