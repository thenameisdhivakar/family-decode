"use client";

import { useMemo, useState } from "react";
import {
    CalendarDays,
    Plus,
    Clock3,
    MapPin,
    X,
    ChevronLeft,
    ChevronRight,
    Filter,
    Trash2,
} from "lucide-react";

const defaultEvents = [
    {
        title: "UI Design Meeting",
        time: "09:00",
        location: "Google Meet",
        priority: "High",
        date: "2026-05-08",
    },
    {
        title: "Gym Workout",
        time: "17:00",
        location: "Fitness Club",
        priority: "Medium",
        date: "2026-05-15",
    },
    {
        title: "Project Review",
        time: "20:30",
        location: "Office",
        priority: "Low",
        date: "2026-05-22",
    },
];

const priorityStyles = {
    High: "bg-red-500/20 text-red-300 border border-red-500/30",
    Medium:
        "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30",
    Low: "bg-green-500/20 text-green-300 border border-green-500/30",
};

export default function CalendarPage() {
    const [events, setEvents] = useState(defaultEvents);

    const [openModal, setOpenModal] = useState(false);

    const [showFilters, setShowFilters] = useState(false);

    const [selectedEventIndex, setSelectedEventIndex] =
        useState<number | null>(null);

    const [currentDate, setCurrentDate] = useState(new Date());

    const [priorityFilter, setPriorityFilter] = useState("All");

    const [dateFilter, setDateFilter] = useState("");

    const [formData, setFormData] = useState({
        title: "",
        time: "",
        location: "",
        date: "",
        priority: "",
    });

    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();

    const monthName = currentDate.toLocaleString("default", {
        month: "long",
    });

    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const calendarDays = useMemo(() => {
        const days = [];

        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(null);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            days.push(day);
        }

        return days;
    }, [firstDayOfMonth, daysInMonth]);

    const filteredEvents = events.filter((event) => {
        const matchesPriority =
            priorityFilter === "All" ||
            event.priority === priorityFilter;

        const matchesDate =
            !dateFilter || event.date === dateFilter;

        return matchesPriority && matchesDate;
    });

    const handleAddEvent = () => {
        if (
            !formData.title ||
            !formData.time ||
            !formData.location ||
            !formData.date ||
            !formData.priority
        ) {
            return;
        }

        setEvents([...events, formData]);

        setFormData({
            title: "",
            time: "",
            location: "",
            date: "",
            priority: "",
        });

        setOpenModal(false);
    };

    const handleDeleteEvent = (indexToDelete: number) => {
        setEvents(
            events.filter(
                (_, index) => index !== indexToDelete
            )
        );

        setSelectedEventIndex(null);
    };

    const previousMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    const today = new Date();

    const isToday = (day: number) => {
        return (
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
        );
    };

    return (
        <div className="min-h-screen bg-black text-white overflow-hidden relative">
            {/* Glow */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500/20 blur-[120px]" />
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500/20 blur-[120px]" />

            <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
                {/* Header */}
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between mb-8 lg:mb-10">
                    <div>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                            Calendar
                        </h1>

                        <p className="text-gray-400 mt-2 text-sm sm:text-base">
                            Organize your events, meetings, and plans
                        </p>
                    </div>

                    <button
                        onClick={() => setOpenModal(true)}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/10 border border-white/10 backdrop-blur-2xl px-5 py-3 rounded-2xl hover:bg-white/20 transition"
                    >
                        <Plus size={18} />
                        Add Event
                    </button>
                </div>

                {/* Layout */}
                <div className="grid grid-cols-1 2xl:grid-cols-3 gap-6">
                    {/* Calendar */}
                    <div className="2xl:col-span-2 bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-4 sm:p-6 overflow-hidden">
                        {/* Top */}
                        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between mb-8">
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-semibold">
                                    {monthName} {year}
                                </h2>

                                <p className="text-gray-400 mt-2 text-sm">
                                    Monthly overview
                                </p>
                            </div>

                            <div className="flex items-center gap-2 sm:gap-3">
                                <button
                                    onClick={previousMonth}
                                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white/10 border border-white/10 hover:bg-white/20 flex items-center justify-center transition"
                                >
                                    <ChevronLeft size={18} />
                                </button>

                                <button
                                    onClick={() =>
                                        setCurrentDate(new Date())
                                    }
                                    className="px-4 py-2 rounded-2xl bg-white/10 border border-white/10 hover:bg-white/20 transition text-sm sm:text-base"
                                >
                                    Today
                                </button>

                                <button
                                    onClick={nextMonth}
                                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white/10 border border-white/10 hover:bg-white/20 flex items-center justify-center transition"
                                >
                                    <ChevronRight size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Days */}
                        <div className="grid grid-cols-7 gap-2 sm:gap-4 mb-3 sm:mb-4">
                            {[
                                "Sun",
                                "Mon",
                                "Tue",
                                "Wed",
                                "Thu",
                                "Fri",
                                "Sat",
                            ].map((day, index) => (
                                <div
                                    key={index}
                                    className="text-center text-gray-500 text-[10px] sm:text-sm font-medium"
                                >
                                    {day}
                                </div>
                            ))}
                        </div>

                        {/* Dates */}
                        <div className="grid grid-cols-7 gap-2 sm:gap-4">
                            {calendarDays.map((day, index) => {
                                if (!day) {
                                    return (
                                        <div
                                            key={index}
                                            className="h-20 sm:h-28 lg:h-32"
                                        />
                                    );
                                }

                                const currentDateString = `${year}-${String(
                                    month + 1
                                ).padStart(2, "0")}-${String(day).padStart(
                                    2,
                                    "0"
                                )}`;

                                const dayEvents = events.filter(
                                    (event) =>
                                        event.date === currentDateString
                                );

                                return (
                                    <div
                                        key={index}
                                        className={`min-h-[80px] sm:min-h-[110px] lg:h-32 rounded-2xl sm:rounded-3xl border transition p-2 sm:p-3 flex flex-col overflow-hidden ${isToday(day)
                                                ? "bg-cyan-500 text-black border-cyan-400"
                                                : "bg-white/5 border-white/10 hover:bg-white/10"
                                            }`}
                                    >
                                        <div className="flex items-center justify-between mb-1 sm:mb-2">
                                            <span className="font-medium text-[10px] sm:text-sm">
                                                {day}
                                            </span>

                                            {isToday(day) && (
                                                <div className="w-2 h-2 rounded-full bg-black" />
                                            )}
                                        </div>

                                        <div className="space-y-1 overflow-hidden">
                                            {dayEvents
                                                .slice(0, 2)
                                                .map((event, i) => (
                                                    <div
                                                        key={i}
                                                        className={`text-[8px] sm:text-[10px] px-1.5 sm:px-2 py-1 rounded-lg truncate ${priorityStyles[
                                                            event.priority as keyof typeof priorityStyles
                                                            ]
                                                            }`}
                                                    >
                                                        {event.title}
                                                    </div>
                                                ))}

                                            {dayEvents.length > 2 && (
                                                <p className="text-[8px] sm:text-[10px] text-gray-400">
                                                    +
                                                    {dayEvents.length - 2} more
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="space-y-6">
                        {/* Today Card */}
                        <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-5 sm:p-6">
                            <div className="flex items-center gap-4 mb-5">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-cyan-500/20 flex items-center justify-center">
                                    <CalendarDays
                                        className="text-cyan-400"
                                        size={24}
                                    />
                                </div>

                                <div>
                                    <p className="text-gray-400 text-sm">
                                        Today
                                    </p>

                                    <h2 className="text-2xl sm:text-3xl font-bold">
                                        {today.toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                        })}
                                    </h2>
                                </div>
                            </div>

                            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                                You have {events.length} scheduled events.
                            </p>
                        </div>

                        {/* Upcoming Events */}
                        <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-5 sm:p-6">
                            {/* Header */}
                            <div className="flex items-start justify-between gap-4 mb-6">
                                <div>
                                    <h2 className="text-xl sm:text-2xl font-semibold">
                                        Upcoming Events
                                    </h2>

                                    <p className="text-gray-400 text-sm mt-2">
                                        Filter and manage events
                                    </p>
                                </div>

                                <button
                                    onClick={() =>
                                        setShowFilters(!showFilters)
                                    }
                                    className="min-w-[44px] w-11 h-11 rounded-2xl bg-white/10 border border-white/10 hover:bg-white/20 transition flex items-center justify-center"
                                >
                                    <Filter size={18} />
                                </button>
                            </div>

                            {/* Filters */}
                            {showFilters && (
                                <div className="space-y-4 mb-6">
                                    <input
                                        type="date"
                                        value={dateFilter}
                                        onChange={(e) =>
                                            setDateFilter(e.target.value)
                                        }
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 outline-none focus:border-cyan-500 text-white"
                                    />

                                    <select
                                        value={priorityFilter}
                                        onChange={(e) =>
                                            setPriorityFilter(
                                                e.target.value
                                            )
                                        }
                                        className="w-full bg-zinc-900 text-white border border-white/10 rounded-2xl px-4 py-3 outline-none focus:border-cyan-500"
                                    >
                                        <option value="All">
                                            All Priorities
                                        </option>

                                        <option value="High">
                                            High Priority
                                        </option>

                                        <option value="Medium">
                                            Medium Priority
                                        </option>

                                        <option value="Low">
                                            Low Priority
                                        </option>
                                    </select>
                                </div>
                            )}

                            {/* Events */}
                            <div className="space-y-4 sm:space-y-5 max-h-[700px] overflow-auto pr-1 sm:pr-2">
                                {filteredEvents.map((event, index) => (
                                    <div
                                        key={index}
                                        onClick={() =>
                                            setSelectedEventIndex(index)
                                        }
                                        className={`bg-white/5 border rounded-3xl p-4 sm:p-5 transition cursor-pointer ${selectedEventIndex === index
                                                ? "border-red-500/40 bg-red-500/5"
                                                : "border-white/10 hover:bg-white/10"
                                            }`}
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="min-w-0">
                                                <h3 className="text-base sm:text-lg font-semibold truncate">
                                                    {event.title}
                                                </h3>

                                                <span className="text-xs text-gray-400">
                                                    {new Date(
                                                        event.date
                                                    ).toLocaleDateString(
                                                        "en-US",
                                                        {
                                                            month: "short",
                                                            day: "numeric",
                                                        }
                                                    )}
                                                </span>
                                            </div>

                                            <div
                                                className={`px-2 sm:px-3 py-1 rounded-xl text-[10px] sm:text-xs whitespace-nowrap ${priorityStyles[
                                                    event.priority as keyof typeof priorityStyles
                                                    ]
                                                    }`}
                                            >
                                                {event.priority}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 text-gray-400 text-xs sm:text-sm mt-4">
                                            <Clock3 size={15} />
                                            {event.time}
                                        </div>

                                        <div className="flex items-center gap-2 text-gray-400 text-xs sm:text-sm mt-2">
                                            <MapPin size={15} />
                                            <span className="truncate">
                                                {event.location}
                                            </span>
                                        </div>

                                        {/* Delete Button */}
                                        {selectedEventIndex === index && (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDeleteEvent(
                                                        index
                                                    );
                                                }}
                                                className="mt-5 w-full bg-red-500/15 border border-red-500/20 hover:bg-red-500/25 text-red-400 py-3 rounded-2xl flex items-center justify-center gap-2 transition"
                                            >
                                                <Trash2 size={16} />
                                                Delete Event
                                            </button>
                                        )}
                                    </div>
                                ))}

                                {filteredEvents.length === 0 && (
                                    <div className="text-center text-gray-500 py-10 text-sm">
                                        No events found
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {openModal && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="w-full max-w-md bg-zinc-900 border border-white/10 rounded-3xl p-5 sm:p-6">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl sm:text-2xl font-semibold">
                                Add Event
                            </h2>

                            <button
                                onClick={() => setOpenModal(false)}
                                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Form */}
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Event Title"
                                value={formData.title}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        title: e.target.value,
                                    })
                                }
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 outline-none focus:border-cyan-500 text-sm sm:text-base"
                            />

                            <input
                                type="text"
                                placeholder="Location"
                                value={formData.location}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        location: e.target.value,
                                    })
                                }
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 outline-none focus:border-cyan-500 text-sm sm:text-base"
                            />

                            {/* Date + Time */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <input
                                    type="date"
                                    value={formData.date}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            date: e.target.value,
                                        })
                                    }
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 outline-none focus:border-cyan-500 text-white text-sm sm:text-base"
                                />

                                <input
                                    type="time"
                                    value={formData.time}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            time: e.target.value,
                                        })
                                    }
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 outline-none focus:border-cyan-500 text-white text-sm sm:text-base"
                                />
                            </div>

                            {/* Priority */}
                            <select
                                value={formData.priority}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        priority: e.target.value,
                                    })
                                }
                                className="w-full bg-zinc-900 text-white border border-white/10 rounded-2xl px-4 py-3 outline-none focus:border-cyan-500 text-sm sm:text-base"
                            >
                                <option value="" disabled>
                                    Priority
                                </option>

                                <option value="High">
                                    High Priority
                                </option>

                                <option value="Medium">
                                    Medium Priority
                                </option>

                                <option value="Low">
                                    Low Priority
                                </option>
                            </select>

                            {/* Button */}
                            <button
                                onClick={handleAddEvent}
                                className="w-full mt-4 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold py-3 rounded-2xl transition text-sm sm:text-base"
                            >
                                Create Event
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}