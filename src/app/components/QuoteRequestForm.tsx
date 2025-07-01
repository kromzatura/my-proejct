import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { trackQuoteRequest } from '../../lib/analytics';
import { pushQuoteRequestEvent } from '../../lib/gtm';

interface QuoteRequestFormProps {
  productName?: string;
  locale: string;
  onClose?: () => void;
}

export default function QuoteRequestForm({ productName, locale, onClose }: QuoteRequestFormProps) {
  const t = useTranslations('quoteForm');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      productName: productName || formData.get('product'),
      companyName: formData.get('companyName'),
      contactName: formData.get('contactName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      quantity: formData.get('quantity'),
      usage: formData.get('usage'),
      specifications: formData.get('specifications'),
      deliveryLocation: formData.get('deliveryLocation'),
      preferredDelivery: formData.get('preferredDelivery'),
      additionalInfo: formData.get('additionalInfo'),
      locale
    };

    try {
      // Prepare data for Zoho Forms
      const zohoFormData = new FormData();
      zohoFormData.append('SingleLine', data.companyName as string); // Company Name
      zohoFormData.append('Name_First', (data.contactName as string).split(' ')[0] || ''); // First Name
      zohoFormData.append('Name_Last', (data.contactName as string).split(' ').slice(1).join(' ') || ''); // Last Name
      zohoFormData.append('Email', data.email as string);
      zohoFormData.append('PhoneNumber_countrycode', data.phone as string);
      zohoFormData.append('SingleLine1', data.productName as string); // Product Name
      zohoFormData.append('Number', data.quantity as string);
      zohoFormData.append('Dropdown', data.usage as string);
      zohoFormData.append('MultiLine', data.specifications as string);
      zohoFormData.append('SingleLine2', data.deliveryLocation as string); // Delivery Location
      zohoFormData.append('Date', data.preferredDelivery as string);
      zohoFormData.append('MultiLine1', data.additionalInfo as string); // Additional Info
      zohoFormData.append('Hidden', locale); // Locale for tracking
      
      // Submit to Zoho Forms (replace with your actual Zoho quote form URL)
      const zohoQuoteFormUrl = process.env.NEXT_PUBLIC_ZOHO_QUOTE_FORM_URL;
      
      if (zohoQuoteFormUrl) {
        const response = await fetch(zohoQuoteFormUrl, {
          method: 'POST',
          body: zohoFormData,
          mode: 'no-cors' // Required for Zoho Forms
        });
        
        // Since we're using no-cors, we can't check the response
        // We'll assume success if no error is thrown
        setSubmitted(true);
        
        // Track analytics events
        trackQuoteRequest(data.productName as string, data.companyName as string);
        pushQuoteRequestEvent(data.productName as string, data.companyName as string);
      } else {
        // Fallback - integrate with your own API endpoint
        const response = await fetch('/api/quote', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        
        if (response.ok) {
          setSubmitted(true);
          
          // Track analytics events
          trackQuoteRequest(data.productName as string, data.companyName as string);
          pushQuoteRequestEvent(data.productName as string, data.companyName as string);
        } else {
          throw new Error('Failed to submit quote request');
        }
      }
    } catch (error) {
      console.error('Error submitting quote request:', error);
      // You might want to show an error message to the user here
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-lg p-8 max-w-md mx-auto text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {locale === 'nl' ? 'Bedankt voor uw aanvraag!' : 'Thank you for your request!'}
        </h3>
        <p className="text-gray-600 mb-6">
          {locale === 'nl' 
            ? 'We hebben uw offerteaanvraag ontvangen en zullen binnen 24 uur contact met u opnemen.'
            : 'We have received your quote request and will contact you within 24 hours.'
          }
        </p>
        {onClose && (
          <button
            onClick={onClose}
            className="bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors"
          >
            {locale === 'nl' ? 'Sluiten' : 'Close'}
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-8 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {locale === 'nl' ? 'Offerte Aanvragen' : 'Request Quote'}
        </h2>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        )}
      </div>

      {productName && (
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <p className="text-sm text-blue-800">
            <strong>{locale === 'nl' ? 'Product:' : 'Product:'}</strong> {productName}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
              {locale === 'nl' ? 'Bedrijfsnaam *' : 'Company Name *'}
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-2">
              {locale === 'nl' ? 'Contactpersoon *' : 'Contact Person *'}
            </label>
            <input
              type="text"
              id="contactName"
              name="contactName"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              {locale === 'nl' ? 'E-mailadres *' : 'Email Address *'}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              {locale === 'nl' ? 'Telefoonnummer' : 'Phone Number'}
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {!productName && (
          <div>
            <label htmlFor="product" className="block text-sm font-medium text-gray-700 mb-2">
              {locale === 'nl' ? 'Product *' : 'Product *'}
            </label>
            <input
              type="text"
              id="product"
              name="product"
              required
              placeholder={locale === 'nl' ? 'Welk product heeft u nodig?' : 'Which product do you need?'}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
              {locale === 'nl' ? 'Gewenste hoeveelheid *' : 'Desired Quantity *'}
            </label>
            <input
              type="text"
              id="quantity"
              name="quantity"
              required
              placeholder={locale === 'nl' ? 'bijv. 1000 kg, 50 ton' : 'e.g. 1000 kg, 50 tons'}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="usage" className="block text-sm font-medium text-gray-700 mb-2">
              {locale === 'nl' ? 'Beoogd gebruik' : 'Intended Use'}
            </label>
            <select
              id="usage"
              name="usage"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">
                {locale === 'nl' ? 'Selecteer gebruik' : 'Select use'}
              </option>
              <option value="agriculture">
                {locale === 'nl' ? 'Landbouw' : 'Agriculture'}
              </option>
              <option value="food-production">
                {locale === 'nl' ? 'Voedselproductie' : 'Food Production'}
              </option>
              <option value="feed">
                {locale === 'nl' ? 'Veevoer' : 'Animal Feed'}
              </option>
              <option value="processing">
                {locale === 'nl' ? 'Verwerking' : 'Processing'}
              </option>
              <option value="export">
                {locale === 'nl' ? 'Export' : 'Export'}
              </option>
              <option value="other">
                {locale === 'nl' ? 'Anders' : 'Other'}
              </option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="specifications" className="block text-sm font-medium text-gray-700 mb-2">
            {locale === 'nl' ? 'Specifieke eisen/kwaliteitscriteria' : 'Specific Requirements/Quality Criteria'}
          </label>
          <textarea
            id="specifications"
            name="specifications"
            rows={3}
            placeholder={locale === 'nl' 
              ? 'bijv. biologisch certificaat, specifieke zuiverheid, kiemkracht...'
              : 'e.g. organic certification, specific purity, germination rate...'
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="deliveryLocation" className="block text-sm font-medium text-gray-700 mb-2">
              {locale === 'nl' ? 'Leveringslocatie *' : 'Delivery Location *'}
            </label>
            <input
              type="text"
              id="deliveryLocation"
              name="deliveryLocation"
              required
              placeholder={locale === 'nl' ? 'Stad, Land' : 'City, Country'}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="preferredDelivery" className="block text-sm font-medium text-gray-700 mb-2">
              {locale === 'nl' ? 'Gewenste leveringsdatum' : 'Preferred Delivery Date'}
            </label>
            <input
              type="text"
              id="preferredDelivery"
              name="preferredDelivery"
              placeholder={locale === 'nl' ? 'bijv. Q2 2025, ASAP, flexibel' : 'e.g. Q2 2025, ASAP, flexible'}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700 mb-2">
            {locale === 'nl' ? 'Aanvullende informatie' : 'Additional Information'}
          </label>
          <textarea
            id="additionalInfo"
            name="additionalInfo"
            rows={4}
            placeholder={locale === 'nl' 
              ? 'Eventuele aanvullende opmerkingen of vragen...'
              : 'Any additional comments or questions...'
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="privacy"
            name="privacy"
            required
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="privacy" className="text-sm text-gray-700">
            {locale === 'nl' 
              ? 'Ik ga akkoord met de verwerking van mijn gegevens voor deze offerteaanvraag *'
              : 'I agree to the processing of my data for this quote request *'
            }
          </label>
        </div>

        <div className="flex justify-end space-x-4">
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {locale === 'nl' ? 'Annuleren' : 'Cancel'}
            </button>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {locale === 'nl' ? 'Versturen...' : 'Sending...'}
              </>
            ) : (
              locale === 'nl' ? 'Offerte Aanvragen' : 'Request Quote'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
