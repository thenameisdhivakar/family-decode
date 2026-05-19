import {
    Search,
    Plus,
    Star,
    MoreVertical,
    FileText,
} from "lucide-react";

const notes = [
    {
        title: "Project Ideas",
        description:
            "Brainstorming ideas for the new project and dashboard improvements.",
        category: "Work",
        time: "9:30 AM",
    },
    {
        title: "Meeting Notes",
        description:
            "Client discussion points, deadlines, and next sprint planning.",
        category: "Meetings",
        time: "Yesterday",
    },
    {
        title: "Daily Thoughts",
        description:
            "Stay consistent, focus on progress, and improve every single day.",
        category: "Personal",
        time: "May 18",
    },
];

export default function NotesPage() {
    return (
        <div className="min-h-screen bg-black text-white overflow-hidden relative">
            {/* Background Blur */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500/20 blur-[120px]" />
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-500/20 blur-[120px]" />

            <div className="relative z-10 p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="text-5xl font-bold tracking-tight">Notes</h1>
                        <p className="text-gray-400 mt-3">
                            Organize your thoughts beautifully
                        </p>
                    </div>

                    <button className="flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/10 hover:bg-white/20 transition px-5 py-3 rounded-2xl">
                        <Plus size={18} />
                        New Note
                    </button>
                </div>

                {/* Search */}
                <div className="mb-10">
                    <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl px-5 py-4 flex items-center gap-3">
                        <Search size={20} className="text-gray-400" />

                        <input
                            type="text"
                            placeholder="Search notes..."
                            className="bg-transparent outline-none w-full text-white placeholder:text-gray-500"
                        />
                    </div>
                </div>

                {/* Notes Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {notes.map((note, index) => (
                        <div
                            key={index}
                            className="
                bg-white/5
                border border-white/10
                backdrop-blur-2xl
                rounded-3xl
                p-6
                hover:bg-white/10
                transition-all
                duration-300
                shadow-[0_8px_32px_rgba(255,255,255,0.05)]
              "
                        >
                            {/* Top */}
                            <div className="flex items-start justify-between mb-6">
                                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10">
                                    <FileText size={24} className="text-white" />
                                </div>

                                <div className="flex items-center gap-3">
                                    <Star
                                        size={18}
                                        className="text-gray-500 hover:text-yellow-400 cursor-pointer transition"
                                    />

                                    <MoreVertical
                                        size={18}
                                        className="text-gray-500 cursor-pointer"
                                    />
                                </div>
                            </div>

                            {/* Content */}
                            <h2 className="text-2xl font-semibold mb-3">
                                {note.title}
                            </h2>

                            <p className="text-gray-400 leading-relaxed mb-8">
                                {note.description}
                            </p>

                            {/* Footer */}
                            <div className="flex items-center justify-between">
                                <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-sm text-gray-300">
                                    {note.category}
                                </span>

                                <span className="text-sm text-gray-500">
                                    {note.time}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}