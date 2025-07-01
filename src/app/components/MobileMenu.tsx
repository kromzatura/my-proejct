'use client';

import { useState } from 'react';
import { Link } from '../../i18n/routing';
import { useTranslations } from 'next-intl';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('nav');

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-600 hover:text-gray-900"
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
        <span className="sr-only">Toggle menu</span>
      </button>

      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex flex-col gap-4">
              <Link 
                href="/" 
                className="text-sm font-medium hover:text-gray-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {t('home')}
              </Link>
              <Link 
                href="/about" 
                className="text-sm font-medium hover:text-gray-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {t('about')}
              </Link>
              <Link 
                href="/contact" 
                className="text-sm font-medium hover:text-gray-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {t('contact')}
              </Link>
              <Link 
                href="/test" 
                className="text-sm font-medium hover:text-gray-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {t('test')}
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
