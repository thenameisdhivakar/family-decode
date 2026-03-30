import { Plus, Clock, MapPin, Bell, ChevronRight, MoreHorizontal } from 'lucide-react';

const events = [
    { id: 1, title: 'Family Dinner', time: '07:00 PM', location: 'Grand Hall', category: 'Social', members: 4, color: 'border-blue-500' },
    { id: 2, title: 'System Backup', time: '11:00 PM', location: 'Cloud Server', category: 'Technical', members: 1, color: 'border-purple-500' },
    { id: 3, title: 'Health Checkup', time: '09:00 AM', location: 'City Clinic', category: 'Medical', members: 2, color: 'border-emerald-500' },
];

export default function SchedulePage() {
    return (
        <div className="space-y-8">
            <header className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Family Schedule</h1>
                    <p className="text-gray-500 text-sm mt-1">Timeline of upcoming activities and reminders.</p>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition-all flex items-center gap-2">
                    <Plus className="w-4 h-4" /> New Event
                </button>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Timeline */}
                <div className="lg:col-span-2 space-y-4">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6">Today, March 30</h2>

                    {events.map((event) => (
                        <div key={event.id} className={`glass-card p-5 rounded-2xl border-l-4 ${event.color} flex items-center justify-between group cursor-pointer`}>
                            <div className="flex items-center gap-6">
                                <div className="text-center min-w-[60px]">
                                    <p className="text-lg font-bold text-white">{event.time.split(' ')[0]}</p>
                                    <p className="text-[10px] text-gray-500 font-bold uppercase">{event.time.split(' ')[1]}</p>
                                </div>
                                <div className="h-10 w-[1px] bg-white/10" />
                                <div>
                                    <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors">{event.title}</h3>
                                    <div className="flex items-center gap-4 mt-1">
                                        <span className="flex items-center gap-1.5 text-xs text-gray-500">
                                            <MapPin className="w-3 h-3" /> {event.location}
                                        </span>
                                        <span className="flex items-center gap-1.5 text-xs text-gray-500">
                                            <Clock className="w-3 h-3" /> {event.category}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-700 group-hover:text-white transition-all transform group-hover:translate-x-1" />
                        </div>
                    ))}
                </div>

                {/* Sidebar Widgets */}
                <div className="space-y-6">
                    <div className="glass-card p-6 rounded-3xl">
                        <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                            <Bell className="w-4 h-4 text-blue-500" /> Reminders
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <input type="checkbox" className="mt-1 rounded border-white/10 bg-white/5 accent-blue-600" />
                                <p className="text-sm text-gray-300">Renew Family Domain</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <input type="checkbox" className="mt-1 rounded border-white/10 bg-white/5 accent-blue-600" />
                                <p className="text-sm text-gray-300">Update Security Protocols</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}