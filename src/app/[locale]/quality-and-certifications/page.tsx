import { Link } from '../../../i18n/routing';

export default async function QualityPage({ 
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
                ? 'Kwaliteit & Certificeringen' 
                : 'Quality & Certifications'
              }
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {locale === 'nl'
                ? 'Onze toewijding aan kwaliteit gegarandeerd door internationale certificeringen'
                : 'Our commitment to quality guaranteed by international certifications'
              }
            </p>
          </div>

          {/* Certifications Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-green-50 p-8 rounded-lg border border-green-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-green-800">IFS Broker</h3>
              </div>
              <p className="text-green-700">
                {locale === 'nl'
                  ? 'Internationale standaard voor voedselveiligheid en kwaliteitsmanagement in de handel.'
                  : 'International standard for food safety and quality management in trading.'
                }
              </p>
            </div>

            <div className="bg-blue-50 p-8 rounded-lg border border-blue-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-blue-800">ISO 22000</h3>
              </div>
              <p className="text-blue-700">
                {locale === 'nl'
                  ? 'Managementsysteem voor voedselveiligheid volgens internationale normen.'
                  : 'Food safety management system according to international standards.'
                }
              </p>
            </div>
          </div>

          {/* Quality Commitment */}
          <div className="bg-gray-50 p-8 rounded-lg mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              {locale === 'nl' ? 'Onze Kwaliteitstoezegging' : 'Our Quality Commitment'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {locale === 'nl' ? 'Volledige Traceerbaarheid' : 'Full Traceability'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'nl'
                    ? 'Van oorsprong tot levering, elke stap is gedocumenteerd'
                    : 'From origin to delivery, every step is documented'
                  }
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {locale === 'nl' ? 'Snelle Levering' : 'Fast Delivery'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'nl'
                    ? 'Efficiënte logistiek voor tijdige levering'
                    : 'Efficient logistics for timely delivery'
                  }
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {locale === 'nl' ? '24/7 Support' : '24/7 Support'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'nl'
                    ? 'Altijd bereikbaar voor uw vragen en behoeften'
                    : 'Always available for your questions and needs'
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="text-center bg-blue-900 text-white p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">
              {locale === 'nl' ? 'Vragen over Onze Certificeringen?' : 'Questions About Our Certifications?'}
            </h3>
            <p className="text-blue-100 mb-6">
              {locale === 'nl'
                ? 'Neem contact op voor meer informatie over onze kwaliteitsstandaarden'
                : 'Contact us for more information about our quality standards'
              }
            </p>
            <Link 
              href="/contact"
              className="inline-block bg-white text-blue-900 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors"
            >
              {locale === 'nl' ? 'Neem Contact Op' : 'Contact Us'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
