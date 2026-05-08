'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SkillTagProps {
  name: string;
  variant?: 'cyan' | 'purple' | 'default';
  size?: 'sm' | 'md';
}

export default function SkillTag({ name, variant = 'default', size = 'sm' }: SkillTagProps) {
  const variants = {
    cyan: 'bg-secondary/10 border-secondary/20 text-secondary',
    purple: 'bg-tertiary/10 border-tertiary/20 text-tertiary',
    default: 'bg-surface-high border-outline-variant text-text-secondary',
  };

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(255, 122, 0, 0.4)' }}
      className={cn(
        'font-mono tracking-wider border rounded',
        size === 'sm' ? 'px-3 py-1 text-[10px]' : 'px-4 py-1.5 text-xs',
        variants[variant]
      )}
    >
      {name.toUpperCase()}
    </motion.span>
  );
}
