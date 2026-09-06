import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { getContent } from '@/lib/content';
import FloatingWhatsApp from '@/components/shared/FloatingWhatsApp';
import { ConsultationProvider } from '@/components/shared/ConsultationContext';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const c = getContent();
  return {
    title: c.site.title,
    description: c.site.description,
    openGraph: {
      title: c.site.ogTitle || c.site.title,
      description: c.site.ogDescription || c.site.description,
      type: 'website',
      images: ['/images/agarli-logo-navy.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title: c.site.ogTitle || c.site.title,
      description: c.site.ogDescription || c.site.description,
      images: ['/images/agarli-logo-navy.png'],
    },
    authors: [{ name: 'Agarli' }],
    icons: {
      icon: [
        { url: '/favicon.ico' },
        { url: '/favicon.png', type: 'image/png' },
      ],
      apple: [{ url: '/apple-touch-icon.png' }],
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const c = getContent();
  const gaId = c.site.googleAnalyticsId;
  const whatsappUrl = c.floatingWhatsapp?.url || c.contact?.whatsapp || 'https://wa.me/201020130946';
  const whatsappLabel = c.floatingWhatsapp?.label || 'Chat with Agarli';
  const whatsappNumber = c.floatingWhatsapp?.phone || c.contact?.phone || '+201020130946';

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ConsultationProvider whatsappNumber={whatsappNumber}>
          {children}
          <FloatingWhatsApp whatsappUrl={whatsappUrl} label={whatsappLabel} />
        </ConsultationProvider>
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${gaId}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
