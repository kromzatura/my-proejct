import { useTranslations } from 'next-intl';
import { Link } from '../i18n/routing';

export default function NotFound() {
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center px-4">
        <div className="mb-8">
          <div className="text-9xl font-bold text-blue-600 mb-4">404</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Sorry, we couldn't find the page you're looking for. The page may have been moved or deleted.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link 
            href="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Go Home
          </Link>
          
          <div className="text-sm text-gray-500">
            Or try one of these popular pages:
          </div>
          
          <div className="flex flex-wrap justify-center gap-2">
            <Link href="/about" className="text-blue-600 hover:text-blue-800 underline">
              About
            </Link>
            <span className="text-gray-400">•</span>
            <Link href="/products" className="text-blue-600 hover:text-blue-800 underline">
              Products
            </Link>
            <span className="text-gray-400">•</span>
            <Link href="/contact" className="text-blue-600 hover:text-blue-800 underline">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
