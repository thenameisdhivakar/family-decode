import {
    Users,
    Phone,
    Mail,
    Heart,
    Plus,
    MoreVertical,
    MapPin,
} from "lucide-react";

const familyMembers = [
    {
        name: "Arun Kumar",
        relation: "Father",
        phone: "+91 98765 43210",
        email: "arun@example.com",
        location: "Chennai",
        initials: "AK",
        color: "from-cyan-400 to-blue-500",
    },
    {
        name: "Lakshmi Devi",
        relation: "Mother",
        phone: "+91 98765 12345",
        email: "lakshmi@example.com",
        location: "Coimbatore",
        initials: "LD",
        color: "from-pink-400 to-rose-500",
    },
    {
        name: "Kavin",
        relation: "Brother",
        phone: "+91 91234 56789",
        email: "kavin@example.com",
        location: "Bangalore",
        initials: "KV",
        color: "from-purple-400 to-indigo-500",
    },
];

export default function FamilyMembersPage() {
    return (
        <div className="min-h-screen bg-black text-white overflow-hidden relative">
            {/* Background Glow */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500/20 blur-[120px]" />
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-500/20 blur-[120px]" />

            <div className="relative z-10 p-8 max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="text-5xl font-bold tracking-tight">
                            Family Members
                        </h1>

                        <p className="text-gray-400 mt-3">
                            Manage and stay connected with your family
                        </p>
                    </div>

                    <button className="flex items-center gap-2 bg-white/10 border border-white/10 backdrop-blur-2xl px-5 py-3 rounded-2xl hover:bg-white/20 transition">
                        <Plus size={18} />
                        Add Member
                    </button>
                </div>

                {/* Top Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Total Members */}
                    <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-6">
                        <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 flex items-center justify-center mb-5">
                            <Users className="text-cyan-400" size={28} />
                        </div>

                        <p className="text-gray-400 text-sm mb-2">
                            Total Members
                        </p>

                        <h2 className="text-4xl font-bold">8</h2>
                    </div>

                    {/* Connected */}
                    <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-6">
                        <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center mb-5">
                            <Heart className="text-emerald-400" size={28} />
                        </div>

                        <p className="text-gray-400 text-sm mb-2">
                            Connected
                        </p>

                        <h2 className="text-4xl font-bold">6 Online</h2>
                    </div>

                    {/* Locations */}
                    <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-6">
                        <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-5">
                            <MapPin className="text-purple-400" size={28} />
                        </div>

                        <p className="text-gray-400 text-sm mb-2">
                            Locations
                        </p>

                        <h2 className="text-4xl font-bold">4 Cities</h2>
                    </div>
                </div>

                {/* Members Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {familyMembers.map((member, index) => (
                        <div
                            key={index}
                            className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-6 hover:bg-white/10 transition-all duration-300"
                        >
                            {/* Top */}
                            <div className="flex items-start justify-between mb-6">
                                {/* Avatar */}
                                <div
                                    className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${member.color} flex items-center justify-center text-2xl font-bold`}
                                >
                                    {member.initials}
                                </div>

                                <button className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition">
                                    <MoreVertical
                                        size={18}
                                        className="text-gray-400"
                                    />
                                </button>
                            </div>

                            {/* Details */}
                            <div>
                                <h2 className="text-2xl font-semibold">
                                    {member.name}
                                </h2>

                                <p className="text-cyan-400 mt-2">
                                    {member.relation}
                                </p>
                            </div>

                            {/* Contact */}
                            <div className="mt-6 space-y-4">
                                <div className="flex items-center gap-3 text-gray-400">
                                    <Phone size={18} />
                                    <span>{member.phone}</span>
                                </div>

                                <div className="flex items-center gap-3 text-gray-400">
                                    <Mail size={18} />
                                    <span className="truncate">
                                        {member.email}
                                    </span>
                                </div>

                                <div className="flex items-center gap-3 text-gray-400">
                                    <MapPin size={18} />
                                    <span>{member.location}</span>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex items-center gap-3 mt-8">
                                <button className="flex-1 bg-white text-black py-3 rounded-2xl font-medium hover:opacity-90 transition">
                                    View
                                </button>

                                <button className="flex-1 bg-white/10 border border-white/10 py-3 rounded-2xl hover:bg-white/20 transition">
                                    Message
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}