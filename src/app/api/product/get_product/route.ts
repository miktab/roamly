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

        // Read the products file from /public/products.json
        const filePath = path.join(
            process.cwd(),
            'public',
            'products.json'
        );
        const fileContents = await fs.readFile(filePath, 'utf-8');
        const products = JSON.parse(fileContents) as Array<{ productId: number; [key: string]: unknown }>;

        // Find the specific product by ID
        const product = products.find((product: { productId: number }) => product.productId === parseInt(productId));

        if (!product) {
            return new NextResponse(
                JSON.stringify({ error: 'Product not found' }),
                {
                    status: 404,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        // Return the product
        return new NextResponse(JSON.stringify(product), {
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
