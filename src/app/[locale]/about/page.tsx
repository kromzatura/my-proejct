import { useTranslations } from 'next-intl';
import {Link} from '../../../i18n/routing';

export default function AboutPage() {
  const t = useTranslations('about');

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          {t('title')}
        </h1>
        <p className="text-xl text-gray-600">
          {t('subtitle')}
        </p>
      </div>

      <div className="prose prose-lg max-w-none">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <p className="text-gray-700 leading-relaxed mb-6">
            {t('content')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {t('team')}
            </h3>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {t('mission')}
            </h3>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {t('values')}
            </h3>
          </div>
        </div>

        <div className="text-center">
          <Link 
            href="/contact" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
