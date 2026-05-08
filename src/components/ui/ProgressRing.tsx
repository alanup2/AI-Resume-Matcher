'use client';

import { motion } from 'framer-motion';

interface ProgressRingProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
}

export default function ProgressRing({ value, size = 200, strokeWidth = 12, label }: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="rgba(88,66,53,0.2)"
            strokeWidth={strokeWidth}
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="#FF7A00"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
            style={{ filter: 'drop-shadow(0 0 8px rgba(255,122,0,0.4))' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="font-display font-extrabold text-white"
            style={{ fontSize: size * 0.3 }}
          >
            {value}
          </motion.span>
          <span className="font-mono text-[10px] text-secondary tracking-widest">CONFIDENCE %</span>
        </div>
      </div>
      {label && <span className="font-mono text-xs text-primary tracking-wider">{label}</span>}
    </div>
  );
}
