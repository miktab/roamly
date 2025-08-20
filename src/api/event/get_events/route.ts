import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET(request: NextRequest): Promise<NextResponse> {
    try {
        const domain = request.headers.get('host') || '';

        // Read the events file from /public/${siteName}/events-new.json
        const filePath = path.join(
            process.cwd(),
            'public',
            'events-new.json'
        );
        const fileContents = await fs.readFile(filePath, 'utf-8');
        const events = JSON.parse(fileContents);

        // Get the current date and time
        const currentDate = new Date();

        // Filter events where gmtdatetime is not older than 2 days
        const filteredEvents = events.filter((event: any) => {
            const eventDate = new Date(event.gmtdatetime);
            const twoDaysAgo = new Date(currentDate);
            twoDaysAgo.setDate(currentDate.getDate() - 2);

            return eventDate >= twoDaysAgo;
        });

        // Return the filtered events
        return new NextResponse(JSON.stringify(filteredEvents), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (e) {
        console.error(e);
        return new NextResponse(
            JSON.stringify({ error: 'Failed to fetch events.' }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
}
