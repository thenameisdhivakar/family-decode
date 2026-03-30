import { Heart, Activity, Thermometer, Droplets, Plus, Zap } from 'lucide-react';

export default function HealthPage() {
    const vitals = [
        { label: 'Avg Heart Rate', value: '72', unit: 'BPM', icon: Heart, color: 'text-rose-500', bg: 'bg-rose-500/10' },
        { label: 'Sleep Quality', value: '85', unit: '%', icon: Zap, color: 'text-blue-400', bg: 'bg-blue-400/10' },
        { label: 'Hydration', value: '2.4', unit: 'L', icon: Droplets, color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
    ];

    return (
        <div className="space-y-8">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white">Family Health</h1>
                    <p className="text-gray-500 text-sm mt-1">Real-time wellness and activity monitoring.</p>
                </div>
                <button className="bg-rose-600 hover:bg-rose-700 text-white px-5 py-2.5 rounded-xl font-medium transition-all flex items-center gap-2 shadow-lg shadow-rose-600/20">
                    <Plus className="w-4 h-4" /> Log Vital
                </button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {vitals.map((item) => (
                    <div key={item.label} className="glass-card p-6 rounded-3xl group">
                        <div className={`w-12 h-12 ${item.bg} rounded-2xl flex items-center justify-center ${item.color} mb-4 group-hover:scale-110 transition-transform`}>
                            <item.icon className="w-6 h-6" />
                        </div>
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">{item.label}</p>
                        <div className="flex items-baseline gap-2 mt-2">
                            <h3 className="text-3xl font-bold text-white">{item.value}</h3>
                            <span className="text-gray-500 text-sm font-medium">{item.unit}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="glass-card p-8 rounded-3xl border-dashed border-2 border-white/5 flex flex-col items-center justify-center text-center">
                <Activity className="w-10 h-10 text-gray-700 mb-4" />
                <p className="text-gray-500 max-w-sm">Connect wearable devices to see detailed activity and sleep patterns for all family members.</p>
            </div>
        </div>
    );
}