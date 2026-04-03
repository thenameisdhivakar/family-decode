"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    // Inside your LoginPage component
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (data.success) {
                // Keep status in localStorage for simple route guarding
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("currentUser", email);
                router.push("/overview");
            } else {
                alert(data.message || "Invalid email or password");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center p-4 md:p-8 overflow-hidden">
            {/* 1. THE FULL BACKGROUND IMAGE */}
            <img
                src="https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=2070"
                alt="Family background"
                className="absolute inset-0 object-cover w-full h-full z-0"
            />

            {/* 2. THE DARK OVERLAY (Ensures form readability) */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10" />

            {/* 3. THE CONTENT LAYER (Logo & Form) */}
            <div className="relative z-20 w-full max-w-6xl flex flex-col items-center">

                {/* Modern App Logo Section */}
                <div className="flex items-center gap-3 mb-12 self-start lg:self-center">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-xl text-white shadow-lg shadow-blue-500/20">
                        F
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-white">
                        Family <span className="text-blue-500">Decode.</span>
                    </h1>
                </div>

                {/* Glassmorphism Login Card */}
                <div className="w-full max-w-md bg-white/[0.03] backdrop-blur-xl border border-white/10 p-10 rounded-3xl shadow-2xl shadow-black/30">
                    <div className="mb-10 text-center">
                        <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
                        <p className="text-gray-400">Please enter your details to sign in.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                            <input
                                type="email"
                                placeholder="name@company.com"
                                required
                                className="w-full p-4 bg-white/[0.02] border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-gray-600"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                required
                                className="w-full p-4 bg-white/[0.02] border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-gray-600"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-white/5 text-blue-600 accent-blue-600" />
                                <span className="text-gray-400">Remember me</span>
                            </label>
                            <button type="button" className="text-blue-500 hover:text-blue-400 transition font-medium">Forgot password?</button>
                        </div>

                        <button className="w-full bg-blue-600 text-white p-4 rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98] text-lg">
                            Sign In
                        </button>

                        <p className="text-center text-gray-400 mt-8">
                            New here? <Link href="/signup" className="text-blue-500 font-semibold hover:underline">Create an account</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}