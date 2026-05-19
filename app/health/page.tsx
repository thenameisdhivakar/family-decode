import {
    HeartPulse,
    Footprints,
    Flame,
    Moon,
    Plus,
    TrendingUp,
} from "lucide-react";

export default function HealthPage() {
    return (
        <div className="min-h-screen bg-black text-white overflow-hidden relative">
            {/* Background Glow */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-pink-500/20 blur-[120px]" />
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-500/20 blur-[120px]" />

            <div className="relative z-10 p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="text-5xl font-bold tracking-tight">
                            Health Tracker
                        </h1>

                        <p className="text-gray-400 mt-3">
                            Monitor your daily wellness and activities
                        </p>
                    </div>

                    <button className="flex items-center gap-2 bg-white/10 border border-white/10 backdrop-blur-2xl px-5 py-3 rounded-2xl hover:bg-white/20 transition">
                        <Plus size={18} />
                        Add Record
                    </button>
                </div>

                {/* Top Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
                    {/* Heart Rate */}
                    <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div className="w-14 h-14 rounded-2xl bg-pink-500/20 flex items-center justify-center">
                                <HeartPulse className="text-pink-400" size={28} />
                            </div>

                            <TrendingUp className="text-green-400" size={18} />
                        </div>

                        <p className="text-gray-400 text-sm mb-2">Heart Rate</p>

                        <h2 className="text-4xl font-bold">84 BPM</h2>
                    </div>

                    {/* Steps */}
                    <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-6">
                        <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 flex items-center justify-center mb-6">
                            <Footprints className="text-cyan-400" size={28} />
                        </div>

                        <p className="text-gray-400 text-sm mb-2">Steps</p>

                        <h2 className="text-4xl font-bold">8,429</h2>
                    </div>

                    {/* Calories */}
                    <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-6">
                        <div className="w-14 h-14 rounded-2xl bg-orange-500/20 flex items-center justify-center mb-6">
                            <Flame className="text-orange-400" size={28} />
                        </div>

                        <p className="text-gray-400 text-sm mb-2">
                            Calories Burned
                        </p>

                        <h2 className="text-4xl font-bold">620</h2>
                    </div>

                    {/* Sleep */}
                    <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-6">
                        <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-6">
                            <Moon className="text-purple-400" size={28} />
                        </div>

                        <p className="text-gray-400 text-sm mb-2">Sleep</p>

                        <h2 className="text-4xl font-bold">7.5 hrs</h2>
                    </div>
                </div>

                {/* Activity Card */}
                <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-8">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-3xl font-semibold">
                                Weekly Activity
                            </h2>

                            <p className="text-gray-400 mt-2">
                                Your activity performance this week
                            </p>
                        </div>

                        <button className="px-4 py-2 rounded-2xl bg-white/10 border border-white/10 hover:bg-white/20 transition">
                            View Report
                        </button>
                    </div>

                    {/* Fake Chart */}
                    <div className="flex items-end gap-4 h-72">
                        {[40, 70, 55, 90, 65, 100, 80].map((height, index) => (
                            <div
                                key={index}
                                className="flex-1 rounded-t-3xl bg-gradient-to-t from-cyan-500 to-blue-400"
                                style={{
                                    height: `${height}%`,
                                }}
                            />
                        ))}
                    </div>

                    {/* Days */}
                    <div className="flex justify-between text-gray-500 mt-4 px-1">
                        <span>Mon</span>
                        <span>Tue</span>
                        <span>Wed</span>
                        <span>Thu</span>
                        <span>Fri</span>
                        <span>Sat</span>
                        <span>Sun</span>
                    </div>
                </div>
            </div>
        </div>
    );
}