import React from "react";
import MainHeader from "@/components/layout/main-header";

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout(props: LayoutProps) {
    return <>
        <MainHeader/>
        <main>
            {props.children}
        </main>
    </>
}