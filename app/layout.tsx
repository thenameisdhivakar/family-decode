import "./globals.css";
import Sidebar from "./components/Sidebar";
import { ReactNode } from "react";

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className="bg-[#1a120b]">
      <body className="min-h-screen bg-[radial-gradient(circle_at_top,#3b2f2f,#2c1f1f,#1a1212)] text-white overflow-x-hidden">

        {/* SIDEBAR - It's 'fixed', so it sits on top */}
        <Sidebar />

        {/* MAIN CONTENT AREA */}
        {/* lg:ml-64 -> Pushes content right to make room for sidebar on desktop.
            If you want the margin to change when 'collapsed' is toggled, 
            we usually handle that via a shared state or a simple CSS class.
        */}
        <div className="flex-1 flex flex-col min-h-screen transition-all duration-300 lg:ml-64">

          {/* Top Padding for Mobile (so content isn't under the hamburger menu) */}
          <div className="h-16 lg:hidden" />

          {/* PAGE CONTENT */}
          <main className="p-4 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {children}
          </main>

        </div>
      </body>
    </html>
  );
}