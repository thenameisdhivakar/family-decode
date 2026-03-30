'use client';

import { useEffect, useState } from 'react';
import {
    TrendingUp,
    TrendingDown,
    ShieldCheck,
    Users,
    Wallet,
    ArrowUpRight,
    Clock,
    Lock
} from 'lucide-react';

export default function OverviewPage() {
    const [userName, setUserName] = useState('Member');
    const [stats, setStats] = useState({
        totalBalance: 0,
        monthlyInflow: 0,
        monthlyOutflow: 0,
        activeMembers: 0
    });

    useEffect(() => {
        // 1. Get Current User Name
        const storedName = localStorage.getItem('currentUser');
        if (storedName) setUserName(storedName);

        // 2. Fetch dummy stats (Replace with your actual calculation logic later)
        const expenses = JSON.parse(localStorage.getItem('family_expenses') || '[]');
        const members = JSON.parse(localStorage.getItem('family_members') || '[]');

        // Simple logic to sum up totals
        const total = expenses.reduce((acc: number, curr: any) => acc + Number(curr.amount), 0);

        setStats({
            totalBalance: 45280.50, // Mock for now
            monthlyInflow: 12400,
            monthlyOutflow: total,
            activeMembers: members.length || 4
        });
    }, []);

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header Section */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter">
                        Welcome back, <span className="text-emerald-500">{userName}</span>
                    </h1>
                    <p className="text-gray-500 text-xs font-bold  mt-2">
                        System Status: <span className="text-emerald-400">Encrypted & Online</span>
                    </p>
                </div>
                <div className="flex gap-3">
                    <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        <span className="text-[10px] font-black  text-gray-400">Node 0x44FB2</span>
                    </div>
                </div>
            </div>

            {/* Top Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Vault Value" value={`$${stats.totalBalance.toLocaleString()}`} icon={<Wallet className="text-emerald-500" />} trend="+2.4%" />
                <StatCard title="Monthly Inflow" value={`$${stats.monthlyInflow.toLocaleString()}`} icon={<TrendingUp className="text-blue-500" />} trend="+12%" />
                <StatCard title="Monthly Outflow" value={`$${stats.monthlyOutflow.toLocaleString()}`} icon={<TrendingDown className="text-red-500" />} trend="-4%" />
                <StatCard title="Family Nodes" value={stats.activeMembers.toString()} icon={<Users className="text-purple-500" />} trend="Active" />
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Recent Activity (Glass Card) */}
                <div className="lg:col-span-2 glass-card p-8 rounded-[2.5rem] border border-white/5 bg-white/[0.02]">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-xs font-black  text-gray-400 flex items-center gap-2">
                            <Clock className="w-4 h-4" /> Recent Ledger Activity
                        </h3>
                        <button className="text-[10px] font-bold uppercase text-emerald-500 hover:underline">View Full Logs</button>
                    </div>

                    <div className="space-y-4">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] transition-all group">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-xl bg-black/40 text-gray-400 group-hover:text-emerald-500 transition-colors">
                                        <ArrowUpRight className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-white">Grocery Distribution</p>
                                        <p className="text-[10px] text-gray-600 font-bold ">Store Node #042</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-black text-red-500">-$240.00</p>
                                    <p className="text-[9px] text-gray-700 font-bold ">12:45 PM</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Security Status Side Card */}
                <div className="space-y-6">
                    <div className="glass-card p-8 rounded-[2.5rem] border border-emerald-500/10 bg-emerald-500/[0.02]">
                        <ShieldCheck className="w-10 h-10 text-emerald-500 mb-4" />
                        <h3 className="font-black uppercase tracking-widest text-xs mb-2">Vault Security</h3>
                        <p className="text-gray-500 text-[10px] font-bold leading-relaxed mb-6">
                            Biometric locking is active. Your local node is currently synced with the family primary ledger.
                        </p>
                        <div className="space-y-3">
                            <SecurityDetail label="Encryption" status="AES-256" />
                            <SecurityDetail label="IP Address" status="192.168.1.1" />
                            <SecurityDetail label="Last Login" status="2 mins ago" />
                        </div>
                    </div>

                    <div className="glass-card p-8 rounded-[2.5rem] border border-white/5 bg-white/[0.01] flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-full bg-blue-500/10">
                                <Lock className="w-5 h-5 text-blue-500" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest">Auto-Lock in:</span>
                        </div>
                        <span className="text-xl font-mono font-bold text-blue-500">24:59</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Reusable Sub-Components
function StatCard({ title, value, icon, trend }: any) {
    return (
        <div className="glass-card p-6 rounded-[2rem] border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all">
            <div className="flex justify-between items-start mb-4">
                <div className="p-3 rounded-2xl bg-black/40">{icon}</div>
                <span className={`text-[9px] font-black px-2 py-1 rounded-md ${trend.includes('+') ? 'bg-emerald-500/10 text-emerald-500' : 'bg-gray-500/10 text-gray-500'}`}>
                    {trend}
                </span>
            </div>
            <p className="text-[10px] font-black text-gray-500 t mb-1">{title}</p>
            <h2 className="text-2xl font-black text-white tracking-tighter">{value}</h2>
        </div>
    );
}

function SecurityDetail({ label, status }: any) {
    return (
        <div className="flex justify-between items-center py-2 border-b border-white/5">
            <span className="text-[9px] font-bold text-gray-600 ">{label}</span>
            <span className="text-[9px] font-black text-gray-400">{status}</span>
        </div>
    );
}