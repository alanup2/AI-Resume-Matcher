'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  accent?: 'orange' | 'cyan' | 'purple';
  delay?: number;
  onClick?: () => void;
}

export default function GlowCard({ children, className, accent = 'orange', delay = 0, onClick }: GlowCardProps) {
  const borderAccent = {
    orange: 'hover:border-primary/50 hover:shadow-glow',
    cyan: 'hover:border-secondary/50 hover:shadow-neon-cyan',
    purple: 'hover:border-tertiary/50 hover:shadow-neon-purple',
  };

  const topBorder = {
    orange: 'bg-primary',
    cyan: 'bg-secondary',
    purple: 'bg-tertiary',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      className={cn(
        'relative overflow-hidden rounded-2xl glass-card transition-all duration-300',
        borderAccent[accent],
        onClick && 'cursor-pointer',
        className
      )}
    >
      <div className={cn('absolute top-0 left-0 right-0 h-[2px]', topBorder[accent])} />
      {children}
    </motion.div>
  );
}
