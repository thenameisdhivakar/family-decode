import { User, Bell, Shield, Database, Palette, ChevronRight } from 'lucide-react';

const sections = [
    { id: 'profile', title: 'Profile Settings', desc: 'Update your name and developer status.', icon: User },
    { id: 'notifications', title: 'Notifications', desc: 'Manage family alerts and emails.', icon: Bell },
    { id: 'security', title: 'Account Security', desc: 'Two-factor auth and active sessions.', icon: Shield },
    { id: 'database', title: 'Data Management', desc: 'Export or purge family history.', icon: Database },
];

export default function SettingsPage() {
    return (
        <div className="max-w-3xl space-y-8">
            <header>
                <h1 className="text-3xl font-bold tracking-tight text-white">Settings</h1>
                <p className="text-gray-500 text-sm mt-1">Configure your FamilyDecode preferences.</p>
            </header>

            <div className="space-y-4">
                {sections.map((section) => (
                    <div key={section.id} className="glass-card p-5 rounded-2xl flex items-center justify-between group cursor-pointer">
                        <div className="flex items-center gap-5">
                            <div className="p-3 bg-white/[0.03] border border-white/[0.05] rounded-xl text-gray-400 group-hover:text-white transition-colors">
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
                <button className="text-sm font-bold text-red-500 hover:text-red-400 transition-colors uppercase tracking-widest">
                    Delete Application Data
                </button>
            </div>
        </div>
    );
}