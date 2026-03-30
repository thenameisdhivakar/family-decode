'use client';

import { useState, useEffect } from 'react';
import { Plus, Search, Mail, Phone, Trash2, X, Users } from 'lucide-react';

export default function MembersPage() {
    const [members, setMembers] = useState<any[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Updated Form State with new default role
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', role: 'Dad' });

    useEffect(() => {
        const saved = localStorage.getItem('family-members');
        if (saved) {
            setMembers(JSON.parse(saved));
        } else {
            // Default starting data with family roles
            setMembers([
                { id: '1', name: 'Dhivakar', role: 'Dad', email: 'dhivakar@dev.com', phone: '+91 98765 43210' }
            ]);
        }
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('family-members', JSON.stringify(members));
        }
    }, [members, isLoaded]);

    const handleAddMember = (e: React.FormEvent) => {
        e.preventDefault();
        const newMember = { id: Date.now().toString(), ...formData };
        setMembers([...members, newMember]);
        setFormData({ name: '', email: '', phone: '', role: 'Dad' });
        setIsModalOpen(false);
    };

    const removeMember = (id: string) => {
        setMembers(members.filter(m => m.id !== id));
    };

    const filteredMembers = members.filter(m =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Helper function to color-code roles
    const getRoleColor = (role: string) => {
        switch (role) {
            case 'Dad': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
            case 'Mom': return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
            case 'Son': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
            case 'Sister': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
            default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
        }
    };

    if (!isLoaded) return null;

    return (
        <div className="space-y-8">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Family Tree</h1>
                    <p className="text-gray-500 text-sm mt-1">Manage Mom, Dad, and the rest of the crew.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-blue-600/20 active:scale-95 flex items-center gap-2"
                >
                    <Plus className="w-5 h-5" /> Add Member
                </button>
            </header>

            {/* Search */}
            <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/[0.05] rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-blue-500/50 transition-all"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMembers.map((member) => (
                    <div key={member.id} className="glass-card p-6 rounded-[2rem] border border-white/5 relative group hover:bg-white/[0.04] transition-all">
                        <div className="flex justify-between items-start mb-6">
                            <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center text-xl font-bold ${getRoleColor(member.role).split(' ')[1]}`}>
                                {member.name[0]}
                            </div>
                            <button onClick={() => removeMember(member.id)} className="p-2 text-gray-700 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-xl font-bold text-white tracking-tight">{member.name}</h3>
                            <span className={`inline-block mt-1 px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-widest border ${getRoleColor(member.role)}`}>
                                {member.role}
                            </span>
                        </div>

                        <div className="space-y-3 pt-5 border-t border-white/[0.05]">
                            <div className="flex items-center gap-3 text-sm text-gray-400">
                                <Mail className="w-4 h-4 text-gray-600" />
                                <span className="truncate">{member.email}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-400">
                                <Phone className="w-4 h-4 text-gray-600" />
                                <span>{member.phone}</span>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Empty Add Card */}
                <div onClick={() => setIsModalOpen(true)} className="border-2 border-dashed border-white/5 rounded-[2rem] flex flex-col items-center justify-center p-8 hover:border-blue-500/40 hover:bg-blue-500/[0.02] transition-all cursor-pointer group min-h-[240px]">
                    <Users className="w-8 h-8 text-gray-500 mb-2 group-hover:text-blue-500 transition-colors" />
                    <p className="text-gray-500 font-bold">Add Family</p>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                    <div className="glass-card w-full max-w-md p-8 rounded-[2.5rem] border border-white/10 animate-in fade-in zoom-in duration-200">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-bold text-white">Add Family Member</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={handleAddMember} className="space-y-5">
                            <div>
                                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Name</label>
                                <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-blue-500" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Role</label>
                                <select
                                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-3 text-white outline-none cursor-pointer"
                                    value={formData.role}
                                    onChange={e => setFormData({ ...formData, role: e.target.value })}
                                >
                                    <option value="Mom">Mom</option>
                                    <option value="Dad">Dad</option>
                                    <option value="Son">Son</option>
                                    <option value="Sister">Sister</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Email</label>
                                <input required type="email" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-blue-500" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Phone</label>
                                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-blue-500" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                            </div>
                            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold mt-4 transition-all">
                                Save to Family Tree
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}