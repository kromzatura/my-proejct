'use client';

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { Link } from '../../i18n/routing';

export default function Footer() {
  const t = useTranslations('footer');
  const navT = useTranslations('nav');
  const locale = useLocale();
  const currentYear = new Date().getFullYear();

  const navigation = [
    { name: navT('home'), href: '/' },
    { name: navT('about'), href: '/about' },
    { name: navT('products'), href: '/products' },
    { name: navT('quality'), href: '/quality-and-certifications' },
    { name: navT('blog'), href: '/blog' },
    { name: navT('faq'), href: '/faq' },
    { name: navT('contact'), href: '/contact' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-2xl">L</span>
              </div>
              <div>
                <div className="text-2xl font-bold">{t('company.title')}</div>
                <div className="text-gray-400 text-sm">{t('company.tagline')}</div>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              {t('company.description')}
            </p>

            {/* Certifications */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-400 uppercase mb-3">
                {navT('quality')}
              </h4>
              <div className="flex items-center space-x-4">
                <div className="bg-green-700 px-3 py-1 rounded text-sm font-medium">
                  IFS Broker
                </div>
                <div className="bg-blue-700 px-3 py-1 rounded text-sm font-medium">
                  ISO 22000
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">
              {t('quickLinks.title')}
            </h3>
            <ul className="space-y-3">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-6">
              {t('contact.title')}
            </h3>
            <div className="space-y-4">
              
              {/* Address */}
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div className="text-gray-300">
                  <div>{t('contact.address')}</div>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+31617144921" className="text-gray-300 hover:text-white transition-colors">
                  {t('contact.phone')}
                </a>
              </div>

              {/* Email */}
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:alex.trade@largseeds.nl" className="text-gray-300 hover:text-white transition-colors">
                  {t('contact.email')}
                </a>
              </div>

              {/* Business Hours */}
              <div className="mt-6">
                <h4 className="text-sm font-semibold text-gray-400 uppercase mb-2">
                  Business Hours
                </h4>
                <div className="text-gray-300 text-sm space-y-1">
                  <div>Mon-Fri: 9:00 - 17:00</div>
                  <div>Weekend: Closed</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              {t('copyright')}
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <Link href="/privacy-policy" className="hover:text-white transition-colors">
                {t('legal.privacy')}
              </Link>
              <Link href="/terms-of-service" className="hover:text-white transition-colors">
                {t('legal.terms')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
