'use client';

import { useState, ReactNode } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

export default function AppLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <div className="min-h-screen bg-background bg-grid-pattern bg-grid">
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      <Navbar />
      <main className="pt-[72px] lg:pl-64 min-h-screen">
        <div className="max-w-[1200px] mx-auto px-6 py-10">
          {children}
        </div>
      </main>
    </div>
  );
}
