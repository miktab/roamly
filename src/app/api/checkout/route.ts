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

    if ((product as any).soldOut) {
      return NextResponse.json(
        { error: 'Product is not available for purchase' },
        { status: 400 }
      );
    }

    // Generate product name from productType if title doesn't exist
    const productNameMap: Record<string, string> = {
      'RemoteReadyBootcamp': 'Remote Ready Bootcamp',
      'AiDigitalCourse': 'AI Digital Products Course',
      'AiContentChallenge': 'AI Challenge'
    };
    
    const productName = (product as any).title || productNameMap[(product as any).productType] || `Product #${product.productId}`;
    
    // Generate productCategory from productType if not available (default to 'event')
    const productCategory = 'product';

    // Create the checkout session with the create-checkout API
    const checkoutResponse = await fetch(`${request.nextUrl.origin}/api/checkout/create-checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productId: product.productId, 
        productCategory: productCategory,
        productType: product.productType,
        items: [{
          price: product.price, // Price is already in cents from products.json
          quantity: 1,
          name: productName
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
