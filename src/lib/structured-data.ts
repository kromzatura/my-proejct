import { larGroupSEO } from './seo';

export interface StructuredDataConfig {
  type: 'organization' | 'webpage' | 'article' | 'product' | 'faq';
  locale: string;
  url?: string;
  title?: string;
  description?: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
}

export function generateStructuredData(config: StructuredDataConfig) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://largroup.nl';
  const fullUrl = config.url ? `${baseUrl}${config.url}` : baseUrl;

  const baseSchema = {
    '@context': 'https://schema.org',
  };

  switch (config.type) {
    case 'organization':
      return {
        ...baseSchema,
        '@type': 'Organization',
        name: larGroupSEO.siteName,
        alternateName: larGroupSEO.tagline,
        description: larGroupSEO.description[config.locale as keyof typeof larGroupSEO.description] || larGroupSEO.description.en,
        url: baseUrl,
        telephone: larGroupSEO.contact.phone,
        email: larGroupSEO.contact.email,
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'NL',
          addressLocality: larGroupSEO.contact.address,
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: larGroupSEO.contact.phone,
          contactType: 'customer service',
          email: larGroupSEO.contact.email,
          availableLanguage: ['English', 'Dutch'],
        },
        sameAs: [
          // Add social media URLs when available
        ],
        logo: `${baseUrl}/logo.png`,
        image: `${baseUrl}/og-image.png`,
      };

    case 'webpage':
      return {
        ...baseSchema,
        '@type': 'WebPage',
        name: config.title,
        description: config.description,
        url: fullUrl,
        inLanguage: config.locale === 'nl' ? 'nl-NL' : 'en-US',
        isPartOf: {
          '@type': 'WebSite',
          name: larGroupSEO.siteName,
          url: baseUrl,
        },
        about: {
          '@type': 'Organization',
          name: larGroupSEO.siteName,
        },
        datePublished: config.datePublished,
        dateModified: config.dateModified || new Date().toISOString(),
      };

    case 'article':
      return {
        ...baseSchema,
        '@type': 'Article',
        headline: config.title,
        description: config.description,
        url: fullUrl,
        datePublished: config.datePublished,
        dateModified: config.dateModified || new Date().toISOString(),
        author: {
          '@type': 'Organization',
          name: larGroupSEO.siteName,
        },
        publisher: {
          '@type': 'Organization',
          name: larGroupSEO.siteName,
          logo: {
            '@type': 'ImageObject',
            url: `${baseUrl}/logo.png`,
          },
        },
        image: config.image ? `${baseUrl}${config.image}` : `${baseUrl}/og-image.png`,
        inLanguage: config.locale === 'nl' ? 'nl-NL' : 'en-US',
      };

    case 'product':
      return {
        ...baseSchema,
        '@type': 'Product',
        name: config.title,
        description: config.description,
        image: config.image ? `${baseUrl}${config.image}` : `${baseUrl}/og-image.png`,
        brand: {
          '@type': 'Brand',
          name: larGroupSEO.siteName,
        },
        manufacturer: {
          '@type': 'Organization',
          name: larGroupSEO.siteName,
        },
        category: 'Agricultural Products',
      };

    case 'faq':
      return {
        ...baseSchema,
        '@type': 'FAQPage',
        name: config.title,
        description: config.description,
        url: fullUrl,
        inLanguage: config.locale === 'nl' ? 'nl-NL' : 'en-US',
      };

    default:
      return baseSchema;
  }
}
