import {
    BarChart3,
    TrendingUp,
    TrendingDown,
    ArrowUpRight,
    Activity,
    Wallet,
    Heart,
    Target
} from 'lucide-react';

const insights = [
    { label: 'Spending Efficiency', value: '+12.5%', desc: 'Lower than last month', icon: Wallet, color: 'text-emerald-500' },
    { label: 'Sleep Consistency', value: '92%', desc: 'Top 5% of families', icon: Heart, color: 'text-rose-500' },
    { label: 'Goal Velocity', value: '4.2x', desc: 'Faster than Q1 average', icon: Target, color: 'text-blue-500' },
];

export default function AnalyticsPage() {
    return (
        <div className="space-y-8">
            <header className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white">System Analytics</h1>
                    <p className="text-gray-500 text-sm mt-1">Data-driven insights across all family modules.</p>
                </div>
                <div className="flex gap-2 bg-white/[0.03] p-1 rounded-xl border border-white/[0.05]">
                    <button className="px-4 py-1.5 text-xs font-bold text-white bg-white/10 rounded-lg">7D</button>
                    <button className="px-4 py-1.5 text-xs font-bold text-gray-500 hover:text-gray-300">30D</button>
                    <button className="px-4 py-1.5 text-xs font-bold text-gray-500 hover:text-gray-300">1Y</button>
                </div>
            </header>

            {/* Insight Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {insights.map((item) => (
                    <div key={item.label} className="glass-card p-6 rounded-3xl relative overflow-hidden group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2.5 bg-white/[0.03] rounded-xl border border-white/[0.05]">
                                <item.icon className={`w-5 h-5 ${item.color}`} />
                            </div>
                            <ArrowUpRight className="w-4 h-4 text-gray-700 group-hover:text-white transition-colors" />
                        </div>
                        <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">{item.label}</p>
                        <h3 className="text-3xl font-bold text-white mt-1">{item.value}</h3>
                        <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                            <span className={item.color}>●</span> {item.desc}
                        </p>
                    </div>
                ))}
            </div>

            {/* Main Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Spending Trend Visualization */}
                <div className="glass-card p-8 rounded-3xl min-h-[300px] flex flex-col">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="font-bold text-white flex items-center gap-2">
                            <BarChart3 className="w-4 h-4 text-blue-500" /> Monthly Spending Trend
                        </h3>
                        <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded">ON TRACK</span>
                    </div>

                    {/* Visual Placeholder for a Chart */}
                    <div className="flex-1 flex items-end gap-3 px-2">
                        {[40, 70, 45, 90, 65, 80, 55, 95, 75, 85, 60, 100].map((height, i) => (
                            <div
                                key={i}
                                className="flex-1 bg-gradient-to-t from-blue-600/20 to-blue-500 rounded-t-lg transition-all duration-500 hover:to-white"
                                style={{ height: `${height}%` }}
                            />
                        ))}
                    </div>
                    <div className="flex justify-between mt-4 text-[10px] font-bold text-gray-600 uppercase tracking-tighter">
                        <span>Jan</span><span>Mar</span><span>May</span><span>Jul</span><span>Sep</span><span>Nov</span>
                    </div>
                </div>

                {/* Activity Heatmap */}
                <div className="glass-card p-8 rounded-3xl min-h-[300px]">
                    <h3 className="font-bold text-white mb-8 flex items-center gap-2">
                        <Activity className="w-4 h-4 text-rose-500" /> Family Activity Heatmap
                    </h3>
                    <div className="grid grid-cols-7 gap-2">
                        {Array.from({ length: 28 }).map((_, i) => (
                            <div
                                key={i}
                                className={`aspect-square rounded-lg border border-white/5 ${i % 5 === 0 ? 'bg-rose-500' :
                                        i % 3 === 0 ? 'bg-rose-500/60' :
                                            i % 2 === 0 ? 'bg-rose-500/30' : 'bg-white/[0.02]'
                                    }`}
                            />
                        ))}
                    </div>
                    <p className="text-[10px] text-gray-500 mt-6 text-center uppercase tracking-widest font-bold">
                        Last 4 Weeks of Family Engagement
                    </p>
                </div>
            </div>

            {/* Pro Logic Summary */}
            <div className="glass-card p-6 rounded-2xl bg-gradient-to-r from-blue-600/10 to-transparent border-l-4 border-l-blue-500">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-500/20 rounded-xl">
                        <TrendingUp className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                        <h4 className="font-bold text-white text-sm">Predictive Insight</h4>
                        <p className="text-gray-400 text-xs mt-1">
                            Based on current goal velocity, your <span className="text-white font-medium">"Japan Summer Trip"</span> goal will be completed <span className="text-emerald-400">14 days ahead</span> of schedule.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}