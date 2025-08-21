import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { PrismaClient } from '@prisma/client';
import { getSiteName, getExperimentFromRequest } from '@/lib/utils';

interface StripeConfig {
  deploy: string;
  test: string;
}

const stripeKeys: StripeConfig = {
  deploy: process.env.STRIPE_SECRET_KEY_LIVE || '',
  test: process.env.STRIPE_SECRET_KEY_TEST || ''
};

const getStripeKey = (): string => {
  const isDeployMode = process.env.STRIPE_DEPLOY_MODE === 'true';
  return stripeKeys[isDeployMode ? 'deploy' : 'test'];
};

const prisma = new PrismaClient();
let stripe: Stripe;

interface CheckoutItem {
  price: number;
  quantity: number;
  name: string;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { 
      productId, 
      productCategory,
      productType,
      items, 
      currency, 
      email, 
      name,
      currentCity
    }: {
      productId: number;
      productCategory: string;
      productType: string;
      items: CheckoutItem[];
      currency: string;
      email: string;
      name: string;
      currentCity?: string;
    } = await request.json();

    // Normalize email to lowercase
    const normalizedEmail = email ? email.toLowerCase() : '';

    console.log('Request data:', {
      productId,
      productCategory,
      productType,
      items,
      currency,
      email: normalizedEmail,
      name,
      currentCity
    });

    const domain = request.headers.get('host') || '';
    const siteName = getSiteName(domain);
    
    // Get experiment from cookies
    const experiment = getExperimentFromRequest(request);

    stripe = new Stripe(getStripeKey(), {
      apiVersion: '2025-07-30.basil',
    });
    
    // Validate items (allow zero price for free tickets)
    const validatedItems = items.filter(item => {
      const quantity = Math.floor(Number(item.quantity));
      return quantity >= 1 && Number.isFinite(item.price) && item.price >= 0;
    });

    if (validatedItems.length === 0) {
      return NextResponse.json({ error: 'No valid items provided' }, { status: 400 });
    }

    // Calculate total order amount
    const totalOrderAmount = validatedItems.reduce((total, item) => {
      return total + (Number(item.price) * Math.floor(Number(item.quantity)));
    }, 0);

    // Handle free tickets - skip Stripe and go directly to success
    if (totalOrderAmount === 0) {
      // Create a checkout record for free ticket
      const checkout = await prisma.checkout.create({
        data: {
          checkoutSessionId: `free_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          email: normalizedEmail,
          siteName,
          totalOrder: 0,
          customerId: '',
          productCategory: productCategory,
          productType: productType,
          productId: productId,
          confirmationEmailSent: false,
          product_description: items[0]?.name || '',
          experiment,
          checkoutTime: new Date(),
          name: name || null,
          currentCity: currentCity || null,
        },
      });

      // Return success URL directly for free tickets
      const successUrl = `${request.nextUrl.origin}/checkout-success?checkoutSessionId=${checkout.checkoutSessionId}&email=${normalizedEmail}`;
      return NextResponse.json({ url: successUrl, checkoutId: checkout.checkoutId, isFree: true }, { status: 200 });
    }

    // Create a Stripe Checkout session
    const sessionConfig: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ['card'],
      line_items: validatedItems.map(item => ({
        price_data: {
          currency: currency.toLowerCase(),
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(item.price), // Ensure the amount is in cents and rounded
        },
        quantity: Math.floor(Number(item.quantity)), // Ensure quantity is an integer
      })),
      mode: 'payment',
      success_url: `${request.nextUrl.origin}/checkout-success?checkoutSessionId={CHECKOUT_SESSION_ID}&email=${normalizedEmail}`,
      cancel_url: `${request.nextUrl.origin}/${productCategory}?${productCategory}Id=${productId}`,
    };

    if (normalizedEmail) {
      sessionConfig.customer_email = normalizedEmail;
    }

    const session = await stripe.checkout.sessions.create(sessionConfig);

    // Create a Checkout record
    const checkout = await prisma.checkout.create({
      data: {
        checkoutSessionId: session.id,
        email: normalizedEmail,
        siteName,
        totalOrder: totalOrderAmount,
        customerId: session.customer?.toString() || '',
        productCategory: productCategory,
        productType: productType,
        productId: productId,
        confirmationEmailSent: false,
        product_description: items[0]?.name || '',
        experiment,
        checkoutTime: new Date(),
        name: name || null,
        currentCity: currentCity || null,
      },
    });

    return NextResponse.json({ url: session.url, checkoutId: checkout.checkoutId }, { status: 200 });
  } catch (error: unknown) {
    console.error('Error creating checkout session:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json({ error: 'Server error occurred', details: errorMessage }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
