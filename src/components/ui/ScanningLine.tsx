'use client';

import { motion } from 'framer-motion';

export default function ScanningLine() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
      <motion.div
        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"
        animate={{ top: ['0%', '100%', '0%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        style={{ boxShadow: '0 0 10px rgba(255,122,0,0.5)' }}
      />
    </div>
  );
}
