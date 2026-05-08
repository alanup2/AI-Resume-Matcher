'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  ChevronRight,
  Lightbulb,
  TrendingUp,
  Target,
} from 'lucide-react';
import GlowCard from '@/components/ui/GlowCard';
import SkillTag from '@/components/ui/SkillTag';
import ProgressRing from '@/components/ui/ProgressRing';

const skillGaps = [
  { skill: 'Kubernetes', current: 0, required: 80, priority: 'high' },
  { skill: 'Docker', current: 30, required: 85, priority: 'high' },
  { skill: 'AWS/GCP', current: 45, required: 80, priority: 'medium' },
  { skill: 'CI/CD Pipelines', current: 60, required: 75, priority: 'medium' },
  { skill: 'Terraform', current: 0, required: 60, priority: 'low' },
  { skill: 'Monitoring', current: 20, required: 70, priority: 'medium' },
  { skill: 'Microservices', current: 50, required: 75, priority: 'medium' },
  { skill: 'System Design', current: 65, required: 80, priority: 'low' },
];

const roadmap = [
  { phase: 'Phase 1', title: 'Foundation', duration: '2 weeks', items: ['Docker fundamentals', 'Container orchestration basics'], color: 'bg-primary' },
  { phase: 'Phase 2', title: 'Intermediate', duration: '4 weeks', items: ['Kubernetes deployment', 'AWS ECS/EKS', 'CI/CD with GitHub Actions'], color: 'bg-secondary' },
  { phase: 'Phase 3', title: 'Advanced', duration: '6 weeks', items: ['Infrastructure as Code', 'Terraform', 'Monitoring & Observability'], color: 'bg-tertiary' },
  { phase: 'Phase 4', title: 'Mastery', duration: '4 weeks', items: ['System design interviews', 'Production readiness', 'Security best practices'], color: 'bg-primary' },
];

const targetRoles = ['Senior DevOps Engineer', 'Cloud Architect', 'Platform Engineer'];

export default function GapAnalysisPage() {
  const [selectedRole, setSelectedRole] = useState(targetRoles[0]);

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <span className="font-mono text-xs text-primary tracking-[0.1em]">GAP ANALYSIS // COMPARISON</span>
        <h1 className="font-display text-3xl font-bold text-white mt-2">Skill Gap Analysis</h1>
      </motion.div>

      {/* Target Role Selector */}
      <div className="flex gap-3">
        {targetRoles.map((role) => (
          <button
            key={role}
            onClick={() => setSelectedRole(role)}
            className={`px-6 py-3 rounded-xl font-display text-sm font-semibold tracking-wider transition-all ${
              selectedRole === role
                ? 'bg-primary text-primary-dark shadow-neon'
                : 'glass-card text-text-secondary hover:text-white'
            }`}
          >
            {role}
          </button>
        ))}
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Match Score', value: '64%', icon: Target, color: 'text-primary' },
          { label: 'Skills Matched', value: '18/28', icon: TrendingUp, color: 'text-secondary' },
          { label: 'Gaps Detected', value: '10', icon: Lightbulb, color: 'text-tertiary' },
          { label: 'Est. Training', value: '16 weeks', icon: BookOpen, color: 'text-primary' },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-2xl p-5 text-center"
          >
            <item.icon size={20} className={`mx-auto mb-2 ${item.color}`} />
            <p className="font-mono text-[10px] text-text-muted tracking-wider mb-1">{item.label}</p>
            <p className={`font-display text-2xl font-extrabold ${item.color}`}>{item.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-[1fr_1fr] gap-6">
        {/* Skills Comparison Matrix */}
        <GlowCard accent="orange">
          <div className="p-8">
            <h3 className="font-display text-lg font-semibold text-white mb-6">Skills Comparison Matrix</h3>
            <div className="space-y-5">
              {skillGaps.map((item, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-display text-sm font-semibold text-white">{item.skill}</span>
                      <span className={`font-mono text-[10px] px-2 py-0.5 rounded ${
                        item.priority === 'high' ? 'bg-error/10 text-error border border-error/20' :
                        item.priority === 'medium' ? 'bg-primary/10 text-primary border border-primary/20' :
                        'bg-tertiary/10 text-tertiary border border-tertiary/20'
                      }`}>
                        {item.priority.toUpperCase()}
                      </span>
                    </div>
                    <span className="font-mono text-xs text-text-muted">{item.current}% → {item.required}%</span>
                  </div>
                  <div className="relative h-2 bg-surface-highest rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.current}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className="h-full bg-error/50 rounded-full"
                    />
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.required}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className="absolute top-0 h-full bg-secondary/50 rounded-full"
                      style={{ opacity: 0.5 }}
                    />
                  </div>
                  <div className="flex gap-1 mt-1">
                    <span className="w-2 h-2 rounded-full bg-error" />
                    <span className="font-mono text-[9px] text-text-muted">Current</span>
                    <span className="w-2 h-2 rounded-full bg-secondary ml-2" />
                    <span className="font-mono text-[9px] text-text-muted">Required</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </GlowCard>

        {/* Learning Roadmap */}
        <div className="space-y-6">
          <GlowCard accent="cyan">
            <div className="p-8">
              <h3 className="font-display text-lg font-semibold text-white mb-6">Learning Roadmap</h3>
              <div className="space-y-0">
                {roadmap.map((phase, i) => (
                  <div key={i} className="relative pl-8 pb-8 last:pb-0">
                    <div className={`absolute left-3 top-1 w-3 h-3 rounded-full ${phase.color}`} />
                    {i < roadmap.length - 1 && (
                      <div className="absolute left-[17px] top-4 bottom-0 w-px bg-outline-variant/30" />
                    )}
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="font-mono text-[10px] text-primary tracking-wider">{phase.phase}</span>
                        <h4 className="font-display text-base font-semibold text-white">{phase.title}</h4>
                        <ul className="mt-2 space-y-1">
                          {phase.items.map((item, j) => (
                            <li key={j} className="flex items-center gap-2 text-xs text-text-secondary">
                              <ChevronRight size={12} className="text-text-muted" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <span className="font-mono text-[10px] text-text-muted shrink-0">{phase.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </GlowCard>

          {/* AI Suggestions */}
          <GlowCard accent="purple">
            <div className="p-8">
              <h3 className="font-display text-lg font-semibold text-white mb-4">AI Recommendations</h3>
              <div className="space-y-3">
                {[
                  'Prioritize Kubernetes - it has the widest skill gap for your target role',
                  'Cloud certification (AWS SA Associate) would significantly improve match',
                  'Consider a Docker deep-dive course (2 weeks intensive)',
                  'System design skills are close to target - focus on other gaps first',
                ].map((rec, i) => (
                  <div key={i} className="flex gap-2 p-3 bg-surface-low border border-outline-variant/20">
                    <span className="text-tertiary shrink-0 text-xs mt-0.5">▶</span>
                    <p className="text-xs text-text-secondary leading-relaxed">{rec}</p>
                  </div>
                ))}
              </div>
            </div>
          </GlowCard>
        </div>
      </div>

      {/* Career Trajectory */}
      <GlowCard accent="orange">
        <div className="p-8">
          <h3 className="font-display text-lg font-semibold text-white mb-6">Career Trajectory Prediction</h3>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { stage: 'Current', match: 64, date: 'Now' },
              { stage: '3 Months', match: 75, date: 'After Phase 1-2' },
              { stage: '6 Months', match: 88, date: 'After Phase 3' },
              { stage: '12 Months', match: 95, date: 'After All Phases' },
            ].map((item, i) => (
              <div key={i} className="text-center p-4 bg-surface-low border border-outline-variant/20 rounded-xl">
                <p className="font-mono text-[10px] text-text-muted mb-2">{item.stage}</p>
                <motion.p
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.2, type: 'spring' }}
                  className="font-display text-3xl font-extrabold text-secondary"
                >
                  {item.match}%
                </motion.p>
                <p className="font-mono text-[9px] text-text-muted mt-1">{item.date}</p>
              </div>
            ))}
          </div>
        </div>
      </GlowCard>
    </div>
  );
}
