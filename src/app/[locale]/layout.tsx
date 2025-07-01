import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '../../i18n/routing';
import { Geist, Geist_Mono } from "next/font/google";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { StructuredData } from '../../components/StructuredData';
import { generateMetadata as generateSEOMetadata, larGroupSEO } from '../../lib/seo';
import { generateStructuredData } from '../../lib/structured-data';
import GoogleAnalytics from '../../lib/analytics';
import GoogleTagManager, { GoogleTagManagerNoScript } from '../../lib/gtm';
import '../globals.css';
import { Metadata } from 'next';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Generate metadata for the root layout
export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const { locale } = resolvedParams;
  
  return generateSEOMetadata({
    title: `${larGroupSEO.siteName} - ${larGroupSEO.tagline}`,
    description: larGroupSEO.description[locale as keyof typeof larGroupSEO.description] || larGroupSEO.description.en,
    keywords: larGroupSEO.keywords[locale as keyof typeof larGroupSEO.keywords] || larGroupSEO.keywords.en,
    type: 'website',
  }, locale);
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;

  // Ensure the incoming `locale` is valid
  if (!routing.locales.includes(locale as 'en' | 'nl')) {
    notFound();
  }

  // Fetch messages for the locale
  const messages = await getMessages();

  // Generate structured data for organization
  const organizationData = generateStructuredData({
    type: 'organization',
    locale,
  });

  return (
    <html lang={locale}>
      <head>
        <StructuredData data={organizationData} />
        {/* Google Tag Manager */}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
        )}
        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gray-50`}>
        {/* Google Tag Manager NoScript */}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <GoogleTagManagerNoScript gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
        )}
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
