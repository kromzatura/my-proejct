import Script from 'next/script';

interface GoogleAnalyticsProps {
  gaId: string;
}

export default function GoogleAnalytics({ gaId }: GoogleAnalyticsProps) {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', {
            page_title: document.title,
            page_location: window.location.href,
          });
        `}
      </Script>
    </>
  );
}

// Helper function to track events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// B2B specific event tracking functions
export const trackQuoteRequest = (productName: string, companyName: string) => {
  trackEvent('quote_request', 'engagement', `${productName} - ${companyName}`);
};

export const trackContactForm = (subject: string, companyName: string) => {
  trackEvent('contact_form', 'engagement', `${subject} - ${companyName}`);
};

export const trackProductView = (productName: string, category: string) => {
  trackEvent('view_item', 'ecommerce', productName);
  
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'view_item', {
      currency: 'EUR',
      value: 0, // You can set a default value or fetch from product data
      items: [{
        item_id: productName.toLowerCase().replace(/\s+/g, '-'),
        item_name: productName,
        item_category: category,
        quantity: 1,
      }],
    });
  }
};

export const trackCatalogDownload = (catalogType: string) => {
  trackEvent('download', 'content', `catalog_${catalogType}`);
};
