"use client"
import {createContext, useState} from "react";

export type NotificationContextType = {
    notification: any,
    showNotification: (notificationData: any) => void,
    hideNotification: () => void
}

const NotificationContext = createContext<NotificationContextType>({
    notification: null,
    showNotification: (notificationData: any) => {
        console.log(notificationData)
    },
    hideNotification: () => {
    }
})

export function NotificationContextProvider(props: any) {
    const [activeNotification, setActiveNotification] = useState<any>(null)

    function showNotificationHandler(notificationData: any) {
        setActiveNotification(notificationData)
    }

    function hideNotificationHandler() {
        setActiveNotification(null)
    }

    const context = {
        notification: activeNotification,
        showNotification: showNotificationHandler,
        hideNotification: hideNotificationHandler
    }

    return (
        <NotificationContext.Provider value={context}>{props.children}</NotificationContext.Provider>
    )
}

export default NotificationContext