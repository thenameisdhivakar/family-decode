import {
    User,
    Bell,
    Shield,
    Moon,
    Palette,
    Lock,
    ChevronRight,
    LogOut,
} from "lucide-react";

const settings = [
    {
        title: "Profile Settings",
        description: "Manage your personal information",
        icon: User,
    },
    {
        title: "Notifications",
        description: "Customize alerts and reminders",
        icon: Bell,
    },
    {
        title: "Privacy & Security",
        description: "Protect your account and data",
        icon: Shield,
    },
    {
        title: "Appearance",
        description: "Dark mode and theme settings",
        icon: Palette,
    },
    {
        title: "Password & Lock",
        description: "Update password and security lock",
        icon: Lock,
    },
];

export default function SettingsPage() {
    return (
        <div className="min-h-screen bg-black text-white overflow-hidden relative">
            {/* Background Glow */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500/20 blur-[120px]" />
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500/20 blur-[120px]" />

            <div className="relative z-10 p-8 max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-5xl font-bold tracking-tight">
                        Settings
                    </h1>

                    <p className="text-gray-400 mt-3">
                        Manage your preferences and account settings
                    </p>
                </div>

                {/* Profile Card */}
                <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-6 flex items-center justify-between mb-8">
                    <div className="flex items-center gap-5">
                        {/* Avatar */}
                        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-3xl font-bold">
                            D
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold">
                                Dhivakar
                            </h2>

                            <p className="text-gray-400 mt-1">
                                dhivakar@example.com
                            </p>
                        </div>
                    </div>

                    <button className="px-5 py-3 rounded-2xl bg-white/10 border border-white/10 hover:bg-white/20 transition">
                        Edit Profile
                    </button>
                </div>

                {/* Settings Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {settings.map((item, index) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={index}
                                className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-6 hover:bg-white/10 transition-all duration-300 cursor-pointer"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-5">
                                        {/* Icon */}
                                        <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center">
                                            <Icon size={26} className="text-white" />
                                        </div>

                                        {/* Text */}
                                        <div>
                                            <h3 className="text-xl font-semibold">
                                                {item.title}
                                            </h3>

                                            <p className="text-gray-400 text-sm mt-1">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>

                                    <ChevronRight className="text-gray-500" />
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    {/* Theme Card */}
                    <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-6">
                        <div className="flex items-center gap-4 mb-5">
                            <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center">
                                <Moon className="text-purple-400" size={28} />
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold">
                                    Dark Mode
                                </h3>

                                <p className="text-gray-400 text-sm mt-1">
                                    Enabled
                                </p>
                            </div>
                        </div>

                        {/* Toggle */}
                        <div className="w-16 h-9 bg-cyan-500 rounded-full flex items-center px-1">
                            <div className="w-7 h-7 bg-white rounded-full ml-auto" />
                        </div>
                    </div>

                    {/* Logout */}
                    <div className="bg-red-500/10 border border-red-500/20 backdrop-blur-2xl rounded-3xl p-6 flex items-center justify-between">
                        <div>
                            <h3 className="text-2xl font-semibold text-red-400">
                                Logout
                            </h3>

                            <p className="text-gray-400 mt-2">
                                Sign out from your account securely
                            </p>
                        </div>

                        <button className="w-14 h-14 rounded-2xl bg-red-500/20 flex items-center justify-center hover:bg-red-500/30 transition">
                            <LogOut className="text-red-400" size={24} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}