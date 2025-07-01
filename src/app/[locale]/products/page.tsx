import { getTranslations } from 'next-intl/server';
import { Link } from '../../../i18n/routing';
import { sanityFetch, queries } from '../../../lib/sanity';
import { Product } from '../../../types/sanity';
import { generateMetadata as generateSEOMetadata } from '../../../lib/seo';
import { StructuredData } from '../../../components/StructuredData';
import { generateStructuredData } from '../../../lib/structured-data';
import { Metadata } from 'next';
import ProductsClient from '@/app/components/ProductsClient';

interface ProductsPageProps {
  params: Promise<{ locale: string }>;
}

// Generate metadata for products page
export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const { locale } = resolvedParams;
  
  const title = locale === 'nl' ? 'Onze Producten - Premium Zaden & Granen' : 'Our Products - Premium Seeds & Grains';
  const description = locale === 'nl' 
    ? 'Ontdek ons uitgebreide assortiment premium zaden en granen voor professionele agrarische toepassingen.'
    : 'Discover our comprehensive range of premium seeds and grains for professional agricultural applications.';
  
  return generateSEOMetadata({
    title,
    description,
    keywords: locale === 'nl' 
      ? ['zaden', 'granen', 'agrarisch', 'biologisch', 'professioneel', 'LAR Group']
      : ['seeds', 'grains', 'agricultural', 'organic', 'professional', 'LAR Group'],
    url: '/products',
  }, locale);
}

export default async function ProductsPage({ 
  params 
}: ProductsPageProps) {
  const { locale } = await params;
  const t = await getTranslations('products');
  
  // Fetch products from Sanity CMS (with fallback for development)
  const products = await sanityFetch<Product[]>(queries.allProducts) || [];
  
  // Generate structured data
  const webpageData = generateStructuredData({
    type: 'webpage',
    locale,
    title: t('title'),
    description: t('hero.description'),
    url: '/products',
  });
  
  return (
    <div className="bg-white">
      <StructuredData data={webpageData} />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">
              {t('title')}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('hero.description')}
            </p>
          </div>

          {/* Products with Interactive Filtering */}
          <ProductsClient products={products} locale={locale} />

          {/* Call to Action */}
          <div className="mt-16 text-center bg-gray-50 rounded-2xl p-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {locale === 'nl' ? 'Niet gevonden wat u zoekt?' : "Can't find what you're looking for?"}
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              {locale === 'nl' 
                ? 'Neem contact met ons op voor aangepaste oplossingen en persoonlijk advies voor uw specifieke behoeften.'
                : 'Contact us for customized solutions and personal advice for your specific needs.'
              }
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-blue-900 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors"
            >
              {t('requestQuote')}
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
