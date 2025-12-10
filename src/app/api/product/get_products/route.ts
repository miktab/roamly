import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET(): Promise<NextResponse> {
    try {
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

        const products = JSON.parse(productsContent);
        const catalog = JSON.parse(catalogContent) as { [key: string]: { [key: string]: unknown } };

        // Merge each product with its catalog data
        const mergedProducts = products.map((product: { productType: string; [key: string]: unknown }) => {
            const catalogData = catalog[product.productType] || {};
            return {
                ...product,
                ...catalogData,
            };
        });

        // Return all products
        return new NextResponse(JSON.stringify(mergedProducts), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (e) {
        console.error(e);
        return new NextResponse(
            JSON.stringify({ error: 'Failed to fetch products.' }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
}
