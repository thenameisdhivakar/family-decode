"use client";

import { useEffect, useMemo, useState } from "react";

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

type EventType = {
    _id?: string;
    title: string;
    time: string;
    location: string;
    priority: string;
    date: string;
};

export default function CalendarPage() {
    const [events, setEvents] = useState<EventType[]>([]);

    const [openModal, setOpenModal] = useState(false);

    const [showFilters, setShowFilters] = useState(false);

    const [selectedEventIndex, setSelectedEventIndex] =
        useState<number | null>(null);

    const [currentDate, setCurrentDate] = useState(new Date());

    const [priorityFilter, setPriorityFilter] = useState("All");

    const [dateFilter, setDateFilter] = useState("");

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        time: "",
        location: "",
        date: "",
        priority: "medium",
    });

    // PRIORITY COLORS
    const priorityStyles: Record<
        string,
        {
            card: string;
            badge: string;
        }
    > = {
        high: {
            card: "bg-red-500/10 border-red-500/30",
            badge:
                "bg-red-500/20 text-red-300 border border-red-500/40 shadow-lg shadow-red-500/20",
        },

        medium: {
            card: "bg-yellow-500/10 border-yellow-500/30",
            badge:
                "bg-yellow-500/20 text-yellow-300 border border-yellow-500/40 shadow-lg shadow-yellow-500/20",
        },

        low: {
            card: "bg-green-500/10 border-green-500/30",
            badge:
                "bg-green-500/20 text-green-300 border border-green-500/40 shadow-lg shadow-green-500/20",
        },
    };

    // FETCH EVENTS
    const fetchEvents = async () => {
        try {
            setLoading(true);

            const res = await fetch("/api/calendar");

            const data = await res.json();

            // NORMALIZE PRIORITY
            const normalizedData = data.map(
                (event: EventType) => ({
                    ...event,
                    priority: event.priority
                        ? event.priority
                            .trim()
                            .toLowerCase()
                        : "medium",
                })
            );

            setEvents(normalizedData);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    // ADD EVENT
    const handleAddEvent = async () => {
        if (
            !formData.title ||
            !formData.time ||
            !formData.location ||
            !formData.date ||
            !formData.priority
        ) {
            return;
        }

        try {
            const payload = {
                ...formData,
                priority:
                    formData.priority.toLowerCase(),
            };

            const res = await fetch("/api/calendar", {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json",
                },

                body: JSON.stringify(payload),
            });

            const data = await res.json();

            const normalizedEvent = {
                ...data,
                priority: data.priority
                    ? data.priority
                        .trim()
                        .toLowerCase()
                    : "medium",
            };

            setEvents((prev) => [
                normalizedEvent,
                ...prev,
            ]);

            setFormData({
                title: "",
                time: "",
                location: "",
                date: "",
                priority: "medium",
            });

            setOpenModal(false);
        } catch (error) {
            console.log(error);
        }
    };

    // DELETE EVENT
    const handleDeleteEvent = async (
        id?: string
    ) => {
        if (!id) return;

        try {
            await fetch(`/api/calendar/${id}`, {
                method: "DELETE",
            });

            setEvents((prev) =>
                prev.filter(
                    (event) => event._id !== id
                )
            );

            setSelectedEventIndex(null);
        } catch (error) {
            console.log(error);
        }
    };

    const month = currentDate.getMonth();

    const year = currentDate.getFullYear();

    const monthName =
        currentDate.toLocaleString("default", {
            month: "long",
        });

    const firstDayOfMonth = new Date(
        year,
        month,
        1
    ).getDay();

    const daysInMonth = new Date(
        year,
        month + 1,
        0
    ).getDate();

    const calendarDays = useMemo(() => {
        const days = [];

        for (
            let i = 0;
            i < firstDayOfMonth;
            i++
        ) {
            days.push(null);
        }

        for (
            let day = 1;
            day <= daysInMonth;
            day++
        ) {
            days.push(day);
        }

        return days;
    }, [firstDayOfMonth, daysInMonth]);

    const filteredEvents = events.filter(
        (event) => {
            const matchesPriority =
                priorityFilter === "All" ||
                event.priority ===
                priorityFilter.toLowerCase();

            const matchesDate =
                !dateFilter ||
                event.date === dateFilter;

            return (
                matchesPriority && matchesDate
            );
        }
    );

    const previousMonth = () => {
        setCurrentDate(
            new Date(year, month - 1, 1)
        );
    };

    const nextMonth = () => {
        setCurrentDate(
            new Date(year, month + 1, 1)
        );
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
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between mb-8">
                    <div>
                        <h1 className="text-4xl lg:text-5xl font-bold">
                            Calendar
                        </h1>

                        <p className="text-gray-400 mt-2">
                            Organize your events
                        </p>
                    </div>

                    <button
                        onClick={() =>
                            setOpenModal(true)
                        }
                        className="flex items-center justify-center gap-2 bg-white/10 border border-white/10 px-5 py-3 rounded-2xl hover:bg-white/20 transition"
                    >
                        <Plus size={18} />
                        Add Event
                    </button>
                </div>

                {/* Layout */}
                <div className="grid grid-cols-1 2xl:grid-cols-3 gap-6">
                    {/* Calendar */}
                    <div className="2xl:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-4 sm:p-6">
                        {/* Month Header */}
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-3xl font-semibold">
                                    {monthName} {year}
                                </h2>

                                <p className="text-gray-400 mt-1">
                                    Monthly overview
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={
                                        previousMonth
                                    }
                                    className="w-11 h-11 rounded-2xl bg-white/10 border border-white/10 hover:bg-white/20 flex items-center justify-center"
                                >
                                    <ChevronLeft
                                        size={18}
                                    />
                                </button>

                                <button
                                    onClick={() =>
                                        setCurrentDate(
                                            new Date()
                                        )
                                    }
                                    className="px-4 py-2 rounded-2xl bg-white/10 border border-white/10 hover:bg-white/20"
                                >
                                    Today
                                </button>

                                <button
                                    onClick={nextMonth}
                                    className="w-11 h-11 rounded-2xl bg-white/10 border border-white/10 hover:bg-white/20 flex items-center justify-center"
                                >
                                    <ChevronRight
                                        size={18}
                                    />
                                </button>
                            </div>
                        </div>

                        {/* Week Days */}
                        <div className="grid grid-cols-7 gap-4 mb-4">
                            {[
                                "Sun",
                                "Mon",
                                "Tue",
                                "Wed",
                                "Thu",
                                "Fri",
                                "Sat",
                            ].map((day) => (
                                <div
                                    key={day}
                                    className="text-center text-sm text-gray-500 font-medium"
                                >
                                    {day}
                                </div>
                            ))}
                        </div>

                        {/* Calendar Grid */}
                        <div className="grid grid-cols-7 gap-4">
                            {calendarDays.map(
                                (day, index) => {
                                    if (!day) {
                                        return (
                                            <div
                                                key={
                                                    index
                                                }
                                                className="h-32"
                                            />
                                        );
                                    }

                                    const currentDateString = `${year}-${String(
                                        month + 1
                                    ).padStart(
                                        2,
                                        "0"
                                    )}-${String(
                                        day
                                    ).padStart(
                                        2,
                                        "0"
                                    )}`;

                                    const dayEvents =
                                        events.filter(
                                            (
                                                event
                                            ) =>
                                                event.date ===
                                                currentDateString
                                        );

                                    return (
                                        <div
                                            key={
                                                index
                                            }
                                            className={`h-32 rounded-3xl border p-3 overflow-hidden transition ${isToday(
                                                day
                                            )
                                                    ? "bg-cyan-500 text-black border-cyan-400"
                                                    : "bg-white/5 border-white/10 hover:bg-white/10"
                                                }`}
                                        >
                                            {/* Day */}
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="font-semibold">
                                                    {
                                                        day
                                                    }
                                                </span>

                                                {isToday(
                                                    day
                                                ) && (
                                                        <div className="w-2 h-2 rounded-full bg-black" />
                                                    )}
                                            </div>

                                            {/* Event Badges */}
                                            <div className="space-y-1">
                                                {dayEvents
                                                    .slice(
                                                        0,
                                                        2
                                                    )
                                                    .map(
                                                        (
                                                            event,
                                                            i
                                                        ) => {
                                                            const style =
                                                                priorityStyles[
                                                                event.priority
                                                                ] ||
                                                                priorityStyles.medium;

                                                            return (
                                                                <div
                                                                    key={
                                                                        i
                                                                    }
                                                                    className={`text-[10px] px-2.5 py-1 rounded-full font-semibold truncate border backdrop-blur-sm ${style.badge}`}
                                                                >
                                                                    {
                                                                        event.title
                                                                    }
                                                                </div>
                                                            );
                                                        }
                                                    )}

                                                {dayEvents.length >
                                                    2 && (
                                                        <p className="text-[10px] text-gray-400">
                                                            +
                                                            {dayEvents.length -
                                                                2}{" "}
                                                            more
                                                        </p>
                                                    )}
                                            </div>
                                        </div>
                                    );
                                }
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Today */}
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                            <div className="flex items-center gap-4 mb-5">
                                <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 flex items-center justify-center">
                                    <CalendarDays
                                        className="text-cyan-400"
                                        size={24}
                                    />
                                </div>

                                <div>
                                    <p className="text-gray-400 text-sm">
                                        Today
                                    </p>

                                    <h2 className="text-3xl font-bold">
                                        {today.toLocaleDateString(
                                            "en-US",
                                            {
                                                month: "short",
                                                day: "numeric",
                                            }
                                        )}
                                    </h2>
                                </div>
                            </div>

                            <p className="text-gray-400">
                                You have{" "}
                                {events.length}{" "}
                                scheduled
                                events.
                            </p>
                        </div>

                        {/* Upcoming Events */}
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-semibold">
                                    Upcoming
                                    Events
                                </h2>

                                <button
                                    onClick={() =>
                                        setShowFilters(
                                            !showFilters
                                        )
                                    }
                                    className="w-11 h-11 rounded-2xl bg-white/10 border border-white/10 hover:bg-white/20 flex items-center justify-center"
                                >
                                    <Filter
                                        size={18}
                                    />
                                </button>
                            </div>

                            {/* Events */}
                            <div className="space-y-4 max-h-[700px] overflow-auto pr-2">
                                {loading ? (
                                    <div className="text-center text-gray-500 py-10">
                                        Loading...
                                    </div>
                                ) : filteredEvents.length ===
                                    0 ? (
                                    <div className="text-center text-gray-500 py-10">
                                        No events
                                        found
                                    </div>
                                ) : (
                                    filteredEvents.map(
                                        (
                                            event,
                                            index
                                        ) => {
                                            const style =
                                                priorityStyles[
                                                event.priority
                                                ] ||
                                                priorityStyles.medium;

                                            return (
                                                <div
                                                    key={
                                                        event._id
                                                    }
                                                    onClick={() =>
                                                        setSelectedEventIndex(
                                                            index
                                                        )
                                                    }
                                                    className={`rounded-3xl p-5 transition cursor-pointer border ${style.card}`}
                                                >
                                                    <div className="flex items-start justify-between gap-3">
                                                        <div>
                                                            <h3 className="text-lg font-semibold">
                                                                {
                                                                    event.title
                                                                }
                                                            </h3>

                                                            <span className="text-xs text-gray-400">
                                                                {
                                                                    event.date
                                                                }
                                                            </span>
                                                        </div>

                                                        {/* PRIORITY BADGE */}
                                                        <div
                                                            className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${style.badge}`}
                                                        >
                                                            {
                                                                event.priority
                                                            }
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-2 text-gray-400 text-sm mt-4">
                                                        <Clock3
                                                            size={
                                                                15
                                                            }
                                                        />
                                                        {
                                                            event.time
                                                        }
                                                    </div>

                                                    <div className="flex items-center gap-2 text-gray-400 text-sm mt-2">
                                                        <MapPin
                                                            size={
                                                                15
                                                            }
                                                        />
                                                        {
                                                            event.location
                                                        }
                                                    </div>

                                                    {selectedEventIndex ===
                                                        index && (
                                                            <button
                                                                onClick={(
                                                                    e
                                                                ) => {
                                                                    e.stopPropagation();

                                                                    handleDeleteEvent(
                                                                        event._id
                                                                    );
                                                                }}
                                                                className="mt-5 w-full bg-red-500/15 border border-red-500/20 hover:bg-red-500/25 text-red-400 py-3 rounded-2xl flex items-center justify-center gap-2 transition"
                                                            >
                                                                <Trash2
                                                                    size={
                                                                        16
                                                                    }
                                                                />
                                                                Delete
                                                                Event
                                                            </button>
                                                        )}
                                                </div>
                                            );
                                        }
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {openModal && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="w-full max-w-md bg-zinc-900 border border-white/10 rounded-3xl p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-semibold">
                                Add Event
                            </h2>

                            <button
                                onClick={() =>
                                    setOpenModal(false)
                                }
                                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Event Title"
                                value={formData.title}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        title:
                                            e.target
                                                .value,
                                    })
                                }
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 outline-none"
                            />

                            <input
                                type="text"
                                placeholder="Location"
                                value={
                                    formData.location
                                }
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        location:
                                            e.target
                                                .value,
                                    })
                                }
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 outline-none"
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="date"
                                    value={
                                        formData.date
                                    }
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            date: e
                                                .target
                                                .value,
                                        })
                                    }
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 outline-none"
                                />

                                <input
                                    type="time"
                                    value={
                                        formData.time
                                    }
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            time: e
                                                .target
                                                .value,
                                        })
                                    }
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 outline-none"
                                />
                            </div>

                            <select
                                value={
                                    formData.priority
                                }
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        priority:
                                            e.target
                                                .value,
                                    })
                                }
                                className="w-full bg-zinc-900 border border-white/10 rounded-2xl px-4 py-3 outline-none"
                            >
                                <option value="high">
                                    High
                                </option>

                                <option value="medium">
                                    Medium
                                </option>

                                <option value="low">
                                    Low
                                </option>
                            </select>

                            <button
                                onClick={
                                    handleAddEvent
                                }
                                className="w-full mt-4 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold py-3 rounded-2xl transition"
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