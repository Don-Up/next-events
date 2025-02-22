"use client"
import {getAllEvents} from "../../../dummy-data";
import EventList from "@/components/event/event-list";
import EventsSearch from "@/app/events/search";
import {useRouter} from "next/navigation";

export default function Events(){
    const router = useRouter()
    const events = getAllEvents()

    function findEventsHandler(year: string, month: string){
        router.push(`/events/${year}/${month}`)
    }

    return <>
        <EventsSearch onSearch={findEventsHandler}/>
        <EventList items={events} />
    </>
}