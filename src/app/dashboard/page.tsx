'use client';

import { motion } from 'framer-motion';
import {
  Brain,
  Target,
  TrendingUp,
  Users,
  AlertTriangle,
  Briefcase,
  Activity,
  Sparkles,
} from 'lucide-react';
import GlowCard from '@/components/ui/GlowCard';
import ScoreCard from '@/components/ui/ScoreCard';
import ProgressRing from '@/components/ui/ProgressRing';
import RadarChart from '@/components/ui/RadarChart';

const recentAnalyses = [
  { role: 'Senior Frontend Developer', score: 85, date: '2 hours ago', status: 'strong' },
  { role: 'Full Stack Engineer', score: 62, date: '1 day ago', status: 'moderate' },
  { role: 'DevOps Engineer', score: 41, date: '3 days ago', status: 'gap' },
  { role: 'Data Scientist', score: 78, date: '1 week ago', status: 'strong' },
];

const activities = [
  { action: 'Resume analyzed', detail: 'Senior Frontend Developer', time: '2h ago' },
  { action: 'Skill gap detected', detail: 'Kubernetes missing for DevOps', time: '1d ago' },
  { action: 'ATS score updated', detail: 'New optimization available', time: '2d ago' },
  { action: 'Job match found', detail: 'Full Stack Engineer - 85% match', time: '3d ago' },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <span className="font-mono text-xs text-primary tracking-[0.1em]">DASHBOARD // OVERVIEW</span>
        <h1 className="font-display text-3xl font-bold text-white mt-2">Resume Analytics Dashboard</h1>
      </motion.div>

      {/* Score Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <ScoreCard label="Total Score" value="78" icon={<Brain size={24} />} trend="up" />
        <ScoreCard label="ATS Score" value="92" icon={<Target size={24} />} trend="up" />
        <ScoreCard label="Skill Match" value="64%" icon={<TrendingUp size={24} />} trend="up" />
        <ScoreCard label="Missing Skills" value="12" icon={<AlertTriangle size={24} />} trend="down" />
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-[1fr_1fr] gap-6">
        {/* Radar Chart */}
        <GlowCard accent="orange">
          <div className="p-8">
            <h3 className="font-display text-lg font-semibold text-white mb-6">Competency Radar</h3>
            <div className="flex justify-center">
              <RadarChart
                data={[
                  { label: 'TECHNICAL', value: 85 },
                  { label: 'COMMUNICATION', value: 70 },
                  { label: 'LEADERSHIP', value: 45 },
                  { label: 'PROBLEM', value: 80 },
                  { label: 'TEAMWORK', value: 75 },
                  { label: 'ADAPTABILITY', value: 65 },
                ]}
              />
            </div>
          </div>
        </GlowCard>

        {/* AI Recommendations */}
        <GlowCard accent="cyan">
          <div className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="text-secondary" size={24} />
              <h3 className="font-display text-lg font-semibold text-white">AI Recommendations</h3>
            </div>
            <div className="space-y-4">
              {[
                'Add cloud computing skills (AWS/GCP) to improve DevOps match',
                'Include quantifiable achievements in experience section',
                'Add missing soft skills: leadership, conflict resolution',
                'Optimize ATS keywords for frontend roles',
              ].map((rec, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-3 p-3 bg-surface-low border border-outline-variant/20"
                >
                  <span className="text-secondary shrink-0 mt-0.5">▶</span>
                  <p className="text-text-secondary text-sm">{rec}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </GlowCard>
      </div>

      {/* Second Row */}
      <div className="grid lg:grid-cols-[1fr_1fr] gap-6">
        {/* Resume Strength */}
        <GlowCard accent="purple">
          <div className="p-8">
            <h3 className="font-display text-lg font-semibold text-white mb-6">Resume Strength Meter</h3>
            <div className="space-y-5">
              {[
                { label: 'Experience', score: 80, color: 'bg-primary' },
                { label: 'Education', score: 90, color: 'bg-secondary' },
                { label: 'Skills', score: 65, color: 'bg-tertiary' },
                { label: 'ATS Compatibility', score: 92, color: 'bg-secondary' },
                { label: 'Formatting', score: 75, color: 'bg-primary' },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-display font-semibold text-white">{item.label}</span>
                    <span className="font-mono text-xs text-text-muted">{item.score}%</span>
                  </div>
                  <div className="h-2 bg-surface-highest rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.score}%` }}
                      transition={{ duration: 1, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                      className={`h-full rounded-full ${item.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </GlowCard>

        {/* Suggested Jobs */}
        <GlowCard accent="orange">
          <div className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <Briefcase className="text-primary" size={24} />
              <h3 className="font-display text-lg font-semibold text-white">Suggested Jobs</h3>
            </div>
            <div className="space-y-4">
              {[
                { role: 'Senior Frontend Developer', match: 92, company: 'TechCorp' },
                { role: 'Full Stack Engineer', match: 85, company: 'StartupX' },
                { role: 'UI Engineer', match: 78, company: 'DesignHub' },
                { role: 'React Developer', match: 88, company: 'WebFlow Inc' },
              ].map((job, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center justify-between p-4 bg-surface-low border border-outline-variant/20 hover:border-primary/30 transition-all cursor-pointer"
                >
                  <div>
                    <p className="font-display text-sm font-semibold text-white">{job.role}</p>
                    <p className="font-mono text-[10px] text-text-muted">{job.company}</p>
                  </div>
                  <span className="font-mono text-xs text-secondary">{job.match}% match</span>
                </motion.div>
              ))}
            </div>
          </div>
        </GlowCard>
      </div>

      {/* Recent Analyses & Activity */}
      <div className="grid lg:grid-cols-[1fr_1fr] gap-6">
        <GlowCard accent="cyan">
          <div className="p-8">
            <h3 className="font-display text-lg font-semibold text-white mb-6">Recent Analyses</h3>
            <div className="space-y-3">
              {recentAnalyses.map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-surface-low border border-outline-variant/20">
                  <div>
                    <p className="font-display text-sm font-semibold text-white">{item.role}</p>
                    <p className="font-mono text-[10px] text-text-muted">{item.date}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs" style={{ color: item.status === 'strong' ? '#00EEFC' : item.status === 'moderate' ? '#FF7A00' : '#FFB4AB' }}>
                      {item.score}%
                    </span>
                    <span className={`w-2 h-2 rounded-full ${item.status === 'strong' ? 'bg-secondary' : item.status === 'moderate' ? 'bg-primary' : 'bg-error'}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </GlowCard>

        <GlowCard accent="purple">
          <div className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <Activity className="text-tertiary" size={24} />
              <h3 className="font-display text-lg font-semibold text-white">Activity Timeline</h3>
            </div>
            <div className="space-y-0">
              {activities.map((item, i) => (
                <div key={i} className="relative pl-6 pb-6 last:pb-0">
                  <div className="absolute left-2 top-2 w-2 h-2 rounded-full bg-tertiary" />
                  {i < activities.length - 1 && (
                    <div className="absolute left-[11px] top-4 bottom-0 w-px bg-outline-variant/20" />
                  )}
                  <p className="font-display text-sm font-semibold text-white">{item.action}</p>
                  <p className="font-mono text-[10px] text-text-muted">{item.detail} • {item.time}</p>
                </div>
              ))}
            </div>
          </div>
        </GlowCard>
      </div>
    </div>
  );
}
