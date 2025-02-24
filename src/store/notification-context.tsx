"use client"
import {createContext, useEffect, useState} from "react";

interface Notification {
    title: string,
    message: string,
    status: "pending" | "success" | "error"
}

type NotificationContextType = {
    notification: any,
    showNotification: (notificationData: any) => void,
    hideNotification: () => void
}

const NotificationContext = createContext<NotificationContextType>({
    notification: null,
    showNotification: (notificationData: Notification) => {
        console.log(notificationData)
    },
    hideNotification: () => {
    }
})
export function NotificationContextProvider(props: any) {
    const [activeNotification, setActiveNotification] = useState<Notification | null>(null)

    useEffect(() => {
        if(activeNotification && (activeNotification.status === "success" || activeNotification.status === "error")){
            const timer = setTimeout(() => {
                setActiveNotification(null)
            }, 3000)

            return () => clearTimeout(timer)
        }
    }, [activeNotification]);

    function showNotificationHandler(notificationData: Notification) {
        setActiveNotification(notificationData)
    }

    function hideNotificationHandler() {
        setActiveNotification(null)
    }

    const context: NotificationContextType = {
        notification: activeNotification,
        showNotification: showNotificationHandler,
        hideNotification: hideNotificationHandler
    }

    return (
        <NotificationContext.Provider value={context}>{props.children}</NotificationContext.Provider>
    )
}

export default NotificationContext