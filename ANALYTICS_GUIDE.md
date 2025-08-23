# Analytics Implementation Guide

This guide shows how to integrate the analytics tracking into your product pages.

## 1. AUTOMATIC VISITOR TRACKING

Wrap your product page component with AnalyticsWrapper to automatically track visitors:

```tsx
import AnalyticsWrapper from '@/components/AnalyticsWrapper';

export default function ProductPage() {
  return (
    <AnalyticsWrapper
      productPrice={99.99}
      productCurrency="USD"
      experiment="summer_sale_2024" // optional
    >
      {/* Your product page content */}
      <ProductContent />
    </AnalyticsWrapper>
  );
}
```

## 2. MANUAL CUSTOMER TRACKING

Use the useAnalytics hook in components where users provide their details:

```tsx
import { useAnalytics } from '@/components/AnalyticsWrapper';
import { useState } from 'react';

function EmailCaptureForm() {
  const { trackCustomerDetails } = useAnalytics();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Track customer when they confirm their details
    const success = await trackCustomerDetails(
      email, 
      name, 
      99.99, // product price
      'USD', // currency
      'summer_sale_2024' // experiment (optional)
    );
    
    if (success) {
      console.log('Customer tracked successfully');
    }
    
    // Continue with your form submission logic...
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Confirm Details</button>
    </form>
  );
}
```

## 3. DIRECT API USAGE

If you prefer not to use the wrapper/hook:

```tsx
import { trackVisitor, trackCustomer } from '@/lib/analytics';

// Track visitor manually
await trackVisitor(
  '/product/GlobalNomadLifestyle', 
  '?utm_source=facebook&utm_campaign=summer', 
  'experiment_a'
);

// Track customer manually
await trackCustomer(
  '/product/GlobalNomadLifestyle',
  'user@example.com',
  'John Doe',
  'GlobalNomadLifestyle', // productId
  99.99, // price
  'USD', // currency
  '?utm_source=facebook', // queryData
  'experiment_a' // experiment
);
```

## IMPORTANT NOTES

1. **Visitor tracking** happens automatically when users visit any `/product/*` page
2. **Customer tracking** only happens when you call `trackCustomerDetails()` or `trackCustomer()`
3. Both APIs only accept requests for pages that include `/product/` in the URL
4. FingerprintJS will generate a unique browser fingerprint for each visitor
5. The same visitor will have the same fingerprint across sessions (unless they clear data)
6. All data is stored in your MongoDB database via Prisma

## DATABASE STRUCTURE

### visitor table:
- id, createdAt, fingerprint, page, queryData, experiment, siteName

### customer table:
- id, createdAt, fingerprint, page, queryData, experiment, siteName
- email, name, productId, price, currency

## API ENDPOINTS

### POST /api/analytics/visitor
```json
{
  "fingerprint": "abc123",
  "page": "/product/GlobalNomadLifestyle",
  "queryData": "?utm_source=facebook",
  "experiment": "summer_sale_2024"
}
```

### POST /api/analytics/customer
```json
{
  "fingerprint": "abc123",
  "page": "/product/GlobalNomadLifestyle",
  "queryData": "?utm_source=facebook",
  "experiment": "summer_sale_2024",
  "email": "user@example.com",
  "name": "John Doe",
  "productId": "GlobalNomadLifestyle",
  "price": 99.99,
  "currency": "USD"
}
```
