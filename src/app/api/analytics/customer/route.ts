import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fingerprint, page, queryData, experiment, email, name, productId, price, currency } = body;

    // Validate required fields
    if (!fingerprint || !page || !email || !name) {
      return NextResponse.json(
        { error: 'Fingerprint, page, email, and name are required' },
        { status: 400 }
      );
    }

    // Only track analytics on product pages
    if (!page.includes('/product/')) {
      return NextResponse.json(
        { error: 'Analytics only tracked on product pages' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Create customer record
    const customer = await prisma.customer.create({
      data: {
        fingerprint,
        page,
        queryData: queryData || '',
        experiment,
        email,
        name,
        productId: productId || null,
        price: price ? parseFloat(price) : null,
        currency: currency || 'USD',
        siteName: 'roamly',
      },
    });

    return NextResponse.json(
      { success: true, customer },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating customer record:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page');
    const experiment = searchParams.get('experiment');
    const email = searchParams.get('email');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    const where: any = {};
    
    if (page) {
      where.page = page;
    }
    
    if (experiment) {
      where.experiment = experiment;
    }

    if (email) {
      where.email = {
        contains: email,
        mode: 'insensitive',
      };
    }

    const customers = await prisma.customer.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
      skip: offset,
    });

    const total = await prisma.customer.count({ where });

    return NextResponse.json({
      customers,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      },
    });
  } catch (error) {
    console.error('Error fetching customers:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
