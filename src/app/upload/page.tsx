'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Brain, CheckCircle, Upload } from 'lucide-react';
import axios from 'axios';
import UploadZone from '@/components/ui/UploadZone';
import AIProcessingAnimation from '@/components/ui/AIProcessingAnimation';
import GlowCard from '@/components/ui/GlowCard';
import SkillTag from '@/components/ui/SkillTag';
import ProgressRing from '@/components/ui/ProgressRing';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { getMatchClass } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface AnalysisData {
  ai: { score: number; skills: string[]; suggestions: string[] };
  matches: { role: string; match: number; matchedSkills: string[]; missingSkills: string[] }[];
}

export default function UploadPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<AnalysisData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('resume', file);
      const res = await axios.post('/api/resume/upload', formData);
      setData(res.data);
    } catch {
      setError('Failed to analyze resume. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const gaugeCircumference = 691;
  const gaugeOffset = data ? gaugeCircumference - (data.ai.score / 100) * gaugeCircumference : gaugeCircumference;

  return (
    <div className="space-y-12">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-[700px] mx-auto"
      >
        <span className="font-mono text-xs text-primary tracking-[0.1em] block mb-4">
          SYSTEM_READY // UPLOAD_RESUME
        </span>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tighter text-white mb-6">
          Analyze Your Resume with{' '}
          <span className="text-gradient-orange">AI Precision</span>
        </h1>
        <p className="text-lg text-text-secondary max-w-[560px] mx-auto">
          Upload your resume to get instant AI-powered analysis, skill matching, and job recommendations.
        </p>
      </motion.div>

      {/* Upload Zone */}
      {!data && !loading && (
        <UploadZone
          file={file}
          onFileSelect={setFile}
          onAnalyze={handleUpload}
          loading={loading}
        />
      )}

      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-error font-mono text-xs"
        >
          {error}
        </motion.p>
      )}

      {loading && <AIProcessingAnimation />}

      {/* Engine Architecture */}
      {!data && !loading && (
        <section>
          <div className="flex items-center gap-4 mb-12">
            <div className="flex-1 h-px bg-outline-variant/30" />
            <span className="font-mono text-xs text-primary tracking-widest uppercase px-4">
              Precision Engine Architecture
            </span>
            <div className="flex-1 h-px bg-outline-variant/30" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <GlowCard accent="orange" delay={0.1}>
              <div className="p-8">
                <div className="absolute top-4 right-4 opacity-5 text-[96px] leading-none">
                  <Upload size={96} />
                </div>
                <div className="font-mono text-xs text-primary mb-4">01 // EXTRACT</div>
                <h4 className="font-display text-xl font-semibold text-white mb-4">PDF Extraction</h4>
                <p className="text-text-secondary text-sm leading-relaxed mb-6">
                  Parse and extract text from uploaded resume documents using advanced PDF processing.
                </p>
                <div className="flex justify-between font-mono text-[10px] text-text-muted mb-3">
                  <span>PROCESSING_VECTORS</span>
                  <span className="text-primary">ACTIVE</span>
                </div>
                <div className="h-1 bg-surface-highest rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-primary rounded-full shadow-neon" />
                </div>
              </div>
            </GlowCard>

            <GlowCard accent="cyan" delay={0.2}>
              <div className="p-8">
                <div className="absolute top-4 right-4 opacity-5 text-[96px] leading-none">
                  <Brain size={96} />
                </div>
                <div className="font-mono text-xs text-secondary mb-4">02 // ANALYZE</div>
                <h4 className="font-display text-xl font-semibold text-white mb-4">Gemini AI Core</h4>
                <p className="text-text-secondary text-sm leading-relaxed mb-6">
                  Deep semantic analysis identifies skills, experience, and career trajectory using Google Gemini 2.0.
                </p>
                <div className="flex gap-2">
                  <SkillTag name="NLP_CONTEXT" variant="cyan" />
                  <SkillTag name="SEMANTIC_MAP" variant="cyan" />
                </div>
              </div>
            </GlowCard>

            <GlowCard accent="purple" delay={0.3}>
              <div className="p-8">
                <div className="absolute top-4 right-4 opacity-5 text-[96px] leading-none">
                  <CheckCircle size={96} />
                </div>
                <div className="font-mono text-xs text-tertiary mb-4">03 // ALIGN</div>
                <h4 className="font-display text-xl font-semibold text-white mb-4">Skill Matching</h4>
                <p className="text-text-secondary text-sm leading-relaxed mb-6">
                  Match extracted skills against job roles with automated gap analysis and scoring.
                </p>
                <div className="flex items-center gap-4">
                  <span className="font-display text-3xl font-extrabold text-tertiary">AI</span>
                  <div className="font-mono text-[10px] text-text-muted leading-tight">
                    POWERED<br />SCORING
                  </div>
                </div>
              </div>
            </GlowCard>
          </div>
        </section>
      )}

      {/* Results */}
      <AnimatePresence>
        {data && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Bento Grid */}
            <div className="grid lg:grid-cols-[7fr_5fr] gap-6">
              <GlowCard accent="orange">
                <div className="p-10 flex flex-col items-center">
                  <span className="font-mono text-xs text-primary tracking-[0.1em] mb-4">
                    OVERALL ALIGNMENT INDEX
                  </span>
                  <ProgressRing value={data.ai.score} size={220} />
                  <div className="mt-8 text-center">
                    <h2 className="font-display text-2xl font-semibold text-white mb-2">Resume Analysis</h2>
                    <p className="text-text-secondary text-sm">AI-powered evaluation of your professional profile</p>
                  </div>
                </div>
              </GlowCard>

              <GlowCard accent="cyan">
                <div className="p-8 h-full flex flex-col relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/[0.02] to-transparent pointer-events-none" />
                  <div className="flex items-center gap-3 mb-6">
                    <Brain className="text-secondary" size={24} />
                    <h3 className="font-display text-xl font-semibold text-white">AI Improvement Engine</h3>
                  </div>
                  <div className="flex-1 space-y-4">
                    {(data.ai.suggestions || []).slice(0, 3).map((s, i) => (
                      <div key={i} className="p-4 bg-surface-low border border-outline-variant/30">
                        <div className="font-mono text-[10px] text-tertiary mb-1">SUGGESTION {i + 1}</div>
                        <p className="text-text-secondary text-sm leading-relaxed">{s}</p>
                      </div>
                    ))}
                  </div>
                  <AnimatedButton variant="ghost" className="mt-4 w-full border border-secondary/50 text-secondary hover:bg-secondary/10">
                    Apply Suggestions
                  </AnimatedButton>
                </div>
              </GlowCard>
            </div>

            {/* Skills Matrix */}
            <div className="grid md:grid-cols-[2fr_1fr] gap-6">
              <GlowCard accent="cyan">
                <div className="p-8">
                  <div className="flex items-center justify-between mb-8 flex-wrap gap-2">
                    <h3 className="font-display text-xl font-semibold text-white">Extracted Skills Matrix</h3>
                    <span className="font-mono text-xs text-text-muted">
                      {(data.ai.skills || []).length} KEYWORDS IDENTIFIED
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {(data.ai.skills || []).slice(0, 20).map((skill, i) => (
                      <SkillTag
                        key={i}
                        name={skill}
                        variant={i < 5 ? 'cyan' : i < 10 ? 'purple' : 'default'}
                        size="md"
                      />
                    ))}
                  </div>

                  <div className="mt-12">
                    <div className="font-mono text-xs text-text-muted mb-6">COMPETENCY HEATMAP</div>
                    <div className="space-y-4">
                      {data.matches.map((job, i) => (
                        <div key={i} className="flex items-center gap-4">
                          <span className="w-[160px] font-display text-sm font-semibold flex-shrink-0">{job.role}</span>
                          <div className="flex-1 h-[6px] bg-surface-highest overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${job.match}%` }}
                              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                              className="h-full bg-secondary"
                              style={{ boxShadow: '0 0 12px rgba(0,238,252,0.3)' }}
                            />
                          </div>
                          <span className="w-12 text-right font-mono text-xs">{job.match}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </GlowCard>

              <div className="space-y-6">
                <GlowCard accent="orange" className="!border-l-4 !border-l-error">
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-error">⚠</span>
                      <h3 className="font-display text-xl font-semibold text-white">Missing Criteria</h3>
                    </div>
                    <ul className="space-y-4">
                      {data.matches.flatMap((job) =>
                        job.missingSkills.slice(0, 2).map((skill, i) => (
                          <li key={`${job.role}-${i}`} className="flex gap-3">
                            <span className="text-error text-sm shrink-0 mt-0.5">✕</span>
                            <div>
                              <div className="font-display text-sm font-semibold text-white">{skill}</div>
                              <div className="text-xs text-text-muted mt-0.5">Missing for {job.role}</div>
                            </div>
                          </li>
                        ))
                      ).slice(0, 4)}
                    </ul>
                  </div>
                </GlowCard>

                <GlowCard accent="purple">
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs text-text-muted">MARKET BENCHMARK</span>
                      <span className="font-display font-extrabold text-secondary">
                        +{data.ai.score > 50 ? data.ai.score - 30 : 12}%
                      </span>
                    </div>
                    <div className="font-display text-2xl font-semibold text-white mb-2">
                      Top {data.ai.score > 70 ? '10' : data.ai.score > 50 ? '25' : '50'}%
                    </div>
                    <p className="text-xs text-text-muted leading-relaxed">
                      Candidate performs higher than {data.ai.score}% of applicants in overall skill alignment.
                    </p>
                  </div>
                </GlowCard>
              </div>
            </div>

            {/* Analysis Table */}
            <GlowCard accent="orange">
              <div className="p-0">
                <div className="flex items-center justify-between p-6 border-b border-outline-variant/10">
                  <h3 className="font-display text-xl font-semibold text-white">Segmented Analysis</h3>
                  <div className="flex gap-4">
                    <button className="px-3 py-1 font-mono text-xs bg-primary text-primary-dark border border-primary cursor-pointer">
                      INSIGHTS
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-surface-low">
                        <th className="text-left px-8 py-4 font-mono text-xs text-text-muted tracking-[0.1em]">ROLE</th>
                        <th className="text-left px-8 py-4 font-mono text-xs text-text-muted tracking-[0.1em]">MATCH SCORE</th>
                        <th className="text-left px-8 py-4 font-mono text-xs text-text-muted tracking-[0.1em]">STATUS</th>
                        <th className="text-right px-8 py-4 font-mono text-xs text-text-muted tracking-[0.1em]">DETAILS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.matches.map((job, i) => {
                        const cls = getMatchClass(job.match);
                        return (
                          <tr key={i} className="border-b border-outline-variant/10 hover:bg-primary/[0.02] transition-colors">
                            <td className="px-8 py-6 font-display text-sm font-semibold">{job.role}</td>
                            <td className="px-8 py-6">
                              <div className="flex items-center gap-3">
                                <div className="w-16 h-1 bg-surface-highest overflow-hidden">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${job.match}%` }}
                                    transition={{ duration: 1, delay: i * 0.1 }}
                                    className={`h-full ${cls === 'high' ? 'bg-secondary' : cls === 'medium' ? 'bg-primary' : 'bg-error'}`}
                                  />
                                </div>
                                <span className="font-mono text-xs">{job.match}%</span>
                              </div>
                            </td>
                            <td className="px-8 py-6">
                              <span className={`font-mono text-[10px] tracking-wider px-2 py-1 border ${
                                cls === 'high' ? 'bg-secondary/10 text-secondary border-secondary/20' :
                                cls === 'medium' ? 'bg-primary/10 text-primary border-primary/20' :
                                'bg-error/10 text-error border-error/20'
                              }`}>
                                {cls === 'high' ? 'STRONG MATCH' : cls === 'medium' ? 'MODERATE' : 'GAP'}
                              </span>
                            </td>
                            <td className="px-8 py-6 text-right">
                              <div className="flex gap-3 justify-end font-mono text-[11px]">
                                <span className="text-secondary">{job.matchedSkills.length} matched</span>
                                <span className="text-error">{job.missingSkills.length} missing</span>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </GlowCard>

            {/* Footer */}
            <div className="text-center pt-12 pb-6">
              <p className="font-mono text-[10px] text-text-muted tracking-[0.2em] uppercase mb-4">
                Precision Intelligence Engine v2.0 Stable
              </p>
              <div className="flex justify-center gap-2">
                <span className="w-1 h-1 rounded-full bg-primary" />
                <span className="w-1 h-1 rounded-full bg-secondary" />
                <span className="w-1 h-1 rounded-full bg-tertiary" />
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
