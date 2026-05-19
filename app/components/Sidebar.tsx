"use client";

import { useState } from "react";
import {
    Search,
    Bell,
    ChevronDown,
    LogOut,
    User,
    Settings,
    X,
} from "lucide-react";

export default function Navbar() {
    const [showSearch, setShowSearch] = useState(false);

    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <div className="fixed top-4 left-0 w-full z-50 px-4">
            <div className="flex items-center justify-between bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl px-4 py-3 shadow-[0_8px_32px_rgba(255,255,255,0.05)]">
                {/* LEFT */}
                <div className="flex items-center">
                    {/* Search Icon */}
                    {!showSearch && (
                        <button
                            onClick={() => setShowSearch(true)}
                            className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition"
                        >
                            <Search
                                size={18}
                                className="text-white"
                            />
                        </button>
                    )}

                    {/* Search Input */}
                    <div
                        className={`overflow-hidden transition-all duration-300 ${showSearch
                                ? "w-[220px] sm:w-[320px] ml-3 opacity-100"
                                : "w-0 opacity-0"
                            }`}
                    >
                        <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-3">
                            <Search
                                size={18}
                                className="text-gray-400"
                            />

                            <input
                                type="text"
                                placeholder="Search..."
                                className="bg-transparent outline-none text-white placeholder:text-gray-500 w-full text-sm"
                            />

                            <button
                                onClick={() =>
                                    setShowSearch(false)
                                }
                            >
                                <X
                                    size={16}
                                    className="text-gray-500 hover:text-white transition"
                                />
                            </button>
                        </div>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-3">
                    {/* Notification */}
                    <button className="relative w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition">
                        <Bell
                            size={18}
                            className="text-white"
                        />

                        <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-cyan-400" />
                    </button>

                    {/* Profile */}
                    <div className="relative">
                        <button
                            onClick={() =>
                                setShowDropdown(!showDropdown)
                            }
                            className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-3 py-2 hover:bg-white/10 transition"
                        >
                            {/* Avatar */}
                            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-black font-bold">
                                D
                            </div>

                            {/* Name */}
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
                                className={`text-gray-400 transition duration-300 ${showDropdown
                                        ? "rotate-180"
                                        : ""
                                    }`}
                            />
                        </button>

                        {/* DROPDOWN */}
                        {showDropdown && (
                            <div className="absolute right-0 top-16 w-64 bg-zinc-900 border border-white/10 rounded-3xl p-3 backdrop-blur-2xl shadow-2xl">
                                {/* Top User */}
                                <div className="flex items-center gap-3 p-3 border-b border-white/10">
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-black font-bold">
                                        D
                                    </div>

                                    <div>
                                        <h3 className="text-white font-semibold">
                                            Dhivakar
                                        </h3>

                                        <p className="text-sm text-gray-400">
                                            Premium User
                                        </p>
                                    </div>
                                </div>

                                {/* Menu */}
                                <div className="mt-3 space-y-2">
                                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/5 transition">
                                        <User
                                            size={18}
                                            className="text-gray-400"
                                        />

                                        <span className="text-sm text-white">
                                            Profile
                                        </span>
                                    </button>

                                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/5 transition">
                                        <Settings
                                            size={18}
                                            className="text-gray-400"
                                        />

                                        <span className="text-sm text-white">
                                            Settings
                                        </span>
                                    </button>

                                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-red-500/10 transition">
                                        <LogOut
                                            size={18}
                                            className="text-red-400"
                                        />

                                        <span className="text-sm text-red-400">
                                            Logout
                                        </span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}