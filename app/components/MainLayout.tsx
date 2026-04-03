"use client";
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const pathname = usePathname();

    // Define all routes that should NOT have a sidebar
    // We add '/' for the landing page and '/login' for the login page
    const hideSidebar = pathname === '/signup' || pathname === '/login';

    // 1. Full-screen layout for landing and login
    if (hideSidebar) {
        return (
            <div className="min-h-screen bg-black">
                {children}
            </div>
        );
    }

    // 2. Standard dashboard layout with Sidebar
    return (
        <div className="flex min-h-screen bg-black">
            <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

            <main
                className={`flex-1 transition-all px-4 md:px-16 py-8 md:py-16 duration-300 ease-in-out ${isCollapsed ? 'ml-20' : 'ml-64'
                    }`}
            >
                {children}
            </main>
        </div>
    );
}