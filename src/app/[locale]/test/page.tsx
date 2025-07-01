import { useTranslations } from 'next-intl';
import { Link } from '../../../i18n/routing';

export default function TestPage() {
  const t = useTranslations('test');
  const nav = useTranslations('nav');

  return (
    <div className="max-w-4xl mx-auto py-12">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          {t('title')}
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          {t('subtitle')}
        </p>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
          {t('description')}
        </p>
      </div>

      {/* Current Language Display */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-blue-900 mb-4">
          {t('currentLanguage')}
        </h2>
        <p className="text-blue-800">
          English / Nederlands
        </p>
      </div>

      {/* Instructions */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-yellow-900 mb-4">
          📋 Instructions
        </h2>
        <p className="text-yellow-800">
          {t('switchInstructions')}
        </p>
      </div>

      {/* Features Test Grid */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          {t('features.title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              ✅ {t('features.navigation')}
            </h3>
            <p className="text-gray-600 text-sm">
              All navigation links work correctly with locale-based routing.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              ✅ {t('features.content')}
            </h3>
            <p className="text-gray-600 text-sm">
              Content changes dynamically based on the selected language.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              ✅ {t('features.routing')}
            </h3>
            <p className="text-gray-600 text-sm">
              URLs update correctly with locale prefixes (en/nl).
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Test Links */}
      <div className="bg-white border border-gray-200 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          🧪 Test Navigation
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link 
            href="/" 
            className="bg-blue-600 text-white text-center py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            {nav('home')}
          </Link>
          <Link 
            href="/about" 
            className="bg-green-600 text-white text-center py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            {nav('about')}
          </Link>
          <Link 
            href="/contact" 
            className="bg-purple-600 text-white text-center py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors font-medium"
          >
            {nav('contact')}
          </Link>
          <Link 
            href="/test" 
            className="bg-orange-600 text-white text-center py-3 px-4 rounded-lg hover:bg-orange-700 transition-colors font-medium"
          >
            {nav('test')}
          </Link>
        </div>
      </div>
    </div>
  );
}
