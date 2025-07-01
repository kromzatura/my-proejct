import { Link } from '../../i18n/routing';
import { useTranslations } from 'next-intl';

export default function Navigation() {
  const t = useTranslations('nav');
  
  return (
    <nav className="hidden md:flex items-center gap-6">
      <Link 
        href="/" 
        className="text-sm font-medium hover:text-gray-600 transition-colors"
      >
        {t('home')}
      </Link>
      <Link 
        href="/about" 
        className="text-sm font-medium hover:text-gray-600 transition-colors"
      >
        {t('about')}
      </Link>
      <Link 
        href="/contact" 
        className="text-sm font-medium hover:text-gray-600 transition-colors"
      >
        {t('contact')}
      </Link>
      <Link 
        href="/test" 
        className="text-sm font-medium hover:text-gray-600 transition-colors"
      >
        {t('test')}
      </Link>
    </nav>
  );
}
