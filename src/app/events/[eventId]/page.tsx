"use client"
import { useParams } from "next/navigation";
import { getEventById } from "../../../../dummy-data";
import EventSummary from "@/components/event-detail/event-summary";
import EventLogistics from "@/components/event-detail/event-logistics";
import EventContent from "@/components/event-detail/event-content";

export default function EventDetail() {
    const params = useParams();
    const eventId = params.eventId as string; // Cast to string if necessary
    const event = getEventById(eventId);

    if (!event) {
        return <p>No event found</p>;
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
