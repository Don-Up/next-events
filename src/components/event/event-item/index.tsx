import Link from "next/link";

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

    return <li>
        <img src={"/"+image} alt={""}/>
        <div>
            <div>
                <h2>{title}</h2>
                <div>
                    <time>{humanReadableDate}</time>
                </div>
                <div>
                    <address>{formattedAddress}</address>
                </div>
            </div>
            <div>
                <Link href={exploreLink}>Explore Event</Link>
            </div>
        </div>
    </li>
}