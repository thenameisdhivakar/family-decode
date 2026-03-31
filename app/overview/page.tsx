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
    Loader2
} from 'lucide-react';

export default function OverviewPage() {
    const [userName, setUserName] = useState('Dhivakar');
    const [isLoading, setIsLoading] = useState(true);
    const [timeLeft, setTimeLeft] = useState(1499); // 24:59 in seconds
    const [recentActivity, setRecentActivity] = useState<any[]>([]);

    const [stats, setStats] = useState({
        totalBalance: 0,
        monthlyInflow: 85000, // Fixed income example
        monthlyOutflow: 0,
        activeMembers: 0
    });

    useEffect(() => {
        const loadDashboardData = () => {
            const expenses = JSON.parse(localStorage.getItem('family_expenses') || '[]');
            const totalOutflow = expenses.reduce((acc: number, curr: any) => acc + Number(curr.amount || 0), 0);

            setStats(prev => ({
                ...prev,
                monthlyOutflow: totalOutflow,
                totalBalance: 150000 - totalOutflow, // Assuming 150k starting vault
            }));
            setRecentActivity(expenses.slice(-4).reverse());
        };

        // Load on mount
        loadDashboardData();

        // LISTEN for changes in other tabs/windows
        window.addEventListener('storage', loadDashboardData);

        return () => window.removeEventListener('storage', loadDashboardData);
    }, []);

    // Format seconds to MM:SS
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    if (isLoading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin text-emerald-500" /></div>;

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter text-white">
                        Welcome back, <span className="text-emerald-500">{userName}</span>
                    </h1>
                    <p className="text-gray-500 text-xs font-bold mt-2 flex items-center gap-2">
                        System Status: <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
                        <span className="text-emerald-400 uppercase tracking-widest">Encrypted & Online</span>
                    </p>
                </div>
                <div className="flex gap-3">
                    <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl flex items-center gap-2">
                        <span className="text-[10px] font-black text-gray-400">NODE_ID:</span>
                        <span className="text-[10px] font-mono text-emerald-500">0x44FB2_DHIV</span>
                    </div>
                </div>
            </div>

            {/* Top Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Vault Value" value={`₹${stats.totalBalance.toLocaleString()}`} icon={<Wallet className="text-emerald-500" />} trend="+2.4%" />
                <StatCard title="Monthly Inflow" value={`₹${stats.monthlyInflow.toLocaleString()}`} icon={<TrendingUp className="text-blue-500" />} trend="+12%" />
                <StatCard title="Monthly Outflow" value={`₹${stats.monthlyOutflow.toLocaleString()}`} icon={<TrendingDown className="text-red-500" />} trend="Current" />
                <StatCard title="Family Nodes" value={stats.activeMembers.toString()} icon={<Users className="text-purple-500" />} trend="Active" />
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Recent Activity */}
                <div className="lg:col-span-2 glass-card p-8 rounded-[2.5rem] border border-white/5 bg-white/[0.02]">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-xs font-black text-gray-400 flex items-center gap-2 uppercase tracking-widest">
                            <Clock className="w-4 h-4 text-emerald-500" /> Recent Ledger Activity
                        </h3>
                    </div>

                    <div className="space-y-4">
                        {recentActivity.length > 0 ? (
                            recentActivity.map((item, idx) => (
                                <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] transition-all group">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 rounded-xl bg-black/40 text-gray-400 group-hover:text-emerald-500 transition-colors">
                                            <ArrowUpRight className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-white">{item.category || 'Transaction'}</p>
                                            <p className="text-[10px] text-gray-600 font-bold uppercase">{item.date || 'Today'}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-black text-red-500">-₹{Number(item.amount).toLocaleString()}</p>
                                        <p className="text-[9px] text-gray-700 font-bold">VERIFIED</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-10 text-gray-600 text-xs font-bold uppercase tracking-widest">No Recent Transactions Found</div>
                        )}
                    </div>
                </div>

                {/* Security Status */}
                <div className="space-y-6">
                    <div className="glass-card p-8 rounded-[2.5rem] border border-emerald-500/10 bg-emerald-500/[0.02]">
                        <ShieldCheck className="w-10 h-10 text-emerald-500 mb-4" />
                        <h3 className="font-black uppercase tracking-widest text-xs mb-2 text-white">Vault Security</h3>
                        <p className="text-gray-500 text-[10px] font-bold leading-relaxed mb-6">
                            Secure environment active. Your local node is currently synced with the primary family ledger.
                        </p>
                        <div className="space-y-3">
                            <SecurityDetail label="Encryption" status="AES-256-GCM" />
                            <SecurityDetail label="Protocol" status="HTTPS/SSL" />
                            <SecurityDetail label="Session" status="Active" />
                        </div>
                    </div>

                    <div className="glass-card p-8 rounded-[2.5rem] border border-white/5 bg-white/[0.01] flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-full bg-blue-500/10">
                                <Lock className="w-5 h-5 text-blue-500" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Auto-Lock:</span>
                        </div>
                        <span className={`text-xl font-mono font-bold ${timeLeft < 60 ? 'text-red-500 animate-pulse' : 'text-blue-500'}`}>
                            {formatTime(timeLeft)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Reusable StatCard Component
function StatCard({ title, value, icon, trend }: any) {
    return (
        <div className="glass-card p-6 rounded-[2rem] border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all group">
            <div className="flex justify-between items-start mb-4">
                <div className="p-3 rounded-2xl bg-black/40 group-hover:scale-110 transition-transform">{icon}</div>
                <span className={`text-[9px] font-black px-2 py-1 rounded-md ${trend.includes('+') ? 'bg-emerald-500/10 text-emerald-500' : 'bg-blue-500/10 text-blue-500'}`}>
                    {trend}
                </span>
            </div>
            <p className="text-[10px] font-black text-gray-500 mb-1 uppercase tracking-widest">{title}</p>
            <h2 className="text-2xl font-black text-white tracking-tighter">{value}</h2>
        </div>
    );
}

// Reusable SecurityDetail Component
function SecurityDetail({ label, status }: any) {
    return (
        <div className="flex justify-between items-center py-2 border-b border-white/5">
            <span className="text-[9px] font-bold text-gray-600 uppercase tracking-tighter">{label}</span>
            <span className="text-[9px] font-black text-emerald-500/70">{status}</span>
        </div>
    );
}