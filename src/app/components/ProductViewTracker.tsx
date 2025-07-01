'use client';

import { useEffect } from 'react';
import { trackProductView } from '../../lib/analytics';
import { pushProductViewEvent } from '../../lib/gtm';

interface ProductViewTrackerProps {
  productName: string;
  category: string;
  price?: number;
}

export default function ProductViewTracker({ productName, category, price }: ProductViewTrackerProps) {
  useEffect(() => {
    // Track product view
    trackProductView(productName, category);
    pushProductViewEvent(productName, category, price);
  }, [productName, category, price]);

  return null; // This component doesn't render anything
}
