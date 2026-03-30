'use client';

import { useState, useEffect } from 'react';
import { StickyNote, Search, Plus, FileText, Lock, Globe, X, Trash2 } from 'lucide-react';

export default function NotesPage() {
    // --- 1. STATE MANAGEMENT ---
    const [notes, setNotes] = useState<any[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        type: 'Public' // Default type
    });

    // --- 2. LOCAL STORAGE LOGIC ---
    useEffect(() => {
        const saved = localStorage.getItem('family-notes');
        if (saved) {
            setNotes(JSON.parse(saved));
        } else {
            // Default initial notes
            setNotes([
                { id: '1', title: 'Wi-Fi Credentials', content: 'SSID: Family_Home | Pass: Admin1234', date: 'Mar 20', type: 'Private' },
                { id: '2', title: 'Emergency Contacts', content: 'Dr. Smith: 555-0199 | Fire Dept: 911', date: 'Mar 15', type: 'Public' }
            ]);
        }
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('family-notes', JSON.stringify(notes));
        }
    }, [notes, isLoaded]);

    // --- 3. ACTIONS ---
    const handleAddNote = (e: React.FormEvent) => {
        e.preventDefault();
        const newNote = {
            id: Date.now().toString(),
            ...formData,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        };
        setNotes([newNote, ...notes]); // Add to the beginning of the list
        setIsModalOpen(false);
        setFormData({ title: '', content: '', type: 'Public' });
    };

    const deleteNote = (id: string) => {
        setNotes(notes.filter(n => n.id !== id));
    };

    const filteredNotes = notes.filter(n =>
        n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        n.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Color logic based on Type
    const getTypeStyles = (type: string) => {
        return type === 'Private'
            ? 'bg-amber-500/10 text-amber-500 border-amber-500/20'
            : 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    };

    if (!isLoaded) return null;

    return (
        <div className="space-y-8">
            {/* Header */}
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

            {/* Search Bar */}
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

            {/* Notes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNotes.map((note) => (
                    <div key={note.id} className="glass-card p-6 rounded-[2rem] flex flex-col justify-between group border border-white/5 hover:bg-white/[0.04] transition-all min-h-[220px]">
                        <div>
                            <div className="flex justify-between items-start mb-4">
                                <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${getTypeStyles(note.type)}`}>
                                    {note.type}
                                </span>
                                <div className="flex items-center gap-2">
                                    <p className="text-gray-600 text-xs font-bold">{note.date}</p>
                                    <button
                                        onClick={() => deleteNote(note.id)}
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
                ))}
            </div>

            {/* --- ADD NOTE MODAL --- */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                    <div className="glass-card w-full max-w-md p-8 rounded-[2.5rem] border border-white/10 shadow-2xl animate-in fade-in zoom-in duration-200">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-bold text-white">Create Note</h2>
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