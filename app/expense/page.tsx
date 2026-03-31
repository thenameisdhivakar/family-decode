'use client';

import { useState, useEffect, useMemo } from 'react';
import { Plus, ArrowUpRight, ArrowDownLeft, Trash2, Loader2 } from 'lucide-react';

export default function ExpensePage() {
    const [transactions, setTransactions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'Expense' | 'EMI' | 'Loans'>('Expense');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('expense');

    const loadData = async () => {
        try {
            const res = await fetch('/api/transactions');
            if (res.ok) {
                const data = await res.json();
                setTransactions(Array.isArray(data) ? data : []);
            }
        } catch (err) {
            console.error("Fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { loadData(); }, []);

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            title,
            amount: Number(amount),
            type,
            category: activeTab,
            date: new Date().toISOString().split('T')[0],
        };

        try {
            const res = await fetch('/api/transactions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                setTitle(''); setAmount(''); setType('expense');
                setIsModalOpen(false);
                loadData();
            }
        } catch (err: any) {
            alert("Error saving: " + err.message);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return;
        try {
            const res = await fetch(`/api/transactions/${id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                loadData();
            } else {
                const err = await res.json();
                console.error("Server says:", err.error);
            }
        } catch (err) {
            console.error("Connection error:", err);
        }
    };

    const { totalIncome, totalExpense, balance, filteredList } = useMemo(() => {
        const list = transactions.filter((tx) => tx.category === activeTab);
        const inc = list.filter((t) => t.type === 'income').reduce((s, t) => s + Math.abs(t.amount), 0);
        const exp = list.filter((t) => t.type === 'expense').reduce((s, t) => s + Math.abs(t.amount), 0);
        return { totalIncome: inc, totalExpense: exp, balance: inc - exp, filteredList: list };
    }, [transactions, activeTab]);

    if (loading) return (
        <div className="h-screen flex items-center justify-center bg-black text-blue-500">
            <Loader2 className="animate-spin" size={40} />
        </div>
    );

    return (
        <div className="min-h-screen bg-black text-white p-4 md:p-8 space-y-6 md:space-y-8">
            {/* Header - Stacks on mobile */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-2xl md:text-3xl font-bold">Ledger</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                    <Plus size={18} /> Add {activeTab}
                </button>
            </div>

            {/* Tabs - Scrollable on small screens */}
            <div className="overflow-x-auto pb-2 scrollbar-hide">
                <div className="flex gap-2 bg-white/5 p-1 rounded-xl w-max border border-white/10">
                    {['Expense', 'EMI', 'Loans'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab as any)}
                            className={`px-5 md:px-8 py-2 rounded-lg text-sm transition-all whitespace-nowrap ${activeTab === tab ? 'bg-blue-600' : 'text-gray-400'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Cards - Grid 1 column on mobile, 3 on desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                <Card label="Total Income" value={totalIncome} color="emerald" icon={<ArrowUpRight className="text-emerald-500" />} />
                <Card label={activeTab} value={totalExpense} color="red" icon={<ArrowDownLeft className="text-red-500" />} />
                <Card label="Balance" value={balance} color="blue" isBalance />
            </div>

            {/* Transaction List - Responsive Table/List */}
            <div className="bg-white/5 rounded-2xl md:rounded-3xl overflow-hidden border border-white/10">
                {/* Desktop Header - Hidden on Mobile */}
                <div className="hidden md:grid grid-cols-2 text-gray-500 text-xs border-b border-white/10 uppercase tracking-widest font-bold">
                    <div className="p-6">Description</div>
                    <div className="p-6 text-right">Amount</div>
                </div>

                <div className="divide-y divide-white/5">
                    {filteredList.length > 0 ? (
                        filteredList.map((tx) => (
                            <div key={tx._id} className="group hover:bg-white-[0.02] transition-colors">
                                {/* Mobile & Desktop Unified Row */}
                                <div className="flex justify-between items-center p-4 md:p-6">
                                    <div className="flex flex-col">
                                        <span className="font-medium text-gray-200">{tx.title}</span>
                                        <span className="text-[10px] text-gray-500 md:hidden uppercase tracking-tighter">
                                            {tx.type}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3 md:gap-4">
                                        <span className={`font-bold ${tx.type === 'income' ? 'text-emerald-500' : 'text-white'}`}>
                                            {tx.type === 'income' ? '+' : '-'} ₹{Math.abs(tx.amount).toLocaleString()}
                                        </span>
                                        <button
                                            onClick={() => handleDelete(tx._id)}
                                            className="opacity-100 md:opacity-0 md:group-hover:opacity-100 text-gray-500 hover:text-red-500 transition-all p-1"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-10 text-center text-gray-600 italic">No entries for {activeTab} yet.</div>
                    )}
                </div>
            </div>

            {/* Modal - Better mobile sizing */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm">
                    <form
                        onSubmit={handleAdd}
                        className="bg-[#0f0f0f] p-6 md:p-8 rounded-t-3xl sm:rounded-3xl w-full max-w-md border-t sm:border border-white/10 shadow-2xl animate-in slide-in-from-bottom-5 duration-300"
                    >
                        <h2 className="text-xl font-bold mb-6 text-white">New {activeTab} Entry</h2>
                        <div className="space-y-4 mb-6">
                            <input required className="w-full bg-white/5 p-4 rounded-xl text-white outline-none border border-white/5 focus:border-blue-500 transition-all" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                            <input type="number" required className="w-full bg-white/5 p-4 rounded-xl text-white outline-none border border-white/5 focus:border-blue-500 transition-all" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
                            <select className="w-full bg-white/5 p-4 rounded-xl text-white outline-none border border-white/5 focus:border-blue-500 transition-all appearance-none" value={type} onChange={(e) => setType(e.target.value)}>
                                <option value="expense" className="bg-black">Expense</option>
                                <option value="income" className="bg-black">Income</option>
                            </select>
                        </div>
                        <div className="flex flex-col-reverse sm:flex-row gap-3">
                            <button type="button" onClick={() => setIsModalOpen(false)} className="py-4 px-4 text-gray-500 hover:text-white transition-colors">Cancel</button>
                            <button type="submit" className="flex-1 bg-blue-600 py-4 rounded-xl font-bold hover:bg-blue-500 transition-all active:scale-95 shadow-lg shadow-blue-600/20">Save Entry</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}

function Card({ label, value, color, icon, isBalance }: any) {
    const colors: any = { emerald: 'border-l-emerald-500', red: 'border-l-red-500', blue: 'border-l-blue-500' };
    return (
        <div className={`bg-white/5 p-5 md:p-8 rounded-2xl md:rounded-3xl border-l-4 ${colors[color]} border border-white/10 shadow-xl`}>
            <p className="text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-widest">{label}</p>
            <div className="flex items-center justify-between mt-2">
                <h3 className={`text-2xl md:text-3xl font-bold ${isBalance && value < 0 ? 'text-red-400' : 'text-white'}`}>₹{value.toLocaleString()}</h3>
                {icon}
            </div>
        </div>
    );
}