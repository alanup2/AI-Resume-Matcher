'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  ChevronRight,
  FileText,
  GraduationCap,
  Briefcase,
  Wrench,
  Target,
  AArrowDown,
} from 'lucide-react';
import GlowCard from '@/components/ui/GlowCard';
import AnalysisCard from '@/components/ui/AnalysisCard';
import SkillTag from '@/components/ui/SkillTag';
import ProgressRing from '@/components/ui/ProgressRing';

const sections = [
  {
    id: 'experience',
    title: 'Experience Analysis',
    icon: Briefcase,
    score: 82,
    accent: 'orange' as const,
    details: [
      '5+ years of frontend development experience identified',
      'Strong progression from junior to senior roles',
      'Leadership experience in 2 major projects',
      'Gap: No managerial experience detected',
    ],
    skills: ['React', 'TypeScript', 'Next.js', 'Node.js', 'GraphQL'],
  },
  {
    id: 'education',
    title: 'Education Analysis',
    icon: GraduationCap,
    score: 90,
    accent: 'cyan' as const,
    details: [
      'Bachelor of Science in Computer Science',
      'Relevant coursework in algorithms and data structures',
      'Multiple certifications in cloud technologies',
      'Gap: No advanced degree detected',
    ],
    skills: ['CS Fundamentals', 'Algorithms', 'Cloud Architecture'],
  },
  {
    id: 'technical',
    title: 'Technical Skills',
    icon: Wrench,
    score: 78,
    accent: 'purple' as const,
    details: [
      'Proficient in modern JavaScript ecosystem',
      'Experience with cloud platforms (AWS basics)',
      'CI/CD pipeline knowledge detected',
      'Gap: No Kubernetes or Docker experience',
    ],
    skills: ['JavaScript', 'TypeScript', 'React', 'AWS', 'CI/CD'],
  },
  {
    id: 'ats',
    title: 'ATS Optimization',
    icon: Target,
    score: 65,
    accent: 'orange' as const,
    details: [
      'Resume format is ATS-compatible',
      'Keyword density could be improved for target roles',
      'Missing industry-standard terminology',
      'Recommend restructuring skills section',
    ],
    skills: ['ATS Keywords', 'Format Optimization', 'Semantic Markup'],
  },
];

const insights = [
  { label: 'Overall Score', value: '78%', color: 'text-primary' },
  { label: 'Keyword Match', value: '82%', color: 'text-secondary' },
  { label: 'Format Score', value: '91%', color: 'text-tertiary' },
  { label: 'Completeness', value: '74%', color: 'text-primary' },
];

export default function AnalysisPage() {
  const [expanded, setExpanded] = useState<string | null>('experience');

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <span className="font-mono text-xs text-primary tracking-[0.1em]">ANALYSIS // BREAKDOWN</span>
        <h1 className="font-display text-3xl font-bold text-white mt-2">Full Resume Analysis</h1>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {insights.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-2xl p-5 text-center"
          >
            <p className="font-mono text-[10px] text-text-muted tracking-wider mb-2">{item.label}</p>
            <p className={`font-display text-3xl font-extrabold ${item.color}`}>{item.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Main Analysis Content */}
      <div className="grid lg:grid-cols-[1fr_400px] gap-6">
        <div className="space-y-4">
          {sections.map((section) => (
            <GlowCard key={section.id} accent={section.accent}>
              <div className="p-6">
                <button
                  onClick={() => setExpanded(expanded === section.id ? null : section.id)}
                  className="w-full flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <section.icon size={20} className={section.accent === 'orange' ? 'text-primary' : section.accent === 'cyan' ? 'text-secondary' : 'text-tertiary'} />
                    <h3 className="font-display text-lg font-semibold text-white">{section.title}</h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm text-white">{section.score}%</span>
                    {expanded === section.id ? <ChevronDown size={18} className="text-text-muted" /> : <ChevronRight size={18} className="text-text-muted" />}
                  </div>
                </button>

                <div className="mt-3 h-1.5 bg-surface-highest rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${section.score}%` }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className={`h-full rounded-full ${section.accent === 'orange' ? 'bg-primary' : section.accent === 'cyan' ? 'bg-secondary' : 'bg-tertiary'}`}
                  />
                </div>

                <AnimatePresence>
                  {expanded === section.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-6 space-y-4">
                        <div className="space-y-2">
                          {section.details.map((detail, i) => (
                            <div key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                              <span className={detail.startsWith('Gap:') ? 'text-error shrink-0' : 'text-secondary shrink-0'}>
                                {detail.startsWith('Gap:') ? '−' : '+'}
                              </span>
                              {detail}
                            </div>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-2 pt-2">
                          {section.skills.map((skill, i) => (
                            <SkillTag key={i} name={skill} variant={section.accent === 'orange' ? 'cyan' : section.accent === 'cyan' ? 'purple' : 'default'} />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </GlowCard>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <GlowCard accent="cyan">
            <div className="p-6">
              <h3 className="font-display text-lg font-semibold text-white mb-4">AI-Generated Insights</h3>
              <div className="space-y-3">
                {[
                  'Your resume scores well in technical skills but could improve leadership indicators',
                  'Consider adding more quantifiable achievements with metrics',
                  'ATS optimization needed for better keyword matching',
                  'Education section is strong - consider adding certifications',
                ].map((insight, i) => (
                  <div key={i} className="flex gap-2 p-3 bg-surface-low border border-outline-variant/20">
                    <span className="text-secondary shrink-0 text-xs mt-0.5">💡</span>
                    <p className="text-xs text-text-secondary leading-relaxed">{insight}</p>
                  </div>
                ))}
              </div>
            </div>
          </GlowCard>

          <GlowCard accent="purple">
            <div className="p-6">
              <h3 className="font-display text-lg font-semibold text-white mb-4">Section Scores</h3>
              <div className="space-y-4">
                {sections.map((section) => (
                  <div key={section.id}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-text-secondary">{section.title}</span>
                      <span className="font-mono text-xs text-white">{section.score}%</span>
                    </div>
                    <div className="h-1.5 bg-surface-highest rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${section.score}%` }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className={`h-full rounded-full ${section.accent === 'orange' ? 'bg-primary' : section.accent === 'cyan' ? 'bg-secondary' : 'bg-tertiary'}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </GlowCard>
        </div>
      </div>
    </div>
  );
}
