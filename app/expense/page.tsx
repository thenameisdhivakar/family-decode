import {
    Target,
    Plus,
    Trophy,
    CheckCircle2,
    Clock3,
    Flame,
} from "lucide-react";

const goals = [
    {
        title: "Learn System Design",
        progress: 78,
        category: "Career",
        deadline: "12 Days Left",
        color: "from-cyan-500 to-blue-500",
    },
    {
        title: "Workout 5x a Week",
        progress: 64,
        category: "Fitness",
        deadline: "Ongoing",
        color: "from-pink-500 to-rose-500",
    },
    {
        title: "Save ₹2 Lakhs",
        progress: 45,
        category: "Finance",
        deadline: "4 Months Left",
        color: "from-emerald-500 to-green-500",
    },
];

export default function GoalsPage() {
    return (
        <div className="min-h-screen bg-black text-white overflow-hidden relative">
            {/* Background Glow */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500/20 blur-[120px]" />
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500/20 blur-[120px]" />

            <div className="relative z-10 p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="text-5xl font-bold tracking-tight">
                            Goals Tracker
                        </h1>

                        <p className="text-gray-400 mt-3">
                            Stay focused and achieve your targets
                        </p>
                    </div>

                    <button className="flex items-center gap-2 bg-white/10 border border-white/10 backdrop-blur-2xl px-5 py-3 rounded-2xl hover:bg-white/20 transition">
                        <Plus size={18} />
                        Add Goal
                    </button>
                </div>

                {/* Top Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
                    {/* Active Goals */}
                    <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 flex items-center justify-center">
                                <Target className="text-cyan-400" size={28} />
                            </div>

                            <span className="text-sm text-green-400">
                                +2 This Week
                            </span>
                        </div>

                        <p className="text-gray-400 text-sm mb-2">
                            Active Goals
                        </p>

                        <h2 className="text-4xl font-bold">12</h2>
                    </div>

                    {/* Completed */}
                    <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-6">
                        <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center mb-6">
                            <CheckCircle2
                                className="text-emerald-400"
                                size={28}
                            />
                        </div>

                        <p className="text-gray-400 text-sm mb-2">
                            Completed
                        </p>

                        <h2 className="text-4xl font-bold">28</h2>
                    </div>

                    {/* Streak */}
                    <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-6">
                        <div className="w-14 h-14 rounded-2xl bg-orange-500/20 flex items-center justify-center mb-6">
                            <Flame className="text-orange-400" size={28} />
                        </div>

                        <p className="text-gray-400 text-sm mb-2">
                            Current Streak
                        </p>

                        <h2 className="text-4xl font-bold">18 Days</h2>
                    </div>

                    {/* Achievement */}
                    <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-6">
                        <div className="w-14 h-14 rounded-2xl bg-yellow-500/20 flex items-center justify-center mb-6">
                            <Trophy className="text-yellow-400" size={28} />
                        </div>

                        <p className="text-gray-400 text-sm mb-2">
                            Achievements
                        </p>

                        <h2 className="text-4xl font-bold">14</h2>
                    </div>
                </div>

                {/* Goals Section */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    {/* Goals List */}
                    <div className="xl:col-span-2 space-y-6">
                        {goals.map((goal, index) => (
                            <div
                                key={index}
                                className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-6"
                            >
                                <div className="flex items-start justify-between mb-6">
                                    <div>
                                        <h2 className="text-2xl font-semibold">
                                            {goal.title}
                                        </h2>

                                        <p className="text-gray-400 mt-2">
                                            {goal.category}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2 text-sm text-gray-400">
                                        <Clock3 size={16} />
                                        {goal.deadline}
                                    </div>
                                </div>

                                {/* Progress */}
                                <div className="mb-3 flex items-center justify-between">
                                    <span className="text-sm text-gray-400">
                                        Progress
                                    </span>

                                    <span className="text-sm font-medium">
                                        {goal.progress}%
                                    </span>
                                </div>

                                <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
                                    <div
                                        className={`h-full rounded-full bg-gradient-to-r ${goal.color}`}
                                        style={{
                                            width: `${goal.progress}%`,
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Side Card */}
                    <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-6 h-fit">
                        <h2 className="text-2xl font-semibold mb-6">
                            Goal Insights
                        </h2>

                        <div className="space-y-5">
                            <div className="bg-white/5 border border-white/5 rounded-2xl p-5">
                                <p className="text-gray-400 text-sm mb-2">
                                    Weekly Progress
                                </p>

                                <h3 className="text-3xl font-bold">82%</h3>
                            </div>

                            <div className="bg-white/5 border border-white/5 rounded-2xl p-5">
                                <p className="text-gray-400 text-sm mb-2">
                                    Most Productive
                                </p>

                                <h3 className="text-2xl font-semibold">
                                    Tuesday
                                </h3>
                            </div>

                            <div className="bg-white/5 border border-white/5 rounded-2xl p-5">
                                <p className="text-gray-400 text-sm mb-2">
                                    Next Milestone
                                </p>

                                <h3 className="text-2xl font-semibold">
                                    90% Completion
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}