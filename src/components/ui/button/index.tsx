import styles from "./index.module.css"
import Link from "next/link";
import {MouseEventHandler, ReactNode} from "react";

interface ButtonProps {
    link?: string;
    children: ReactNode;
    onClick?: MouseEventHandler<HTMLButtonElement>
}

export default function Button(props: ButtonProps) {
    if(props.link){
        return <Link href={props.link} className={styles.btn}>
            {props.children}
        </Link>
    }

    return <button onClick={props.onClick} className={styles.btn}>{props.children}</button>
}