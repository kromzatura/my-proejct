import {useTranslations} from 'next-intl';
import { Link } from '../../i18n/routing';

interface HeroProps {
  locale: string;
}

export default function Hero({ locale }: HeroProps) {
  const t = useTranslations('home');

  return (
    <section className="w-full bg-blue-900 text-white">
      <div className="container mx-auto flex flex-col items-center justify-center text-center px-4 py-20 md:py-32">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          {locale === 'nl' 
            ? 'Professionele Zaden & Granen voor de B2B Markt'
            : 'Professional Seeds & Grains for the B2B Market'
          }
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mb-8 opacity-90">
          {locale === 'nl'
            ? 'LAR Group B.V. - Uw betrouwbare partner sinds 2009 voor hoogwaardige zaden en granen'
            : 'LAR Group B.V. - Your reliable partner since 2009 for high-quality seeds and grains'
          }
        </p>
        <p className="text-base md:text-lg mb-10 opacity-80 max-w-2xl">
          {locale === 'nl' 
            ? 'Van biologische granen tot gespecialiseerde zaden - wij bieden kwaliteitsproducten met volledige certificering en betrouwbare levering.'
            : 'From organic grains to specialized seeds - we offer quality products with full certification and reliable delivery.'
          }
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href={`/${locale}/contact`}
            className="bg-white text-blue-900 font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition-colors shadow-lg"
          >
            {locale === 'nl' ? 'Vraag Offerte Aan' : 'Request Quote'}
          </Link>
          <Link 
            href={`/${locale}/products`}
            className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white hover:text-blue-900 transition-colors"
          >
            {locale === 'nl' ? 'Bekijk Producten' : 'View Products'}
          </Link>
        </div>
      </div>
    </section>
  );
}
