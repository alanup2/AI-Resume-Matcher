'use client';

import { motion } from 'framer-motion';
import {
  Brain,
  MessageSquare,
  Users,
  TrendingUp,
  Award,
  Target,
  Zap,
} from 'lucide-react';
import GlowCard from '@/components/ui/GlowCard';
import ScoreCard from '@/components/ui/ScoreCard';
import ProgressRing from '@/components/ui/ProgressRing';
import RadarChart from '@/components/ui/RadarChart';

const competencies = [
  {
    category: 'Technical Skills',
    icon: Brain,
    accent: 'orange' as const,
    score: 88,
    items: [
      { name: 'JavaScript/TypeScript', score: 95 },
      { name: 'React/Next.js', score: 92 },
      { name: 'Node.js', score: 80 },
      { name: 'Database Design', score: 72 },
      { name: 'Cloud Services', score: 65 },
    ],
  },
  {
    category: 'Soft Skills',
    icon: MessageSquare,
    accent: 'cyan' as const,
    score: 72,
    items: [
      { name: 'Communication', score: 80 },
      { name: 'Team Collaboration', score: 85 },
      { name: 'Problem Solving', score: 78 },
      { name: 'Adaptability', score: 70 },
      { name: 'Conflict Resolution', score: 55 },
    ],
  },
  {
    category: 'Leadership',
    icon: Users,
    accent: 'purple' as const,
    score: 58,
    items: [
      { name: 'Team Management', score: 45 },
      { name: 'Mentoring', score: 65 },
      { name: 'Strategic Planning', score: 55 },
      { name: 'Decision Making', score: 70 },
      { name: 'Delegation', score: 50 },
    ],
  },
  {
    category: 'Communication',
    icon: MessageSquare,
    accent: 'orange' as const,
    score: 76,
    items: [
      { name: 'Written', score: 85 },
      { name: 'Verbal', score: 78 },
      { name: 'Technical Writing', score: 82 },
      { name: 'Presentation', score: 65 },
      { name: 'Cross-functional', score: 70 },
    ],
  },
];

const aiConfidence = [
  { label: 'Data Quality', value: 94, color: 'bg-primary' },
  { label: 'Analysis Depth', value: 88, color: 'bg-secondary' },
  { label: 'Match Accuracy', value: 82, color: 'bg-tertiary' },
  { label: 'Recommendations', value: 76, color: 'bg-secondary' },
];

export default function CompetencyPage() {
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <span className="font-mono text-xs text-primary tracking-[0.1em]">COMPETENCY // EVALUATION</span>
        <h1 className="font-display text-3xl font-bold text-white mt-2">Competency Breakdown</h1>
      </motion.div>

      {/* Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <ScoreCard label="Technical" value="88" icon={<Brain size={24} />} trend="up" />
        <ScoreCard label="Soft Skills" value="72" icon={<MessageSquare size={24} />} trend="up" />
        <ScoreCard label="Leadership" value="58" icon={<Users size={24} />} trend="down" />
        <ScoreCard label="Communication" value="76" icon={<MessageSquare size={24} />} trend="up" />
      </div>

      {/* Radar + AI Confidence */}
      <div className="grid lg:grid-cols-[1fr_1fr] gap-6">
        <GlowCard accent="cyan">
          <div className="p-8">
            <h3 className="font-display text-lg font-semibold text-white mb-6">Competency Radar</h3>
            <div className="flex justify-center">
              <RadarChart
                data={[
                  { label: 'TECH', value: 88 },
                  { label: 'SOFT', value: 72 },
                  { label: 'LEAD', value: 58 },
                  { label: 'COMM', value: 76 },
                  { label: 'PROB', value: 82 },
                  { label: 'ADAPT', value: 68 },
                ]}
              />
            </div>
          </div>
        </GlowCard>

        <GlowCard accent="purple">
          <div className="p-8">
            <h3 className="font-display text-lg font-semibold text-white mb-6">AI Confidence Metrics</h3>
            <div className="space-y-6">
              {aiConfidence.map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-2">
                    <span className="font-display text-sm text-white">{item.label}</span>
                    <span className="font-mono text-xs text-text-muted">{item.value}%</span>
                  </div>
                  <div className="h-2.5 bg-surface-highest rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.value}%` }}
                      transition={{ duration: 1, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                      className={`h-full rounded-full ${item.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </GlowCard>
      </div>

      {/* Competency Cards */}
      {competencies.map((comp, ci) => (
        <GlowCard key={ci} accent={comp.accent}>
          <div className="p-8">
            <div className="flex items-center gap-3 mb-8">
              <comp.icon size={24} className={
                comp.accent === 'orange' ? 'text-primary' :
                comp.accent === 'cyan' ? 'text-secondary' : 'text-tertiary'
              } />
              <h3 className="font-display text-lg font-semibold text-white">{comp.category}</h3>
              <span className="ml-auto font-mono text-sm text-white">{comp.score}%</span>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {comp.items.map((item, ii) => (
                <div key={ii}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-sm text-text-secondary">{item.name}</span>
                    <span className="font-mono text-xs text-text-muted">{item.score}%</span>
                  </div>
                  <div className="h-2 bg-surface-highest rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.score}%` }}
                      transition={{ duration: 1, delay: ii * 0.1 + ci * 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className={`h-full rounded-full ${
                        comp.accent === 'orange' ? 'bg-primary' :
                        comp.accent === 'cyan' ? 'bg-secondary' : 'bg-tertiary'
                      }`}
                      style={{
                        boxShadow: `0 0 8px ${
                          comp.accent === 'orange' ? '#FF7A00' :
                          comp.accent === 'cyan' ? '#00EEFC' : '#C185FF'
                        }40`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </GlowCard>
      ))}

      {/* Comparison Chart */}
      <GlowCard accent="cyan">
        <div className="p-8">
          <h3 className="font-display text-lg font-semibold text-white mb-6">Category Comparison</h3>
          <div className="grid md:grid-cols-4 gap-4">
            {competencies.map((comp, i) => (
              <div key={i} className="text-center p-5 bg-surface-low border border-outline-variant/20 rounded-xl">
                <comp.icon size={24} className={`mx-auto mb-3 ${
                  comp.accent === 'orange' ? 'text-primary' :
                  comp.accent === 'cyan' ? 'text-secondary' : 'text-tertiary'
                }`} />
                <p className="font-display text-sm text-white mb-2">{comp.category}</p>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.15, type: 'spring' }}
                  className="font-display text-3xl font-extrabold text-white"
                >
                  {comp.score}
                  <span className="text-xs text-text-muted font-mono">%</span>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </GlowCard>
    </div>
  );
}
