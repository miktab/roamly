import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fingerprint, page, queryData, experiment } = body;

    // Validate required fields
    if (!fingerprint || !page) {
      return NextResponse.json(
        { error: 'Fingerprint and page are required' },
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

    // Create visitor record
    const visitor = await prisma.visitor.create({
      data: {
        fingerprint,
        page,
        queryData: queryData || '',
        experiment,
        siteName: 'roamly',
      },
    });

    return NextResponse.json(
      { success: true, visitor },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating visitor record:', error);
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
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    const where: any = {};
    
    if (page) {
      where.page = page;
    }
    
    if (experiment) {
      where.experiment = experiment;
    }

    const visitors = await prisma.visitor.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
      skip: offset,
    });

    const total = await prisma.visitor.count({ where });

    return NextResponse.json({
      visitors,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      },
    });
  } catch (error) {
    console.error('Error fetching visitors:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
