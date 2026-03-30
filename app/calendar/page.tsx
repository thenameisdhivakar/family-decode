import { ChevronLeft, ChevronRight, Plus, Clock } from 'lucide-react';

const days = ['24', '25', '26', '27', '28', '29', '30'];
const agenda = [
    { time: '10:00 AM', title: 'Developer Sync', desc: 'Next.js 15 Migration', category: 'Work' },
    { time: '02:00 PM', title: 'Family Budget Review', desc: 'Monthly expense audit', category: 'Finance' },
    { time: '06:00 PM', title: 'Gym Session', desc: 'Leg day with Alex', category: 'Health' },
];

export default function CalendarPage() {
    return (
        <div className="space-y-8">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white">Calendar</h1>
                    <p className="text-gray-500 text-sm mt-1">March 2026</p>
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-2 glass-card rounded-lg hover:text-blue-500"><ChevronLeft className="w-5 h-5" /></button>
                    <button className="p-2 glass-card rounded-lg hover:text-blue-500"><ChevronRight className="w-5 h-5" /></button>
                    <button className="ml-4 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2">
                        <Plus className="w-4 h-4" /> Add Event
                    </button>
                </div>
            </header>

            {/* Day Picker */}
            <div className="flex justify-between gap-4">
                {days.map((day, i) => (
                    <div key={day} className={`flex-1 py-6 rounded-3xl flex flex-col items-center justify-center transition-all cursor-pointer ${day === '30' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'glass-card text-gray-500 hover:bg-white/5'}`}>
                        <span className="text-[10px] font-bold uppercase tracking-widest mb-2 opacity-60">
                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                        </span>
                        <span className="text-2xl font-bold">{day}</span>
                    </div>
                ))}
            </div>

            {/* Agenda */}
            <div className="space-y-4 pt-4">
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500">Upcoming Agenda</h3>
                {agenda.map((item) => (
                    <div key={item.title} className="glass-card p-6 rounded-3xl flex items-center gap-8 group">
                        <div className="min-w-[80px]">
                            <p className="text-sm font-bold text-white">{item.time}</p>
                            <p className="text-[10px] text-gray-500 font-bold uppercase mt-1">{item.category}</p>
                        </div>
                        <div className="h-8 w-[1px] bg-white/10" />
                        <div className="flex-1">
                            <h4 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">{item.title}</h4>
                            <p className="text-sm text-gray-500">{item.desc}</p>
                        </div>
                        <button className="p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Clock className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}