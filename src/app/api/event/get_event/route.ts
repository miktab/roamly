import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET(request: NextRequest): Promise<NextResponse> {
    try {
        const { searchParams } = new URL(request.url);
        const eventId = searchParams.get('eventId');

        if (!eventId) {
            return new NextResponse(
                JSON.stringify({ error: 'Event ID is required' }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        // Read the events file from /public/events-new.json
        const filePath = path.join(
            process.cwd(),
            'public',
            'events-new.json'
        );
        const fileContents = await fs.readFile(filePath, 'utf-8');
        const events = JSON.parse(fileContents);

        // Find the specific event by ID
        const event = events.find((event: any) => event.eventId === parseInt(eventId));

        if (!event) {
            return new NextResponse(
                JSON.stringify({ error: 'Event not found' }),
                {
                    status: 404,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        // Return the event
        return new NextResponse(JSON.stringify(event), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (e) {
        console.error(e);
        return new NextResponse(
            JSON.stringify({ error: 'Failed to fetch event.' }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
}
