import EventItem, {EventItemProps} from "@/components/event/event-item";

export default function EventList({items}: {items: EventItemProps[]}){
    return <ul>
        {items.map(event => <EventItem key={event.id} {...event}/>)}
    </ul>
}