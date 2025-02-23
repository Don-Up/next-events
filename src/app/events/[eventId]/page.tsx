import EventSummary from "@/components/event-detail/event-summary";
import EventLogistics from "@/components/event-detail/event-logistics";
import EventContent from "@/components/event-detail/event-content";
import ErrorAlert from "@/components/event-detail/error-alert";
import { getEventById } from "@/helpers/app-utils";

/**
 * Pre-generates static paths like `events/e1` at build time (SSG).
 */
export async function generateStaticParams() {
    return [{ eventId: "e1" }]; // This pre-renders `/events/e1`
}

/**
 * useParams is not available in App Router.
 * And the parameter name (eventId in this case)
 * is determined by the folder structure [eventId] inside the app directory.
 */
interface EventDetailProps {
    params: { eventId: string };
}

export default async function EventDetail({ params }: EventDetailProps) {
    const { eventId } = params; // Get eventId from dynamic route
    console.log("EventDetail:", eventId)
    const event = await getEventById(eventId); // Fetch event data at build time

    if (!event) {
        return (
            <ErrorAlert>
                <p>No event found</p>
            </ErrorAlert>
        );
    }

    return (
        <>
            <EventSummary title={event.title} />
            <EventLogistics
                date={event.date}
                address={event.location}
                image={event.image}
                imageAlt={event.title}
            />
            <EventContent>
                <p>{event.description}</p>
            </EventContent>
        </>
    );
}