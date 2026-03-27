"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
    FileText, Car, Phone, Home, Users, Activity,
    Menu, LogOut, X, LucideIcon
} from "lucide-react";

type MenuItem = {
    name: string;
    path: string;
    icon: LucideIcon;
    color: string;
};

export default function Sidebar() {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    // Close mobile sidebar when clicking a link
    useEffect(() => {
        setIsMobileOpen(false);
    }, [pathname]);

    const menu: MenuItem[] = [
        { name: "Members", path: "/members", icon: Users, color: "text-pink-400" },
        { name: "Documents", path: "/documents", icon: FileText, color: "text-blue-400" },
        { name: "Vehicles", path: "/vehicles", icon: Car, color: "text-orange-400" },
        { name: "Contacts", path: "/contacts", icon: Phone, color: "text-green-400" },
    ];

    return (
        <>
            {/* MOBILE HAMBURGER BUTTON (Only shows on mobile) */}
            <div className="lg:hidden fixed top-4 left-4 z-50">
                <button
                    onClick={() => setIsMobileOpen(!isMobileOpen)}
                    className="p-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white"
                >
                    {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* MOBILE OVERLAY (Darkens background when sidebar is open) */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            {/* SIDEBAR CONTAINER */}
            <aside
                className={`
                    fixed top-0 left-0 z-40 h-screen transition-all duration-300
                    ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
                    ${collapsed ? "lg:w-20" : "lg:w-64"}
                    w-64 border-r border-white/10 bg-black/20 backdrop-blur-2xl shadow-2xl
                `}
            >
                <div className="flex h-full flex-col">

                    {/* LOGO AREA */}
                    <div className="flex items-center justify-between p-6 border-b border-white/10">
                        {(!collapsed || isMobileOpen) && (
                            <h1 className="text-white font-bold text-xl tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                                Family Hub
                            </h1>
                        )}
                        {/* Collapse Toggle (Desktop only) */}
                        <button
                            className="hidden lg:block text-white/50 hover:text-white transition-colors"
                            onClick={() => setCollapsed(!collapsed)}
                        >
                            <Menu size={20} />
                        </button>
                    </div>

                    {/* MENU ITEMS */}
                    <nav className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
                        {menu.map((item, i) => {
                            const Icon = item.icon;
                            const active = pathname === item.path;

                            return (
                                <Link key={i} href={item.path}>
                                    <div className={`
                                        flex items-center gap-4 p-3.5 rounded-2xl transition-all group cursor-pointer
                                        ${active
                                            ? "bg-white/10 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
                                            : "text-white/60 hover:bg-white/5 hover:text-white"
                                        }
                                    `}>
                                        <Icon
                                            size={22}
                                            className={`${item.color} ${active ? "opacity-100" : "opacity-70 group-hover:opacity-100"} transition-all`}
                                        />

                                        {(!collapsed || isMobileOpen) && (
                                            <span className="text-[15px] font-medium transition-all">
                                                {item.name}
                                            </span>
                                        )}

                                        {/* Tooltip for collapsed state */}
                                        {collapsed && !isMobileOpen && (
                                            <div className="absolute left-20 scale-0 group-hover:scale-100 transition-all bg-white text-black text-xs font-bold px-3 py-2 rounded-lg pointer-events-none">
                                                {item.name}
                                            </div>
                                        )}
                                    </div>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* USER SECTION / LOGOUT */}
                    <div className="p-4 border-t border-white/10">
                        <button className="flex items-center gap-4 w-full p-3.5 rounded-2xl text-red-400/80 hover:bg-red-500/10 hover:text-red-400 transition-all group">
                            <LogOut size={22} className="group-hover:-translate-x-1 transition-transform" />
                            {(!collapsed || isMobileOpen) && <span className="font-medium">Logout</span>}
                        </button>
                    </div>
                </div>
            </aside>

            {/* MAIN CONTENT SPACING ADJUSTMENT (Add this to your layout) */}
            <style jsx global>{`
                .main-content {
                    margin-left: ${collapsed ? '80px' : '256px'};
                    transition: margin 300ms;
                }
                @media (max-width: 1024px) {
                    .main-content { margin-left: 0; }
                }
            `}</style>
        </>
    );
}