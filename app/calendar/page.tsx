'use client';

import { useState } from 'react';
// FIX: Changed ChevronDoubleLeft/Right to ChevronsLeft/Right
import {
    ChevronLeft, ChevronRight, Plus, Clock, MoreVertical,
    Calendar as CalendarIcon, X, ChevronsLeft, ChevronsRight
} from 'lucide-react';
import {
    format, addMonths, subMonths, addYears, subYears, startOfMonth, endOfMonth,
    startOfWeek, endOfWeek, isSameMonth, isSameDay, eachDayOfInterval
} from 'date-fns';

// 1. Define the Event Interface for Type Safety
interface CalendarEvent {
    id: number;
    date: Date;
    time: string;
    title: string;
    category: string;
    color: string;
}

export default function CombinedCalendar() {
    const [viewDate, setViewDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 2. Apply the Interface to the state
    const [events, setEvents] = useState<CalendarEvent[]>([
        { id: 1, date: new Date(), time: '10:00 AM', title: 'Developer Sync', category: 'Work', color: 'bg-blue-500' },
    ]);

    const monthStart = startOfMonth(viewDate);
    const monthEnd = endOfMonth(monthStart);
    const calendarDays = eachDayOfInterval({
        start: startOfWeek(monthStart),
        end: endOfWeek(monthEnd)
    });

    const dailyEvents = events.filter(event => isSameDay(event.date, selectedDate));

    const nextMonth = () => setViewDate(addMonths(viewDate, 1));
    const prevMonth = () => setViewDate(subMonths(viewDate, 1));
    const nextYear = () => setViewDate(addYears(viewDate, 1));
    const prevYear = () => setViewDate(subYears(viewDate, 1));

    return (
        <div className="max-w-6xl mx-auto space-y-6 relative pb-10">
            <header className="flex flex-col md:flex-row justify-between items-center bg-white/5 p-6 rounded-[2.5rem] border border-white/10 backdrop-blur-xl gap-4">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-indigo-600/20 rounded-2xl">
                        <CalendarIcon className="w-6 h-6 text-indigo-400" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-white tracking-tight leading-none">
                            {format(viewDate, 'MMMM yyyy')}
                        </h1>
                        <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">Management Hub</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center bg-black/20 p-1 rounded-2xl border border-white/5">
                        {/* FIX: Used ChevronsLeft for Year Navigation */}
                        <button onClick={prevYear} className="p-2 hover:bg-white/5 rounded-xl text-gray-500 hover:text-white transition-all">
                            <ChevronsLeft className="w-4 h-4" />
                        </button>
                        <button onClick={prevMonth} className="p-2 hover:bg-white/10 rounded-xl text-gray-400 hover:text-indigo-400 transition-all">
                            <ChevronLeft size={20} />
                        </button>

                        <button onClick={() => setViewDate(new Date())} className="px-3 text-[10px] font-black uppercase text-indigo-400 hover:text-white transition-colors tracking-tighter">Today</button>

                        <button onClick={nextMonth} className="p-2 hover:bg-white/10 rounded-xl text-gray-400 hover:text-indigo-400 transition-all">
                            <ChevronRight size={20} />
                        </button>
                        {/* FIX: Used ChevronsRight for Year Navigation */}
                        <button onClick={nextYear} className="p-2 hover:bg-white/5 rounded-xl text-gray-500 hover:text-white transition-all">
                            <ChevronsRight className="w-4 h-4" />
                        </button>
                    </div>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-xl shadow-indigo-600/20 transition-all active:scale-95"
                    >
                        <Plus className="w-5 h-5" /> Add Event
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 bg-white/[0.02] rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl">
                    <div className="grid grid-cols-7 border-b border-white/5 bg-white/[0.02]">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                            <div key={d} className="py-4 text-center text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">{d}</div>
                        ))}
                    </div>
                    <div className="grid grid-cols-7">
                        {calendarDays.map((day, i) => {
                            const isToday = isSameDay(day, new Date());
                            const isSelected = isSameDay(day, selectedDate);
                            const isCurrentMonth = isSameMonth(day, monthStart);
                            const hasEvents = events.some(e => isSameDay(e.date, day));

                            return (
                                <button
                                    key={i}
                                    onClick={() => setSelectedDate(day)}
                                    className={`h-24 md:h-32 p-4 border-r border-b border-white/5 relative transition-all group overflow-hidden
                                        ${!isCurrentMonth ? 'opacity-10 pointer-events-none' : 'hover:bg-white/[0.04]'}
                                        ${isSelected ? 'bg-indigo-600/[0.07]' : ''}
                                    `}
                                >
                                    <div className="flex justify-between items-start relative z-10">
                                        <span className={`text-sm font-black ${isSelected ? 'text-indigo-400' : isToday ? 'text-white' : 'text-gray-500'}`}>
                                            {format(day, 'd')}
                                        </span>
                                        {isToday && <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" />}
                                    </div>

                                    {hasEvents && isCurrentMonth && (
                                        <div className="mt-auto flex flex-wrap gap-1 relative z-10">
                                            <div className="w-full h-1 bg-indigo-500/40 rounded-full overflow-hidden">
                                                <div className="w-1/2 h-full bg-indigo-400" />
                                            </div>
                                        </div>
                                    )}

                                    {isSelected && (
                                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 to-transparent pointer-events-none" />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="lg:col-span-4 space-y-6">
                    <div className="flex items-center justify-between px-2">
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 italic">
                            {format(selectedDate, 'eeee, MMMM do')}
                        </h3>
                    </div>

                    <div className="space-y-4">
                        {dailyEvents.length > 0 ? (
                            dailyEvents.map((item) => (
                                <div key={item.id} className="group bg-white/[0.03] p-5 rounded-[2rem] border border-white/5 flex items-center gap-5 transition-all hover:border-white/20 hover:scale-[1.02]">
                                    <div className="text-right min-w-[60px]">
                                        <p className="text-xs font-black text-white">{item.time}</p>
                                        <p className="text-[9px] text-gray-500 font-bold uppercase mt-1">Today</p>
                                    </div>
                                    <div className={`w-1.5 h-12 rounded-full ${item.color} shadow-lg shadow-indigo-500/20`} />
                                    <div className="flex-1">
                                        <h4 className="text-md font-bold text-white group-hover:text-indigo-400 transition-colors tracking-tight">{item.title}</h4>
                                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{item.category}</p>
                                    </div>
                                    <button className="text-gray-700 hover:text-white transition-colors"><MoreVertical size={18} /></button>
                                </div>
                            ))
                        ) : (
                            <div className="py-20 bg-white/[0.01] border-dashed border-white/10 rounded-[2.5rem] flex flex-col items-center justify-center space-y-3 opacity-40">
                                <Clock className="w-10 h-10 text-gray-600" />
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 text-center px-10">Zero Agenda Items Scheduled</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}