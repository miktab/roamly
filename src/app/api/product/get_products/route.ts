import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET(): Promise<NextResponse> {
    try {
        // Read the products file from /public/products.json
        const filePath = path.join(
            process.cwd(),
            'public',
            'products.json'
        );
        const fileContents = await fs.readFile(filePath, 'utf-8');
        const products = JSON.parse(fileContents);

        // Return all products
        return new NextResponse(JSON.stringify(products), {
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
