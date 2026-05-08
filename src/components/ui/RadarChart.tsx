'use client';

import { motion } from 'framer-motion';

interface RadarData {
  label: string;
  value: number;
}

interface RadarChartProps {
  data: RadarData[];
  size?: number;
}

export default function RadarChart({ data, size = 280 }: RadarChartProps) {
  const cx = size / 2;
  const cy = size / 2;
  const radius = size * 0.35;
  const angleStep = (Math.PI * 2) / data.length;

  const getPoint = (index: number, value: number) => {
    const angle = angleStep * index - Math.PI / 2;
    const r = (value / 100) * radius;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  };

  const gridLevels = [0.25, 0.5, 0.75, 1];

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {gridLevels.map((level, i) => {
        const points = data.map((_, j) => getPoint(j, level * 100));
        return (
          <polygon
            key={i}
            points={points.map((p) => `${p.x},${p.y}`).join(' ')}
            fill="none"
            stroke="rgba(88,66,53,0.2)"
            strokeWidth={1}
          />
        );
      })}

      {data.map((_, i) => {
        const p1 = getPoint(i, 100);
        return <line key={i} x1={cx} y1={cy} x2={p1.x} y2={p1.y} stroke="rgba(88,66,53,0.15)" strokeWidth={1} />;
      })}

      <motion.polygon
        points={data.map((d, i) => {
          const p = getPoint(i, d.value);
          return `${p.x},${p.y}`;
        }).join(' ')}
        fill="rgba(255,122,0,0.15)"
        stroke="#FF7A00"
        strokeWidth={2}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{ filter: 'drop-shadow(0 0 8px rgba(255,122,0,0.3))' }}
      />

      {data.map((d, i) => {
        const p = getPoint(i, d.value);
        return (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r={4} fill="#FF7A00" />
            <text
              x={getPoint(i, 130).x}
              y={getPoint(i, 130).y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#A78B7C"
              fontSize={10}
              fontFamily="Space Mono"
            >
              {d.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
