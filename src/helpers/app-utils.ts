

/**
 * Fetches all featured events from the API.
 * @returns {Promise<Array>} A promise that resolves to an array of featured events.
 */
export async function getAllFeaturedEvents() {
    // Use Next.js fetch with force-cache (default) for SSG
    const response = await fetch('http://localhost:3000/api/events', {
        cache: 'force-cache', // Ensures data is fetched at build time (SSG)
        // next: { revalidate: 60 }, // ISR: Regenerate every 60 seconds
    });

    if (!response.ok) {
        throw new Error('Failed to fetch events');
    }

    const events = await response.json();
    return events.filter((event: any) => event.isFeatured);
}

export async function getEventById(id: string){
    const response = await fetch('http://localhost:3000/api/events?id='+id, {
        cache: 'force-cache', // Ensures data is fetched at build time (SSG)
        // next: { revalidate: 60 }, // ISR: Regenerate every 60 seconds
    });

    if (!response.ok) {
        throw new Error('Failed to fetch events');
    }

    return await response.json();
}