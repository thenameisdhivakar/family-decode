"use client";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    LayoutGrid, Users, Calendar, ShieldCheck, Settings,
    LogOut, Heart, StickyNote, MessageSquare, Wallet,
    Target, BarChart3, ChevronLeft, ChevronRight,
    ShoppingCart // Add this one
} from 'lucide-react';

// Define Props Interface
interface SidebarProps {
    isCollapsed: boolean;
    setIsCollapsed: (value: boolean) => void;
}

const menuItems = [
    { name: 'Overview', icon: LayoutGrid, href: '/overview' },
    { name: 'Family Members', icon: Users, href: '/members' },
    { name: 'Health', icon: Heart, href: '/health' },
    { name: 'Notes', icon: StickyNote, href: '/notes' },
    { name: 'Schedule', icon: Calendar, href: '/schedule' },
    { name: 'Expense', icon: Wallet, href: '/expense' },
    { name: 'Analytics', icon: BarChart3, href: '/analytics' },
    { name: 'Calendar', icon: Calendar, href: '/calendar' },
    { name: 'Shopping', icon: ShoppingCart, href: '/shopping' }, // Fixed icon here
    { name: 'Documents', icon: ShieldCheck, href: '/documents' },
    { name: 'Goals', icon: Target, href: '/goals' },
    { name: 'Messages', icon: MessageSquare, href: '/messages' },
    { name: 'Security', icon: ShieldCheck, href: '/security' },
    { name: 'Settings', icon: Settings, href: '/settings' },
];
export default function Sidebar({ isCollapsed, setIsCollapsed }: SidebarProps) {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("currentUser");
        router.push('/login');
    };

    return (
        <aside
            className={`${isCollapsed ? 'w-20' : 'w-64'
                } bg-[#050505] h-screen border-r border-white/[0.05] flex flex-col fixed left-0 top-0 z-50 transition-all duration-300 ease-in-out`}
        >
            {/* Logo Area */}
            <div className={`p-6 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
                <div className="flex items-center gap-3 overflow-hidden">
                    <div className="min-w-[36px] h-9 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/10">
                        <span className="text-white font-bold text-lg">F</span>
                    </div>
                    {!isCollapsed && (
                        <span className="text-lg font-semibold tracking-tight text-white whitespace-nowrap">
                            Family<span className="text-blue-500"> Decode</span>
                        </span>
                    )}
                </div>

                {/* The Toggle Button */}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="absolute -right-3 top-10 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center border border-white/10 hover:bg-blue-500 transition-colors z-[60]"
                >
                    {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 space-y-1.5 overflow-y-auto custom-scrollbar overflow-x-hidden">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            title={isCollapsed ? item.name : ""}
                            className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-4'} px-3 py-3 rounded-xl transition-all group ${isActive ? 'bg-white/[0.05] text-white' : 'text-gray-500 hover:text-gray-200 hover:bg-white/[0.02]'
                                }`}
                        >
                            <item.icon className={`w-5 h-5 min-w-[20px] ${isActive ? 'text-blue-500' : ''}`} />
                            {!isCollapsed && <span className="font-medium text-[15px] whitespace-nowrap">{item.name}</span>}
                        </Link>
                    );
                })}
            </nav>

            {/* Profile */}
            <div className="p-3 mt-auto border-t border-white/[0.05]">
                <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} p-2 rounded-2xl`}>
                    <div className="w-10 h-10 min-w-[40px] bg-gradient-to-tr from-gray-800 to-black rounded-full border border-white/10" />
                    {!isCollapsed && (
                        <>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-white truncate">Dhivakar</p>
                                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Developer</p>
                            </div>
                            <button onClick={handleLogout} className="p-2 hover:bg-red-500/10 rounded-lg group">
                                <LogOut className="w-5 h-5 text-gray-600 group-hover:text-red-400" />
                            </button>
                        </>
                    )}
                </div>
            </div>
        </aside>
    );
}