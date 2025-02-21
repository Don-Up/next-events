import Link from "next/link";
import styles from "./index.module.css"
import Button from "@/components/ui/button";
import DateIcon from "@/components/icons/date-icon";
import AddressIcon from "@/components/icons/address-icon";
import ArrowRightIcon from "@/components/icons/arrow-right-icon";

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
    const exploreLink = `/events/${id}`

    return <li className={styles.item}>
        <img src={"/"+image} alt={""}/>
        <div className={styles.content}>
            <div className={styles.summary}>
                <h2>{title}</h2>
                <div className={styles.date}>
                    <DateIcon/>
                    <time>{humanReadableDate}</time>
                </div>
                <div className={styles.address}>
                    <AddressIcon/>
                    <address>{formattedAddress}</address>
                </div>
            </div>
            <div className={styles.actions}>
                <Button link={exploreLink}>
                    <span>Explore Event</span>
                    <span className={styles.icon}><ArrowRightIcon/></span>
                </Button>
            </div>
        </div>
    </li>
}