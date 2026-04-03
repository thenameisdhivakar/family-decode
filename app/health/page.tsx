'use client';

import { useState, useEffect } from 'react';
import {
    Heart, Activity, Thermometer, Droplets, Plus, Zap, X, CheckCircle2,
    TrendingUp, FileText, Scale, Info, ChevronRight, UploadCloud
} from 'lucide-react';

// Mock data mapping for family members
const familyData: any = {
    'Dhivakar': { heartRate: 72, sleep: 85, hydration: 2.4, steps: 8432, bmi: 22.4 },
    'Mom': { heartRate: 68, sleep: 78, hydration: 1.8, steps: 5200, bmi: 24.1 },
    'Dad': { heartRate: 75, sleep: 65, hydration: 2.1, steps: 6100, bmi: 26.5 },
};

export default function HealthPage() {
    const [selectedMember, setSelectedMember] = useState('Dhivakar');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [vitals, setVitals] = useState(familyData['Dhivakar']);

    // Sync state when member changes
    useEffect(() => {
        setVitals(familyData[selectedMember]);
    }, [selectedMember]);

    const [logValue, setLogValue] = useState('');
    const [logType, setLogType] = useState<'heartRate' | 'hydration'>('heartRate');

    const handleLogVital = (e: React.FormEvent) => {
        e.preventDefault();
        const val = parseFloat(logValue);
        if (isNaN(val)) return;
        setVitals((prev: any) => ({
            ...prev,
            [logType]: logType === 'hydration' ? prev.hydration + val : val
        }));
        setIsModalOpen(false);
        setLogValue('');
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-700 pb-10">
            {/* Header & Member Switcher */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white">Family Health Pro</h1>
                    <div className="flex items-center gap-2 mt-2">
                        {Object.keys(familyData).map(m => (
                            <button key={m} onClick={() => setSelectedMember(m)}
                                className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${selectedMember === m ? 'bg-rose-500 border-rose-400 text-white shadow-lg shadow-rose-900/40' : 'bg-white/5 border-white/5 text-gray-500 hover:text-gray-300'}`}>
                                {m}
                            </button>
                        ))}
                    </div>
                </div>
                <button onClick={() => setIsModalOpen(true)}
                    className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 rounded-2xl font-bold transition-all flex items-center gap-2 shadow-xl shadow-rose-900/20 active:scale-95">
                    <Plus className="w-4 h-4" /> Log Vital
                </button>
            </header>

            {/* Vitals Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <VitalCard label="Heart Rate" value={vitals.heartRate} unit="BPM" icon={Heart} color="text-rose-500" bg="bg-rose-500/10" trend="Normal" />
                <VitalCard label="Sleep" value={vitals.sleep} unit="%" icon={Zap} color="text-blue-400" bg="bg-blue-400/10" trend="Restorative" />
                <div className="glass-card p-6 rounded-[2rem] border border-white/5 bg-white/[0.02] relative overflow-hidden group">
                    <div className="relative z-10">
                        <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">Hydration</p>
                        <h3 className="text-3xl font-black text-white tracking-tighter">{vitals.hydration.toFixed(1)}<span className="text-xs ml-1 text-gray-500 font-bold">L</span></h3>
                        <div className="w-full bg-white/5 h-1.5 rounded-full mt-4 overflow-hidden">
                            <div className="bg-cyan-500 h-full transition-all duration-1000" style={{ width: `${(vitals.hydration / 3) * 100}%` }} />
                        </div>
                    </div>
                    <Droplets className="absolute -right-2 -bottom-2 w-16 h-16 text-cyan-500/10 group-hover:scale-110 transition-transform" />
                </div>
                <VitalCard label="BMI Index" value={vitals.bmi} unit="Score" icon={Scale} color="text-amber-400" bg="bg-amber-400/10" trend="Healthy" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Weekly Analytics Section */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="glass-card p-8 rounded-[2.5rem] border border-white/5 bg-white/[0.02]">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-xs font-black text-gray-400 flex items-center gap-2 uppercase tracking-widest">
                                <TrendingUp className="w-4 h-4 text-rose-500" /> Activity Pulse
                            </h3>
                            <select className="bg-transparent text-[10px] font-bold text-gray-500 uppercase outline-none">
                                <option>Last 7 Days</option>
                                <option>Last 30 Days</option>
                            </select>
                        </div>
                        <div className="h-40 flex items-end justify-between gap-3">
                            {[60, 40, 95, 70, 55, 85, 75].map((h, i) => (
                                <div key={i} className="flex-1 bg-white/5 rounded-t-xl relative group cursor-pointer" style={{ height: `${h}%` }}>
                                    <div className="absolute inset-0 bg-gradient-to-t from-rose-600/40 to-rose-400/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-xl" />
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[9px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        {h}%
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Health Vault / Prescriptions */}
                    <div className="glass-card p-8 rounded-[2.5rem] border border-white/5 bg-white/[0.01]">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                <FileText className="w-4 h-4 text-blue-500" /> Medical Vault
                            </h3>
                            <button className="text-[10px] font-bold text-blue-400 flex items-center gap-1 hover:underline">
                                <UploadCloud className="w-3 h-3" /> Upload Report
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <ReportItem title="Blood Work - Feb 2026" date="Feb 12, 2026" />
                            <ReportItem title="Annual Physical" date="Jan 05, 2026" />
                        </div>
                    </div>
                </div>

                {/* Sidebar: Pro Checks & Tips */}
                <div className="space-y-6">
                    <div className="glass-card p-8 rounded-[2.5rem] border border-white/5 bg-white/[0.03]">
                        <h3 className="font-bold text-white mb-6 text-xs uppercase tracking-widest">Pro Guidelines</h3>
                        <div className="space-y-5">
                            <HealthCheck text="Complete 30min Cardio" done={vitals.steps > 8000} />
                            <HealthCheck text="Post-Meal Glucose" done={true} />
                            <HealthCheck text="Hydration Goal (3L)" done={vitals.hydration >= 3} />
                            <HealthCheck text="Deep Sleep > 2h" done={false} />
                        </div>
                    </div>

                    <div className="glass-card p-6 rounded-[2rem] bg-gradient-to-br from-blue-600/20 to-transparent border border-blue-500/10">
                        <div className="flex items-center gap-3 mb-3">
                            <Info className="w-5 h-5 text-blue-400" />
                            <h4 className="text-sm font-bold text-white">Health Insight</h4>
                        </div>
                        <p className="text-xs text-gray-400 leading-relaxed">
                            Based on {selectedMember}'s heart rate trend, recovery is optimal. Consider increasing step intensity by 10% tomorrow.
                        </p>
                    </div>
                </div>
            </div>

            {/* Modal - Same as before but with rose theme */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-all">
                    <div className="glass-card w-full max-w-sm p-8 rounded-[2.5rem] border border-white/10 shadow-2xl scale-in-center">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-xl font-bold text-white tracking-tight">Log {selectedMember}'s Vitals</h2>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors"><X className="w-5 h-5 text-gray-500" /></button>
                        </div>
                        <form onSubmit={handleLogVital} className="space-y-5">
                            <div className="flex bg-white/5 p-1 rounded-2xl border border-white/5">
                                {(['heartRate', 'hydration'] as const).map(type => (
                                    <button key={type} type="button" onClick={() => setLogType(type)}
                                        className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${logType === type ? 'bg-rose-600 text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}>
                                        {type === 'heartRate' ? 'BPM' : 'Water (L)'}
                                    </button>
                                ))}
                            </div>
                            <input required type="number" step="0.1" value={logValue} onChange={e => setLogValue(e.target.value)}
                                placeholder="Enter value..." className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white text-center text-2xl font-bold outline-none focus:border-rose-500 transition-all" />
                            <button type="submit" className="w-full bg-rose-600 hover:bg-rose-700 text-white font-black py-4 rounded-2xl shadow-xl shadow-rose-900/20 uppercase tracking-widest text-xs">Update Profile</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

function ReportItem({ title, date }: { title: string, date: string }) {
    return (
        <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all cursor-pointer group">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400"><FileText className="w-4 h-4" /></div>
                <div>
                    <p className="text-[11px] font-bold text-white">{title}</p>
                    <p className="text-[9px] text-gray-500 uppercase">{date}</p>
                </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-700 group-hover:text-white transition-all" />
        </div>
    );
}

function VitalCard({ label, value, unit, icon: Icon, color, bg, trend }: any) {
    return (
        <div className="glass-card p-6 rounded-[2rem] border border-white/5 bg-white/[0.02] group hover:bg-white/[0.04] transition-all">
            <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 ${bg} rounded-2xl flex items-center justify-center ${color} group-hover:scale-110 transition-transform duration-500`}>
                    <Icon className="w-6 h-6" />
                </div>
                <div className="px-2 py-1 bg-white/5 rounded-lg">
                    <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest">{trend}</span>
                </div>
            </div>
            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">{label}</p>
            <div className="flex items-baseline gap-2 mt-1">
                <h3 className="text-3xl font-black text-white tracking-tighter">{value}</h3>
                <span className="text-gray-600 text-xs font-bold">{unit}</span>
            </div>
        </div>
    );
}

function HealthCheck({ text, done }: { text: string, done: boolean }) {
    return (
        <div className="flex items-center gap-3 group cursor-pointer">
            <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${done ? 'bg-rose-500 border-rose-500' : 'border-white/10 group-hover:border-rose-500'}`}>
                <CheckCircle2 className={`w-3.5 h-3.5 ${done ? 'text-white' : 'text-transparent'}`} />
            </div>
            <p className={`text-[11px] font-medium transition-all ${done ? 'text-gray-500 line-through' : 'text-gray-200'}`}>{text}</p>
        </div>
    );
}