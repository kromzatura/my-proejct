import {useTranslations} from 'next-intl';
import {Link} from '../../i18n/routing';
 
export default function HomePage() {
  const t = useTranslations('home');
  return (
    <div className="space-y-12">
      <div className="text-center py-20 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            {t('title')}
          </h1>
          <p className="text-xl md:text-2xl text-blue-600 font-semibold mb-8">
            {t('subtitle')}
          </p>
          <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            {t('description')}
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-colors duration-200 shadow-lg hover:shadow-xl">
            {t('cta')}
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {t('features.responsive')}
          </h3>
        </div>
        <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {t('features.i18n')}
          </h3>
        </div>
        <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {t('features.typescript')}
          </h3>
        </div>
        <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {t('features.tailwind')}
          </h3>
        </div>
      </div>

      <div className="text-center">
        <Link 
          href="/about" 
          className="text-blue-600 hover:text-blue-800 underline text-lg"
        >
          Learn more about us
        </Link>
      </div>
    </div>
  );
}
