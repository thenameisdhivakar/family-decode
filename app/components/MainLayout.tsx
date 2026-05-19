"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
    LayoutDashboard,
    CalendarDays,
    BarChart3,
    Wallet,
    Target,
    FileText,
    ShoppingBag,
    Users,
    Settings,
    Search,
    Bell,
    ChevronDown,
} from "lucide-react";

const navItems = [
    {
        name: "Overview",
        href: "/overview",
        icon: LayoutDashboard,
    },
    {
        name: "Calendar",
        href: "/calendar",
        icon: CalendarDays,
    },
    {
        name: "Analytics",
        href: "/analytics",
        icon: BarChart3,
    },
    {
        name: "Expenses",
        href: "/expenses",
        icon: Wallet,
    },
    {
        name: "Goals",
        href: "/goals",
        icon: Target,
    },
    {
        name: "Documents",
        href: "/documents",
        icon: FileText,
    },
    {
        name: "Shopping",
        href: "/shopping",
        icon: ShoppingBag,
    },
    {
        name: "Family",
        href: "/family",
        icon: Users,
    },
    {
        name: "Settings",
        href: "/settings",
        icon: Settings,
    },
];

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    // Hide layout pages
    const hideLayout =
        pathname === "/login" ||
        pathname === "/signup";

    if (hideLayout) {
        return (
            <div className="min-h-screen bg-black text-white">
                {children}
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white flex">
            {/* Sidebar */}
            <aside className="fixed top-0 left-0 h-screen w-[100px] border-r border-white/10 bg-white/5 backdrop-blur-2xl z-50">
                <div className="flex flex-col items-center py-6 h-full">
                    {/* Logo */}
                    <div className="mb-10">
                        <div className="w-14 h-14 rounded-3xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-black font-bold text-2xl">
                            D
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex flex-col items-center gap-5">
                        {navItems.map((item, index) => {
                            const Icon = item.icon;

                            const isActive =
                                pathname === item.href;

                            return (
                                <Link
                                    key={index}
                                    href={item.href}
                                    className={`w-[82px] flex flex-col items-center justify-center gap-2 py-4 rounded-3xl transition-all duration-200 ${isActive
                                        ? "bg-blue-400 text-black"
                                        : "text-gray-400 hover:bg-white/10 hover:text-white"
                                        }`}
                                >
                                    <Icon size={24} />

                                    <span className="text-sm font-medium text-center">
                                        {item.name}
                                    </span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </aside>

            {/* Main */}
            <div className="flex-1 ml-[120px]">
                {/* Navbar */}
                <header className="fixed top-0 left-[120px] right-0 z-40">
                    <div className="bg-white/5 border-b border-white/10 backdrop-blur-2xl px-6 py-4 flex items-center justify-between">

                        {/* Left */}
                        <div>
                            <h1 className="text-2xl font-bold text-white">
                                Welcome back, Dhivakar
                            </h1>

                            <p className="text-sm text-gray-400 mt-1">
                                1% spend, return 100%
                            </p>
                        </div>

                        {/* Right */}
                        <div className="flex items-center gap-3">
                            {/* Search */}
                            <div className="flex items-center gap-3 rounded-3xl bg-white/5 border border-white/10 px-4 py-3 w-[260px]">
                                <Search
                                    size={18}
                                    className="text-gray-400"
                                />

                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="bg-transparent outline-none text-white placeholder:text-gray-500 w-full"
                                />
                            </div>

                            {/* Notification */}
                            <button className="relative w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition rounded-3xl">
                                <Bell
                                    size={18}
                                    className="text-white"
                                />

                                <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-cyan-400" />
                            </button>

                            {/* Profile */}
                            <button className="flex items-center gap-3 bg-white/5 border border-white/10 px-3 py-2 hover:bg-white/10 transition rounded-xl">
                                {/* Avatar */}
                                <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-black font-bold rounded-3xl">
                                    D
                                </div>

                                {/* User */}
                                <div className="hidden sm:block text-left">
                                    <h3 className="text-sm font-semibold text-white">
                                        Dhivakar
                                    </h3>

                                    <p className="text-xs text-gray-400">
                                        Premium
                                    </p>
                                </div>

                                <ChevronDown
                                    size={16}
                                    className="text-gray-400"
                                />
                            </button>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <main className="p-6 pt-28">
                    {children}
                </main>
            </div>
        </div>
    );
}