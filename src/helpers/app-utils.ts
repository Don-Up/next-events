const httpLocalhost3000 = "localhost:3000";
const baseUrl =
    process.env.NEXT_PUBLIC_VERCEL_URL
        ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
        : "http://" + httpLocalhost3000;
export function getPostJsonConfig(data: any){
    return {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    }
}

/**
 * Fetches all featured events from the API.
 * @returns {Promise<Array>} A promise that resolves to an array of featured events.
 */
export async function getAllFeaturedEvents() {
    // Use Next.js fetch with force-cache (default) for SSG
    const response = await fetch(baseUrl+'/api/events', {
        // cache: 'force-cache', // Ensures data is fetched at build time (SSG)
        next: { revalidate: 1800 }, // ISR: Regenerate every 60 seconds
    });

    if (!response.ok) {
        throw new Error('Failed to fetch events');
    }

    const events = await response.json();
    return events.filter((event: any) => event.isFeatured);
}

/**
 * Fetches an event by its ID.
 * @param id
 */
export async function getEventById(id: string){
    const response = await fetch(baseUrl+'/api/events?id='+id, {
        // cache: 'force-cache', // Ensures data is fetched at build time (SSG)
        next: { revalidate: 30 }, // ISR: Regenerate every 60 seconds
    });

    if (!response.ok) {
        throw new Error('Failed to fetch events');
    }

    return await response.json();
}

/**
 * Fetches events by year and month.
 * @param year
 * @param month
 */
export async function getEventsByYearAndMonth(year: number, month: number){
    const response = await fetch(baseUrl+'/api/events?year='+year+'&month='+month, {
        // cache: 'force-cache', // Ensures data is fetched at build time (SSG)
        next: { revalidate: 30 }, // ISR: Regenerate every 60 seconds
    });

    if (!response.ok) {
        throw new Error('Failed to fetch events');
    }

    return await response.json();
}