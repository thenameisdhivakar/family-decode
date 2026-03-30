// app/signup/page.tsx
"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
    const [form, setForm] = useState({ email: '', password: '' });
    const router = useRouter();

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();

        // Get existing users or empty array
        const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");

        // Check if user already exists
        if (existingUsers.find((u: any) => u.email === form.email)) {
            alert("User already exists!");
            return;
        }

        // Save new user
        existingUsers.push(form);
        localStorage.setItem("users", JSON.stringify(existingUsers));

        alert("Signup successful! Please login.");
        router.push("/login");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen ">
            <form onSubmit={handleSignup} className="p-8 shadow-lg rounded-lg w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
                <input
                    type="email" placeholder="Email" required
                    className="w-full p-3 mb-4 border rounded shadow-sm focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <input
                    type="password" placeholder="Password" required
                    className="w-full p-3 mb-6 border rounded shadow-sm focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
                <button className="w-full bg-green-600 text-white p-3 rounded font-semibold hover:bg-green-700 transition">
                    Sign Up
                </button>
                <p className="mt-4 text-sm text-center">
                    Already have an account? <Link href="/login" className="text-blue-600">Login</Link>
                </p>
            </form>
        </div>
    );
}