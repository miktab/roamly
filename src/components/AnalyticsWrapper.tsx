'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { trackVisitor, trackCustomer, getProductInfoFromUrl } from '@/lib/analytics';

interface AnalyticsWrapperProps {
  children: React.ReactNode;
  productPrice?: number;
  productCurrency?: string;
  experiment?: string;
}

export default function AnalyticsWrapper({ 
  children, 
  productPrice, 
  productCurrency = 'USD',
  experiment 
}: AnalyticsWrapperProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [visitorTracked, setVisitorTracked] = useState(false);

  // Track visitor when component mounts (page visit)
  useEffect(() => {
    const trackPageVisit = async () => {
      if (!visitorTracked && pathname.includes('/product/')) {
        const queryData = searchParams.toString();
        const success = await trackVisitor(pathname, queryData, experiment);
        if (success) {
          setVisitorTracked(true);
        }
      }
    };

    trackPageVisit();
  }, [pathname, searchParams, experiment, visitorTracked]);

  // Function to call when customer provides details
  const handleCustomerTracking = async (email: string, name: string) => {
    if (pathname.includes('/product/')) {
      const { productId } = getProductInfoFromUrl(pathname);
      const queryData = searchParams.toString();
      
      await trackCustomer(
        pathname,
        email,
        name,
        productId || undefined,
        productPrice,
        productCurrency,
        queryData,
        experiment
      );
    }
  };

  return (
    <div>
      {/* Pass the tracking function to children via context or props */}
      {children}
    </div>
  );
}

// Hook to use analytics tracking in components
export function useAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const trackCustomerDetails = async (
    email: string, 
    name: string, 
    productPrice?: number, 
    productCurrency?: string,
    experiment?: string
  ) => {
    if (pathname.includes('/product/')) {
      const { productId } = getProductInfoFromUrl(pathname);
      const queryData = searchParams.toString();
      
      return await trackCustomer(
        pathname,
        email,
        name,
        productId || undefined,
        productPrice,
        productCurrency || 'USD',
        queryData,
        experiment
      );
    }
    return false;
  };

  return {
    trackCustomerDetails,
    isProductPage: pathname.includes('/product/'),
    productId: getProductInfoFromUrl(pathname).productId,
  };
}
