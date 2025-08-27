import { Product } from '@/types/product';

/**
 * Determines if a product should be clickable based on its availability and start date
 */
export function isProductClickable(product: Product): boolean {
  // First check if the product is available
  if (!product.available) {
    return false;
  }

  // If there's no start date, the product is clickable (assuming it's available)
  if (!product.startDate) {
    return true;
  }

  // Check if the current date/time is after the start date
  const now = new Date();
  const startDate = new Date(product.startDate);
  
  return now >= startDate;
}

/**
 * Gets the appropriate button text for a product based on its state
 */
export function getProductButtonText(product: Product): string {
  if (!product.available) {
    return 'Coming Soon';
  }

  if (product.startDate) {
    const now = new Date();
    const startDate = new Date(product.startDate);
    
    if (now < startDate) {
      return 'Available Soon';
    }
  }

  return 'Learn More';
}

/**
 * Gets the appropriate disabled state message for a product
 */
export function getProductDisabledMessage(product: Product): string | null {
  if (!product.available) {
    return 'This product is coming soon';
  }

  if (product.startDate) {
    const now = new Date();
    const startDate = new Date(product.startDate);
    
    if (now < startDate) {
      return `Available on ${startDate.toLocaleDateString()}`;
    }
  }

  return null;
}
