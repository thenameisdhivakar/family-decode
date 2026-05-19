import {
    Activity,
    DollarSign,
    CheckCircle2,
    CalendarDays,
    ArrowUpRight,
    Bell,
    Clock3,
    TrendingUp,
} from "lucide-react";

const stats = [
    {
        title: "Total Revenue",
        value: "$48,240",
        growth: "+12.5%",
        icon: DollarSign,
        color: "from-emerald-400 to-green-500",
    },
    {
        title: "Tasks Completed",
        value: "184",
        growth: "+8.2%",
        icon: CheckCircle2,
        color: "from-cyan-400 to-blue-500",
    },
    {
        title: "Active Projects",
        value: "12",
        growth: "+4.1%",
        icon: Activity,
        color: "from-purple-400 to-pink-500",
    },
    {
        title: "Meetings",
        value: "28",
        growth: "+6.8%",
        icon: CalendarDays,
        color: "from-orange-400 to-amber-500",
    },
];

const activities = [
    {
        title: "Updated analytics dashboard",
        time: "10 mins ago",
    },
    {
        title: "Completed UI design review",
        time: "45 mins ago",
    },
    {
        title: "Added new family member details",
        time: "2 hours ago",
    },
    {
        title: "Scheduled project meeting",
        time: "Today, 5:30 PM",
    },
];

export default function OverviewPage() {
    return (
        <div className="min-h-screen bg-black text-white overflow-hidden relative">
            {/* Background Glow */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500/20 blur-[120px]" />
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500/20 blur-[120px]" />

            <div className="relative z-10 p-8 max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="text-5xl font-bold tracking-tight">
                            Overview
                        </h1>

                        <p className="text-gray-400 mt-3">
                            Welcome back, here’s your dashboard summary
                        </p>
                    </div>

                    <button className="flex items-center gap-2 bg-white/10 border border-white/10 backdrop-blur-2xl px-5 py-3 rounded-2xl hover:bg-white/20 transition">
                        <Bell size={18} />
                        Notifications
                    </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
                    {stats.map((item, index) => {
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
                                    Weekly productivity insights
                                </p>
                            </div>

                            <button className="px-4 py-2 rounded-2xl bg-white/10 border border-white/10 hover:bg-white/20 transition">
                                Weekly
                            </button>
                        </div>

                        {/* Chart */}
                        <div className="flex items-end gap-4 h-80">
                            {[45, 70, 55, 90, 65, 100, 80].map(
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

                    {/* Right Section */}
                    <div className="space-y-6">
                        {/* Productivity Card */}
                        <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-6">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 flex items-center justify-center">
                                    <TrendingUp
                                        className="text-cyan-400"
                                        size={28}
                                    />
                                </div>

                                <div>
                                    <h2 className="text-2xl font-semibold">
                                        Productivity
                                    </h2>

                                    <p className="text-gray-400 text-sm mt-1">
                                        This week
                                    </p>
                                </div>
                            </div>

                            <h3 className="text-5xl font-bold mb-3">
                                82%
                            </h3>

                            <p className="text-green-400 text-sm">
                                +9% from last week
                            </p>
                        </div>

                        {/* Activity Feed */}
                        <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-6">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h2 className="text-2xl font-semibold">
                                        Recent Activity
                                    </h2>

                                    <p className="text-gray-400 text-sm mt-2">
                                        Latest updates
                                    </p>
                                </div>

                                <Clock3 className="text-gray-400" size={20} />
                            </div>

                            <div className="space-y-5">
                                {activities.map((activity, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-4"
                                    >
                                        {/* Dot */}
                                        <div className="w-3 h-3 rounded-full bg-cyan-400 mt-2" />

                                        <div>
                                            <h3 className="font-medium">
                                                {activity.title}
                                            </h3>

                                            <p className="text-sm text-gray-400 mt-1">
                                                {activity.time}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}