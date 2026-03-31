'use client';

import { useState } from 'react';
import { User, Bell, Shield, Database, ChevronRight, ArrowLeft, Save, Trash2, Loader2 } from 'lucide-react';

export default function SettingsPage() {
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    // Form States
    const [notifications, setNotifications] = useState({ alerts: true, emails: false });
    const [profile, setProfile] = useState({ name: 'Dhivakar', role: 'Software Developer' });

    const handlePurgeData = async () => {
        if (!confirm("CRITICAL: This will delete ALL messages and notes. Are you absolutely sure?")) return;

        setIsSaving(true);
        try {
            const res = await fetch('/api/settings/purge', { method: 'DELETE' });
            if (res.ok) alert("Data wiped successfully.");
        } catch (err) {
            alert("Error purging data.");
        } finally {
            setIsSaving(false);
            setActiveSection(null);
        }
    };

    // --- Sub-Views ---
    if (activeSection === 'profile') {
        return (
            <div className="max-w-2xl space-y-6 animate-in slide-in-from-right-4 duration-300">
                <button onClick={() => setActiveSection(null)} className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to Settings
                </button>
                <div className="glass-card p-8 rounded-[2.5rem] border border-white/5 space-y-6">
                    <h2 className="text-2xl font-bold text-white">Profile</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 block">Display Name</label>
                            <input value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-blue-500" />
                        </div>
                        <div>
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 block">Status</label>
                            <input value={profile.role} onChange={e => setProfile({ ...profile, role: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-blue-500" />
                        </div>
                    </div>
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-all">
                        <Save className="w-4 h-4" /> Save Profile
                    </button>
                </div>
            </div>
        );
    }

    if (activeSection === 'notifications') {
        return (
            <div className="max-w-2xl space-y-6 animate-in slide-in-from-right-4 duration-300">
                <button onClick={() => setActiveSection(null)} className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <div className="glass-card p-8 rounded-[2.5rem] border border-white/5 space-y-6">
                    <h2 className="text-2xl font-bold text-white">Alerts</h2>
                    <div className="space-y-4">
                        {[
                            { id: 'alerts', label: 'Push Notifications', desc: 'Get notified for new family messages.' },
                            { id: 'emails', label: 'Email Summaries', desc: 'Weekly digest of family expenses.' }
                        ].map(item => (
                            <div key={item.id} className="flex items-center justify-between p-4 bg-white/[0.02] rounded-2xl border border-white/5">
                                <div>
                                    <p className="font-bold text-white text-sm">{item.label}</p>
                                    <p className="text-xs text-gray-500">{item.desc}</p>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={(notifications as any)[item.id]}
                                    onChange={() => setNotifications({ ...notifications, [item.id]: !(notifications as any)[item.id] })}
                                    className="w-5 h-5 accent-blue-600 cursor-pointer"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // --- Main List View ---
    return (
        <div className="max-w-3xl space-y-8 animate-in fade-in duration-500">
            <header>
                <h1 className="text-3xl font-bold tracking-tight text-white font-sans">Settings</h1>
                <p className="text-gray-500 text-sm mt-1">Configure your FamilyDecode preferences.</p>
            </header>

            <div className="space-y-4">
                {[
                    { id: 'profile', title: 'Profile Settings', desc: 'Update your name and developer status.', icon: User },
                    { id: 'notifications', title: 'Notifications', desc: 'Manage family alerts and emails.', icon: Bell },
                    { id: 'security', title: 'Account Security', desc: 'Two-factor auth and active sessions.', icon: Shield },
                    { id: 'database', title: 'Data Management', desc: 'Export or purge family history.', icon: Database },
                ].map((section) => (
                    <div
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className="glass-card p-5 rounded-2xl flex items-center justify-between group cursor-pointer border border-white/5 hover:bg-white/[0.04] transition-all"
                    >
                        <div className="flex items-center gap-5">
                            <div className="p-3 bg-white/[0.03] border border-white/[0.05] rounded-xl text-gray-400 group-hover:text-blue-500 transition-colors">
                                <section.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-white">{section.title}</h3>
                                <p className="text-xs text-gray-500">{section.desc}</p>
                            </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-700 group-hover:text-white transition-all transform group-hover:translate-x-1" />
                    </div>
                ))}
            </div>

            <div className="pt-8 border-t border-white/[0.05]">
                <button
                    disabled={isSaving}
                    onClick={handlePurgeData}
                    className="flex items-center gap-2 text-sm font-bold text-red-500 hover:text-red-400 transition-colors uppercase tracking-widest disabled:opacity-50"
                >
                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                    Delete All Application Data
                </button>
            </div>
        </div>
    );
}