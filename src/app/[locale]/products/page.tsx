export default async function ProductsPage({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;
  
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">
              {locale === 'nl' 
                ? 'Onze Producten' 
                : 'Our Products'
              }
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {locale === 'nl'
                ? 'Hoogwaardige zaden, granen en specerijen voor professionele toepassingen'
                : 'High-quality seeds, grains and spices for professional applications'
              }
            </p>
          </div>

          {/* Product Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-green-100 flex items-center justify-center">
                <svg className="w-16 h-16 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {locale === 'nl' ? 'Zaden' : 'Seeds'}
                </h3>
                <p className="text-gray-600 mb-4">
                  {locale === 'nl'
                    ? 'Professionele zaden voor landbouw en tuinbouw met garantie op kwaliteit en kiemkracht.'
                    : 'Professional seeds for agriculture and horticulture with quality and germination guarantee.'
                  }
                </p>
                <button className="w-full bg-blue-900 text-white py-2 rounded-lg hover:bg-blue-800 transition-colors">
                  {locale === 'nl' ? 'Bekijk Zaden' : 'View Seeds'}
                </button>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-amber-100 flex items-center justify-center">
                <svg className="w-16 h-16 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
                </svg>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {locale === 'nl' ? 'Granen' : 'Grains'}
                </h3>
                <p className="text-gray-600 mb-4">
                  {locale === 'nl'
                    ? 'Biologische en conventionele granen van erkende leveranciers wereldwijd.'
                    : 'Organic and conventional grains from certified suppliers worldwide.'
                  }
                </p>
                <button className="w-full bg-blue-900 text-white py-2 rounded-lg hover:bg-blue-800 transition-colors">
                  {locale === 'nl' ? 'Bekijk Granen' : 'View Grains'}
                </button>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-red-100 flex items-center justify-center">
                <svg className="w-16 h-16 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {locale === 'nl' ? 'Specerijen' : 'Spices'}
                </h3>
                <p className="text-gray-600 mb-4">
                  {locale === 'nl'
                    ? 'Gedroogde kruiden en specerijen voor de voedingsindustrie en horeca.'
                    : 'Dried herbs and spices for the food industry and hospitality sector.'
                  }
                </p>
                <button className="w-full bg-blue-900 text-white py-2 rounded-lg hover:bg-blue-800 transition-colors">
                  {locale === 'nl' ? 'Bekijk Specerijen' : 'View Spices'}
                </button>
              </div>
            </div>
          </div>

          {/* Coming Soon Notice */}
          <div className="text-center bg-blue-50 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">
              {locale === 'nl' ? 'Volledig Productoverzicht Binnenkort Beschikbaar' : 'Complete Product Overview Coming Soon'}
            </h3>
            <p className="text-gray-600 mb-6">
              {locale === 'nl'
                ? 'We werken aan een uitgebreide productcatalogus. Neem contact op voor specifieke productvragen.'
                : 'We are working on a comprehensive product catalog. Contact us for specific product inquiries.'
              }
            </p>
            <a 
              href={`/${locale}/contact`}
              className="inline-block bg-blue-900 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-800 transition-colors"
            >
              {locale === 'nl' ? 'Neem Contact Op' : 'Contact Us'}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
