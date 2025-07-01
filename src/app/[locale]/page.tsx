import {useTranslations} from 'next-intl';
import {Link} from '../../i18n/routing';
import Hero from '../components/Hero';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  
  return (
    <div>
      <Hero locale={locale} />
      
      {/* Product Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {locale === 'nl' ? 'Onze Productcategorieën' : 'Our Product Categories'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {locale === 'nl'
                ? 'Hoogwaardige zaden en granen voor professioneel gebruik'
                : 'High-quality seeds and grains for professional use'
              }
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow duration-200">
              <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {locale === 'nl' ? 'Zaden' : 'Seeds'}
              </h3>
              <p className="text-gray-600">
                {locale === 'nl'
                  ? 'Professionele zaden voor landbouw en tuinbouw'
                  : 'Professional seeds for agriculture and horticulture'
                }
              </p>
            </div>
            
            <div className="text-center p-8 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow duration-200">
              <div className="w-16 h-16 bg-amber-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {locale === 'nl' ? 'Granen' : 'Grains'}
              </h3>
              <p className="text-gray-600">
                {locale === 'nl'
                  ? 'Biologische en conventionele granen'
                  : 'Organic and conventional grains'
                }
              </p>
            </div>
            
            <div className="text-center p-8 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow duration-200">
              <div className="w-16 h-16 bg-red-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {locale === 'nl' ? 'Specerijen' : 'Spices'}
              </h3>
              <p className="text-gray-600">
                {locale === 'nl'
                  ? 'Gedroogde kruiden en specerijen'
                  : 'Dried herbs and spices'
                }
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quality & Trust Section */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {locale === 'nl' ? 'Kwaliteit & Betrouwbaarheid' : 'Quality & Reliability'}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-blue-900 mb-2">15+</div>
                <div className="text-gray-600">
                  {locale === 'nl' ? 'Jaar Ervaring' : 'Years Experience'}
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-blue-900 mb-2">100%</div>
                <div className="text-gray-600">
                  {locale === 'nl' ? 'Gecertificeerd' : 'Certified'}
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-blue-900 mb-2">B2B</div>
                <div className="text-gray-600">
                  {locale === 'nl' ? 'Alleen Zakelijk' : 'Business Only'}
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-blue-900 mb-2">24/7</div>
                <div className="text-gray-600">
                  {locale === 'nl' ? 'Ondersteuning' : 'Support'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {locale === 'nl' 
              ? 'Klaar om samen te werken?' 
              : 'Ready to work together?'
            }
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            {locale === 'nl'
              ? 'Neem contact op voor een persoonlijk aanbod op maat'
              : 'Get in touch for a personalized quote tailored to your needs'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact"
              className="bg-blue-900 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-800 transition-colors"
            >
              {locale === 'nl' ? 'Vraag Offerte Aan' : 'Request Quote'}
            </Link>
            <Link 
              href="/products"
              className="border-2 border-blue-900 text-blue-900 px-8 py-3 rounded-full font-bold hover:bg-blue-900 hover:text-white transition-colors"
            >
              {locale === 'nl' ? 'Bekijk Producten' : 'View Products'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
