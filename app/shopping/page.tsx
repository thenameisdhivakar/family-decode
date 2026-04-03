"use client";

import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import {
    Plus, Trash2, CheckCircle2, Circle, X,
    ChevronDown, DollarSign, Wallet, Landmark,
    PauseCircle, SlidersHorizontal
} from "lucide-react";

// 1. Define the Item Interface
interface ShoppingItem {
    _id: string;
    name: string;
    category: string;
    price: number;
    quantity: number;
    unit: string;
    priority: string;
    status: 'shopping' | 'hold' | 'purchased';
}

const ITEM_DIRECTORY: Record<string, string[]> = {
    Fruits: ["Apple", "Banana", "Orange", "Pineapple", "Mango", "Grapes", "Watermelon", "Papaya", "Pomegranate", "Lemon"],
    Vegetables: ["Tomato", "Onion", "Potato", "Carrot", "Spinach", "Garlic", "Ginger", "Green Chilli", "Cabbage", "Cauliflower", "Ladies Finger", "Brinjal", "Drumstick"],
    Groceries: ["Rice", "Wheat Flour", "Cooking Oil", "Milk", "Eggs", "Sugar", "Salt", "Tea Powder", "Coffee", "Toor Dal", "Ghee", "Bread", "Butter", "Cheese", "Paneer"],
    Electronics: ["Battery AA", "LED Bulb", "Charging Cable", "Power Bank", "Earphones", "Smart Plug", "Mouse", "Keyboard", "Extension Box"],
    Snacks: ["Chips", "Biscuits", "Chocolate", "Popcorn", "Mixture", "Peanuts", "Cakes", "Ice Cream", "Cool Drinks", "Noodles"],
    Jewels: ["Gold Coin", "Gold Chain", "Silver Ring", "Silver Anklet", "Covering Chain", "Bangles", "Earrings", "Diamond Stud"],
    Homethings: ["Floor Mat", "Curtains", "Bedsheet", "Pillow", "Bucket", "Mug", "Broom", "Dustbin", "Door Mat", "Wall Clock"],
    "Wash things": ["Detergent Powder", "Liquid Soap", "Dishwash Bar", "Floor Cleaner", "Toilet Cleaner", "Shampoo", "Handwash", "Toothpaste", "Toothbrush"]
};

const CATEGORIES = ["All", ...Object.keys(ITEM_DIRECTORY)];

export default function ShoppingPage() {
    // 2. Type your State
    const [items, setItems] = useState<ShoppingItem[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<string>("shopping");
    const [activeCategory, setActiveCategory] = useState("All");

    const [newItem, setNewItem] = useState({
        name: "Apple",
        category: "Fruits",
        price: "",
        quantity: "1",
        unit: "kg",
        priority: "Medium"
    });

    const monthlyLimit = 20000;

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        const res = await fetch('/api/shopping');
        const data = await res.json();
        if (Array.isArray(data)) setItems(data);
    };

    // 3. Type Event Handlers
    const handleAddItem = async (e: FormEvent) => {
        e.preventDefault();
        const res = await fetch('/api/shopping', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...newItem, status: "shopping" })
        });
        if (res.ok) {
            fetchItems();
            setIsModalOpen(false);
            setNewItem({ name: "Apple", category: "Fruits", price: "", quantity: "1", unit: "kg", priority: "Medium" });
        }
    };

    const updateStatus = async (id: string, newStatus: string) => {
        const res = await fetch('/api/shopping', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, status: newStatus })
        });
        if (res.ok) fetchItems();
    };

    const deleteItem = async (id: string) => {
        const res = await fetch(`/api/shopping?id=${id}`, { method: 'DELETE' });
        if (res.ok) fetchItems();
    };

    // 4. Added explicit types to avoid 'any' in reduce
    const totalSpent = items
        .filter(i => i.status === "purchased")
        .reduce((acc, curr) => acc + (Number(curr.price) * Number(curr.quantity)), 0);

    const holdTotal = items
        .filter(i => i.status === "hold")
        .reduce((acc, curr) => acc + (Number(curr.price) * Number(curr.quantity)), 0);

    const currentBalance = monthlyLimit - totalSpent;

    const displayedItems = items.filter(item =>
        item.status === activeTab && (activeCategory === "All" || item.category === activeCategory)
    );

    return (
        <div className="min-h-screen bg-black text-white p-6 md:p-12 space-y-10 animate-in fade-in duration-700">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-bold">Shopping <span className="text-blue-500">Manifest</span></h1>
                    <p className="text-gray-500 mt-2">Track essentials with precision and style.</p>
                </div>
                <button onClick={() => setIsModalOpen(true)} className="px-8 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-900/20 transition-all active:scale-95 flex items-center gap-2">
                    <Plus size={18} /> New Entry
                </button>
            </header>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard label="Budget" value={`₹${monthlyLimit.toLocaleString()}`} icon={<Wallet className="text-purple-500" />} />
                <StatCard label="Spent" value={`₹${totalSpent.toLocaleString()}`} icon={<Landmark className="text-blue-500" />} />
                <StatCard label="On Hold" value={`₹${holdTotal.toLocaleString()}`} icon={<PauseCircle className="text-amber-500" />} />
                <StatCard label="Balance" value={`₹${currentBalance.toLocaleString()}`} icon={<DollarSign className="text-emerald-500" />} isLive />
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex p-1 bg-white/[0.03] border border-white/5 rounded-2xl w-fit">
                    {["shopping", "hold", "purchased"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-2 rounded-xl text-sm capitalize transition-all ${activeTab === tab ? "bg-blue-600 text-white" : "text-gray-500 hover:text-gray-300"}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="relative">
                    <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center gap-3 px-5 py-2.5 rounded-xl border border-white/10 bg-white/[0.02] text-sm text-gray-400">
                        <SlidersHorizontal size={14} /> {activeCategory} <ChevronDown size={14} />
                    </button>
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-[#0A0A0A] border border-white/10 rounded-2xl py-2 z-50 shadow-2xl">
                            {CATEGORIES.map(cat => (
                                <button key={cat} onClick={() => { setActiveCategory(cat); setIsDropdownOpen(false); }} className="w-full text-left px-5 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5">{cat}</button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="rounded-[2rem] border border-white/5 bg-white/[0.01] overflow-hidden backdrop-blur-sm">
                {displayedItems.length > 0 ? displayedItems.map((item) => (
                    <div key={item._id} className="flex items-center justify-between p-5 hover:bg-white/[0.02] border-b border-white/[0.03] last:border-0 group">
                        <div className="flex items-center gap-5">
                            <button onClick={() => updateStatus(item._id, item.status === "shopping" ? "purchased" : "shopping")}>
                                {item.status === "purchased" ? <CheckCircle2 className="text-emerald-500" /> : <Circle className="text-gray-700" />}
                            </button>
                            <div>
                                <div className="flex items-center gap-3">
                                    <h4 className="text-white font-medium">{item.name}</h4>
                                    <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-gray-400">{item.priority}</span>
                                </div>
                                <p className="text-xs text-blue-400/60 mt-1">{item.category}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-8">
                            <div className="text-right">
                                <p className="text-white">₹{item.price * item.quantity}</p>
                                <p className="text-xs text-gray-500">{item.quantity} {item.unit}</p>
                            </div>
                            <button onClick={() => deleteItem(item._id)} className="text-gray-600 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={18} /></button>
                        </div>
                    </div>
                )) : <div className="p-20 text-center text-gray-600 text-xs uppercase tracking-widest">No entries found</div>}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
                    <div className="bg-[#0A0A0A] border border-white/10 w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-bold uppercase tracking-widest">Add Item</h2>
                            <button onClick={() => setIsModalOpen(false)}><X className="text-gray-500" /></button>
                        </div>
                        <form onSubmit={handleAddItem} className="space-y-4">
                            <select
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-blue-500 transition-colors"
                                value={newItem.category}
                                onChange={(e) => setNewItem({ ...newItem, category: e.target.value, name: ITEM_DIRECTORY[e.target.value][0] })}
                            >
                                {Object.keys(ITEM_DIRECTORY).map(c => <option key={c} value={c} className="bg-black">{c}</option>)}
                            </select>
                            <select
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-blue-500 transition-colors"
                                value={newItem.name}
                                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                            >
                                {ITEM_DIRECTORY[newItem.category].map(n => <option key={n} value={n} className="bg-black">{n}</option>)}
                            </select>
                            <div className="flex gap-4">
                                <input
                                    type="number"
                                    placeholder="Price"
                                    className="flex-1 bg-white/5 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-blue-500 transition-colors"
                                    value={newItem.price}
                                    onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                                    required
                                />
                                <input
                                    type="number"
                                    placeholder="Qty"
                                    className="w-24 bg-white/5 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-blue-500 transition-colors"
                                    value={newItem.quantity}
                                    onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                                    required
                                />
                            </div>
                            <button className="w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold text-xs tracking-widest mt-4 transition-all active:scale-95 shadow-lg shadow-blue-900/20">CONFIRM</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

// 5. Type the Props for StatCard
interface StatCardProps {
    label: string;
    value: string;
    icon: React.ReactNode;
    isLive?: boolean;
}

function StatCard({ label, value, icon, isLive }: StatCardProps) {
    return (
        <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 flex flex-col items-start gap-4">
            <div className="p-3 rounded-2xl bg-black/50 relative">
                {icon}
                {isLive && <span className="absolute top-0 right-0 w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />}
            </div>
            <div>
                <p className="text-xs text-gray-500 uppercase tracking-tighter">{label}</p>
                <h3 className="text-2xl font-bold">{value}</h3>
            </div>
        </div>
    );
}