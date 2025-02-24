import EventList from "@/components/event/event-list";
// import {getAllFeaturedEvents} from "@/helpers/app-utils";
import {Metadata} from "next";
import NewsletterRegistration from "@/components/input/newsletter-registration";

/**
 * Generate metadata for the Home page.
 */
export const metadata: Metadata = {
    title: "NextJS Events",
    description: "Find a lot of great events that allow you to evolve...",
};

/**
 * Home page component that displays featured events.
 * @returns {JSX.Element} The Home page with a list of featured events.
 */
export default async function Home() {
    // const featuredEvents = await getAllFeaturedEvents();

    return (
        <div>
            Hello Next?
            {/*<NewsletterRegistration />*/}
            {/*<EventList items={featuredEvents} />*/}
        </div>
    );
}