import React from 'react';

const ProjectPage = () => {
    const projects = [
        {
            title: "Nexus Core System",
            description: "High-performance architecture for distributed systems with real-time sync.",
            tech: ["Node.js", "Redis", "MongoDB"],
            status: "Production",
            metrics: "99.9% Uptime"
        },
        {
            title: "Lumina UI Kit",
            description: "A comprehensive library of glassmorphic components for modern web apps.",
            tech: ["React", "Tailwind", "Framer"],
            status: "Beta",
            metrics: "12k Downloads"
        },
        {
            title: "Skyline Analytics",
            description: "Predictive data modeling with interactive 3D visualization layers.",
            tech: ["Next.js", "Three.js", "D3"],
            status: "Completed",
            metrics: "Sub-100ms Latency"
        }
    ];

    return (
        <div className="min-h-screen bg-black text-white p-6 md:p-20 font-sans selection:bg-blue-500/30">
            {/* Pro Header with subtle mesh gradient background */}
            <div className="relative max-w-7xl mx-auto mb-20">
                <div className="absolute -top-24 -left-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h2 className="text-blue-500 font-mono text-sm tracking-widest uppercase mb-3">Portfolio Architecture</h2>
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
                            Selected <span className="text-gray-500">Works.</span>
                        </h1>
                    </div>
                    <p className="text-gray-500 max-w-xs text-sm leading-relaxed border-l border-white/10 pl-4">
                        Focused on building scalable full-stack solutions with high-end aesthetic precision.
                    </p>
                </div>
            </div>

            {/* Project Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-7xl mx-auto">
                {projects.map((project, index) => (
                    <div
                        key={index}
                        className="group relative overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] transition-all duration-500 hover:border-white/20"
                    >
                        {/* Animated Spotight Effect (CSS Overlay) */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_var(--x,_50%)_var(--y,_50%),rgba(255,255,255,0.06)_0%,transparent_50%)]" />

                        <div className="relative p-8 md:p-10 flex flex-col h-full">
                            <div className="flex justify-between items-start mb-12">
                                <div className="px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-[10px] uppercase tracking-tighter font-bold">
                                    {project.status}
                                </div>
                                <div className="text-gray-600 font-mono text-xs italic">
                                    {project.metrics}
                                </div>
                            </div>

                            <h3 className="text-3xl font-bold mb-4 group-hover:text-blue-400 transition-colors duration-300">
                                {project.title}
                            </h3>

                            <p className="text-gray-400 text-lg mb-8 line-clamp-2">
                                {project.description}
                            </p>

                            <div className="mt-auto">
                                <div className="flex flex-wrap gap-3 mb-8">
                                    {project.tech.map((t, i) => (
                                        <span key={i} className="text-xs font-medium text-gray-300 px-3 py-1 bg-white/5 rounded-lg backdrop-blur-md">
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                <button className="w-full py-4 rounded-xl bg-white text-black font-bold text-sm transition-all hover:bg-blue-500 hover:text-white flex items-center justify-center gap-2 group/btn">
                                    Explore Case Study
                                    <span className="transform transition-transform group-hover/btn:translate-x-1">→</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectPage;