'use client';

import { useState } from 'react';

export default function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  // Placeholder FAQ data - will be replaced with Sanity CMS data later
  const faqs = [
    {
      id: 1,
      question: "What is your product warranty policy?",
      answer: "All our products come with a comprehensive warranty covering manufacturing defects and performance issues. The warranty period varies by product type, typically ranging from 1 to 5 years. Please refer to your product documentation for specific warranty terms.",
      category: "general"
    },
    {
      id: 2,
      question: "How can I request a product quote?",
      answer: "You can request a quote by visiting our contact page and filling out the quote request form. Alternatively, you can call our sales team directly or email us at sales@largroup.com. We'll respond with a detailed quote within 24 hours.",
      category: "general"
    },
    {
      id: 3,
      question: "What certifications do your products have?",
      answer: "Our products meet or exceed industry standards and hold various certifications including ISO 9001, CE marking, and other relevant quality certifications. Visit our Quality & Certifications page for detailed information about our certifications.",
      category: "quality"
    },
    {
      id: 4,
      question: "What are your typical delivery times?",
      answer: "Delivery times vary depending on the product and your location. Standard products typically ship within 5-10 business days, while custom orders may take 2-4 weeks. We'll provide specific delivery estimates with your quote.",
      category: "orders"
    },
    {
      id: 5,
      question: "Do you offer technical support?",
      answer: "Yes, we provide comprehensive technical support to all our customers. Our support team is available Monday-Friday, 9 AM-6 PM CET. You can reach us via phone, email, or through our online support portal.",
      category: "support"
    },
    {
      id: 6,
      question: "What payment methods do you accept?",
      answer: "We accept various payment methods including bank transfers, credit cards, and letters of credit for international orders. Payment terms are typically net 30 days for established customers.",
      category: "pricing"
    }
  ];

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq) => (
        <div key={faq.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
          <button
            onClick={() => toggleItem(faq.id)}
            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <span className="font-medium text-gray-900">{faq.question}</span>
            <svg
              className={`w-5 h-5 text-gray-500 transition-transform ${
                openItems.includes(faq.id) ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {openItems.includes(faq.id) && (
            <div className="px-6 pb-4">
              <div className="border-t border-gray-100 pt-4">
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
