import { Metadata } from 'next';

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article';
}

export function generateMetadata(
  config: SEOConfig,
  locale: string = 'en'
): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://largroup.nl';
  const fullUrl = config.url ? `${baseUrl}${config.url}` : baseUrl;
  const imageUrl = config.image ? `${baseUrl}${config.image}` : `${baseUrl}/og-image.png`;

  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords?.join(', '),
    authors: [{ name: 'LAR Group B.V.' }],
    creator: 'LAR Group B.V.',
    publisher: 'LAR Group B.V.',
    
    // Open Graph
    openGraph: {
      title: config.title,
      description: config.description,
      url: fullUrl,
      siteName: 'LAR Group B.V. - Professional Seeds & Grains',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: config.title,
        },
      ],
      locale: locale === 'nl' ? 'nl_NL' : 'en_US',
      type: config.type || 'website',
    },
    
    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: config.title,
      description: config.description,
      images: [imageUrl],
      creator: '@largroupbv',
    },
    
    // Robots
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    
    // Alternates for i18n
    alternates: {
      canonical: fullUrl,
      languages: {
        'en-US': `${baseUrl}/en${config.url || ''}`,
        'nl-NL': `${baseUrl}/nl${config.url || ''}`,
      },
    },
    
    // Verification
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
    },
  };
}

// Common SEO data for LAR Group
export const larGroupSEO = {
  siteName: 'LAR Group B.V.',
  tagline: 'Professional Seeds & Grains',
  description: {
    en: 'LAR Group B.V. delivers premium quality seeds and grains to agricultural businesses worldwide. Professional agricultural solutions with full certification.',
    nl: 'LAR Group B.V. levert premium kwaliteit zaden en granen aan agrarische bedrijven wereldwijd. Professionele agrarische oplossingen met volledige certificering.',
  },
  keywords: {
    en: ['seeds', 'grains', 'agriculture', 'farming', 'agricultural supplies', 'organic seeds', 'conventional grains', 'LAR Group', 'Netherlands', 'B2B agriculture'],
    nl: ['zaden', 'granen', 'landbouw', 'agrarisch', 'agrarische leveringen', 'biologische zaden', 'conventionele granen', 'LAR Group', 'Nederland', 'B2B landbouw'],
  },
  contact: {
    phone: '+31 6 17144921',
    email: 'alex.trade@largseeds.nl',
    address: 'Netherlands',
  },
};
