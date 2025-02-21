import styles from "./index.module.css"
import Link from "next/link";
import {ReactNode} from "react";

interface ButtonProps {
    link: string;
    children: ReactNode;
}

export default function Button(props: ButtonProps) {
    return <Link href={props.link} className={styles.btn}>
        {props.children}
    </Link>
}