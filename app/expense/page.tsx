"use client"
import React, { useState, useMemo } from 'react';
import {
    Plus,
    ArrowUpRight,
    ArrowDownLeft,
    Wallet,
    Filter,
    Search,
    MoreHorizontal,
    CreditCard,
    ShoppingBag,
    Home,
    X,
    Calendar
} from 'lucide-react';
import AuthGuard from '../components/AuthGuard';

const INITIAL_TRANSACTIONS = [
    { id: 1, title: 'Grocery Shopping', category: 'Food', amount: -120.50, date: 'Mar 28', type: 'expense', icon: ShoppingBag },
    { id: 2, title: 'Monthly Salary', category: 'Income', amount: 4500.00, date: 'Mar 25', type: 'income', icon: Wallet },
    { id: 3, title: 'House Rent', category: 'Housing', amount: -1800.00, date: 'Mar 01', type: 'expense', icon: Home },
    { id: 4, title: 'Netflix Subscription', category: 'Entertainment', amount: -15.99, date: 'Mar 15', type: 'expense', icon: CreditCard },
];

const INITIAL_EMI = [
    { id: 1, name: 'Car Loan EMI', bank: 'HDFC Bank', amount: 450.00, dueDate: 'Apr 05', progress: '12/36' },
    { id: 2, name: 'Home Loan EMI', bank: 'SBI', amount: 1200.00, dueDate: 'Apr 10', progress: '48/240' },
];

const INITIAL_LOANS = [
    { id: 1, name: 'Personal Loan', total: 5000.00, remaining: 2400.00, interest: '10.5%', status: 'Active' },
    { id: 2, name: 'Education Loan', total: 25000.00, remaining: 18500.00, interest: '8.2%', status: 'Active' },
];

export default function ExpensePage() {
    const [activeTab, setActiveTab] = useState('Expenses');
    const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
    const [emis, setEmis] = useState(INITIAL_EMI);
    const [loans, setLoans] = useState(INITIAL_LOANS);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Form State
    const [formData, setFormData] = useState({ title: '', amount: '', category: '', type: 'expense' });

    // Logic: Calculations
    const { totalBalance, monthlyIncome, monthlyExpense } = useMemo(() => {
        return transactions.reduce((acc, curr) => {
            acc.totalBalance += curr.amount;
            if (curr.type === 'income') acc.monthlyIncome += curr.amount;
            if (curr.type === 'expense') acc.monthlyExpense += Math.abs(curr.amount);
            return acc;
        }, { totalBalance: 12450, monthlyIncome: 0, monthlyExpense: 0 });
    }, [transactions]);

    // Logic: Universal Search
    const filteredData = useMemo(() => {
        const query = searchQuery.toLowerCase();
        if (activeTab === 'Expenses') return transactions.filter(t => t.title.toLowerCase().includes(query));
        if (activeTab === 'EMI') return emis.filter(e => e.name.toLowerCase().includes(query));
        if (activeTab === 'Loans') return loans.filter(l => l.name.toLowerCase().includes(query));
        return [];
    }, [activeTab, searchQuery, transactions, emis, loans]);

    // Logic: Handle Add Functionality for all types
    const handleAddData = (e: React.FormEvent) => {
        e.preventDefault();
        const id = Date.now();
        if (activeTab === 'Expenses') {
            const newTx = {
                id, title: formData.title, category: formData.category || 'General',
                amount: formData.type === 'expense' ? -parseFloat(formData.amount) : parseFloat(formData.amount),
                date: 'Mar 30', type: formData.type, icon: ShoppingBag
            };
            setTransactions([newTx, ...transactions]);
        } else if (activeTab === 'EMI') {
            const newEmi = { id, name: formData.title, bank: 'Bank', amount: parseFloat(formData.amount), dueDate: 'Next Month', progress: '1/12' };
            setEmis([newEmi, ...emis]);
        } else {
            const newLoan = { id, name: formData.title, total: parseFloat(formData.amount), remaining: parseFloat(formData.amount), interest: '0%', status: 'Active' };
            setLoans([newLoan, ...loans]);
        }
        setIsModalOpen(false);
        setFormData({ title: '', amount: '', category: '', type: 'expense' });
    };

    return (
        <AuthGuard>
            <div className="space-y-8">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-white">{activeTab}</h1>
                        <p className="text-gray-500 text-sm mt-1">Manage your family {activeTab.toLowerCase()} effectively.</p>
                    </div>
                    <button onClick={() => setIsModalOpen(true)} className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-blue-600/20 active:scale-95">
                        <Plus className="w-4 h-4" /> Add New
                    </button>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="glass-card p-6 rounded-3xl border-l-4 border-l-blue-500">
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Total Balance</p>
                        <h3 className="text-3xl font-bold mt-2">${totalBalance.toLocaleString()}</h3>
                    </div>
                    <div className="glass-card p-6 rounded-3xl border-l-4 border-l-green-500">
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Monthly Income</p>
                        <div className="flex items-center gap-2 mt-2">
                            <h3 className="text-3xl font-bold">${monthlyIncome.toLocaleString()}</h3>
                            <ArrowUpRight className="w-5 h-5 text-green-500" />
                        </div>
                    </div>
                    <div className="glass-card p-6 rounded-3xl border-l-4 border-l-red-500">
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Monthly Expenses</p>
                        <div className="flex items-center gap-2 mt-2">
                            <h3 className="text-3xl font-bold">${monthlyExpense.toLocaleString()}</h3>
                            <ArrowDownLeft className="w-5 h-5 text-red-500" />
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2 p-1 bg-white/[0.03] border border-white/[0.05] rounded-2xl w-fit">
                    {['Expenses', 'EMI', 'Loans'].map((tab) => (
                        <button key={tab} onClick={() => { setActiveTab(tab); setSearchQuery(''); }} className={`px-6 py-2 rounded-xl text-sm font-medium transition-all ${activeTab === tab ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-gray-500 hover:text-white'}`}>
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="glass-card rounded-3xl overflow-hidden">
                    {/* Single line Title and Search */}
                    <div className="p-6 border-b border-white/[0.05] flex items-center justify-between gap-4">
                        <h2 className="text-lg font-semibold text-white whitespace-nowrap">Recent {activeTab}</h2>
                        <div className="relative flex-1 max-w-xs">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                                type="text"
                                placeholder={`Search ${activeTab}...`}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-white/[0.03] border border-white/[0.05] rounded-xl py-2 pl-10 pr-4 text-sm text-white outline-none focus:border-blue-500/50 transition-colors"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            {activeTab === 'Expenses' && (
                                <>
                                    <thead>
                                        <tr className="text-gray-500 text-[11px] uppercase tracking-widest border-b border-white/[0.05]">
                                            <th className="px-6 py-4 font-bold">Transaction</th>
                                            <th className="px-6 py-4 font-bold">Date</th>
                                            <th className="px-6 py-4 font-bold text-right">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/[0.02]">
                                        {filteredData.map((tx) => (
                                            <tr key={tx.id} className="hover:bg-white/[0.01]">
                                                <td className="px-6 py-4 flex items-center gap-4">
                                                    <div className={`p-2 rounded-xl bg-white/[0.03] ${tx.type === 'income' ? 'text-green-500' : 'text-red-400'}`}><tx.icon className="w-5 h-5" /></div>
                                                    <span className="font-medium text-gray-200">{tx.title}</span>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-500">{tx.date}</td>
                                                <td className={`px-6 py-4 text-right font-semibold ${tx.type === 'income' ? 'text-green-500' : 'text-white'}`}>
                                                    {tx.type === 'income' ? `+ $${tx.amount}` : `- $${Math.abs(tx.amount)}`}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </>
                            )}

                            {activeTab === 'EMI' && (
                                <>
                                    <thead>
                                        <tr className="text-gray-500 text-[11px] uppercase tracking-widest border-b border-white/[0.05]">
                                            <th className="px-6 py-4 font-bold">Loan Name</th>
                                            <th className="px-6 py-4 font-bold">Due Date</th>
                                            <th className="px-6 py-4 font-bold text-right">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/[0.02]">
                                        {filteredData.map((emi) => (
                                            <tr key={emi.id} className="hover:bg-white/[0.01]">
                                                <td className="px-6 py-4 flex items-center gap-4">
                                                    <div className="p-2 rounded-xl bg-white/[0.03] text-blue-400"><Calendar className="w-5 h-5" /></div>
                                                    <span className="font-medium text-gray-200">{emi.name}</span>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-500">{emi.dueDate}</td>
                                                <td className="px-6 py-4 text-right font-semibold text-white">${emi.amount}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </>
                            )}

                            {activeTab === 'Loans' && (
                                <>
                                    <thead>
                                        <tr className="text-gray-500 text-[11px] uppercase tracking-widest border-b border-white/[0.05]">
                                            <th className="px-6 py-4 font-bold">Loan Title</th>
                                            <th className="px-6 py-4 font-bold text-center">Interest</th>
                                            <th className="px-6 py-4 font-bold text-right">Remaining</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/[0.02]">
                                        {filteredData.map((loan) => (
                                            <tr key={loan.id} className="hover:bg-white/[0.01]">
                                                <td className="px-6 py-4 font-medium text-gray-200">{loan.name}</td>
                                                <td className="px-6 py-4 text-center"><span className="px-2 py-1 bg-blue-500/10 text-blue-500 text-xs rounded">{loan.interest}</span></td>
                                                <td className="px-6 py-4 text-right font-semibold text-red-400">${loan.remaining}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </>
                            )}
                        </table>
                    </div>
                </div>

                {/* Reusable Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <div className="glass-card w-full max-w-md p-8 rounded-3xl border border-white/10 shadow-2xl">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-white">Add {activeTab}</h2>
                                <button onClick={() => setIsModalOpen(false)} className="text-gray-400"><X /></button>
                            </div>
                            <form onSubmit={handleAddData} className="space-y-4">
                                <input required className="w-full bg-white/[0.03] border border-white/[0.05] rounded-xl py-3 px-4 text-white" placeholder="Name / Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                                <input required type="number" className="w-full bg-white/[0.03] border border-white/[0.05] rounded-xl py-3 px-4 text-white" placeholder="Amount" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} />
                                {activeTab === 'Expenses' && (
                                    <select className="w-full bg-[#1a1a1a] border border-white/[0.05] rounded-xl py-3 px-4 text-white" value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
                                        <option value="expense">Expense</option>
                                        <option value="income">Income</option>
                                    </select>
                                )}
                                <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold">Confirm</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AuthGuard>
    );
}