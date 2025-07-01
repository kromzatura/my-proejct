import { getTranslations } from 'next-intl/server';
import { Link } from '../../../i18n/routing';

interface BlogPageProps {
  params: Promise<{ locale: string }>;
}

export default async function BlogPage({
  params
}: BlogPageProps) {
  const { locale } = await params;
  const t = await getTranslations('blog');

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t('title')}
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
      </div>
      
      {/* Coming Soon Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            {locale === 'nl' ? 'Binnenkort beschikbaar' : 'Coming Soon'}
          </h2>
          <p className="text-gray-600 mb-8">
            {locale === 'nl' 
              ? 'Onze blog met nieuws en inzichten wordt binnenkort gelanceerd.'
              : 'Our blog with news and insights will be launched soon.'
            }
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-colors"
          >
            {locale === 'nl' ? 'Neem Contact Op' : 'Contact Us'}
          </Link>
        </div>
      </div>
    </div>
  );
}
