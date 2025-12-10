import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET(request: NextRequest): Promise<NextResponse> {
    try {
        const { searchParams } = new URL(request.url);
        const productId = searchParams.get('productId');

        if (!productId) {
            return new NextResponse(
                JSON.stringify({ error: 'Product ID is required' }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        // Read both products.json and catalog.json
        const productsPath = path.join(
            process.cwd(),
            'public',
            'products.json'
        );
        const catalogPath = path.join(
            process.cwd(),
            'public',
            'catalog.json'
        );

        const productsContent = await fs.readFile(productsPath, 'utf-8');
        const catalogContent = await fs.readFile(catalogPath, 'utf-8');

        const products = JSON.parse(productsContent) as Array<{ productId: number; [key: string]: unknown }>;
        const catalog = JSON.parse(catalogContent) as { [key: string]: { [key: string]: unknown } };

        // Find the product by ID
        const product = products.find((p: { productId: number }) => p.productId === parseInt(productId));

        if (!product) {
            return new NextResponse(
                JSON.stringify({ error: 'Product not found' }),
                {
                    status: 404,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        // Merge with catalog data using productType
        const productType = product.productType as string;
        const catalogData = catalog[productType] || {};

        const mergedProduct = {
            ...product,
            ...catalogData,
        };

        // Return the merged product
        return new NextResponse(JSON.stringify(mergedProduct), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (e) {
        console.error(e);
        return new NextResponse(
            JSON.stringify({ error: 'Failed to fetch product.' }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
}
