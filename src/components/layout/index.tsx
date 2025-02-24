"use client"
import React, {useContext} from "react";
import MainHeader from "@/components/layout/main-header";
import Notification from "@/components/ui/notification";
import NotificationContext from "@/store/notification-context";

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout(props: LayoutProps) {
    const {notification: activeNotification} = useContext(NotificationContext)

    return <>
        <MainHeader/>
        <main>
            {props.children}
        </main>
        {
            activeNotification && <Notification
                title={activeNotification.title}
                message={activeNotification.message}
                status={activeNotification.status}/>
        }
    </>
}