/**
 * Analytics Implementation Guide
 * 
 * This guide shows how to integrate the analytics tracking into your product pages.
 * 
 * 1. AUTOMATIC VISITOR TRACKING
 * 
 * Wrap your product page component with AnalyticsWrapper to automatically track visitors:
 * 
 * ```tsx
 * import AnalyticsWrapper from '@/components/AnalyticsWrapper';
 * 
 * export default function ProductPage() {
 *   return (
 *     <AnalyticsWrapper
 *       productPrice={99.99}
 *       productCurrency="USD"
 *       experiment="summer_sale_2024" // optional
 *     >
 *       <ProductContent />
 *     </AnalyticsWrapper>
 *   );
 * }
 * ```
 * 
 * 2. MANUAL CUSTOMER TRACKING
 * 
 * Use the useAnalytics hook in components where users provide their details:
 * 
 * ```tsx
 * import { useAnalytics } from '@/components/AnalyticsWrapper';
 * import { useState } from 'react';
 * 
 * function EmailCaptureForm() {
 *   const { trackCustomerDetails } = useAnalytics();
 *   const [email, setEmail] = useState('');
 *   const [name, setName] = useState('');
 * 
 *   const handleSubmit = async (e: React.FormEvent) => {
 *     e.preventDefault();
 *     
 *     const success = await trackCustomerDetails(
 *       email, 
 *       name, 
 *       99.99, // product price
 *       'USD', // currency
 *       'summer_sale_2024' // experiment (optional)
 *     );
 *     
 *     if (success) {
 *       console.log('Customer tracked successfully');
 *     }
 *   };
 * 
 *   return (
 *     <form onSubmit={handleSubmit}>
 *       <input
 *         type="text"
 *         placeholder="Name"
 *         value={name}
 *         onChange={(e) => setName(e.target.value)}
 *         required
 *       />
 *       <input
 *         type="email"
 *         placeholder="Email"
 *         value={email}
 *         onChange={(e) => setEmail(e.target.value)}
 *         required
 *       />
 *       <button type="submit">Confirm Details</button>
 *     </form>
 *   );
 * }
 * ```
 * 
 * 3. DIRECT API USAGE
 * 
 * If you prefer not to use the wrapper/hook:
 * 
 * ```tsx
 * import { trackVisitor, trackCustomer } from '@/lib/analytics';
 * 
 * // Track visitor manually
 * await trackVisitor(
 *   '/product/GlobalNomadLifestyle', 
 *   'utm_source=google',
 *   'summer_sale_2024'
 * );
 * 
 * // Track customer manually
 * await trackCustomer(
 *   '/product/GlobalNomadLifestyle',
 *   'user@example.com',
 *   'John Doe',
 *   'GlobalNomadLifestyle',
 *   99.99,
 *   'USD',
 *   'utm_source=google',
 *   'summer_sale_2024'
 * );
 * ```
 */

export const analyticsGuide = {
  title: "Analytics Implementation Guide",
  description: "Guide for implementing analytics tracking in product pages"
};
