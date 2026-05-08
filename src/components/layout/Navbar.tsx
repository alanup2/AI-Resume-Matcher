'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell, Search, Settings, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/upload', label: 'Upload' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/analysis', label: 'Analysis' },
  { href: '/gap-analysis', label: 'Gap Analysis' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 h-[72px] z-30 bg-background/80 backdrop-blur-xl border-b border-outline-variant/10">
      <div className="max-w-[1440px] mx-auto px-6 h-full flex items-center justify-between">
        <div className="flex items-center gap-8">
          <span className="font-display text-2xl font-extrabold text-primary tracking-tight">
            Precision AI
          </span>
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'font-display text-sm font-semibold tracking-wider uppercase pb-1 transition-colors',
                    isActive
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-text-secondary hover:text-secondary'
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <motion.div
            initial={false}
            animate={{ width: searchOpen ? 240 : 40 }}
            className="relative"
          >
            <input
              type="text"
              placeholder="Search..."
              onFocus={() => setSearchOpen(true)}
              onBlur={() => setSearchOpen(false)}
              className="w-full h-10 pl-10 pr-4 rounded-xl bg-surface-high border border-outline-variant/20 text-text-primary text-sm font-body placeholder:text-text-muted/50 focus:outline-none focus:border-primary/50 transition-all"
            />
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          </motion.div>

          <button className="p-2 rounded-lg text-text-secondary hover:text-primary hover:bg-surface-high transition-all">
            <Bell size={18} />
          </button>
          <button className="p-2 rounded-lg text-text-secondary hover:text-primary hover:bg-surface-high transition-all">
            <Settings size={18} />
          </button>
          <div className="w-10 h-10 rounded-full border-2 border-primary bg-gradient-to-br from-surface-high to-surface-highest flex items-center justify-center cursor-pointer hover:border-primary-light transition-all">
            <User size={16} className="text-text-secondary" />
          </div>
        </div>
      </div>
    </header>
  );
}
