import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

interface Product {
    productId: number;
    [key: string]: unknown;
}

export async function POST(request: NextRequest) {
  try {
    const { productId, email, name } = await request.json() as { 
      productId: string; 
      email?: string; 
      name?: string; 
    };

    // Fetch product data from products.json
    const filePath = path.join(process.cwd(), 'public', 'products.json');
    const fileContents = await fs.readFile(filePath, 'utf-8');
    const products = JSON.parse(fileContents) as Product[];

    // Find the specific product by ID
    const product = products.find((p: Product) => p.productId === parseInt(productId));

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    if (!product.available) {
      return NextResponse.json(
        { error: 'Product is not available for purchase' },
        { status: 400 }
      );
    }

        // Create the checkout session with the create-checkout API
    const checkoutResponse = await fetch(`${request.nextUrl.origin}/api/checkout/create-checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productId: product.productId,
        productCategory: product.productCategory,
        productType: product.productType,
        items: [{
          price: product.price, // Price is already in cents from products.json
          quantity: 1,
          name: product.title
        }],
        currency: product.currency || 'USD',
        email,
        name,
      }),
    });

    if (!checkoutResponse.ok) {
      const errorData = await checkoutResponse.json();
      throw new Error(errorData.error || 'Failed to create checkout session');
    }

    const checkoutData = await checkoutResponse.json();
    return NextResponse.json(checkoutData);
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
