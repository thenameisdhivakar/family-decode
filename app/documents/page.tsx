'use client';

import { useState, useEffect } from 'react';
import { ShieldCheck, Lock, FileText, Download, Trash2, Plus, Search, X, Paperclip, CreditCard } from 'lucide-react';

export default function VaultPage() {
    const [docs, setDocs] = useState<any[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        docType: 'Aadhar Card', // New specific type
        category: 'Identity',
        size: '',
        fileData: ''
    });

    useEffect(() => {
        const saved = localStorage.getItem('family-vault-files');
        if (saved) setDocs(JSON.parse(saved));
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('family-vault-files', JSON.stringify(docs));
        }
    }, [docs, isLoaded]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                // Auto-fill name based on Doc Type if name is empty
                const suggestedName = formData.name || `${formData.docType.replace(/\s+/g, '_')}`;

                setFormData({
                    ...formData,
                    name: suggestedName,
                    size: (file.size / 1024 / 1024).toFixed(2) + " MB",
                    fileData: reader.result as string
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpload = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.fileData) return alert("Please select a file first");

        const finalName = formData.name.toLowerCase().endsWith('.pdf')
            ? formData.name
            : `${formData.name}.pdf`;

        const newDoc = {
            id: Date.now().toString(),
            ...formData,
            name: finalName,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        };

        setDocs([newDoc, ...docs]);
        setIsModalOpen(false);
        setFormData({ name: '', docType: 'Aadhar Card', category: 'Identity', size: '', fileData: '' });
    };

    const downloadFile = (fileData: string, fileName: string) => {
        const link = document.createElement('a');
        link.href = fileData;
        link.download = fileName;
        link.click();
    };

    if (!isLoaded) return null;

    return (
        <div className="space-y-8">
            <header className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                    Secure Vault <Lock className="w-6 h-6 text-emerald-500" />
                </h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all active:scale-95"
                >
                    <Plus className="w-4 h-4" /> Add Document
                </button>
            </header>

            {/* Status */}
            <div className="bg-emerald-500/5 border border-emerald-500/20 p-4 rounded-2xl flex items-center gap-4">
                <ShieldCheck className="text-emerald-500 w-5 h-5" />
                <p className="text-[10px] text-emerald-200/70 font-bold uppercase tracking-widest">KYC Documents Encryption Active</p>
            </div>

            {/* List */}
            <div className="grid grid-cols-1 gap-4">
                {docs.map((doc) => (
                    <div key={doc.id} className="glass-card p-5 rounded-3xl flex items-center justify-between border border-white/5 group hover:bg-white/[0.04]">
                        <div className="flex items-center gap-5">
                            <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-500 border border-emerald-500/20">
                                {doc.category === 'Identity' ? <CreditCard className="w-6 h-6" /> : <FileText className="w-6 h-6" />}
                            </div>
                            <div>
                                <h3 className="font-bold text-white group-hover:text-emerald-400 transition-colors">{doc.name}</h3>
                                <div className="flex gap-4 mt-1 text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                                    <span className="text-emerald-400 font-black">{doc.docType}</span>
                                    <span>{doc.size}</span>
                                    <span>{doc.date}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button onClick={() => downloadFile(doc.fileData, doc.name)} className="p-2 text-gray-400 hover:text-white transition-all bg-white/5 rounded-lg">
                                <Download className="w-5 h-5" />
                            </button>
                            <button onClick={() => setDocs(docs.filter(d => d.id !== doc.id))} className="p-2 text-gray-700 hover:text-red-500">
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* --- MODAL --- */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm">
                    <div className="glass-card w-full max-w-md p-8 rounded-[2.5rem] border border-white/10 shadow-2xl">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-bold text-white">Vault Upload</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-white"><X className="w-6 h-6" /></button>
                        </div>

                        <form onSubmit={handleUpload} className="space-y-6">
                            {/* Document Type Dropdown */}
                            <div>
                                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Document Type</label>
                                <select
                                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-4 text-white outline-none cursor-pointer focus:border-emerald-500"
                                    value={formData.docType}
                                    onChange={e => setFormData({ ...formData, docType: e.target.value })}
                                >
                                    <optgroup label="Identity (India)">
                                        <option value="Aadhar Card">Aadhar Card</option>
                                        <option value="PAN Card">PAN Card</option>
                                        <option value="Voter ID">Voter ID</option>
                                        <option value="Driving License">Driving License</option>
                                        <option value="Passport">Passport</option>
                                    </optgroup>
                                    <optgroup label="General">
                                        <option value="Birth Certificate">Birth Certificate</option>
                                        <option value="Mark Sheet">Education Mark Sheet</option>
                                        <option value="Insurance">Insurance Policy</option>
                                    </optgroup>
                                </select>
                            </div>

                            {/* Custom Name Input */}
                            <div>
                                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Display Name</label>
                                <input
                                    required type="text"
                                    placeholder="e.g. My_Aadhar_Front"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-emerald-500"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            {/* File Upload Area */}
                            <div className="relative group cursor-pointer">
                                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer z-10" onChange={handleFileChange} />
                                <div className="border-2 border-dashed border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center group-hover:border-emerald-500/50 transition-all bg-white/[0.02]">
                                    <Paperclip className="w-6 h-6 text-gray-500 mb-2" />
                                    <p className="text-[10px] text-gray-500 font-bold uppercase">
                                        {formData.size ? `${formData.size} Loaded` : "Tap to Attach File"}
                                    </p>
                                </div>
                            </div>

                            <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-2xl font-bold shadow-lg active:scale-95 transition-all">
                                Encrypt & Save to Vault
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}