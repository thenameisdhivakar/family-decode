import {
    BarChart3,
    TrendingUp,
    Users,
    DollarSign,
    Activity,
    ArrowUpRight,
} from "lucide-react";

const analyticsData = [
    {
        title: "Revenue",
        value: "$48.2K",
        growth: "+12.5%",
        icon: DollarSign,
        color: "from-emerald-400 to-green-500",
    },
    {
        title: "Users",
        value: "24.8K",
        growth: "+8.2%",
        icon: Users,
        color: "from-cyan-400 to-blue-500",
    },
    {
        title: "Performance",
        value: "92%",
        growth: "+5.4%",
        icon: Activity,
        color: "from-purple-400 to-pink-500",
    },
];

export default function AnalyticsPage() {
    return (
        <div className="min-h-screen bg-black text-white overflow-hidden relative">
            {/* Background Glow */}
            <div className="absolute top-0 left-0 w-80 h-72 bg-cyan-500/20 blur-[120px]" />
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500/20 blur-[120px]" />

            <div className="relative z-10 p-8  mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="text-5xl font-bold tracking-tight">
                            Analytics
                        </h1>

                        <p className="text-gray-400 mt-3">
                            Monitor insights, growth, and performance metrics
                        </p>
                    </div>

                    <button className="flex items-center gap-2 bg-white/10 border border-white/10 backdrop-blur-2xl px-5 py-3 rounded-2xl hover:bg-white/20 transition">
                        <TrendingUp size={18} />
                        Generate Report
                    </button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {analyticsData.map((item, index) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={index}
                                className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-6"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <div
                                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center`}
                                    >
                                        <Icon size={28} />
                                    </div>

                                    <div className="flex items-center gap-1 text-green-400 text-sm">
                                        <ArrowUpRight size={16} />
                                        {item.growth}
                                    </div>
                                </div>

                                <p className="text-gray-400 text-sm mb-2">
                                    {item.title}
                                </p>

                                <h2 className="text-4xl font-bold">
                                    {item.value}
                                </h2>
                            </div>
                        );
                    })}
                </div>

                {/* Main Layout */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    {/* Chart Section */}
                    <div className="xl:col-span-2 bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-8">
                        <div className="flex items-center justify-between mb-10">
                            <div>
                                <h2 className="text-3xl font-semibold">
                                    Performance Overview
                                </h2>

                                <p className="text-gray-400 mt-2">
                                    Weekly analytics report
                                </p>
                            </div>

                            <button className="px-4 py-2 rounded-2xl bg-white/10 border border-white/10 hover:bg-white/20 transition">
                                This Week
                            </button>
                        </div>

                        {/* Fake Chart */}
                        <div className="flex items-end gap-4 h-80">
                            {[40, 65, 50, 90, 70, 100, 85].map(
                                (height, index) => (
                                    <div
                                        key={index}
                                        className="flex-1 rounded-t-3xl bg-gradient-to-t from-cyan-500 to-purple-500"
                                        style={{
                                            height: `${height}%`,
                                        }}
                                    />
                                )
                            )}
                        </div>

                        {/* Days */}
                        <div className="flex justify-between text-gray-500 mt-5 px-1">
                            <span>Mon</span>
                            <span>Tue</span>
                            <span>Wed</span>
                            <span>Thu</span>
                            <span>Fri</span>
                            <span>Sat</span>
                            <span>Sun</span>
                        </div>
                    </div>

                    {/* Side Cards */}
                    <div className="space-y-6">
                        {/* Traffic */}
                        <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-6">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 flex items-center justify-center">
                                    <BarChart3
                                        className="text-cyan-400"
                                        size={28}
                                    />
                                </div>

                                <div>
                                    <h2 className="text-2xl font-semibold">
                                        Traffic
                                    </h2>

                                    <p className="text-gray-400 text-sm mt-1">
                                        User activity
                                    </p>
                                </div>
                            </div>

                            <h3 className="text-5xl font-bold mb-3">
                                18.4K
                            </h3>

                            <p className="text-green-400 text-sm">
                                +14% from last week
                            </p>
                        </div>

                        {/* Conversion */}
                        <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-6">
                            <h2 className="text-2xl font-semibold mb-8">
                                Conversion Rate
                            </h2>

                            {/* Circle */}
                            <div className="flex items-center justify-center">
                                <div className="relative w-44 h-44">
                                    {/* Background */}
                                    <div className="absolute inset-0 rounded-full border-[12px] border-white/10" />

                                    {/* Progress */}
                                    <div className="absolute inset-0 rounded-full border-[12px] border-purple-400 border-t-transparent border-l-transparent rotate-45" />

                                    {/* Center */}
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <h3 className="text-4xl font-bold">
                                            76%
                                        </h3>

                                        <p className="text-gray-400 text-sm mt-2">
                                            Success
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <p className="text-center text-gray-400 mt-6">
                                Improved performance compared to last month
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}