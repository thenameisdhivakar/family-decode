'use client';

import { useState, useEffect } from 'react';
import { Heart, Activity, Thermometer, Droplets, Plus, Zap, X, CheckCircle2, TrendingUp } from 'lucide-react';

export default function HealthPage() {
    const [selectedMember, setSelectedMember] = useState('Dhivakar');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // State for Vitals
    const [vitals, setVitals] = useState({
        heartRate: 72,
        sleep: 85,
        hydration: 2.4,
        steps: 8432
    });

    // Form State
    const [logValue, setLogValue] = useState('');
    const [logType, setLogType] = useState<'heartRate' | 'hydration'>('heartRate');

    const handleLogVital = (e: React.FormEvent) => {
        e.preventDefault();
        const val = parseFloat(logValue);
        if (isNaN(val)) return;

        setVitals(prev => ({
            ...prev,
            [logType]: logType === 'hydration' ? prev.hydration + val : val
        }));

        setIsModalOpen(false);
        setLogValue('');
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Header & Member Switcher */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white">Family Health</h1>
                    <div className="flex items-center gap-2 mt-2">
                        {['Dhivakar', 'Mom', 'Dad'].map(m => (
                            <button
                                key={m}
                                onClick={() => setSelectedMember(m)}
                                className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${selectedMember === m ? 'bg-rose-500 text-white' : 'bg-white/5 text-gray-500 hover:text-gray-300'}`}
                            >
                                {m}
                            </button>
                        ))}
                    </div>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-rose-600 hover:bg-rose-700 text-white px-5 py-2.5 rounded-xl font-medium transition-all flex items-center gap-2 shadow-lg shadow-rose-600/20 active:scale-95"
                >
                    <Plus className="w-4 h-4" /> Log Vital
                </button>
            </header>

            {/* Vitals Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <VitalCard label="Avg Heart Rate" value={vitals.heartRate.toString()} unit="BPM" icon={Heart} color="text-rose-500" bg="bg-rose-500/10" trend="+2bpm" />
                <VitalCard label="Sleep Quality" value={vitals.sleep.toString()} unit="%" icon={Zap} color="text-blue-400" bg="bg-blue-400/10" trend="Stable" />
                <VitalCard label="Hydration" value={vitals.hydration.toFixed(1)} unit="L" icon={Droplets} color="text-cyan-400" bg="bg-cyan-400/10" trend="Goal: 3L" />
                <VitalCard label="Daily Steps" value={vitals.steps.toLocaleString()} unit="Steps" icon={Activity} color="text-emerald-400" bg="bg-emerald-400/10" trend="84%" />
            </div>

            {/* Daily Goals & Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 glass-card p-8 rounded-[2.5rem] border border-white/5 bg-white/[0.02]">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-xs font-black text-gray-400 flex items-center gap-2 uppercase tracking-widest">
                            <TrendingUp className="w-4 h-4 text-rose-500" /> Weekly Wellness Score
                        </h3>
                    </div>
                    <div className="h-48 flex items-end justify-between gap-2">
                        {[40, 70, 45, 90, 65, 80, 85].map((h, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                                <div className="w-full bg-rose-500/10 rounded-t-lg relative overflow-hidden flex items-end" style={{ height: `${h}%` }}>
                                    <div className="w-full bg-rose-500/40 group-hover:bg-rose-500 transition-all duration-500" style={{ height: '100%' }}></div>
                                </div>
                                <span className="text-[10px] font-bold text-gray-600 uppercase">Day {i + 1}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Health Check Checklist */}
                <div className="glass-card p-8 rounded-[2.5rem] border border-white/5 bg-white/[0.01]">
                    <h3 className="font-bold text-white mb-6 flex items-center gap-2 uppercase tracking-widest text-xs">
                        Routine Checks
                    </h3>
                    <div className="space-y-4">
                        <HealthCheck text="Vitamins Taken" done={true} />
                        <HealthCheck text="10k Steps Goal" done={false} />
                        <HealthCheck text="8h Sleep Cycle" done={true} />
                        <HealthCheck text="Post-Work Meditate" done={false} />
                    </div>
                </div>
            </div>

            {/* LOG MODAL */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="glass-card w-full max-w-sm p-8 rounded-[2.5rem] border border-white/10 shadow-2xl animate-in zoom-in-95 duration-300">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-white">Log Daily Vital</h2>
                            <button onClick={() => setIsModalOpen(false)}><X className="w-5 h-5 text-gray-500" /></button>
                        </div>
                        <form onSubmit={handleLogVital} className="space-y-5">
                            <div className="flex gap-2">
                                {(['heartRate', 'hydration'] as const).map(type => (
                                    <button
                                        key={type}
                                        type="button"
                                        onClick={() => setLogType(type)}
                                        className={`flex-1 py-2 rounded-xl text-xs font-bold uppercase ${logType === type ? 'bg-rose-500 text-white' : 'bg-white/5 text-gray-500'}`}
                                    >
                                        {type === 'heartRate' ? 'Heart' : 'Water'}
                                    </button>
                                ))}
                            </div>
                            <input
                                required
                                type="number"
                                step="0.1"
                                value={logValue}
                                onChange={e => setLogValue(e.target.value)}
                                placeholder={logType === 'heartRate' ? 'BPM (e.g. 75)' : 'Liters (e.g. 0.5)'}
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-rose-500"
                            />
                            <button type="submit" className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-4 rounded-2xl transition-all">
                                Update {selectedMember}'s Vitals
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

function VitalCard({ label, value, unit, icon: Icon, color, bg, trend }: any) {
    return (
        <div className="glass-card p-6 rounded-[2rem] border border-white/5 bg-white/[0.02] group">
            <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 ${bg} rounded-2xl flex items-center justify-center ${color} group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                </div>
                <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest">{trend}</span>
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
        <div className="flex items-center gap-3 opacity-80 hover:opacity-100 transition-opacity">
            <CheckCircle2 className={`w-5 h-5 ${done ? 'text-rose-500' : 'text-gray-700'}`} />
            <p className={`text-sm ${done ? 'text-gray-400 line-through' : 'text-gray-200'}`}>{text}</p>
        </div>
    );
}