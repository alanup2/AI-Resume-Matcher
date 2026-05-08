'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ScoreCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: 'up' | 'down';
  className?: string;
}

export default function ScoreCard({ label, value, icon, trend, className }: ScoreCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn('glass rounded-2xl p-5 flex items-center gap-4 hover:border-primary/30 transition-all', className)}
    >
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
        {icon}
      </div>
      <div>
        <p className="font-mono text-[10px] text-text-muted tracking-wider uppercase">{label}</p>
        <p className="font-display text-xl font-bold text-white">{value}</p>
        {trend && (
          <span className={cn('font-mono text-[10px]', trend === 'up' ? 'text-secondary' : 'text-error')}>
            {trend === 'up' ? '▲' : '▼'} 12%
          </span>
        )}
      </div>
    </motion.div>
  );
}
