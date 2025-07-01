'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { trackContactForm } from '../../lib/analytics';
import { pushContactFormEvent } from '../../lib/gtm';

export default function ContactForm() {
  const t = useTranslations('contact.form');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: '',
    interests: '',
    consent: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Prepare data for Zoho Forms
      const formPayload = new FormData();
      formPayload.append('Name_First', formData.firstName);
      formPayload.append('Name_Last', formData.lastName);
      formPayload.append('Email', formData.email);
      formPayload.append('SingleLine', formData.company); // Company field
      formPayload.append('PhoneNumber_countrycode', formData.phone);
      formPayload.append('Dropdown', formData.subject);
      formPayload.append('MultiLine', formData.message);
      formPayload.append('MultiSelect', formData.interests);
      
      // Submit to Zoho Forms (replace with your actual Zoho form URL)
      const zohoFormUrl = process.env.NEXT_PUBLIC_ZOHO_CONTACT_FORM_URL;
      
      if (zohoFormUrl) {
        const response = await fetch(zohoFormUrl, {
          method: 'POST',
          body: formPayload,
          mode: 'no-cors' // Required for Zoho Forms
        });
        
        // Since we're using no-cors, we can't check the response
        // We'll assume success if no error is thrown
        setSubmitStatus('success');
        
        // Track analytics events
        trackContactForm(formData.subject || 'General Inquiry', formData.company);
        pushContactFormEvent(formData.subject || 'General Inquiry', formData.company);
      } else {
        // Fallback - you can integrate with your own API endpoint
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        
        if (response.ok) {
          setSubmitStatus('success');
          
          // Track analytics events
          trackContactForm(formData.subject || 'General Inquiry', formData.company);
          pushContactFormEvent(formData.subject || 'General Inquiry', formData.company);
        } else {
          throw new Error('Failed to submit form');
        }
      }
      
      // Reset form on success
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        phone: '',
        subject: '',
        message: '',
        interests: '',
        consent: false
      });
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
            {t('fields.firstName')} *
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            value={formData.firstName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
            {t('fields.lastName')} *
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            required
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Email and Company */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            {t('fields.email')} *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
            {t('fields.company')}
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Phone and Interests */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            {t('fields.phone')}
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="interests" className="block text-sm font-medium text-gray-700 mb-2">
            {t('fields.interests')}
          </label>
          <select
            id="interests"
            name="interests"
            value={formData.interests}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">{t('interests.other')}</option>
            <option value="products">{t('interests.products')}</option>
            <option value="services">{t('interests.services')}</option>
            <option value="partnership">{t('interests.partnership')}</option>
            <option value="support">{t('interests.support')}</option>
          </select>
        </div>
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
          {t('fields.subject')} *
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          required
          value={formData.subject}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          {t('fields.message')} *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Consent */}
      <div className="flex items-start">
        <input
          type="checkbox"
          id="consent"
          name="consent"
          required
          checked={formData.consent}
          onChange={handleChange}
          className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="consent" className="ml-2 block text-sm text-gray-700">
          {t('fields.consent')} *
        </label>
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'Sending...' : t('submit')}
        </button>
      </div>

      {/* Status Messages */}
      {submitStatus === 'success' && (
        <div className="p-4 rounded-md bg-green-50 border border-green-200">
          <p className="text-green-700">{t('success')}</p>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="p-4 rounded-md bg-red-50 border border-red-200">
          <p className="text-red-700">{t('error')}</p>
        </div>
      )}
    </form>
  );
}
