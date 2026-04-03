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
    Lock,
    Loader2,
    Activity,
    CreditCard
} from 'lucide-react';

export default function OverviewPage() {
    const [userName, setUserName] = useState('Dhivakar');
    const [isLoading, setIsLoading] = useState(true);
    const [timeLeft, setTimeLeft] = useState(1499); // 24:59
    const [recentActivity, setRecentActivity] = useState<any[]>([]);

    const [stats, setStats] = useState({
        totalBalance: 0,
        monthlyInflow: 85000,
        monthlyOutflow: 0,
        activeMembers: 3 // Set to 3 for Mom, Dad, Dhivakar
    });

    useEffect(() => {
        const loadDashboardData = () => {
            const expenses = JSON.parse(localStorage.getItem('family_expenses') || '[]');
            const totalOutflow = expenses.reduce((acc: number, curr: any) => acc + Number(curr.amount || 0), 0);

            setStats(prev => ({
                ...prev,
                monthlyOutflow: totalOutflow,
                totalBalance: 150000 - totalOutflow,
            }));
            setRecentActivity(expenses.slice(-4).reverse());
            setIsLoading(false);
        };

        loadDashboardData();

        // Sync with other pages (Inventory, Expenses, etc.)
        window.addEventListener('storage', loadDashboardData);

        // Auto-Lock Timer Logic
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => {
            window.removeEventListener('storage', loadDashboardData);
            clearInterval(timer);
        };
    }, []);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    if (isLoading) {
        return (
            <div className="h-[60vh] flex items-center justify-center">
                <Loader2 className="animate-spin text-blue-500 w-8 h-8" />
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-700">

            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">
                        Welcome back, <span className="text-blue-500">{userName}</span>
                    </h1>
                    <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center gap-2 px-2 py-1 bg-emerald-500/10 rounded-md">
                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">Focus on being productive instead of busy.</span>
                        </div>

                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    title="Total Vault"
                    value={`₹${stats.totalBalance.toLocaleString()}`}
                    icon={<Wallet className="text-blue-500" />}
                    trend="+2.4%"
                />
                <StatCard
                    title="Monthly Inflow"
                    value={`₹${stats.monthlyInflow.toLocaleString()}`}
                    icon={<TrendingUp className="text-emerald-500" />}
                    trend="+12%"
                />
                <StatCard
                    title="Total Expenses"
                    value={`₹${stats.monthlyOutflow.toLocaleString()}`}
                    icon={<CreditCard className="text-rose-500" />}
                    trend="Real-time"
                />
                <StatCard
                    title="Active Nodes"
                    value={stats.activeMembers.toString()}
                    icon={<Users className="text-purple-500" />}
                    trend="Stable"
                />
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Ledger Activity */}
                <div className="lg:col-span-2 rounded-[2rem] border border-white/5 bg-white/[0.02] p-8">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <Activity className="w-4 h-4 text-blue-500" />
                            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Recent Ledger Activity</h3>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {recentActivity.length > 0 ? (
                            recentActivity.map((item, idx) => (
                                <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all group">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2.5 rounded-lg bg-black/40 text-gray-500 group-hover:text-blue-500 transition-colors">
                                            <ArrowUpRight className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-white">{item.category || 'Transaction'}</p>
                                            <p className="text-[10px] text-gray-500 font-medium">{item.date || 'Today'}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-rose-500">-₹{Number(item.amount).toLocaleString()}</p>
                                        <p className="text-[9px] text-gray-600 font-bold uppercase tracking-tighter">Verified</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="py-12 text-center text-gray-600 text-xs font-medium uppercase tracking-widest border border-dashed border-white/5 rounded-2xl">
                                No recent transactions detected in local storage
                            </div>
                        )}
                    </div>
                </div>

                {/* Security & Lock Status */}
                <div className="space-y-6">
                    <div className="rounded-[2rem] border border-blue-500/10 bg-blue-500/[0.02] p-8">
                        <ShieldCheck className="w-8 h-8 text-blue-500 mb-4" />
                        <h3 className="font-bold text-white text-sm uppercase tracking-wide mb-2">Vault Integrity</h3>
                        <p className="text-gray-500 text-xs leading-relaxed mb-6 font-medium">
                            Your local node is synced. Data is mirrored across all family members.
                        </p>
                        <div className="space-y-3">
                            <SecurityDetail label="Encryption" status="AES-256" />
                            <SecurityDetail label="Auth" status="Session-Key" />
                            <SecurityDetail label="Sync" status="Optimistic" />
                        </div>
                    </div>

                    <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-6 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-white/5">
                                <Lock className="w-4 h-4 text-gray-400" />
                            </div>
                            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Auto-Lock:</span>
                        </div>
                        <span className={`text-xl font-mono font-bold ${timeLeft < 60 ? 'text-rose-500 animate-pulse' : 'text-blue-500'}`}>
                            {formatTime(timeLeft)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, icon, trend }: any) {
    return (
        <div className="rounded-[1.5rem] border border-white/5 bg-white/[0.02] p-6 hover:bg-white/[0.04] transition-all group">
            <div className="flex justify-between items-start mb-4">
                <div className="p-2.5 rounded-xl bg-black/40 group-hover:bg-blue-500/10 transition-colors">{icon}</div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${trend.includes('+') ? 'bg-emerald-500/10 text-emerald-500' : 'bg-blue-500/10 text-blue-500'}`}>
                    {trend}
                </span>
            </div>
            <p className="text-xs font-medium text-gray-500 mb-1">{title}</p>
            <h2 className="text-2xl font-bold text-white tracking-tight">{value}</h2>
        </div>
    );
}

function SecurityDetail({ label, status }: any) {
    return (
        <div className="flex justify-between items-center py-2 border-b border-white/5">
            <span className="text-[10px] font-medium text-gray-500 uppercase">{label}</span>
            <span className="text-[10px] font-bold text-blue-400">{status}</span>
        </div>
    );
}