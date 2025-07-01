import { getTranslations } from 'next-intl/server';
import { Link } from '../../../i18n/routing';
import { sanityFetch, queries, urlFor } from '../../../lib/sanity';
import { Product } from '../../../types/sanity';
import { generateMetadata as generateSEOMetadata } from '../../../lib/seo';
import { StructuredData } from '../../../components/StructuredData';
import { generateStructuredData } from '../../../lib/structured-data';
import { Metadata } from 'next';

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

          {/* Filters and Search */}
          <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap gap-2">
              <button className="px-4 py-2 bg-blue-900 text-white rounded-lg text-sm font-medium">
                {t('categories.all')}
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors">
                {t('categories.seeds')}
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors">
                {t('categories.grains')}
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors">
                {t('categories.organic')}
              </button>
            </div>
            
            <div className="flex items-center gap-4">
              <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm">
                <option>{t('sort.name')}</option>
                <option>{t('sort.newest')}</option>
                <option>{t('sort.popularity')}</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} locale={locale} />
              ))}
            </div>
          ) : (
            <FallbackProductsGrid locale={locale} />
          )}

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

// Product Card Component
function ProductCard({ product, locale }: { product: Product; locale: string }) {
  const imageUrl = product.image ? urlFor(product.image).width(400).height(300).url() : '/placeholder-product.svg';
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-w-4 aspect-h-3">
        <img
          src={imageUrl}
          alt={product.title}
          className="w-full h-48 object-cover"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
            {product.category}
          </span>
          {product.featured && (
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
              {locale === 'nl' ? 'Aanbevolen' : 'Featured'}
            </span>
          )}
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            <span className="block">{locale === 'nl' ? 'Herkomst' : 'Origin'}: {product.origin}</span>
            <span className="block">{locale === 'nl' ? 'Type' : 'Type'}: {product.type}</span>
          </div>
          <Link
            href={`/products/${product.slug.current}`}
            className="px-4 py-2 bg-blue-900 text-white text-sm font-medium rounded-lg hover:bg-blue-800 transition-colors"
          >
            {locale === 'nl' ? 'Bekijk Details' : 'View Details'}
          </Link>
        </div>
      </div>
    </div>
  );
}

// Fallback grid for when Sanity data is not available
function FallbackProductsGrid({ locale }: { locale: string }) {
  const fallbackProducts = [
    {
      id: '1',
      slug: 'premium-wheat-seeds',
      title: locale === 'nl' ? 'Premium Tarwe Zaden' : 'Premium Wheat Seeds',
      category: locale === 'nl' ? 'Zaden' : 'Seeds',
      description: locale === 'nl' 
        ? 'Hoogwaardige tarwe zaden voor professionele landbouw met uitstekende kiemkracht'
        : 'High-quality wheat seeds for professional agriculture with excellent germination',
      origin: locale === 'nl' ? 'Nederland' : 'Netherlands',
      type: locale === 'nl' ? 'Wintergraan' : 'Winter Grain',
      image: '/placeholder-product.jpg',
      featured: true
    },
    {
      id: '2',
      slug: 'organic-barley',
      title: locale === 'nl' ? 'Biologische Gerst' : 'Organic Barley',
      category: locale === 'nl' ? 'Biologisch' : 'Organic',
      description: locale === 'nl'
        ? 'Gecertificeerde biologische gerst van top kwaliteit volgens EU-normen'
        : 'Certified organic barley of top quality according to EU standards',
      origin: locale === 'nl' ? 'Duitsland' : 'Germany',
      type: locale === 'nl' ? 'Zomergraan' : 'Summer Grain',
      image: '/placeholder-product.jpg',
      featured: false
    },
    {
      id: '3',
      slug: 'corn-hybrid-seeds',
      title: locale === 'nl' ? 'Mais Hybrid Zaden' : 'Corn Hybrid Seeds', 
      category: locale === 'nl' ? 'Zaden' : 'Seeds',
      description: locale === 'nl'
        ? 'Hybride mais zaden voor maximale opbrengst en ziekteresistentie'
        : 'Hybrid corn seeds for maximum yield and disease resistance',
      origin: locale === 'nl' ? 'Frankrijk' : 'France',
      type: locale === 'nl' ? 'Hybride' : 'Hybrid',
      image: '/placeholder-product.jpg',
      featured: false
    },
    {
      id: '4',
      slug: 'organic-sunflower-seeds',
      title: locale === 'nl' ? 'Biologische Zonnebloem Zaden' : 'Organic Sunflower Seeds',
      category: locale === 'nl' ? 'Biologisch' : 'Organic',
      description: locale === 'nl'
        ? 'Biologische zonnebloem zaden voor olie-productie en voeding'
        : 'Organic sunflower seeds for oil production and nutrition',
      origin: locale === 'nl' ? 'Oekraïne' : 'Ukraine',
      type: locale === 'nl' ? 'Oliezaden' : 'Oil Seeds',
      image: '/placeholder-product.jpg',
      featured: true
    },
    {
      id: '5',
      slug: 'premium-rice-grains',
      title: locale === 'nl' ? 'Premium Rijst Korrels' : 'Premium Rice Grains',
      category: locale === 'nl' ? 'Granen' : 'Grains',
      description: locale === 'nl'
        ? 'Langkorrel basmati rijst van premium kwaliteit voor export'
        : 'Long grain basmati rice of premium quality for export',
      origin: locale === 'nl' ? 'India' : 'India',
      type: locale === 'nl' ? 'Basmati' : 'Basmati',
      image: '/placeholder-product.jpg',
      featured: false
    },
    {
      id: '6',
      slug: 'organic-quinoa-seeds',
      title: locale === 'nl' ? 'Biologische Quinoa Zaden' : 'Organic Quinoa Seeds',
      category: locale === 'nl' ? 'Biologisch' : 'Organic',
      description: locale === 'nl'
        ? 'Biologische quinoa zaden rijk aan eiwitten en voedingsstoffen'
        : 'Organic quinoa seeds rich in proteins and nutrients',
      origin: locale === 'nl' ? 'Bolivia' : 'Bolivia',
      type: locale === 'nl' ? 'Superfood' : 'Superfood',
      image: '/placeholder-product.jpg',
      featured: false
    },
    {
      id: '7',
      slug: 'rye-seeds',
      title: locale === 'nl' ? 'Rogge Zaden' : 'Rye Seeds',
      category: locale === 'nl' ? 'Zaden' : 'Seeds',
      description: locale === 'nl'
        ? 'Winterharde rogge zaden geschikt voor koude klimaten'
        : 'Winter-hardy rye seeds suitable for cold climates',
      origin: locale === 'nl' ? 'Polen' : 'Poland',
      type: locale === 'nl' ? 'Wintergraan' : 'Winter Grain',
      image: '/placeholder-product.jpg',
      featured: false
    },
    {
      id: '8',
      slug: 'buckwheat-grains',
      title: locale === 'nl' ? 'Boekweit Korrels' : 'Buckwheat Grains',
      category: locale === 'nl' ? 'Granen' : 'Grains',
      description: locale === 'nl'
        ? 'Glutenvrije boekweit korrels voor gezonde voeding'
        : 'Gluten-free buckwheat grains for healthy nutrition',
      origin: locale === 'nl' ? 'Rusland' : 'Russia',
      type: locale === 'nl' ? 'Pseudograan' : 'Pseudocereal',
      image: '/placeholder-product.jpg',
      featured: false
    },
    {
      id: '9',
      slug: 'flax-seeds',
      title: locale === 'nl' ? 'Lijnzaad' : 'Flax Seeds',
      category: locale === 'nl' ? 'Zaden' : 'Seeds',
      description: locale === 'nl'
        ? 'Lijnzaad rijk aan omega-3 vetzuren voor voeding en industrie'
        : 'Flax seeds rich in omega-3 fatty acids for nutrition and industry',
      origin: locale === 'nl' ? 'Canada' : 'Canada',
      type: locale === 'nl' ? 'Oliezaden' : 'Oil Seeds',
      image: '/placeholder-product.jpg',
      featured: true
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {fallbackProducts.map((product) => (
        <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
          <div className="aspect-w-4 aspect-h-3">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-cover bg-gray-200"
            />
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                {product.category}
              </span>
              {product.featured && (
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                  {locale === 'nl' ? 'Aanbevolen' : 'Featured'}
                </span>
              )}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.title}</h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
            
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                <span className="block">{locale === 'nl' ? 'Herkomst' : 'Origin'}: {product.origin}</span>
                <span className="block">{locale === 'nl' ? 'Type' : 'Type'}: {product.type}</span>
              </div>
              <Link
                href={`/products/${product.slug}`}
                className="px-4 py-2 bg-blue-900 text-white text-sm font-medium rounded-lg hover:bg-blue-800 transition-colors"
              >
                {locale === 'nl' ? 'Bekijk Details' : 'View Details'}
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}