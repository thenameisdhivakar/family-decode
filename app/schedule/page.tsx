'use client';

import { useState, useEffect } from 'react';
import { Plus, Clock, MapPin, Bell, ChevronRight, X, Calendar as CalendarIcon, CheckCircle2 } from 'lucide-react';

export default function SchedulePage() {
    const [events, setEvents] = useState([
        { id: 1, title: 'Family Dinner', time: '07:00 PM', location: 'Grand Hall', category: 'Social', color: 'border-blue-500' },
        { id: 2, title: 'System Backup', time: '11:00 PM', location: 'Cloud Server', category: 'Technical', color: 'border-purple-500' },
        { id: 3, title: 'Health Checkup', time: '09:00 AM', location: 'City Clinic', category: 'Medical', color: 'border-emerald-500' },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newEvent, setNewEvent] = useState({ title: '', time: '', location: '', category: 'Social' });
    const [reminders, setReminders] = useState([
        { id: 1, text: 'Renew Family Domain', completed: false },
        { id: 2, text: 'Update Security Protocols', completed: true },
    ]);

    // Handle adding new event
    const handleAddEvent = (e: React.FormEvent) => {
        e.preventDefault();
        const eventToAdd = {
            ...newEvent,
            id: Date.now(),
            color: newEvent.category === 'Technical' ? 'border-purple-500' : 'border-blue-500'
        };
        setEvents([...events, eventToAdd].sort((a, b) => a.time.localeCompare(b.time)));
        setIsModalOpen(false);
        setNewEvent({ title: '', time: '', location: '', category: 'Social' });
    };

    const toggleReminder = (id: number) => {
        setReminders(reminders.map(r => r.id === id ? { ...r, completed: !r.completed } : r));
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-700 relative">
            <header className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white">Family Schedule</h1>
                    <p className="text-gray-500 text-sm mt-1">Timeline of upcoming activities and reminders.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition-all flex items-center gap-2 shadow-lg shadow-blue-900/20 active:scale-95"
                >
                    <Plus className="w-4 h-4" /> New Event
                </button>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Timeline */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center gap-2 mb-6">
                        <CalendarIcon className="w-4 h-4 text-blue-500" />
                        <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500">Today, March 31</h2>
                    </div>

                    <div className="space-y-4">
                        {events.map((event) => (
                            <div key={event.id} className={`glass-card p-5 rounded-2xl border-l-4 ${event.color} flex items-center justify-between group cursor-pointer hover:bg-white/[0.04] transition-all`}>
                                <div className="flex items-center gap-6">
                                    <div className="text-center min-w-[65px]">
                                        <p className="text-lg font-black text-white">{event.time.split(' ')[0]}</p>
                                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">{event.time.split(' ')[1]}</p>
                                    </div>
                                    <div className="h-10 w-[1px] bg-white/10" />
                                    <div>
                                        <h3 className="font-bold text-white group-hover:text-blue-400 transition-colors">{event.title}</h3>
                                        <div className="flex items-center gap-4 mt-1">
                                            <span className="flex items-center gap-1.5 text-[11px] text-gray-500">
                                                <MapPin className="w-3 h-3 text-blue-500/50" /> {event.location}
                                            </span>
                                            <span className="flex items-center gap-1.5 text-[11px] text-gray-500">
                                                <Clock className="w-3 h-3 text-purple-500/50" /> {event.category}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <ChevronRight className="w-5 h-5 text-gray-700 group-hover:text-white transition-all transform group-hover:translate-x-1" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sidebar Reminders */}
                <div className="space-y-6">
                    <div className="glass-card p-6 rounded-3xl border border-white/5 bg-white/[0.01]">
                        <h3 className="font-bold text-white mb-6 flex items-center gap-2 uppercase tracking-widest text-xs">
                            <Bell className="w-4 h-4 text-blue-500" /> Reminders
                        </h3>
                        <div className="space-y-4">
                            {reminders.map(reminder => (
                                <div
                                    key={reminder.id}
                                    onClick={() => toggleReminder(reminder.id)}
                                    className="flex items-center gap-3 cursor-pointer group"
                                >
                                    <div className={`p-0.5 rounded-md border transition-colors ${reminder.completed ? 'bg-blue-600 border-blue-600' : 'border-white/20 group-hover:border-blue-500'}`}>
                                        <CheckCircle2 className={`w-4 h-4 ${reminder.completed ? 'text-white' : 'text-transparent'}`} />
                                    </div>
                                    <p className={`text-sm transition-all ${reminder.completed ? 'text-gray-600 line-through' : 'text-gray-300'}`}>
                                        {reminder.text}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* ADD EVENT MODAL */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="glass-card w-full max-w-md p-8 rounded-[2.5rem] border border-white/10 shadow-2xl animate-in zoom-in-95 duration-300">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-white tracking-tight">New Schedule Event</h2>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        <form onSubmit={handleAddEvent} className="space-y-4">
                            <div>
                                <label className="text-[10px] font-bold text-gray-500 uppercase mb-2 block">Event Title</label>
                                <input required type="text" placeholder="e.g. Weekly Meeting" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white outline-none focus:border-blue-500"
                                    onChange={e => setNewEvent({ ...newEvent, title: e.target.value })} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[10px] font-bold text-gray-500 uppercase mb-2 block">Time</label>
                                    <input required type="text" placeholder="09:00 AM" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white outline-none focus:border-blue-500"
                                        onChange={e => setNewEvent({ ...newEvent, time: e.target.value })} />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-gray-500 uppercase mb-2 block">Category</label>
                                    <select className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white outline-none focus:border-blue-500"
                                        onChange={e => setNewEvent({ ...newEvent, category: e.target.value })}>
                                        <option value="Social">Social</option>
                                        <option value="Technical">Technical</option>
                                        <option value="Medical">Medical</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-gray-500 uppercase mb-2 block">Location</label>
                                <input required type="text" placeholder="Virtual / Home" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white outline-none focus:border-blue-500"
                                    onChange={e => setNewEvent({ ...newEvent, location: e.target.value })} />
                            </div>
                            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl mt-4 transition-all shadow-lg shadow-blue-900/40">
                                Create Event
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}