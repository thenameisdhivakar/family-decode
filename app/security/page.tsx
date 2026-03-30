import { ShieldCheck, Lock, Eye, Terminal, RefreshCw, AlertTriangle } from 'lucide-react';

const logs = [
    { id: 1, event: 'New Login', device: 'Chrome / Windows', time: '2 mins ago', status: 'Authorized' },
    { id: 2, event: 'API Key Rotated', device: 'System Server', time: '1 hour ago', status: 'Success' },
    { id: 3, event: 'Failed Attempt', device: 'Unknown IP', time: '3 hours ago', status: 'Blocked' },
];

export default function SecurityPage() {
    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold tracking-tight">Security Center</h1>
                <p className="text-gray-500 text-sm mt-1">Monitor access logs and system integrity.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Integrity Card */}
                <div className="glass-card p-8 rounded-3xl relative overflow-hidden">
                    <div className="absolute top-4 right-4">
                        <div className="flex h-3 w-3 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                        </div>
                    </div>
                    <ShieldCheck className="w-12 h-12 text-emerald-500 mb-6" />
                    <h2 className="text-2xl font-bold text-white mb-2">System Secure</h2>
                    <p className="text-gray-500 text-sm mb-6">Firewall is active and all protocols are operational.</p>
                    <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-500 hover:text-emerald-400">
                        <RefreshCw className="w-3 h-3" /> Run Full Audit
                    </button>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="glass-card p-6 rounded-2xl flex flex-col items-center justify-center text-center hover:bg-white/[0.05] cursor-pointer">
                        <Lock className="w-6 h-6 text-blue-500 mb-2" />
                        <p className="text-sm font-medium text-white">Rotate Keys</p>
                    </div>
                    <div className="glass-card p-6 rounded-2xl flex flex-col items-center justify-center text-center hover:bg-white/[0.05] cursor-pointer">
                        <Eye className="w-6 h-6 text-purple-500 mb-2" />
                        <p className="text-sm font-medium text-white">Privacy Mode</p>
                    </div>
                    <div className="glass-card p-6 rounded-2xl flex flex-col items-center justify-center text-center hover:bg-white/[0.05] cursor-pointer">
                        <Terminal className="w-6 h-6 text-gray-400 mb-2" />
                        <p className="text-sm font-medium text-white">Debug Logs</p>
                    </div>
                    <div className="glass-card p-6 rounded-2xl flex flex-col items-center justify-center text-center border-red-500/20 hover:bg-red-500/[0.02] cursor-pointer">
                        <AlertTriangle className="w-6 h-6 text-red-500 mb-2" />
                        <p className="text-sm font-medium text-white">Emergency Lock</p>
                    </div>
                </div>
            </div>

            {/* Security Logs Table */}
            <div className="glass-card rounded-3xl overflow-hidden">
                <div className="p-6 border-b border-white/[0.05]">
                    <h3 className="font-bold text-white">Recent Security Events</h3>
                </div>
                <table className="w-full text-left">
                    <tbody className="divide-y divide-white/[0.02]">
                        {logs.map((log) => (
                            <tr key={log.id} className="text-sm group hover:bg-white/[0.01]">
                                <td className="px-6 py-4">
                                    <span className="font-medium text-gray-200">{log.event}</span>
                                    <p className="text-[10px] text-gray-500 uppercase font-bold">{log.device}</p>
                                </td>
                                <td className="px-6 py-4 text-gray-500">{log.time}</td>
                                <td className="px-6 py-4 text-right">
                                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${log.status === 'Blocked' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                                        }`}>
                                        {log.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}