import EventList from "@/components/event/event-list";

/**
 * Fetches all featured events from the API.
 * @returns {Promise<Array>} A promise that resolves to an array of featured events.
 */
async function getAllFeaturedEvents() {
    // Use Next.js fetch with force-cache (default) for SSG
    const response = await fetch('http://localhost:3000/api/events', {
        cache: 'force-cache', // Ensures data is fetched at build time (SSG)
        // next: { revalidate: 60 }, // ISR: Regenerate every 60 seconds
    });

    if (!response.ok) {
        throw new Error('Failed to fetch events');
    }

    const events = await response.json();
    console.log(events)
    return events.filter((event: any) => event.isFeatured);
}

/**
 * Home page component that displays featured events.
 * @returns {JSX.Element} The Home page with a list of featured events.
 */
export default async function Home() {
    const featuredEvents = await getAllFeaturedEvents();

    return (
        <div>
            <EventList items={featuredEvents} />
        </div>
    );
}