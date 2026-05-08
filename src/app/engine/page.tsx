'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Cpu,
  Activity,
  Database,
  Network,
  Zap,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';
import GlowCard from '@/components/ui/GlowCard';
import ScanningLine from '@/components/ui/ScanningLine';

const pipelines = [
  { name: 'PDF Extraction', status: 'active', progress: 100, icon: Database },
  { name: 'Text Parsing', status: 'active', progress: 100, icon: Activity },
  { name: 'Semantic Analysis', status: 'active', progress: 100, icon: Network },
  { name: 'Skill Extraction', status: 'active', progress: 100, icon: Cpu },
  { name: 'Job Matching', status: 'active', progress: 100, icon: Zap },
  { name: 'Report Generation', status: 'idle', progress: 0, icon: CheckCircle },
];

const metrics = [
  { label: 'Documents Processed', value: '1,247', change: '+12%' },
  { label: 'Avg Processing Time', value: '2.4s', change: '-8%' },
  { label: 'API Calls Today', value: '3,892', change: '+24%' },
  { label: 'Success Rate', value: '99.2%', change: '+0.3%' },
  { label: 'Active Models', value: '4', change: 'Stable' },
  { label: 'Queue Depth', value: '12', change: '-5' },
];

const nodeData = [
  { id: 1, label: 'INPUT', x: 10, y: 50, color: '#FF7A00' },
  { id: 2, label: 'PARSE', x: 30, y: 30, color: '#00EEFC' },
  { id: 3, label: 'ANALYZE', x: 30, y: 70, color: '#C185FF' },
  { id: 4, label: 'EXTRACT', x: 55, y: 50, color: '#FF7A00' },
  { id: 5, label: 'MATCH', x: 75, y: 30, color: '#00EEFC' },
  { id: 6, label: 'REPORT', x: 75, y: 70, color: '#C185FF' },
  { id: 7, label: 'OUTPUT', x: 92, y: 50, color: '#00EEFC' },
];

export default function EnginePage() {
  const [systemTime, setSystemTime] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setSystemTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <span className="font-mono text-xs text-primary tracking-[0.1em]">ENGINE // SYSTEM STATUS</span>
        <h1 className="font-display text-3xl font-bold text-white mt-2">AI Precision Engine</h1>
      </motion.div>

      {/* System Status Bar */}
      <GlowCard accent="orange">
        <div className="p-6 relative overflow-hidden">
          <ScanningLine />
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Cpu className="text-primary" size={32} />
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-secondary"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <div>
                <h2 className="font-display text-xl font-semibold text-white">PRECISION ENGINE</h2>
                <p className="font-mono text-[10px] text-primary tracking-wider">v2.0.4 // SYSTEM NOMINAL</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="font-mono text-[10px] text-text-muted">SYSTEM TIME</p>
                <p className="font-mono text-sm text-secondary">{systemTime || 'LOADING...'}</p>
              </div>
              <div className="text-right">
                <p className="font-mono text-[10px] text-text-muted">STATUS</p>
                <p className="font-mono text-sm text-secondary">ALL SYSTEMS OPERATIONAL</p>
              </div>
              <span className="w-3 h-3 rounded-full bg-secondary animate-pulse" />
            </div>
          </div>
        </div>
      </GlowCard>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
        {metrics.map((metric, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass rounded-xl p-4 text-center"
          >
            <p className="font-mono text-[9px] text-text-muted tracking-wider mb-1">{metric.label}</p>
            <p className="font-display text-lg font-extrabold text-white">{metric.value}</p>
            <span className="font-mono text-[9px] text-secondary">{metric.change}</span>
          </motion.div>
        ))}
      </div>

      {/* Pipeline + Flow Diagram */}
      <div className="grid lg:grid-cols-[1fr_1fr] gap-6">
        {/* Processing Pipelines */}
        <GlowCard accent="cyan">
          <div className="p-8">
            <h3 className="font-display text-lg font-semibold text-white mb-6">Processing Pipelines</h3>
            <div className="space-y-4">
              {pipelines.map((pipeline, i) => {
                const Icon = pipeline.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-4 p-4 bg-surface-low border border-outline-variant/20"
                  >
                    <Icon size={20} className={pipeline.status === 'active' ? 'text-secondary' : 'text-text-muted'} />
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="font-display text-sm font-semibold text-white">{pipeline.name}</span>
                        <span className={`font-mono text-[10px] ${pipeline.status === 'active' ? 'text-secondary' : 'text-text-muted'}`}>
                          {pipeline.status === 'active' ? 'ACTIVE' : 'IDLE'}
                        </span>
                      </div>
                      <div className="h-1.5 bg-surface-highest rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${pipeline.progress}%` }}
                          transition={{ duration: 1, delay: i * 0.1 }}
                          className="h-full rounded-full bg-secondary"
                        />
                      </div>
                    </div>
                    {pipeline.status === 'active' && (
                      <motion.span
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-2 h-2 rounded-full bg-secondary"
                      />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </GlowCard>

        {/* AI Flow Diagram */}
        <GlowCard accent="purple">
          <div className="p-8">
            <h3 className="font-display text-lg font-semibold text-white mb-6">Semantic Extraction Flow</h3>
            <div className="relative h-[400px] bg-surface-low/50 rounded-xl border border-outline-variant/10 overflow-hidden">
              {/* Connection lines */}
              <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
                {nodeData.slice(0, -1).map((node, i) => (
                  <line
                    key={i}
                    x1={`${node.x}%`}
                    y1={`${node.y}%`}
                    x2={`${nodeData[i + 1].x}%`}
                    y2={`${nodeData[i + 1].y}%`}
                    stroke="rgba(255,122,0,0.2)"
                    strokeWidth="2"
                  />
                ))}
                {nodeData.filter(n => n.id >= 4).map((node, i) => (
                  i > 0 && (
                    <line
                      key={`cross-${i}`}
                      x1={`${nodeData[3].x}%`}
                      y1={`${nodeData[3].y}%`}
                      x2={`${node.x}%`}
                      y2={`${node.y}%`}
                      stroke="rgba(0,238,252,0.15)"
                      strokeWidth="1"
                    />
                  )
                ))}
              </svg>

              {/* Nodes */}
              {nodeData.map((node, i) => (
                <motion.div
                  key={node.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 0.15, type: 'spring' }}
                  className="absolute flex flex-col items-center gap-1"
                  style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)' }}
                >
                  <motion.div
                    animate={{ boxShadow: [`0 0 0px ${node.color}`, `0 0 15px ${node.color}`, `0 0 0px ${node.color}`] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-xs font-mono font-bold"
                    style={{ background: `${node.color}20`, border: `1px solid ${node.color}40`, color: node.color }}
                  >
                    {node.label}
                  </motion.div>
                </motion.div>
              ))}

              {/* Processing glow */}
              <motion.div
                className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"
                animate={{ left: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              />
            </div>
          </div>
        </GlowCard>
      </div>

      {/* System Health */}
      <GlowCard accent="orange">
        <div className="p-8">
          <h3 className="font-display text-lg font-semibold text-white mb-6">System Health Monitoring</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'CPU Usage', value: '34%', color: 'bg-secondary', width: 34 },
              { label: 'Memory', value: '62%', color: 'bg-primary', width: 62 },
              { label: 'API Latency', value: '145ms', color: 'bg-secondary', width: 30 },
              { label: 'GPU Load', value: '18%', color: 'bg-tertiary', width: 18 },
            ].map((item, i) => (
              <div key={i} className="p-4 bg-surface-low border border-outline-variant/20 rounded-xl">
                <p className="font-mono text-[10px] text-text-muted mb-3">{item.label}</p>
                <div className="h-16 flex items-end gap-1 mb-2">
                  {Array.from({ length: 20 }).map((_, j) => (
                    <motion.div
                      key={j}
                      initial={{ height: 0 }}
                      animate={{ height: `${Math.sin(j + i * 5) * 30 + 50}%` }}
                      transition={{ duration: 0.5, delay: j * 0.02 }}
                      className="w-1 rounded-t"
                      style={{ background: item.color, opacity: 0.5 + Math.random() * 0.5 }}
                    />
                  ))}
                </div>
                <p className="font-display text-lg font-extrabold text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </GlowCard>
    </div>
  );
}
