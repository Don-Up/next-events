import EventSummary from "@/components/event-detail/event-summary";
import EventLogistics from "@/components/event-detail/event-logistics";
import EventContent from "@/components/event-detail/event-content";
import ErrorAlert from "@/components/event-detail/error-alert";
import { getEventById } from "@/helpers/app-utils";
import Comments from "@/components/input/comments";

interface EventDetailProps {
    params: { eventId: string };
}

/**
 * Fetch event data once and reuse it in both `generateMetadata` and `EventDetail`.
 */
async function fetchEventData(eventId: string) {
    return await getEventById(eventId);
}

/**
 * Pre-generates static paths like `events/e1` at build time (SSG).
 */
// export async function generateStaticParams() {
//     return [{ eventId: "e1" }];
// }

/**
 * Generate metadata dynamically based on event data.
 */
// @ts-nocheck
export async function generateMetadata(props: any) {
    const event = await fetchEventData((props as EventDetailProps).params.eventId); // Prevent duplicate API calls

    if (!event) {
        return {
            title: "Event Not Found",
            description: "The event you are looking for does not exist.",
        };
    }

    return {
        title: event.title,
        description: event.description,
    };
}

export default async function EventDetail(props: any) {
    const event = await fetchEventData((props as EventDetailProps).params.eventId); // Prevent duplicate API calls

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
            <Comments eventId={event.id} />
        </>
    );
}