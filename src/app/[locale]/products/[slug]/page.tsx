import { getTranslations } from 'next-intl/server';
import { Link } from '../../../../i18n/routing';
import { sanityFetch, queries, urlFor } from '../../../../lib/sanity';
import { Product } from '../../../../types/sanity';
import { generateMetadata as generateSEOMetadata } from '../../../../lib/seo';
import { StructuredData } from '../../../../components/StructuredData';
import { generateStructuredData } from '../../../../lib/structured-data';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface ProductDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

// Generate metadata for product detail page
export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const { locale, slug } = resolvedParams;
  
  // Try to fetch product from Sanity
  const product = await sanityFetch<Product>(queries.productBySlug, { slug });
  
  if (product) {
    return generateSEOMetadata({
      title: `${product.title} - LAR Group B.V.`,
      description: product.description,
      keywords: [product.category, product.type, product.origin, 'LAR Group'],
      url: `/products/${slug}`,
      image: product.image ? urlFor(product.image).width(1200).height(630).url() : undefined,
    }, locale);
  }
  
  // Fallback metadata
  const title = locale === 'nl' ? 'Product Details - LAR Group B.V.' : 'Product Details - LAR Group B.V.';
  const description = locale === 'nl' 
    ? 'Ontdek de details van onze premium zaden en granen producten.'
    : 'Discover the details of our premium seeds and grains products.';
  
  return generateSEOMetadata({
    title,
    description,
    keywords: locale === 'nl' 
      ? ['product', 'zaden', 'granen', 'details', 'LAR Group']
      : ['product', 'seeds', 'grains', 'details', 'LAR Group'],
    url: `/products/${slug}`,
  }, locale);
}

export default async function ProductDetailPage({ 
  params 
}: ProductDetailPageProps) {
  const { locale, slug } = await params;
  const t = await getTranslations('productDetail');
  
  // Try to fetch product from Sanity
  const product = await sanityFetch<Product>(queries.productBySlug, { slug });
  
  // If no product found in Sanity, check if it's a fallback product
  if (!product) {
    const fallbackProduct = getFallbackProduct(slug, locale);
    if (!fallbackProduct) {
      notFound();
    }
    return <FallbackProductDetail product={fallbackProduct} locale={locale} />;
  }
  
  // Generate structured data
  const productData = generateStructuredData({
    type: 'product',
    locale,
    title: product.title,
    description: product.description,
    url: `/products/${slug}`,
    image: product.image ? urlFor(product.image).width(1200).height(630).url() : undefined,
  });
  
  const imageUrl = product.image ? urlFor(product.image).width(800).height(600).url() : '/placeholder-product.jpg';
  
  return (
    <div className="bg-white">
      <StructuredData data={productData} />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-blue-900">
              {locale === 'nl' ? 'Home' : 'Home'}
            </Link>
            <span>/</span>
            <Link href="/products" className="hover:text-blue-900">
              {locale === 'nl' ? 'Producten' : 'Products'}
            </Link>
            <span>/</span>
            <span className="text-gray-900">{product.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={imageUrl}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Additional images if available */}
              {product.gallery && product.gallery.length > 0 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.gallery.map((image, index) => (
                    <div key={index} className="aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={urlFor(image).width(200).height(200).url()}
                        alt={`${product.title} ${index + 1}`}
                        className="w-full h-full object-cover cursor-pointer hover:opacity-75"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                    {product.category}
                  </span>
                  {product.featured && (
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                      {locale === 'nl' ? 'Aanbevolen' : 'Featured'}
                    </span>
                  )}
                  {product.organic && (
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-sm font-medium rounded-full">
                      {locale === 'nl' ? 'Biologisch' : 'Organic'}
                    </span>
                  )}
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {product.title}
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Product Specifications */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {locale === 'nl' ? 'Productspecificaties' : 'Product Specifications'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      {locale === 'nl' ? 'Type:' : 'Type:'}
                    </span>
                    <span className="ml-2 text-sm text-gray-900">{product.type}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      {locale === 'nl' ? 'Herkomst:' : 'Origin:'}
                    </span>
                    <span className="ml-2 text-sm text-gray-900">{product.origin}</span>
                  </div>
                  {product.purity && (
                    <div>
                      <span className="text-sm font-medium text-gray-500">
                        {locale === 'nl' ? 'Zuiverheid:' : 'Purity:'}
                      </span>
                      <span className="ml-2 text-sm text-gray-900">{product.purity}%</span>
                    </div>
                  )}
                  {product.germination && (
                    <div>
                      <span className="text-sm font-medium text-gray-500">
                        {locale === 'nl' ? 'Kiemkracht:' : 'Germination:'}
                      </span>
                      <span className="ml-2 text-sm text-gray-900">{product.germination}%</span>
                    </div>
                  )}
                  {product.moistureContent && (
                    <div>
                      <span className="text-sm font-medium text-gray-500">
                        {locale === 'nl' ? 'Vochtigheid:' : 'Moisture:'}
                      </span>
                      <span className="ml-2 text-sm text-gray-900">{product.moistureContent}%</span>
                    </div>
                  )}
                  {product.packagingOptions && (
                    <div className="md:col-span-2">
                      <span className="text-sm font-medium text-gray-500">
                        {locale === 'nl' ? 'Verpakking:' : 'Packaging:'}
                      </span>
                      <span className="ml-2 text-sm text-gray-900">
                        {product.packagingOptions.join(', ')}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Availability */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-2 ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="text-sm text-gray-600">
                    {product.inStock 
                      ? (locale === 'nl' ? 'Op voorraad' : 'In stock')
                      : (locale === 'nl' ? 'Uitverkocht' : 'Out of stock')
                    }
                  </span>
                </div>
                {product.harvestYear && (
                  <div className="text-sm text-gray-600">
                    {locale === 'nl' ? 'Oogstjaar:' : 'Harvest year:'} {product.harvestYear}
                  </div>
                )}
              </div>

              {/* Call to Action */}
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {locale === 'nl' ? 'Geïnteresseerd in dit product?' : 'Interested in this product?'}
                </h3>
                <p className="text-gray-600 mb-4">
                  {locale === 'nl' 
                    ? 'Neem contact met ons op voor prijzen, beschikbaarheid en aangepaste oplossingen.'
                    : 'Contact us for pricing, availability and customized solutions.'
                  }
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/contact"
                    className="flex-1 bg-blue-900 text-white text-center py-3 px-6 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
                  >
                    {locale === 'nl' ? 'Offerte Aanvragen' : 'Request Quote'}
                  </Link>
                  <Link
                    href="/contact"
                    className="flex-1 bg-white text-blue-900 border border-blue-900 text-center py-3 px-6 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                  >
                    {locale === 'nl' ? 'Meer Informatie' : 'More Information'}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              {locale === 'nl' ? 'Gerelateerde Producten' : 'Related Products'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {/* This would be populated with related products from Sanity */}
              <div className="text-center text-gray-500 col-span-full py-8">
                {locale === 'nl' 
                  ? 'Gerelateerde producten worden binnenkort toegevoegd.'
                  : 'Related products will be added soon.'
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Fallback product detail for development
function FallbackProductDetail({ product, locale }: { product: any; locale: string }) {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-blue-900">
              {locale === 'nl' ? 'Home' : 'Home'}
            </Link>
            <span>/</span>
            <Link href="/products" className="hover:text-blue-900">
              {locale === 'nl' ? 'Producten' : 'Products'}
            </Link>
            <span>/</span>
            <span className="text-gray-900">{product.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full mb-4 inline-block">
                  {product.category}
                </span>
                
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {product.title}
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Product Specifications */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {locale === 'nl' ? 'Productspecificaties' : 'Product Specifications'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      {locale === 'nl' ? 'Type:' : 'Type:'}
                    </span>
                    <span className="ml-2 text-sm text-gray-900">{product.type}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      {locale === 'nl' ? 'Herkomst:' : 'Origin:'}
                    </span>
                    <span className="ml-2 text-sm text-gray-900">{product.origin}</span>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {locale === 'nl' ? 'Geïnteresseerd in dit product?' : 'Interested in this product?'}
                </h3>
                <p className="text-gray-600 mb-4">
                  {locale === 'nl' 
                    ? 'Neem contact met ons op voor prijzen, beschikbaarheid en aangepaste oplossingen.'
                    : 'Contact us for pricing, availability and customized solutions.'
                  }
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/contact"
                    className="flex-1 bg-blue-900 text-white text-center py-3 px-6 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
                  >
                    {locale === 'nl' ? 'Offerte Aanvragen' : 'Request Quote'}
                  </Link>
                  <Link
                    href="/contact"
                    className="flex-1 bg-white text-blue-900 border border-blue-900 text-center py-3 px-6 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                  >
                    {locale === 'nl' ? 'Meer Informatie' : 'More Information'}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Get fallback product data
function getFallbackProduct(slug: string, locale: string) {
  const fallbackProducts: Record<string, any> = {
    'premium-wheat-seeds': {
      title: locale === 'nl' ? 'Premium Tarwe Zaden' : 'Premium Wheat Seeds',
      category: locale === 'nl' ? 'Zaden' : 'Seeds',
      description: locale === 'nl' 
        ? 'Hoogwaardige tarwe zaden speciaal geselecteerd voor professionele landbouwers. Deze premium zaden bieden uitstekende kiemkracht en opbrengst voor optimale gewasproductie.'
        : 'High-quality wheat seeds specially selected for professional farmers. These premium seeds offer excellent germination and yield for optimal crop production.',
      origin: locale === 'nl' ? 'Nederland' : 'Netherlands',
      type: locale === 'nl' ? 'Wintergraan' : 'Winter Grain',
      image: '/placeholder-product.jpg'
    },
    'organic-barley': {
      title: locale === 'nl' ? 'Biologische Gerst' : 'Organic Barley',
      category: locale === 'nl' ? 'Biologisch' : 'Organic',
      description: locale === 'nl'
        ? 'Gecertificeerde biologische gerst van topkwaliteit, geteeld volgens strenge biologische normen. Perfect voor biologische landbouw en voedingsproductie.'
        : 'Certified organic barley of top quality, grown according to strict organic standards. Perfect for organic farming and food production.',
      origin: locale === 'nl' ? 'Duitsland' : 'Germany',
      type: locale === 'nl' ? 'Zomergraan' : 'Summer Grain',
      image: '/placeholder-product.jpg'
    },
    'corn-hybrid-seeds': {
      title: locale === 'nl' ? 'Mais Hybrid Zaden' : 'Corn Hybrid Seeds',
      category: locale === 'nl' ? 'Zaden' : 'Seeds',
      description: locale === 'nl'
        ? 'Hybride mais zaden ontworpen voor maximale opbrengst en resistentie tegen ziekten. Speciaal ontwikkeld voor moderne landbouwpraktijken.'
        : 'Hybrid corn seeds designed for maximum yield and disease resistance. Specially developed for modern agricultural practices.',
      origin: locale === 'nl' ? 'Frankrijk' : 'France',
      type: locale === 'nl' ? 'Hybride' : 'Hybrid',
      image: '/placeholder-product.jpg'
    }
  };
  
  return fallbackProducts[slug] || null;
}
