import {
    FileText,
    Folder,
    Upload,
    Search,
    MoreVertical,
    Star,
    Lock,
    FileSpreadsheet,
    FileImage,
} from "lucide-react";

const documents = [
    {
        name: "Project Proposal.pdf",
        type: "PDF",
        size: "2.4 MB",
        icon: FileText,
        color: "text-red-400 bg-red-500/20",
    },
    {
        name: "Budget Report.xlsx",
        type: "Spreadsheet",
        size: "1.1 MB",
        icon: FileSpreadsheet,
        color: "text-green-400 bg-green-500/20",
    },
    {
        name: "UI Design.png",
        type: "Image",
        size: "5.6 MB",
        icon: FileImage,
        color: "text-cyan-400 bg-cyan-500/20",
    },
];

export default function DocumentsPage() {
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
                            Documents
                        </h1>

                        <p className="text-gray-400 mt-3">
                            Store and manage all your important files
                        </p>
                    </div>

                    <button className="flex items-center gap-2 bg-white/10 border border-white/10 backdrop-blur-2xl px-5 py-3 rounded-2xl hover:bg-white/20 transition">
                        <Upload size={18} />
                        Upload File
                    </button>
                </div>

                {/* Search */}
                <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl px-5 py-4 flex items-center gap-3 mb-8">
                    <Search size={20} className="text-gray-400" />

                    <input
                        type="text"
                        placeholder="Search documents..."
                        className="bg-transparent outline-none w-full text-white placeholder:text-gray-500"
                    />
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-6">
                        <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 flex items-center justify-center mb-5">
                            <Folder className="text-cyan-400" size={28} />
                        </div>

                        <p className="text-gray-400 text-sm mb-2">
                            Total Files
                        </p>

                        <h2 className="text-4xl font-bold">248</h2>
                    </div>

                    <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-6">
                        <div className="w-14 h-14 rounded-2xl bg-yellow-500/20 flex items-center justify-center mb-5">
                            <Star className="text-yellow-400" size={28} />
                        </div>

                        <p className="text-gray-400 text-sm mb-2">
                            Starred Files
                        </p>

                        <h2 className="text-4xl font-bold">32</h2>
                    </div>

                    <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-6">
                        <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-5">
                            <Lock className="text-purple-400" size={28} />
                        </div>

                        <p className="text-gray-400 text-sm mb-2">
                            Secured Files
                        </p>

                        <h2 className="text-4xl font-bold">18</h2>
                    </div>
                </div>

                {/* Files Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {documents.map((doc, index) => {
                        const Icon = doc.icon;

                        return (
                            <div
                                key={index}
                                className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-6 hover:bg-white/10 transition-all duration-300"
                            >
                                {/* Top */}
                                <div className="flex items-start justify-between mb-6">
                                    <div
                                        className={`w-16 h-16 rounded-2xl flex items-center justify-center ${doc.color}`}
                                    >
                                        <Icon size={30} />
                                    </div>

                                    <MoreVertical
                                        className="text-gray-500 cursor-pointer"
                                        size={18}
                                    />
                                </div>

                                {/* Content */}
                                <h2 className="text-xl font-semibold mb-3 break-words">
                                    {doc.name}
                                </h2>

                                <div className="flex items-center justify-between text-sm text-gray-400">
                                    <span>{doc.type}</span>
                                    <span>{doc.size}</span>
                                </div>

                                {/* Bottom */}
                                <div className="mt-6 flex items-center justify-between">
                                    <button className="px-4 py-2 rounded-2xl bg-white/10 border border-white/10 hover:bg-white/20 transition text-sm">
                                        Open
                                    </button>

                                    <Star
                                        size={18}
                                        className="text-gray-500 hover:text-yellow-400 cursor-pointer transition"
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}