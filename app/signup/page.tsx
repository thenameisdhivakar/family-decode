"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, Mail, Lock, UserPlus } from 'lucide-react';

export default function SignupPage() {
    const [form, setForm] = useState({ username: '', email: '', password: '' });
    const router = useRouter();

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();

        const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");

        if (existingUsers.find((u: any) => u.email === form.email)) {
            alert("This email is already registered!");
            return;
        }

        existingUsers.push(form);
        localStorage.setItem("users", JSON.stringify(existingUsers));

        alert("Account created successfully!");
        router.push("/login");
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center p-4 md:p-8 overflow-hidden">
            {/* 1. THE FULL BACKGROUND IMAGE (Matches Login) */}
            <img
                src="https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=2070"
                alt="Family background"
                className="absolute inset-0 object-cover w-full h-full z-0"
            />

            {/* 2. THE DARK OVERLAY */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10" />

            {/* 3. THE CONTENT LAYER */}
            <div className="relative z-20 w-full max-w-6xl flex flex-col items-center">

                {/* App Logo Section */}
                <div className="flex items-center gap-3 mb-12 self-start lg:self-center">
                    <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center font-bold text-xl text-white shadow-lg shadow-emerald-500/20">
                        F
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-white">
                        Family <span className="text-emerald-500">Decode.</span>
                    </h1>
                </div>

                {/* Glassmorphism Signup Card */}
                <div className="w-full max-w-md bg-white/[0.03] backdrop-blur-xl border border-white/10 p-10 rounded-3xl shadow-2xl shadow-black/30">
                    <div className="mb-10 text-center">
                        <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
                        <p className="text-gray-400">Join the system to manage your logistics.</p>
                    </div>

                    <form onSubmit={handleSignup} className="space-y-6">
                        {/* Username */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="dhivakar_dev"
                                    required
                                    className="w-full p-4 pl-12 bg-white/[0.02] border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all placeholder:text-gray-600"
                                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                                <input
                                    type="email"
                                    placeholder="name@example.com"
                                    required
                                    className="w-full p-4 pl-12 bg-white/[0.02] border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all placeholder:text-gray-600"
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    required
                                    className="w-full p-4 pl-12 bg-white/[0.02] border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all placeholder:text-gray-600"
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                />
                            </div>
                        </div>

                        <button className="w-full bg-emerald-600 text-white p-4 rounded-xl font-semibold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20 active:scale-[0.98] text-lg flex items-center justify-center gap-2">
                            <UserPlus size={20} />
                            Sign Up
                        </button>

                        <p className="text-center text-gray-400 mt-8">
                            Already have an account? <Link href="/login" className="text-emerald-500 font-semibold hover:underline">Login</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}