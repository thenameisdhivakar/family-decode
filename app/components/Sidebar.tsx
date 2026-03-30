// app/components/Sidebar.tsx
"use client";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'; // Added useRouter
import { LayoutGrid, Users, Calendar, ShieldCheck, Settings, LogOut, Heart, StickyNote, MessageSquare, Wallet, Target, BarChart3 } from 'lucide-react';

const menuItems = [
    { name: 'Overview', icon: LayoutGrid, href: '/overview' },
    { name: 'Family Members', icon: Users, href: '/members' },
    { name: 'Health', icon: Heart, href: '/health' },
    { name: 'Notes', icon: StickyNote, href: '/notes' },
    { name: 'Schedule', icon: Calendar, href: '/schedule' },
    { name: 'Expense', icon: Wallet, href: '/expense' },
    { name: 'Analytics', icon: BarChart3, href: '/analytics' },
    { name: 'Calendar', icon: Calendar, href: '/calendar' },
    { name: 'Documents', icon: ShieldCheck, href: '/documents' },
    { name: 'Goals', icon: Target, href: '/goals' },
    { name: 'Messages', icon: MessageSquare, href: '/messages' },
    { name: 'Security', icon: ShieldCheck, href: '/security' },
    { name: 'Settings', icon: Settings, href: '/settings' },
];

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter(); // Initialize router inside the component

    const handleLogout = () => {
        // Clear specific auth keys
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("currentUser");

        // Redirect to login
        router.push('/login');
    };

    return (
        <aside className="w-64 bg-[#050505] h-screen border-r border-white/[0.05] flex flex-col fixed left-0 top-0 z-50">
            <div className="p-8">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/10">
                        <span className="text-white font-bold text-lg">F</span>
                    </div>
                    <span className="text-lg font-semibold tracking-tight text-white">Family<span className="text-blue-500"> Decode</span></span>
                </div>
            </div>

            {/* Scrollable Nav Area */}
            <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto custom-scrollbar">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all group ${isActive ? 'bg-white/[0.05] text-white' : 'text-gray-500 hover:text-gray-200 hover:bg-white/[0.02]'
                                }`}
                        >
                            <item.icon className={`w-5 h-5 transition-transform ${isActive ? 'text-blue-500 scale-110' : 'group-hover:scale-110'}`} />
                            <span className="font-medium text-[15px]">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 mt-auto border-t border-white/[0.05]">
                <div className="flex items-center gap-3 p-3 rounded-2xl hover:bg-white/[0.03] transition-colors group">
                    <div className="w-10 h-10 bg-gradient-to-tr from-gray-800 to-black rounded-full border border-white/10" />
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white truncate">Dhivakar</p>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Developer</p>
                    </div>
                    {/* Logout Trigger */}
                    <button
                        onClick={handleLogout}
                        className="p-2 hover:bg-red-500/10 rounded-lg transition-colors group/btn"
                    >
                        <LogOut className="w-5 h-5 text-gray-600 group-hover/btn:text-red-400" />
                    </button>
                </div>
            </div>
        </aside>
    );
}