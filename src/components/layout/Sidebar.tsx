'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cpu,
  Brain,
  Crosshair,
  Target,
  BarChart3,
  FileSearch,
  GitCompare,
  Settings,
  LogOut,
  ChevronLeft,
  Menu,
  X,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const sidebarLinks = [
  { href: '/engine', label: 'Engine', icon: Cpu },
  { href: '/upload', label: 'Score', icon: Brain },
  { href: '/alignment', label: 'Alignment', icon: Crosshair },
  { href: '/competency', label: 'Competency', icon: Target },
  { href: '/dashboard', label: 'Dashboard', icon: BarChart3 },
  { href: '/analysis', label: 'Analysis', icon: FileSearch },
  { href: '/gap-analysis', label: 'Gap Analysis', icon: GitCompare },
];

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      <button
        onClick={onToggle}
        className="fixed top-4 left-4 z-[60] lg:hidden p-2 rounded-lg bg-surface-low border border-outline-variant text-text-secondary hover:text-primary transition-colors"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onToggle}
            className="fixed inset-0 bg-black z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{
          width: isOpen ? 256 : 0,
          x: 0,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={cn(
          'fixed left-0 top-0 bottom-0 z-50 lg:!w-[256px] lg:!translate-x-0',
          'bg-[#0C0E12] border-r border-outline-variant/10',
          'flex flex-col overflow-hidden',
          isOpen ? 'w-[256px] translate-x-0' : 'w-0 -translate-x-full lg:translate-x-0 lg:w-[256px]'
        )}
        style={{ width: isOpen ? 256 : 0 }}
      >
        <div className="flex items-center gap-3 p-5 border-b border-outline-variant/10">
          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center">
            <Cpu className="text-primary" size={20} />
          </div>
          <div>
            <h3 className="font-display text-sm font-bold text-primary">Precision Engine</h3>
            <p className="font-mono text-[10px] text-primary/80">AI ACTIVE</p>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => window.innerWidth < 1024 && onToggle()}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-display font-semibold tracking-wider transition-all duration-200',
                  isActive
                    ? 'bg-primary text-primary-dark shadow-neon'
                    : 'text-text-secondary hover:bg-surface-high hover:text-text-primary'
                )}
              >
                <Icon size={18} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 space-y-1 border-t border-outline-variant/10">
          <Link
            href="/settings"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-display font-semibold tracking-wider text-text-secondary hover:bg-surface-high hover:text-text-primary transition-all"
          >
            <Settings size={18} />
            Settings
          </Link>
          <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-display font-semibold tracking-wider text-text-secondary hover:bg-surface-high hover:text-error transition-all w-full">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </motion.aside>
    </>
  );
}
