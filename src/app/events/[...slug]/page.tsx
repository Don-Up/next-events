"use client";
import { useParams } from "next/navigation";
import {getFilteredEvents} from "../../../../dummy-data";

export default function FilteredEventsPage() {
    const params = useParams();
    const { slug } = params;

    if(!slug){
        return <p className={"center"}>Loading...</p>
    }

    const filteredYear = Number(slug[0])
    const filteredMonth = Number(slug[1])

    if(isNaN(filteredYear) || isNaN(filteredMonth) || filteredYear > 2030 || filteredYear < 2021 || filteredMonth < 1 || filteredMonth > 12){
        return <p className={"center"}>Invalid filter. Please adjust your values!</p>
    }

    const filteredEvents = getFilteredEvents({
        year: filteredYear, filteredMonth: filteredMonth
    })

    if(!filteredEvents || filteredEvents.length === 0){
        return <p className={"center"}>No events found for the chosen filter!</p>
    }

    return (
        <div>
            <h1>Filtered Events Page</h1>
            <p>Slug: {slug}</p>
        </div>
    );
}