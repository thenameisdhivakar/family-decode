'use client';

import { useState, useEffect, useRef } from 'react';
import { Send, User, Loader2, ShieldCheck, Trash2, Smile, Clock, CheckCheck, Circle } from 'lucide-react';

const familyMembers = [
    { name: 'Dhivakar', status: 'online', role: 'Admin' },
    { name: 'Mom', status: 'online', role: 'Family' },
    { name: 'Dad', status: 'offline', role: 'Family' },
    { name: 'Guest', status: 'away', role: 'Guest' }
];

export default function MessagesPage() {
    const [currentUser, setCurrentUser] = useState('Dhivakar');
    const [activeChatId, setActiveChatId] = useState(1);
    const [messages, setMessages] = useState<any[]>([]);
    const [messageInput, setMessageInput] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const fetchMessages = async () => {
        try {
            const res = await fetch(`/api/messages?chatId=${activeChatId}`);
            const data = await res.json();
            setMessages(data);
        } catch (err) {
            console.error("Fetch error");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
        const interval = setInterval(fetchMessages, 4000); // Poll slightly slower for performance
        return () => clearInterval(interval);
    }, [activeChatId]);

    useEffect(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!messageInput.trim()) return;

        const payload = {
            sender: currentUser,
            role: currentUser,
            text: messageInput,
            chatId: activeChatId,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        // Optimistic UI
        const tempId = Date.now().toString();
        setMessages([...messages, { ...payload, _id: tempId }]);
        setMessageInput('');

        try {
            await fetch('/api/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
        } catch (err) {
            console.error("Failed to sync");
        }
    };

    const handleDeleteMessage = async (id: string) => {
        setMessages(messages.filter(m => m._id !== id));
        // Add your API delete call here if needed: await fetch(`/api/messages/${id}`, { method: 'DELETE' });
    };

    return (
        <div className="h-[calc(100vh-140px)] flex flex-col gap-4 animate-in fade-in duration-500">

            {/* TOP BAR: USER SWITCHER */}
            <div className="flex items-center justify-between bg-white/[0.03] p-2 px-4 rounded-2xl border border-white/5 shadow-sm">
                <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold text-gray-500 uppercase">Auth:</span>
                    <div className="flex gap-2">
                        {familyMembers.map(member => (
                            <button
                                key={member.name}
                                onClick={() => setCurrentUser(member.name)}
                                className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all border ${currentUser === member.name
                                    ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-900/20'
                                    : 'border-transparent text-gray-500 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {member.name}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="hidden md:flex items-center gap-2 text-emerald-500">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">End-to-End Encrypted</span>
                </div>
            </div>

            <div className="flex-1 flex gap-6 overflow-hidden">

                {/* LEFT SIDEBAR: ACTIVE FAMILY */}
                <div className="hidden lg:flex w-64 glass-card rounded-[2.5rem] flex-col p-6 border border-white/5 bg-white/[0.01]">
                    <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-6 px-2">Family Nodes</h3>
                    <div className="space-y-4">
                        {familyMembers.map((member) => (
                            <div key={member.name} className="flex items-center justify-between p-3 rounded-2xl hover:bg-white/[0.03] transition-colors group cursor-pointer">
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <div className="w-10 h-10 bg-gradient-to-br from-white/10 to-white/[0.02] border border-white/10 rounded-xl flex items-center justify-center text-gray-400 group-hover:text-blue-400 transition-colors">
                                            <User className="w-5 h-5" />
                                        </div>
                                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-black ${member.status === 'online' ? 'bg-emerald-500' : member.status === 'away' ? 'bg-amber-500' : 'bg-gray-700'
                                            }`} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-white">{member.name}</p>
                                        <p className="text-[9px] text-gray-500 font-bold uppercase">{member.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* MAIN CHAT WINDOW */}
                <div className="flex-1 glass-card rounded-[2.5rem] flex flex-col overflow-hidden border border-white/5 shadow-2xl relative">

                    {/* Header */}
                    <div className="p-6 border-b border-white/[0.05] bg-white/[0.01] flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-500/10 rounded-2xl flex items-center justify-center border border-blue-500/20">
                                <ShieldCheck className="w-5 h-5 text-blue-400" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white tracking-tight">Main Family Ledger</h3>
                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter flex items-center gap-1">
                                    <Circle className="w-2 h-2 fill-emerald-500 text-emerald-500" /> {messages.length} Synchronized Pulses
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Message Area */}
                    <div ref={scrollRef} className="flex-1 p-6 overflow-y-auto space-y-6 custom-scrollbar">
                        {isLoading ? (
                            <div className="h-full flex items-center justify-center"><Loader2 className="animate-spin text-blue-500" /></div>
                        ) : (
                            messages.map((msg, idx) => {
                                const isMe = msg.sender === currentUser;
                                return (
                                    <div key={msg._id || idx} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} group animate-in slide-in-from-bottom-2 duration-300`}>
                                        <div className="flex items-center gap-2 mb-1 px-2">
                                            <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">{msg.sender}</span>
                                            <span className="text-[9px] text-gray-800 font-medium italic">{msg.timestamp || 'Just now'}</span>
                                        </div>
                                        <div className="relative max-w-[75%] flex items-center gap-2">
                                            {isMe && (
                                                <button
                                                    onClick={() => handleDeleteMessage(msg._id)}
                                                    className="opacity-0 group-hover:opacity-100 p-2 text-gray-600 hover:text-red-500 transition-all"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            )}
                                            <div className={`p-4 text-sm rounded-[1.5rem] shadow-sm transition-all ${isMe
                                                ? 'bg-blue-600 text-white rounded-tr-none hover:bg-blue-500'
                                                : 'bg-white/[0.05] text-gray-200 rounded-tl-none border border-white/10 hover:bg-white/[0.08]'
                                                }`}>
                                                {msg.text}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>

                    {/* Input Area */}
                    <form onSubmit={handleSendMessage} className="p-6 bg-black/20 border-t border-white/[0.05] backdrop-blur-md">
                        <div className="relative flex items-center gap-3">
                            <button type="button" className="p-3 text-gray-500 hover:text-white transition-colors">
                                <Smile className="w-5 h-5" />
                            </button>
                            <div className="relative flex-1">
                                <input
                                    value={messageInput}
                                    onChange={(e) => setMessageInput(e.target.value)}
                                    placeholder={`Secure signal as ${currentUser}...`}
                                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-2xl py-4 px-6 text-sm text-white outline-none focus:border-blue-500/50 transition-all placeholder:text-gray-600 font-medium"
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-3">
                                    <span className="text-[9px] font-bold text-gray-700 hidden sm:inline uppercase">Press Enter to Transmit</span>
                                    <button type="submit" className="p-2.5 bg-blue-600 rounded-xl text-white hover:bg-blue-700 transition-all active:scale-90 shadow-lg shadow-blue-600/20">
                                        <Send className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}