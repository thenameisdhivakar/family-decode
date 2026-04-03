"use client";

import { useState, useEffect } from "react"; // Added useEffect
import {
    Plus, ShoppingBag, Trash2,
    CheckCircle2, Circle, X,
    ChevronDown, Zap, DollarSign,
    Package, Calendar, Wallet, Landmark,
    CheckSquare, List, PauseCircle, SlidersHorizontal
} from "lucide-react";

const ITEM_DIRECTORY = {
    Fruits: ["Apple", "Banana", "Orange", "Pineapple", "Mango", "Grapes", "Watermelon", "Papaya", "Pomegranate", "Lemon"],
    Vegetables: ["Tomato", "Onion", "Potato", "Carrot", "Spinach", "Garlic", "Ginger", "Green Chilli", "Cabbage", "Cauliflower", "Ladies Finger", "Brinjal", "Drumstick"],
    Groceries: ["Rice", "Wheat Flour", "Cooking Oil", "Milk", "Eggs", "Sugar", "Salt", "Tea Powder", "Coffee", "Toor Dal", "Ghee", "Bread", "Butter", "Cheese", "Paneer"],
    Electronics: ["Battery AA", "LED Bulb", "Charging Cable", "Power Bank", "Earphones", "Smart Plug", "Mouse", "Keyboard", "Extension Box"],
    Snacks: ["Chips", "Biscuits", "Chocolate", "Popcorn", "Mixture", "Peanuts", "Cakes", "Ice Cream", "Cool Drinks", "Noodles"],
    Jewels: ["Gold Coin", "Gold Chain", "Silver Ring", "Silver Anklet", "Covering Chain", "Bangles", "Earrings", "Diamond Stud"],
    Homethings: ["Floor Mat", "Curtains", "Bedsheet", "Pillow", "Bucket", "Mug", "Broom", "Dustbin", "Door Mat", "Wall Clock"],
    "Wash things": ["Detergent Powder", "Liquid Soap", "Dishwash Bar", "Floor Cleaner", "Toilet Cleaner", "Shampoo", "Handwash", "Toothpaste", "Toothbrush"]
};

const CATEGORIES = ["All", "Fruits", "Vegetables", "Groceries", "Snacks", "Electronics", "Jewels", "Home things"];
const UNITS = ["kg", "gm", "unit", "pkt", "ltr", "box"];
const PRIORITIES = ["Low", "Medium", "High"];

export default function ShoppingPage() {
    const [items, setItems] = useState([]); // Start empty for DB fetch
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("shopping");
    const [activeCategory, setActiveCategory] = useState("All");
    const monthlyLimit = 20000;

    const [newItem, setNewItem] = useState({
        name: "Apple",
        category: "Fruits",
        price: "",
        quantity: "1",
        unit: "kg",
        priority: "Medium"
    });

    // 1. Fetching data on load
    useEffect(() => {
        const loadItems = async () => {
            try {
                const res = await fetch('/api/shopping');
                const data = await res.json();
                if (Array.isArray(data)) setItems(data);
            } catch (err) {
                console.error("Failed to load manifest:", err);
            }
        };
        loadItems();
    }, []);

    // 2. Add Item to Database
    const handleAddItem = async (e) => {
        e.preventDefault();
        if (!newItem.name || !newItem.price) return;

        const entry = {
            ...newItem,
            price: Number(newItem.price),
            quantity: Number(newItem.quantity),
            status: "shopping"
        };

        const res = await fetch('/api/shopping', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(entry)
        });

        if (res.ok) {
            const savedItem = await res.json();
            setItems([savedItem, ...items]);
            setIsModalOpen(false);
            setNewItem({ name: "Apple", category: "Fruits", price: "", quantity: "1", unit: "kg", priority: "Medium" });
        }
    };

    // 3. Updating Status (Database Sync)
    const updateStatus = async (id, newStatus) => {
        const res = await fetch('/api/shopping', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, status: newStatus })
        });
        if (res.ok) {
            // Note: MongoDB uses _id
            setItems(items.map(item => item._id === id ? { ...item, status: newStatus } : item));
        }
    };

    // 4. Deleting (Database Sync)
    const deleteItem = async (id) => {
        const res = await fetch(`/api/shopping?id=${id}`, { method: 'DELETE' });
        if (res.ok) setItems(items.filter(item => item._id !== id));
    };

    const totalSpent = items.filter(i => i.status === "purchased").reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
    const holdTotal = items.filter(i => i.status === "hold").reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
    const currentBalance = monthlyLimit - totalSpent;

    const displayedItems = items.filter(item =>
        item.status === activeTab &&
        (activeCategory === "All" || item.category === activeCategory)
    );

    return (
        <div className="space-y-10 animate-in fade-in duration-700 pb-20">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-3xl text-white font-bold">Shopping <span className="text-blue-500">Manifest</span></h1>
                    <p className="text-[15px] text-gray-400 mt-1">Quality is remembered long after the price is forgotten.</p>
                </div>
                <button onClick={() => setIsModalOpen(true)} className="px-8 py-3 rounded-2xl bg-blue-600 text-white text-[15px] shadow-xl shadow-blue-900/40 hover:bg-blue-500 transition-all active:scale-95">+ New Entry</button>
            </header>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard label="Allotment" value={`₹${monthlyLimit.toLocaleString()}`} icon={<Wallet className="w-6 h-6 text-purple-500" />} />
                <StatCard label="Total Spent" value={`₹${totalSpent.toLocaleString()}`} icon={<Landmark className="w-6 h-6 text-blue-500" />} />
                <StatCard label="Holdings" value={`₹${holdTotal.toLocaleString()}`} icon={<PauseCircle className="w-6 h-6 text-amber-500" />} />
                <StatCard label="Balance" value={`₹${currentBalance.toLocaleString()}`} icon={<DollarSign className="w-6 h-6 text-emerald-500" />} isLive />
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex flex-wrap gap-2 p-1 bg-white/[0.02] border border-white/5 rounded-2xl w-fit">
                    {["shopping", "hold", "purchased"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[15px] capitalize transition-all ${activeTab === tab ? "bg-blue-600 text-white" : "text-gray-500 hover:text-gray-300"}`}
                        >
                            {tab === "shopping" ? <List size={14} /> : tab === "hold" ? <PauseCircle size={14} /> : <CheckSquare size={14} />}
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="relative">
                    <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className={`flex items-center gap-3 px-5 py-2.5 rounded-xl border text-[15px] transition-all ${isDropdownOpen ? 'bg-white/10 border-white/20 text-white' : 'bg-transparent border-white/5 text-gray-500 hover:border-white/10'}`}>
                        <SlidersHorizontal size={14} />
                        Filter: <span className="text-blue-500">{activeCategory}</span>
                        <ChevronDown size={14} className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-[#0A0A0A] border border-white/10 rounded-2xl py-2 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-200">
                            {CATEGORIES.map(cat => (
                                <button key={cat} onClick={() => { setActiveCategory(cat); setIsDropdownOpen(false); }} className={`w-full text-left px-5 py-3 text-[13px] transition-colors ${activeCategory === cat ? 'text-blue-500 bg-white/[0.03]' : 'text-gray-400 hover:text-white hover:bg-white/[0.02]'}`}>
                                    {cat}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="rounded-[2.5rem] border border-white/5 bg-white/[0.01] overflow-hidden">
                <div className="divide-y divide-white/[0.03]">
                    {displayedItems.length > 0 ? displayedItems.map((item) => (
                        <div key={item._id} className="flex items-center justify-between p-4 hover:bg-white/[0.02] transition-all group">
                            <div className="flex items-center gap-5">
                                {activeTab === "shopping" ? (
                                    <button onClick={() => updateStatus(item._id, "purchased")} className="transition-transform active:scale-90">
                                        <Circle className="w-6 h-6 text-gray-700" />
                                    </button>
                                ) : activeTab === "purchased" ? (
                                    <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                                ) : (
                                    <button onClick={() => updateStatus(item._id, "shopping")} className="transition-transform active:scale-90">
                                        <PauseCircle className="w-6 h-6 text-amber-500" />
                                    </button>
                                )}
                                <div>
                                    <div className="flex items-center gap-3">
                                        <h4 className="text-[16px] text-white">{item.name}</h4>
                                        <span className={`text-[8px] px-2 py-0.5 rounded-md uppercase ${item.priority === 'High' ? 'bg-rose-500/10 text-rose-500' : item.priority === 'Medium' ? 'bg-amber-500/10 text-amber-500' : 'bg-blue-500/10 text-blue-500'}`}>{item.priority}</span>
                                    </div>
                                    <div className="flex items-center gap-4 mt-1">
                                        <span className="text-[12px] text-blue-400 ">{item.category}</span>
                                        <span className="text-[9px] text-gray-600 flex items-center gap-1.5"><Calendar size={10} /> {item.date}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="text-right">
                                    <p className="text-[16px] text-white ">₹{item.price * item.quantity}</p>
                                    <p className="text-[14px] text-gray-600">{item.quantity}{item.unit}</p>
                                </div>
                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                                    {activeTab === "shopping" && (
                                        <button onClick={() => updateStatus(item._id, "hold")} title="Move to Hold" className="p-2 text-amber-500 hover:bg-amber-500/10 rounded-xl">
                                            <PauseCircle size={16} />
                                        </button>
                                    )}
                                    <button onClick={() => deleteItem(item._id)} className="p-2 text-rose-500 hover:bg-rose-500/10 rounded-xl"><Trash2 size={16} /></button>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div className="p-20 text-center text-gray-700 text-[10px] uppercase tracking-[0.2em]">
                            No {activeCategory !== "All" ? activeCategory : ""} assets in {activeTab}
                        </div>
                    )}
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl">
                    <div className="bg-[#050505] border border-white/10 w-full max-w-lg rounded-[2.5rem] p-10 shadow-2xl relative">
                        <div className="flex justify-between items-center mb-8 text-white">
                            <h2 className="text-xl uppercase tracking-tight">Add New Entry</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-white transition"><X size={20} /></button>
                        </div>
                        <form onSubmit={handleAddItem} className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] text-gray-500 uppercase tracking-widest ml-1">Priority</label>
                                    <select className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-sm text-white outline-none" value={newItem.priority} onChange={(e) => setNewItem({ ...newItem, priority: e.target.value })}>{PRIORITIES.map(p => <option key={p} value={p} className="bg-black">{p}</option>)}</select>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] text-gray-500 uppercase tracking-widest ml-1">Category</label>
                                    <select className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-sm text-white outline-none" value={newItem.category} onChange={(e) => setNewItem({ ...newItem, category: e.target.value, name: ITEM_DIRECTORY[e.target.value][0] })}>{Object.keys(ITEM_DIRECTORY).map(cat => <option key={cat} value={cat} className="bg-black">{cat}</option>)}</select>
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] text-gray-500 uppercase tracking-widest ml-1">Item Name</label>
                                <select className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-sm text-white outline-none" value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}>{ITEM_DIRECTORY[newItem.category]?.map(item => <option key={item} value={item} className="bg-black">{item}</option>)}</select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] text-gray-500 uppercase tracking-widest ml-1">Price (₹)</label>
                                    <input type="number" required placeholder="0.00" className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-sm text-white outline-none" value={newItem.price} onChange={(e) => setNewItem({ ...newItem, price: e.target.value })} />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] text-gray-500 uppercase tracking-widest ml-1">Quantity</label>
                                    <div className="flex gap-2">
                                        <input type="number" required className="w-20 bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-sm text-white outline-none" value={newItem.quantity} onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })} />
                                        <select className="flex-1 bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-xs text-white outline-none" value={newItem.unit} onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}>{UNITS.map(u => <option key={u} value={u} className="bg-black">{u}</option>)}</select>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="w-full py-5 bg-blue-600 text-white rounded-2xl text-[11px] uppercase tracking-widest hover:bg-blue-500 transition-all active:scale-95 shadow-lg shadow-blue-600/20">Confirm Entry</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

function StatCard({ label, value, icon, isLive }) {
    return (
        <div className="p-8 rounded-[2.5rem] bg-white/[0.01] border border-white/5 backdrop-blur-3xl group hover:bg-white/[0.02] transition-all flex flex-col items-start justify-center text-left">
            <div className="mb-4 relative">
                <div className="p-3 rounded-2xl bg-black/40 group-hover:scale-110 transition-transform">{icon}</div>
                {isLive && <div className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />}
            </div>
            <p className="text-[14px] text-gray-600 mb-1">{label}</p>
            <h3 className="text-3xl text-white font-bold">{value}</h3>
        </div>
    );
}