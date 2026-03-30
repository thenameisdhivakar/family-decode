import { Send, Phone, Video, Search, MoreVertical } from 'lucide-react';

const chats = [
    { name: 'Sarah', lastMsg: 'Did you check the budget?', time: '2m ago', active: true },
    { name: 'Alex', lastMsg: 'Sent the file over.', time: '1h ago', active: false },
    { name: 'Family Group', lastMsg: 'Dinner at 7?', time: '3h ago', active: false },
];

export default function MessagesPage() {
    return (
        <div className="h-[calc(100vh-120px)] flex gap-6">
            {/* Sidebar - Contacts */}
            <div className="w-80 flex flex-col gap-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                    <input type="text" placeholder="Search chats..." className="w-full bg-white/[0.03] border border-white/[0.05] rounded-xl py-2.5 pl-10 pr-4 text-sm outline-none" />
                </div>
                <div className="flex-1 space-y-2 overflow-y-auto pr-2">
                    {chats.map((chat) => (
                        <div key={chat.name} className={`p-4 rounded-2xl cursor-pointer transition-all ${chat.active ? 'bg-blue-600/10 border border-blue-500/20' : 'glass-card'}`}>
                            <div className="flex justify-between items-start">
                                <h4 className="font-bold text-white">{chat.name}</h4>
                                <span className="text-[10px] text-gray-600 font-bold">{chat.time}</span>
                            </div>
                            <p className="text-xs text-gray-500 truncate mt-1">{chat.lastMsg}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 glass-card rounded-3xl flex flex-col overflow-hidden">
                {/* Chat Header */}
                <div className="p-6 border-b border-white/[0.05] flex justify-between items-center bg-white/[0.01]">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gradient-to-tr from-gray-800 to-black rounded-full border border-white/10" />
                        <div>
                            <h3 className="font-bold text-white">Sarah</h3>
                            <p className="text-[10px] text-green-500 font-bold uppercase tracking-widest">Online</p>
                        </div>
                    </div>
                    <div className="flex gap-4 text-gray-500">
                        <Phone className="w-5 h-5 hover:text-white cursor-pointer" />
                        <Video className="w-5 h-5 hover:text-white cursor-pointer" />
                        <MoreVertical className="w-5 h-5 hover:text-white cursor-pointer" />
                    </div>
                </div>

                {/* Messages Placeholder */}
                <div className="flex-1 p-6 flex flex-col justify-end space-y-4">
                    <div className="max-w-[70%] bg-white/[0.05] p-4 rounded-2xl rounded-bl-none text-sm text-gray-300">
                        Hey! Did you have a chance to look at the family expense tracker today?
                    </div>
                    <div className="max-w-[70%] bg-blue-600 self-end p-4 rounded-2xl rounded-br-none text-sm text-white">
                        Not yet, I'll check it after the developer sync at 10 AM.
                    </div>
                </div>

                {/* Input Area */}
                <div className="p-6 bg-white/[0.02]">
                    <div className="relative flex items-center">
                        <input type="text" placeholder="Type a message..." className="w-full bg-white/[0.05] border border-white/[0.1] rounded-2xl py-4 px-6 text-sm text-white outline-none focus:border-blue-500/50" />
                        <button className="absolute right-3 p-2 bg-blue-600 rounded-xl text-white hover:bg-blue-700 transition-all">
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}