import {getAllEvents} from "../../../dummy-data";
import EventList from "@/components/event/event-list";
import EventsSearch from "@/app/events/search";

export default function Events(){

    const events = getAllEvents()

    return <>
        <EventsSearch/>
        <EventList items={events} />
    </>
}