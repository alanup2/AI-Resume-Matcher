'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Cpu, ArrowLeft, Send } from 'lucide-react';
import AnimatedButton from '@/components/ui/AnimatedButton';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

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
          <h1 className="font-display text-2xl font-bold text-white">Reset Password</h1>
          <p className="text-text-secondary text-sm mt-1">
            {sent ? 'Check your email for reset instructions' : 'Enter your email to receive reset instructions'}
          </p>
        </div>

        {/* Form */}
        <div className="glass rounded-2xl p-8 space-y-6">
          {!sent ? (
            <>
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
              <AnimatedButton className="w-full" onClick={() => setSent(true)}>
                <Send size={16} />
                Send Reset Link
              </AnimatedButton>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6"
            >
              <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                <Send className="text-secondary" size={28} />
              </div>
              <p className="text-text-secondary text-sm">
                Reset link sent to <span className="text-primary font-semibold">{email}</span>
              </p>
              <p className="text-text-muted text-xs mt-2">Check your inbox and follow the instructions</p>
            </motion.div>
          )}
        </div>

        <p className="text-center mt-6">
          <Link href="/login" className="text-text-muted hover:text-primary text-sm flex items-center justify-center gap-2">
            <ArrowLeft size={14} />
            Back to Sign In
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
