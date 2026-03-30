"use client";

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar'; // Ensure Sidebar is also in app/components/

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const authStatus = localStorage.getItem("isLoggedIn");
        setIsLoggedIn(authStatus === "true");
    }, [pathname]);

    const isAuthPage = pathname === '/login' || pathname === '/signup' || pathname === '/';

    return (
        <div className="flex">
            {/* Sidebar only shows if logged in AND not on login/signup/home */}
            {isLoggedIn && !isAuthPage && <Sidebar />}

            <main className={`flex-1 min-h-screen px-16 py-16 bg-black ${isLoggedIn && !isAuthPage ? 'ml-64' : ''}`}>
                {children}
            </main>
        </div>
    );
}