"use client";

import React, { useState, useEffect } from 'react';
import {
    Plus,
    Search,
    Filter,
    ArrowUpRight,
    ArrowDownLeft,
    Wallet,
    TrendingUp,
    CreditCard,
    MoreVertical,
    Calendar
} from 'lucide-react';

// --- 1. Define Types to satisfy Vercel/TypeScript ---
interface Transaction {
    id: number;
    title: string;
    category: string;
    amount: number;
    date: string;
    type: 'income' | 'expense';
}

interface Bill {
    id: number;
    name: string;
    bank: string;
    amount: number;
    dueDate: string;
    progress: string;
}

// Union type for the list
type DisplayItem = Transaction | Bill;

export default function ExpensePage() {
    const [activeTab, setActiveTab] = useState<'Expenses' | 'Income' | 'Bills'>('Expenses');
    const [data, setData] = useState<DisplayItem[]>([]);
    const [loading, setLoading] = useState(true);

    // Load Data from LocalStorage
    useEffect(() => {
        const savedData = localStorage.getItem('family_expenses');
        if (savedData) {
            setData(JSON.parse(savedData));
        }
        setLoading(false);
    }, []);

    // --- 2. Fix: Handle Add Functionality with Types ---
    const handleAddData = (e: React.FormEvent) => {
        e.preventDefault();

        // Example logic for adding a new item
        const newItem: Transaction = {
            id: Date.now(),
            title: "New Transaction",
            category: "General",
            amount: 0,
            date: new Date().toLocaleDateString(),
            type: activeTab === 'Income' ? 'income' : 'expense'
        };

        const updatedData = [...data, newItem];
        setData(updatedData);
        localStorage.setItem('family_expenses', JSON.stringify(updatedData));
    };

    if (loading) return <div className="p-10 text-white">Loading Tracker...</div>;

    return (
        <div className="p-8 bg-black min-h-screen text-white">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Financial Overview</h1>
                    <p className="text-gray-500 mt-1">Track your family spending and savings</p>
                </div>
                <button
                    onClick={handleAddData}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition"
                >
                    <Plus className="w-5 h-5" /> Add Record
                </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 mb-8 border-b border-white/10">
                {['Expenses', 'Income', 'Bills'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`pb-4 px-2 text-sm font-medium transition-colors ${activeTab === tab ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500 hover:text-gray-300'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Table Section */}
            <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-white/[0.02] text-gray-400 text-xs uppercase tracking-wider">
                        <tr>
                            <th className="px-6 py-4 font-medium">Description</th>
                            <th className="px-6 py-4 font-medium">Amount</th>
                            <th className="px-6 py-4 font-medium">Date</th>
                            <th className="px-6 py-4 font-medium">Status</th>
                            <th className="px-6 py-4 font-medium"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {data.map((item) => {
                            // --- 3. Fix: Type Guard Check ---
                            // We check if 'type' exists in the item before accessing it
                            const isTransaction = 'type' in item;
                            const isIncome = isTransaction && item.type === 'income';

                            return (
                                <tr key={item.id} className="hover:bg-white/[0.01] transition">
                                    <td className="px-6 py-4 flex items-center gap-4">
                                        <div className={`p-2 rounded-xl bg-white/[0.03] ${isTransaction ? (isIncome ? 'text-green-500' : 'text-red-500') : 'text-blue-500'
                                            }`}>
                                            {isTransaction ? (isIncome ? <ArrowUpRight /> : <ArrowDownLeft />) : <CreditCard />}
                                        </div>
                                        <span className="font-medium text-gray-200">
                                            {'title' in item ? item.title : item.name}
                                        </span>
                                    </td>
                                    <td className={`px-6 py-4 font-semibold ${isTransaction ? (isIncome ? 'text-green-500' : 'text-white') : 'text-white'
                                        }`}>
                                        {isIncome ? '+' : '-'} ${item.amount.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {'date' in item ? item.date : item.dueDate}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-white/5 text-gray-400 uppercase">
                                            Completed
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-gray-600 hover:text-white">
                                            <MoreVertical className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}