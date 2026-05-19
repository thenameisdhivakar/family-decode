import {
    CalendarDays,
    Clock3,
    Plus,
    CheckCircle2,
    MoreHorizontal,
} from "lucide-react";

const schedule = [
    {
        title: "UI Design Meeting",
        time: "09:00 AM - 10:00 AM",
        status: "Completed",
        color: "bg-emerald-500/20 text-emerald-400",
    },
    {
        title: "Frontend Development",
        time: "11:30 AM - 02:00 PM",
        status: "In Progress",
        color: "bg-cyan-500/20 text-cyan-400",
    },
    {
        title: "Workout Session",
        time: "05:00 PM - 06:00 PM",
        status: "Upcoming",
        color: "bg-purple-500/20 text-purple-400",
    },
    {
        title: "Project Review Call",
        time: "08:00 PM - 09:00 PM",
        status: "Upcoming",
        color: "bg-orange-500/20 text-orange-400",
    },
];

export default function SchedulePage() {
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
                            Schedule
                        </h1>

                        <p className="text-gray-400 mt-3">
                            Manage your daily tasks and events
                        </p>
                    </div>

                    <button className="flex items-center gap-2 bg-white/10 border border-white/10 backdrop-blur-2xl px-5 py-3 rounded-2xl hover:bg-white/20 transition">
                        <Plus size={18} />
                        Add Schedule
                    </button>
                </div>

                {/* Top Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Total Events */}
                    <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-6">
                        <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 flex items-center justify-center mb-5">
                            <CalendarDays
                                className="text-cyan-400"
                                size={28}
                            />
                        </div>

                        <p className="text-gray-400 text-sm mb-2">
                            Total Events
                        </p>

                        <h2 className="text-4xl font-bold">12</h2>
                    </div>

                    {/* Completed */}
                    <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-6">
                        <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center mb-5">
                            <CheckCircle2
                                className="text-emerald-400"
                                size={28}
                            />
                        </div>

                        <p className="text-gray-400 text-sm mb-2">
                            Completed
                        </p>

                        <h2 className="text-4xl font-bold">5</h2>
                    </div>

                    {/* Focus Time */}
                    <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-6">
                        <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-5">
                            <Clock3
                                className="text-purple-400"
                                size={28}
                            />
                        </div>

                        <p className="text-gray-400 text-sm mb-2">
                            Focus Hours
                        </p>

                        <h2 className="text-4xl font-bold">6.5h</h2>
                    </div>
                </div>

                {/* Schedule Layout */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    {/* Schedule List */}
                    <div className="xl:col-span-2 bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-6">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-3xl font-semibold">
                                    Today’s Schedule
                                </h2>

                                <p className="text-gray-400 mt-2">
                                    Your tasks and meetings for today
                                </p>
                            </div>

                            <button className="px-4 py-2 rounded-2xl bg-white/10 border border-white/10 hover:bg-white/20 transition">
                                Today
                            </button>
                        </div>

                        {/* Timeline */}
                        <div className="space-y-5">
                            {schedule.map((item, index) => (
                                <div
                                    key={index}
                                    className="bg-white/5 border border-white/10 rounded-3xl p-5 flex items-center justify-between hover:bg-white/10 transition"
                                >
                                    <div className="flex items-start gap-4">
                                        {/* Time Dot */}
                                        <div className="mt-1 w-4 h-4 rounded-full bg-cyan-400" />

                                        <div>
                                            <h3 className="text-xl font-semibold">
                                                {item.title}
                                            </h3>

                                            <p className="text-gray-400 mt-2">
                                                {item.time}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <span
                                            className={`px-4 py-2 rounded-2xl text-sm font-medium ${item.color}`}
                                        >
                                            {item.status}
                                        </span>

                                        <MoreHorizontal
                                            className="text-gray-500 cursor-pointer"
                                            size={18}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Side Panel */}
                    <div className="space-y-6">
                        {/* Calendar Card */}
                        <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-6">
                            <h2 className="text-2xl font-semibold mb-6">
                                Calendar
                            </h2>

                            <div className="grid grid-cols-7 gap-3 text-center">
                                {["S", "M", "T", "W", "T", "F", "S"].map(
                                    (day, index) => (
                                        <div
                                            key={index}
                                            className="text-gray-500 text-sm"
                                        >
                                            {day}
                                        </div>
                                    )
                                )}

                                {[12, 13, 14, 15, 16, 17, 18].map(
                                    (date, index) => (
                                        <div
                                            key={index}
                                            className={`h-11 flex items-center justify-center rounded-2xl text-sm cursor-pointer transition ${date === 15
                                                    ? "bg-cyan-500 text-black font-semibold"
                                                    : "bg-white/5 hover:bg-white/10"
                                                }`}
                                        >
                                            {date}
                                        </div>
                                    )
                                )}
                            </div>
                        </div>

                        {/* Progress Card */}
                        <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-6">
                            <h2 className="text-2xl font-semibold mb-6">
                                Productivity
                            </h2>

                            <div className="flex items-center justify-center">
                                <div className="relative w-44 h-44">
                                    {/* Circle */}
                                    <div className="absolute inset-0 rounded-full border-[12px] border-white/10" />

                                    <div className="absolute inset-0 rounded-full border-[12px] border-cyan-400 border-t-transparent border-l-transparent rotate-45" />

                                    {/* Center */}
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <h3 className="text-4xl font-bold">82%</h3>

                                        <p className="text-gray-400 text-sm mt-2">
                                            Completed
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}