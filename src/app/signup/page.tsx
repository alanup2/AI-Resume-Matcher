'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Eye, EyeOff, Cpu, ArrowRight } from 'lucide-react';
import AnimatedButton from '@/components/ui/AnimatedButton';

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[420px]"
      >
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-4">
            <Cpu className="text-primary" size={32} />
          </div>
          <h1 className="font-display text-2xl font-bold text-white">Create Account</h1>
          <p className="text-text-secondary text-sm mt-1">Join Precision AI Engine</p>
        </div>

        {/* Form */}
        <div className="glass rounded-2xl p-8 space-y-6">
          <div>
            <label className="font-mono text-[10px] text-text-muted tracking-wider block mb-2">FULL NAME</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="w-full h-12 px-4 rounded-xl bg-surface-high border border-outline-variant/20 text-text-primary text-sm placeholder:text-text-muted/30 focus:outline-none focus:border-primary/50 transition-all"
            />
          </div>

          <div>
            <label className="font-mono text-[10px] text-text-muted tracking-wider block mb-2">EMAIL ADDRESS</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full h-12 px-4 rounded-xl bg-surface-high border border-outline-variant/20 text-text-primary text-sm placeholder:text-text-muted/30 focus:outline-none focus:border-primary/50 transition-all"
            />
          </div>

          <div>
            <label className="font-mono text-[10px] text-text-muted tracking-wider block mb-2">PASSWORD</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a strong password"
                className="w-full h-12 px-4 pr-12 rounded-xl bg-surface-high border border-outline-variant/20 text-text-primary text-sm placeholder:text-text-muted/30 focus:outline-none focus:border-primary/50 transition-all"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <AnimatedButton className="w-full">
            Create Account
            <ArrowRight size={16} />
          </AnimatedButton>
        </div>

        <p className="text-center mt-6 text-sm text-text-muted">
          Already have an account?{' '}
          <Link href="/login" className="text-primary hover:underline font-semibold">
            Sign In
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
