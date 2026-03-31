'use client';

import { useState, useEffect, useRef } from 'react';
import { Send, User, Loader2, ShieldCheck } from 'lucide-react';

const familyMembers = ['Mom', 'Dad', 'Dhivakar', 'Guest'];

export default function MessagesPage() {
    const [currentUser, setCurrentUser] = useState('Dhivakar'); // Dynamic User
    const [activeChatId, setActiveChatId] = useState(1);
    const [messages, setMessages] = useState<any[]>([]);
    const [messageInput, setMessageInput] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Fetch messages for the active conversation
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
        // Optional: Poll every 3 seconds for new messages from other users
        const interval = setInterval(fetchMessages, 3000);
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
            chatId: activeChatId
        };

        // Optimistic UI update
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
            console.error("Failed to sync message");
        }
    };

    return (
        <div className="h-[calc(100vh-140px)] flex flex-col gap-4 animate-in fade-in duration-500">

            {/* USER SELECTOR (Simulating Logged-in User) */}
            <div className="flex items-center gap-3 bg-white/[0.03] p-2 rounded-2xl border border-white/5 w-fit">
                <span className="text-[10px] font-bold text-gray-500 uppercase ml-2">Posting as:</span>
                {familyMembers.map(member => (
                    <button
                        key={member}
                        onClick={() => setCurrentUser(member)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${currentUser === member
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-500 hover:text-white'
                            }`}
                    >
                        {member}
                    </button>
                ))}
            </div>

            <div className="flex-1 flex gap-6 overflow-hidden">
                {/* Chat Window */}
                <div className="flex-1 glass-card rounded-[2.5rem] flex flex-col overflow-hidden border border-white/5 shadow-2xl">

                    {/* Header */}
                    <div className="p-6 border-b border-white/[0.05] bg-white/[0.01] flex justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                                <ShieldCheck className="w-4 h-4 text-blue-400" />
                            </div>
                            <h3 className="font-bold text-white">Family Secure Chat</h3>
                        </div>
                    </div>

                    {/* Message Area */}
                    <div ref={scrollRef} className="flex-1 p-6 overflow-y-auto space-y-4 custom-scrollbar">
                        {isLoading ? (
                            <div className="h-full flex items-center justify-center"><Loader2 className="animate-spin text-blue-500" /></div>
                        ) : (
                            messages.map((msg) => {
                                const isMe = msg.sender === currentUser;
                                return (
                                    <div key={msg._id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                                        <span className="text-[10px] text-gray-500 mb-1 px-2 font-bold uppercase tracking-widest">
                                            {msg.sender}
                                        </span>
                                        <div className={`max-w-[80%] p-4 text-sm rounded-2xl shadow-sm ${isMe
                                                ? 'bg-blue-600 text-white rounded-tr-none'
                                                : 'bg-white/[0.07] text-gray-200 rounded-tl-none border border-white/5'
                                            }`}>
                                            {msg.text}
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSendMessage} className="p-6 bg-white/[0.02] border-t border-white/[0.05]">
                        <div className="relative flex items-center">
                            <input
                                value={messageInput}
                                onChange={(e) => setMessageInput(e.target.value)}
                                placeholder={`Message as ${currentUser}...`}
                                className="w-full bg-white/[0.05] border border-white/[0.1] rounded-2xl py-4 px-6 text-sm text-white outline-none focus:border-blue-500/50"
                            />
                            <button type="submit" className="absolute right-3 p-2.5 bg-blue-600 rounded-xl text-white hover:bg-blue-700 transition-all active:scale-95">
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}