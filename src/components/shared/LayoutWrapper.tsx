"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function LayoutWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    // Define paths where Navbar and Footer should be hidden
    const isAuthPage = pathname === "/login" || pathname === "/register";

    return (
        <>
            {!isAuthPage && <Navbar />}
            <main className={!isAuthPage ? "min-h-[calc(100vh-200px)]" : ""}>
                {children}
            </main>
            {!isAuthPage && <Footer />}
        </>
    );
}
