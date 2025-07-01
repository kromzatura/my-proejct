import Script from 'next/script';

interface GoogleTagManagerProps {
  gtmId: string;
}

export default function GoogleTagManager({ gtmId }: GoogleTagManagerProps) {
  return (
    <>
      {/* Google Tag Manager - Head */}
      <Script
        id="gtm-head"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `,
        }}
      />
    </>
  );
}

// NoScript component for GTM (should be added to body)
export function GoogleTagManagerNoScript({ gtmId }: GoogleTagManagerProps) {
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
  );
}

// Data Layer push function for custom events
export const pushToDataLayer = (event: string, data: Record<string, any> = {}) => {
  if (typeof window !== 'undefined' && (window as any).dataLayer) {
    (window as any).dataLayer.push({
      event,
      ...data,
    });
  }
};

// B2B specific data layer events
export const pushQuoteRequestEvent = (productName: string, companyName: string, value?: number) => {
  pushToDataLayer('quote_request', {
    product_name: productName,
    company_name: companyName,
    event_category: 'engagement',
    value: value || 0,
  });
};

export const pushContactFormEvent = (subject: string, companyName: string) => {
  pushToDataLayer('contact_form_submit', {
    form_subject: subject,
    company_name: companyName,
    event_category: 'engagement',
  });
};

export const pushProductViewEvent = (productName: string, category: string, price?: number) => {
  pushToDataLayer('view_item', {
    currency: 'EUR',
    value: price || 0,
    items: [{
      item_id: productName.toLowerCase().replace(/\s+/g, '-'),
      item_name: productName,
      item_category: category,
      price: price || 0,
      quantity: 1,
    }],
  });
};
