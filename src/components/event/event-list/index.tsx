import EventItem, {EventItemProps} from "@/components/event/event-item";
import styles from "./index.module.css"

export default function EventList({items}: {items: EventItemProps[]}){
    return <ul className={styles.list}>
        {items.map(event => <EventItem key={event.id} {...event}/>)}
    </ul>
}