'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Briefcase,
  Crosshair,
  Users,
  Building2,
  Lightbulb,
  ChevronRight,
} from 'lucide-react';
import GlowCard from '@/components/ui/GlowCard';
import ProgressRing from '@/components/ui/ProgressRing';
import SkillTag from '@/components/ui/SkillTag';

const jobRoles = [
  { title: 'Senior Frontend Developer', match: 92, industry: 'Technology', level: 'Senior', trend: 'up' },
  { title: 'Full Stack Engineer', match: 85, industry: 'Technology', level: 'Mid-Senior', trend: 'up' },
  { title: 'UI/UX Engineer', match: 78, industry: 'Design', level: 'Senior', trend: 'stable' },
  { title: 'DevOps Engineer', match: 64, industry: 'Infrastructure', level: 'Mid', trend: 'up' },
  { title: 'Product Manager', match: 45, industry: 'Product', level: 'Senior', trend: 'stable' },
  { title: 'Data Engineer', match: 38, industry: 'Data', level: 'Mid', trend: 'down' },
];

const careerPaths = [
  {
    title: 'Frontend Architect',
    match: 88,
    description: 'Lead frontend architecture decisions across multiple teams',
    skills: ['System Design', 'Architecture', 'Team Leadership', 'React'],
  },
  {
    title: 'Engineering Manager',
    match: 62,
    description: 'Lead engineering teams and drive technical strategy',
    skills: ['Management', 'Hiring', 'Strategic Planning', 'Mentoring'],
  },
  {
    title: 'Technical Lead',
    match: 79,
    description: 'Guide technical direction while remaining hands-on',
    skills: ['Code Review', 'Architecture', 'Mentoring', 'React', 'TypeScript'],
  },
];

export default function AlignmentPage() {
  const [selectedRole, setSelectedRole] = useState(0);

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <span className="font-mono text-xs text-primary tracking-[0.1em]">ALIGNMENT // JOB MATCHING</span>
        <h1 className="font-display text-3xl font-bold text-white mt-2">Job-Role Alignment Engine</h1>
      </motion.div>

      {/* Top Row */}
      <div className="grid lg:grid-cols-[300px_1fr] gap-6">
        {/* Circular Gauge */}
        <GlowCard accent="orange">
          <div className="p-6 flex flex-col items-center">
            <span className="font-mono text-xs text-primary tracking-[0.1em] mb-4">MATCH CONFIDENCE</span>
            <ProgressRing value={82} size={200} />
            <p className="font-display text-lg font-semibold text-white mt-4">Strong Match</p>
            <p className="text-xs text-text-muted text-center mt-1">AI-verified alignment with selected role</p>
          </div>
        </GlowCard>

        <GlowCard accent="cyan">
          <div className="p-8">
            <h3 className="font-display text-lg font-semibold text-white mb-6">Role Alignment Breakdown</h3>
            <div className="space-y-5">
              {[
                { label: 'Technical Skills', value: 88, color: 'bg-primary' },
                { label: 'Experience Level', value: 92, color: 'bg-secondary' },
                { label: 'Industry Fit', value: 76, color: 'bg-tertiary' },
                { label: 'Career Trajectory', value: 70, color: 'bg-secondary' },
                { label: 'Culture Compatibility', value: 85, color: 'bg-primary' },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-1">
                    <span className="font-display text-sm text-white">{item.label}</span>
                    <span className="font-mono text-xs text-text-muted">{item.value}%</span>
                  </div>
                  <div className="h-2 bg-surface-highest rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.value}%` }}
                      transition={{ duration: 1, delay: i * 0.15 }}
                      className={`h-full rounded-full ${item.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </GlowCard>
      </div>

      {/* Job Roles List */}
      <GlowCard accent="purple">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <Briefcase className="text-tertiary" size={24} />
            <h3 className="font-display text-lg font-semibold text-white">Job Role Matches</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-outline-variant/10">
                  <th className="text-left pb-4 font-mono text-[10px] text-text-muted tracking-wider">ROLE</th>
                  <th className="text-left pb-4 font-mono text-[10px] text-text-muted tracking-wider">INDUSTRY</th>
                  <th className="text-left pb-4 font-mono text-[10px] text-text-muted tracking-wider">LEVEL</th>
                  <th className="text-left pb-4 font-mono text-[10px] text-text-muted tracking-wider">MATCH</th>
                  <th className="text-left pb-4 font-mono text-[10px] text-text-muted tracking-wider">TREND</th>
                </tr>
              </thead>
              <tbody>
                {jobRoles.map((job, i) => (
                  <motion.tr
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setSelectedRole(i)}
                    className={`border-b border-outline-variant/10 cursor-pointer transition-colors hover:bg-primary/[0.02] ${
                      selectedRole === i ? 'bg-primary/5' : ''
                    }`}
                  >
                    <td className="py-4 font-display text-sm font-semibold text-white">{job.title}</td>
                    <td className="py-4 text-text-secondary text-sm">{job.industry}</td>
                    <td className="py-4">
                      <span className="font-mono text-[10px] px-2 py-1 bg-surface-high border border-outline-variant/20 text-text-secondary">
                        {job.level}
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-surface-highest rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${job.match >= 70 ? 'bg-secondary' : job.match >= 50 ? 'bg-primary' : 'bg-error'}`}
                            style={{ width: `${job.match}%` }}
                          />
                        </div>
                        <span className="font-mono text-xs">{job.match}%</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className={`font-mono text-[10px] ${job.trend === 'up' ? 'text-secondary' : job.trend === 'down' ? 'text-error' : 'text-text-muted'}`}>
                        {job.trend === 'up' ? '↑ IMPROVING' : job.trend === 'down' ? '↓ DECLINING' : '→ STABLE'}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </GlowCard>

      {/* Career Paths */}
      <GlowCard accent="orange">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <Crosshair className="text-primary" size={24} />
            <h3 className="font-display text-lg font-semibold text-white">Career Path Prediction</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {careerPaths.map((path, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-5 bg-surface-low border border-outline-variant/20 rounded-xl hover:border-primary/30 transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-display text-base font-semibold text-white">{path.title}</h4>
                  <span className={`font-mono text-xs ${path.match >= 70 ? 'text-secondary' : 'text-primary'}`}>
                    {path.match}%
                  </span>
                </div>
                <p className="text-xs text-text-muted mb-3">{path.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {path.skills.map((skill, j) => (
                    <SkillTag key={j} name={skill} variant={j === 0 ? 'cyan' : 'default'} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </GlowCard>

      {/* Industry Fit */}
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { label: 'Technology', match: 92, icon: Briefcase },
          { label: 'Finance', match: 65, icon: Building2 },
          { label: 'Healthcare', match: 38, icon: Users },
        ].map((industry, i) => (
          <GlowCard key={i} accent={i === 0 ? 'cyan' : i === 1 ? 'purple' : 'orange'}>
            <div className="p-6 text-center">
              <industry.icon size={24} className={`mx-auto mb-3 ${i === 0 ? 'text-secondary' : i === 1 ? 'text-tertiary' : 'text-primary'}`} />
              <p className="font-display text-lg font-semibold text-white mb-2">{industry.label}</p>
              <motion.p
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.2, type: 'spring' }}
                className="font-display text-4xl font-extrabold"
                style={{ color: i === 0 ? '#00EEFC' : i === 1 ? '#C185FF' : '#FF7A00' }}
              >
                {industry.match}%
              </motion.p>
              <p className="font-mono text-[10px] text-text-muted mt-2">INDUSTRY FIT</p>
            </div>
          </GlowCard>
        ))}
      </div>
    </div>
  );
}
