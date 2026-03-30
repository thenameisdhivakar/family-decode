// app/login/page.tsx
"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem("users") || "[]");

        const validUser = users.find((u: any) => u.email === email && u.password === password);

        if (validUser) {
            // Set the "Session"
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("currentUser", email);
            router.push("/overview");
        } else {
            alert("Invalid email or password");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen ">
            <form onSubmit={handleLogin} className="p-8 shadow-lg rounded-lg w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <input
                    type="email" placeholder="Email" required
                    className="w-full p-3 mb-4 border rounded shadow-sm focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password" placeholder="Password" required
                    className="w-full p-3 mb-6 border rounded shadow-sm focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="w-full bg-blue-600 text-white p-3 rounded font-semibold hover:bg-blue-700 transition">
                    Sign In
                </button>
                <p className="mt-4 text-sm text-center">
                    New here? <Link href="/signup" className="text-blue-600">Create account</Link>
                </p>
            </form>
        </div>
    );
}