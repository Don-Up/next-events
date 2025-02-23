import EventList from "@/components/event/event-list";
import {getAllFeaturedEvents} from "@/helpers/app-utils";

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