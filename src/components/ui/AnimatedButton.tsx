'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedButtonProps {
  children: ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  icon?: ReactNode;
}

export default function AnimatedButton({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  loading = false,
  className,
  icon,
}: AnimatedButtonProps) {
  const base = 'inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-display text-sm font-semibold tracking-wider transition-all duration-200';

  const variants = {
    primary: 'bg-primary text-primary-dark hover:shadow-neon',
    secondary: 'bg-transparent text-text-primary border border-outline hover:bg-surface-high',
    ghost: 'bg-transparent text-text-secondary hover:text-text-primary',
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(base, variants[variant], disabled && 'opacity-50 cursor-not-allowed', loading && 'cursor-wait', className)}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <span className="w-4 h-4 border-2 border-primary-dark border-t-transparent rounded-full animate-spin" />
          Processing...
        </span>
      ) : (
        <>
          {icon}
          {children}
        </>
      )}
    </motion.button>
  );
}
