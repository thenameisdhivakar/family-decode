'use client';

import { useState, useEffect } from 'react';
import { StickyNote, Search, Plus, FileText, Lock, Globe, X, Trash2, Loader2 } from 'lucide-react';

export default function NotesPage() {
    const [notes, setNotes] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        type: 'Public'
    });

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            const res = await fetch('/api/notes');
            const data = await res.json();
            if (res.ok) setNotes(data);
        } catch (err) {
            console.error("Failed to load notes");
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddNote = async (e: React.FormEvent) => {
        e.preventDefault();
        const dateStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

        try {
            const res = await fetch('/api/notes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, date: dateStr }),
            });

            if (res.ok) {
                const newNote = await res.json();
                setNotes([newNote, ...notes]);
                setIsModalOpen(false);
                setFormData({ title: '', content: '', type: 'Public' });
            }
        } catch (err) {
            alert("Error saving note");
        }
    };

    const deleteNote = async (id: string) => {
        if (!confirm("Delete this note permanently?")) return;
        try {
            const res = await fetch(`/api/notes?id=${id}`, { method: 'DELETE' });
            if (res.ok) {
                setNotes(notes.filter(n => n._id !== id));
            }
        } catch (err) {
            alert("Failed to delete note");
        }
    };

    const filteredNotes = notes.filter(n =>
        n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        n.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getTypeStyles = (type: string) => {
        return type === 'Private'
            ? 'bg-amber-500/10 text-amber-500 border-amber-500/20'
            : 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 className="w-10 h-10 text-amber-500 animate-spin" />
                <p className="text-gray-500 font-medium font-mono">Syncing Notes...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white font-sans">Family Notes</h1>
                    <p className="text-gray-500 text-sm mt-1">Capture ideas, credentials, and reminders.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-amber-500 hover:bg-amber-600 text-black px-5 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95"
                >
                    <Plus className="w-4 h-4" /> New Note
                </button>
            </header>

            <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-amber-500 transition-colors" />
                <input
                    type="text"
                    placeholder="Search notes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/[0.05] rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-amber-500/50 transition-all"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNotes.length === 0 ? (
                    <div className="col-span-full py-20 text-center border-2 border-dashed border-white/5 rounded-[2rem]">
                        <StickyNote className="w-12 h-12 text-gray-800 mx-auto mb-4" />
                        <p className="text-gray-600">No notes found.</p>
                    </div>
                ) : (
                    filteredNotes.map((note) => (
                        <div key={note._id} className="glass-card p-6 rounded-[2rem] flex flex-col justify-between group border border-white/5 hover:bg-white/[0.04] transition-all min-h-[220px]">
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${getTypeStyles(note.type)}`}>
                                        {note.type}
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <p className="text-gray-600 text-xs font-bold">{note.date}</p>
                                        <button
                                            onClick={() => deleteNote(note._id)}
                                            className="text-gray-700 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-500 transition-colors">{note.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed whitespace-pre-wrap">{note.content}</p>
                            </div>
                            <div className="mt-6 flex justify-end">
                                {note.type === 'Private' ? <Lock className="w-4 h-4 text-gray-700" /> : <Globe className="w-4 h-4 text-gray-700" />}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* --- MODAL --- */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                    <div className="glass-card w-full max-w-md p-8 rounded-[2.5rem] border border-white/10 shadow-2xl animate-in fade-in zoom-in duration-200">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-bold text-white font-sans">Create Note</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={handleAddNote} className="space-y-5">
                            <div>
                                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Visibility</label>
                                <div className="grid grid-cols-2 gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, type: 'Public' })}
                                        className={`py-2 rounded-xl text-xs font-bold border transition-all ${formData.type === 'Public' ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white/5 border-white/10 text-gray-400'}`}
                                    >
                                        Public
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, type: 'Private' })}
                                        className={`py-2 rounded-xl text-xs font-bold border transition-all ${formData.type === 'Private' ? 'bg-amber-500 border-amber-500 text-black' : 'bg-white/5 border-white/10 text-gray-400'}`}
                                    >
                                        Private
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Title</label>
                                <input
                                    required type="text"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-amber-500 transition-all"
                                    placeholder="Note Title"
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Content</label>
                                <textarea
                                    required
                                    rows={4}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-amber-500 transition-all resize-none"
                                    placeholder="Write something..."
                                    value={formData.content}
                                    onChange={e => setFormData({ ...formData, content: e.target.value })}
                                />
                            </div>
                            <button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-black py-4 rounded-2xl font-bold mt-4 shadow-lg active:scale-95 transition-all">
                                Save Note
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}