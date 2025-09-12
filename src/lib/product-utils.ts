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

/**
 * Checks if a product should show a countdown (within 1 hour of start time)
 */
export function shouldShowCountdown(product: Product): boolean {
  if (!product.startDate) return false;
  
  const now = new Date().getTime();
  const startDate = new Date(product.startDate).getTime();
  const timeDiff = startDate - now;
  
  // Show countdown if within 1 hour (3600000ms) and still in future
  return timeDiff > 0 && timeDiff <= 3600000;
}

/**
 * Gets time remaining until product starts
 */
export function getTimeRemaining(startDate: string): { hours: number; minutes: number; seconds: number; total: number } | null {
  const now = new Date().getTime();
  const start = new Date(startDate).getTime();
  const diff = start - now;

  if (diff <= 0) return null;

  return {
    hours: Math.floor(diff / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
    total: diff
  };
}
