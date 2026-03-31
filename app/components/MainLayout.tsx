"use client";
import { useState } from 'react';
import Sidebar from './Sidebar';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className="flex min-h-screen bg-black">
            {/* 1. Pass state to Sidebar so the button works */}
            <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

            {/* 2. Main content area adjusts its margin based on sidebar state */}
            <main
                className={`flex-1 transition-all px-16 py-16 duration-300 ease-in-out ${isCollapsed ? 'ml-20' : 'ml-64'
                    }`}
            >
                {children}
            </main>
        </div>
    );
}