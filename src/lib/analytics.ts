let fpPromise: Promise<any> | null = null;

// Initialize FingerprintJS once
const initFingerprint = async (): Promise<any> => {
  if (!fpPromise) {
    const fp = await import('@fingerprintjs/fingerprintjs');
    fpPromise = fp.load();
  }
  return fpPromise;
};

// Get browser fingerprint
export const getFingerprint = async (): Promise<string> => {
  try {
    const fp = await initFingerprint();
    const result = await fp.get();
    return result.visitorId;
  } catch (error) {
    console.error('Error generating fingerprint:', error);
    // Fallback to a random ID if fingerprinting fails
    return 'fallback_' + Math.random().toString(36).substr(2, 9);
  }
};

// Track visitor to product page
export const trackVisitor = async (
  page: string,
  queryData?: string,
  experiment?: string
): Promise<boolean> => {
  try {
    // Only track on product pages
    if (!page.includes('/product/')) {
      return false;
    }

    const fingerprint = await getFingerprint();
    
    const response = await fetch('/api/analytics/visitor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fingerprint,
        page,
        queryData: queryData || window.location.search,
        experiment,
      }),
    });

    if (!response.ok) {
      console.error('Failed to track visitor:', await response.text());
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error tracking visitor:', error);
    return false;
  }
};

// Track customer when they provide name and email
export const trackCustomer = async (
  page: string,
  email: string,
  name: string,
  productId?: string,
  price?: number,
  currency?: string,
  queryData?: string,
  experiment?: string
): Promise<boolean> => {
  try {
    // Only track on product pages
    if (!page.includes('/product/')) {
      return false;
    }

    const fingerprint = await getFingerprint();
    
    const response = await fetch('/api/analytics/customer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fingerprint,
        page,
        queryData: queryData || window.location.search,
        experiment,
        email,
        name,
        productId,
        price,
        currency: currency || 'USD',
      }),
    });

    if (!response.ok) {
      console.error('Failed to track customer:', await response.text());
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error tracking customer:', error);
    return false;
  }
};

// Helper to get product info from URL
export const getProductInfoFromUrl = (pathname: string): { productId: string | null } => {
  const match = pathname.match(/\/product\/([^\/]+)/);
  return {
    productId: match ? match[1] : null,
  };
};
