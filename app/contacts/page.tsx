"use client";

import { useState, useEffect } from "react";
import { Plus, Phone, Mail, Trash2, Loader2, ChevronDown, MessageCircle, X } from "lucide-react";

const CATEGORIES = ["Family", "Doctor", "School", "College", "Important", "Friend", "Other"];

export default function ContactsPage() {
    const [contacts, setContacts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [activeId, setActiveId] = useState<string | null>(null);
    const [form, setForm] = useState({ name: "", phone: "", email: "", relation: "Family" });

    // Load data from API
    useEffect(() => {
        fetch("/api/contacts")
            .then((res) => res.json())
            .then((data) => {
                setContacts(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const addContact = async () => {
        if (!form.name || !form.phone) return;
        const res = await fetch("/api/contacts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });
        const newContact = await res.json();
        setContacts([newContact, ...contacts]);
        setShowModal(false);
        setForm({ name: "", phone: "", email: "", relation: "Family" });
    };

    const deleteContact = async (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        if (!confirm("Delete this contact?")) return;
        await fetch(`/api/contacts/${id}`, { method: "DELETE" });
        setContacts(contacts.filter(c => c._id !== id));
        setActiveId(null);
    };

    return (
        <div className="min-h-screen p-4 md:p-8 text-white max-w-full mx-auto font-sans">

            {/* Header Section */}
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 mb-6">
                    Contacts
                    <br />
                    <span className="text-sm font-medium text-gray-500 tracking-normal bg-none">
                        Connections are the threads of a happy life.
                    </span>
                </h1>

                <button
                    onClick={() => setShowModal(true)}
                    className="w-full bg-white text-black py-4 rounded-[24px] font-bold text-lg flex items-center justify-center gap-2 hover:scale-[1.01] transition-all active:scale-95 shadow-xl shadow-white/5"
                >
                    <Plus size={22} strokeWidth={3} />
                    Add contact
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center mt-20"><Loader2 className="animate-spin text-gray-600" size={32} /></div>
            ) : (
                <div className="space-y-3">
                    {contacts.map((c) => (
                        <div
                            key={c._id}
                            onClick={() => setActiveId(activeId === c._id ? null : c._id)}
                            className={`relative overflow-hidden bg-white/5 border border-white/10 p-5 rounded-[28px] cursor-pointer transition-all duration-300 ${activeId === c._id ? 'bg-white/10 border-white/30 scale-[1.02]' : 'hover:bg-white/10'}`}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4 flex-1 min-w-0">
                                    <div className="w-12 h-12 rounded-2xl bg-neutral-800 flex items-center justify-center font-bold text-lg text-white border border-white/10 flex-shrink-0">
                                        {c.name?.[0]?.toUpperCase()}
                                    </div>
                                    <div className="truncate">
                                        <h3 className="font-bold text-lg truncate tracking-tight">{c.name}</h3>
                                        <p className="text-gray-500 text-sm">{c.phone}</p>
                                    </div>
                                </div>
                                <div className={`transition-all duration-300 ${activeId === c._id ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`}>
                                    <span className="text-[10px] font-black uppercase tracking-widest bg-white/5 px-3 py-2 rounded-xl text-gray-400 border border-white/5 whitespace-nowrap">
                                        {c.relation}
                                    </span>
                                </div>
                            </div>

                            {/* SLIDE-IN ACTIONS */}
                            <div className={`absolute inset-y-0 right-0 bg-neutral-900/95 backdrop-blur-xl flex items-center gap-3 px-6 transition-transform duration-300 ease-in-out ${activeId === c._id ? 'translate-x-0' : 'translate-x-full'}`}>
                                <a href={`tel:${c.phone}`} className="p-3 bg-white text-black rounded-full hover:scale-110 transition shadow-lg"><Phone size={20} fill="black" /></a>
                                <a href={`https://wa.me/${c.phone.replace(/\D/g, '')}`} target="_blank" className="p-3 bg-emerald-500 text-white rounded-full hover:scale-110 transition shadow-lg"><MessageCircle size={20} fill="white" /></a>
                                {c.email && <a href={`mailto:${c.email}`} className="p-3 bg-blue-500 text-white rounded-full hover:scale-110 transition shadow-lg"><Mail size={20} fill="white" /></a>}
                                <button onClick={(e) => deleteContact(e, c._id)} className="p-3 bg-red-500/10 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition"><Trash2 size={20} /></button>
                                <button onClick={(e) => { e.stopPropagation(); setActiveId(null); }} className="ml-2 text-gray-500 hover:text-white"><X size={24} /></button>
                            </div>
                        </div>
                    ))}
                    {!loading && contacts.length === 0 && (
                        <p className="text-center text-gray-600 mt-10 italic font-medium">Your directory is empty.</p>
                    )}
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/95 backdrop-blur-md flex items-center justify-center z-50 p-4">
                    <div className="bg-[#0a0a0a] border border-white/10 p-8 rounded-[40px] w-full max-w-sm">
                        <h2 className="text-2xl font-bold mb-8 text-center tracking-tighter uppercase">New Contact</h2>
                        <div className="space-y-4">
                            <input placeholder="Name" className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-white/30 transition" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                            <input placeholder="Phone" className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-white/30 transition" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                            <input placeholder="Email (Optional)" className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-white/30 transition" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                            <div className="relative">
                                <select className="w-full bg-[#151515] border border-white/10 p-4 rounded-2xl outline-none appearance-none cursor-pointer" value={form.relation} onChange={e => setForm({ ...form, relation: e.target.value })}>
                                    {CATEGORIES.map(cat => <option key={cat} value={cat} className="bg-black">{cat}</option>)}
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={18} />
                            </div>
                            <div className="flex gap-3 pt-6">
                                <button onClick={() => setShowModal(false)} className="flex-1 py-4 rounded-2xl bg-white/5 text-gray-400 font-bold hover:bg-white/10 transition">CANCEL</button>
                                <button onClick={addContact} className="flex-1 py-4 rounded-2xl bg-white text-black font-black shadow-lg">SAVE</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}