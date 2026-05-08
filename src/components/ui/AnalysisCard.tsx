'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnalysisCardProps {
  title: string;
  score: number;
  children: React.ReactNode;
  className?: string;
  accent?: 'orange' | 'cyan' | 'purple';
}

export default function AnalysisCard({ title, score, children, className, accent = 'cyan' }: AnalysisCardProps) {
  const barColor = {
    orange: 'bg-primary',
    cyan: 'bg-secondary',
    purple: 'bg-tertiary',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn('glass rounded-2xl p-6 border-l-4', className)}
      style={{ borderLeftColor: accent === 'orange' ? '#FF7A00' : accent === 'cyan' ? '#00EEFC' : '#C185FF' }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-semibold text-white">{title}</h3>
        <span className="font-mono text-sm text-white">{score}%</span>
      </div>
      <div className="h-1.5 bg-surface-highest rounded-full overflow-hidden mb-4">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${score}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className={cn('h-full rounded-full', barColor[accent])}
          style={{ boxShadow: `0 0 8px ${accent === 'orange' ? '#FF7A00' : accent === 'cyan' ? '#00EEFC' : '#C185FF'}40` }}
        />
      </div>
      {children}
    </motion.div>
  );
}
