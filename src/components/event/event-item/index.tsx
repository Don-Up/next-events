import Link from "next/link";
import styles from "./index.module.css"

export interface EventItemProps {
    title: string;
    image: string;
    date: string;
    location: string;
    id: string;
}

export default function EventItem(props: EventItemProps){

    const {title, image, date, location, id} = props

    const humanReadableDate = new Date(date).toLocaleDateString("en-US",  {
        day: "numeric",
        month: "long",
        year: "numeric"
    })

    const formattedAddress = location.replace(", ", "\n")
    const exploreLink = `/event/${id}`

    return <li className={styles.item}>
        <img src={"/"+image} alt={""}/>
        <div className={styles.content}>
            <div className={styles.summary}>
                <h2>{title}</h2>
                <div className={styles.date}>
                    <time>{humanReadableDate}</time>
                </div>
                <div className={styles.address}>
                    <address>{formattedAddress}</address>
                </div>
            </div>
            <div>
                <Link href={exploreLink}>Explore Event</Link>
            </div>
        </div>
    </li>
}