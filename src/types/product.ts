export interface Product {
  productId: number;
  title: string;
  description: string;
  price: number;
  currency: string;
  duration: string;
  category: string;
  level: string;
  productCategory: string; // "product" or "event"
  productType: string; // unique identifier for the product type
  features: string[];
  image: string;
  available: boolean;
  rating: number;
  studentsEnrolled: number;
}
