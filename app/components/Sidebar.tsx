import {
    Search,
    Bell,
    ChevronDown,
} from "lucide-react";

export default function Navbar() {
    return (
        <div className="fixed top-4 left-0 w-full z-50 px-4">
            <div className="flex items-center justify-between bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl px-4 py-3 shadow-[0_8px_32px_rgba(255,255,255,0.05)]">
                {/* Search */}
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 w-[260px]">
                    <Search size={18} className="text-gray-400" />

                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-transparent outline-none text-white placeholder:text-gray-500 w-full"
                    />
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-3">
                    {/* Notification */}
                    <button className="relative w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition">
                        <Bell size={18} className="text-white" />

                        <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-cyan-400" />
                    </button>

                    {/* Profile */}
                    <button className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-3 py-2 hover:bg-white/10 transition">
                        {/* Avatar */}
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-black font-bold">
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
        </div>
    );
}