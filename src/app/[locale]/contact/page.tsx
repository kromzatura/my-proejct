import { useTranslations } from 'next-intl';
import ContactForm from '../../components/ContactForm';

export default function ContactPage() {
  const t = useTranslations('contact');

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          {t('title')}
        </h1>
        <p className="text-xl text-gray-600">
          {t('subtitle')}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <ContactForm />
      </div>
    </div>
  );
}
