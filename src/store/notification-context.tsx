"use client"
import {createContext, useContext, useEffect, useState} from "react";

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

const NotificationContext = createContext<NotificationContextType | null>(null)

export function useNotificationContext() {
    const context = useContext(NotificationContext)
    if (context === null) {
        throw new Error("useNotificationContext must be used within a NotificationContextProvider")
    }
    return context
}
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