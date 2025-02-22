"use client";
import { useParams } from "next/navigation";
import {getFilteredEvents} from "../../../../dummy-data";
import EventList from "@/components/event/event-list";
import ResultsTitle from "@/components/event-detail/results-title";
import Button from "@/components/ui/button";
import ErrorAlert from "@/components/event-detail/error-alert";

export default function FilteredEventsPage() {
    const params = useParams();
    const { slug } = params;

    if(!slug){
        return <p className={"center"}>Loading...</p>
    }

    const filteredYear = Number(slug[0])
    const filteredMonth = Number(slug[1])

    if(isNaN(filteredYear) || isNaN(filteredMonth) || filteredYear > 2030 || filteredYear < 2021 || filteredMonth < 1 || filteredMonth > 12){
        return <>
            <ErrorAlert>
                <p>Invalid filter. Please adjust your values!</p>
            </ErrorAlert>
            <div className={"center"}>
            <Button link={"/events"}>Show All Events</Button>
            </div>
        </>
    }

    const filteredEvents = getFilteredEvents({
        year: filteredYear, month: filteredMonth
    })

    if(!filteredEvents || filteredEvents.length === 0){
        return <p className={"center"}>No events found for the chosen filter!</p>
    }

    const date = new Date(filteredYear, filteredMonth - 1)

    return (
        <>
            <ResultsTitle date={date}/>
            <EventList items={filteredEvents}/>
        </>
    );
}