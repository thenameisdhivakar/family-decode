'use client';

import { useState, useEffect } from 'react';
import { Target, TrendingUp, Plus, Trophy, X, Trash2, User } from 'lucide-react';

export default function GoalsPage() {
    const [goals, setGoals] = useState<any[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        target: '',
        current: '0',
        color: 'bg-blue-600',
        createdBy: 'Dad' // Default role
    });

    useEffect(() => {
        const saved = localStorage.getItem('family-goals');
        if (saved) {
            setGoals(JSON.parse(saved));
        } else {
            setGoals([
                { id: '1', title: 'Japan Summer Trip', current: 6500, target: 10000, color: 'bg-blue-600', createdBy: 'Dad' },
                { id: '2', title: 'Emergency Fund', current: 15000, target: 20000, color: 'bg-emerald-600', createdBy: 'Mom' }
            ]);
        }
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('family-goals', JSON.stringify(goals));
        }
    }, [goals, isLoaded]);

    const handleAddGoal = (e: React.FormEvent) => {
        e.preventDefault();
        const newGoal = {
            id: Date.now().toString(),
            ...formData,
            target: Number(formData.target),
            current: Number(formData.current),
        };
        setGoals([...goals, newGoal]);
        setIsModalOpen(false);
        setFormData({ title: '', target: '', current: '0', color: 'bg-blue-600', createdBy: 'Dad' });
    };

    // --- FUNCTION TO UPDATE AMOUNT IN BETWEEN ---
    const addFunds = (id: string) => {
        const amount = prompt("How much would you like to add?");
        if (amount && !isNaN(Number(amount))) {
            setGoals(goals.map(g =>
                g.id === id ? { ...g, current: g.current + Number(amount) } : g
            ));
        }
    };

    const removeGoal = (id: string) => {
        setGoals(goals.filter(g => g.id !== id));
    };

    if (!isLoaded) return null;

    return (
        <div className="space-y-8">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white font-sans">Family Milestones</h1>
                    <p className="text-gray-500 text-sm mt-1">Track shared objectives and progress.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg shadow-indigo-600/20 active:scale-95"
                >
                    <Plus className="w-4 h-4" /> New Goal
                </button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {goals.map((goal) => {
                    const percentage = Math.min(Math.round((goal.current / goal.target) * 100), 100);

                    return (
                        <div key={goal.id} className="glass-card p-8 rounded-[2.5rem] group relative border border-white/5 overflow-hidden">
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.05] text-white">
                                        <Target className="w-6 h-6 text-indigo-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white leading-tight">{goal.title}</h3>
                                        <div className="flex items-center gap-1.5 mt-1">
                                            <User className="w-3 h-3 text-gray-500" />
                                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">By {goal.createdBy}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => removeGoal(goal.id)} className="p-2 text-gray-700 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                    <Trophy className={`w-5 h-5 ${percentage === 100 ? 'text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]' : 'text-gray-800'}`} />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                                    <span className="text-gray-400">Target: ${goal.target.toLocaleString()}</span>
                                    <span className="text-white">{percentage}% Done</span>
                                </div>

                                <div className="h-2 w-full bg-white/[0.05] rounded-full overflow-hidden">
                                    <div
                                        className={`h-full ${goal.color} transition-all duration-700 shadow-lg`}
                                        style={{ width: `${percentage}%` }}
                                    />
                                </div>

                                <div className="flex justify-between items-end pt-2">
                                    <div>
                                        <p className="text-3xl font-bold text-white font-mono">${goal.current.toLocaleString()}</p>
                                    </div>
                                    {/* UPDATE AMOUNT BUTTON */}
                                    <button
                                        onClick={() => addFunds(goal.id)}
                                        className="bg-white/5 hover:bg-white/10 text-white text-xs font-bold px-4 py-2 rounded-lg border border-white/10 transition-all flex items-center gap-2"
                                    >
                                        <TrendingUp className="w-3 h-3 text-emerald-500" /> Add Funds
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* --- MODAL --- */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                    <div className="glass-card w-full max-w-md p-8 rounded-[2.5rem] border border-white/10 shadow-2xl">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-bold text-white">New Milestone</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-white"><X className="w-6 h-6" /></button>
                        </div>

                        <form onSubmit={handleAddGoal} className="space-y-5">
                            <div>
                                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Created By</label>
                                <select
                                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-3 text-white outline-none cursor-pointer focus:border-indigo-500"
                                    value={formData.createdBy}
                                    onChange={e => setFormData({ ...formData, createdBy: e.target.value })}
                                >
                                    <option value="Dad">Dad</option>
                                    <option value="Mom">Mom</option>
                                    <option value="Son">Son</option>
                                    <option value="Sister">Sister</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-500 mb-2">Goal Name</label>
                                <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-indigo-500" placeholder="e.g. Dream House" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-500  mb-2">Target ($)</label>
                                    <input required type="number" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-indigo-500" value={formData.target} onChange={e => setFormData({ ...formData, target: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-500  mb-2">Initial ($)</label>
                                    <input type="number" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-indigo-500" value={formData.current} onChange={e => setFormData({ ...formData, current: e.target.value })} />
                                </div>
                            </div>
                            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-bold mt-4 shadow-lg active:scale-95 transition-all">
                                Save Milestone
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}