"use client";
import { motion } from "framer-motion";

type Props = {
  score: number; // 0–100
  vendorLabel?: string;
  clientLabel?: string;
};

function getGaugeColor(score: number) {
  if (score >= 60) return "#f43f5e"; // vendor-heavy
  if (score <= 40) return "#38bdf8"; // client-heavy
  return "#10b981"; // balanced
}

function getLabel(score: number) {
  if (score >= 70) return { text: "Vendor-Favored", color: "#f43f5e" };
  if (score <= 30) return { text: "Client-Favored", color: "#38bdf8" };
  return { text: "Balanced", color: "#10b981" };
}

export default function RiskGauge({ score, vendorLabel = "Vendor", clientLabel = "Client" }: Props) {
  const clampedScore = Math.max(0, Math.min(100, score));
  // Semicircle: 0 = left (client-favored), 100 = right (vendor-favored)
  // Needle angle: -90deg (left) to +90deg (right), 0deg = center
  const needleAngle = -90 + (clampedScore / 100) * 180;
  const gaugeColor = getGaugeColor(clampedScore);
  const label = getLabel(clampedScore);

  // SVG arc parameters
  const cx = 120, cy = 120, r = 90;
  const strokeWidth = 18;

  // Arc from left to right across the top
  const arcStart = { x: cx - r, y: cy };
  const arcEnd = { x: cx + r, y: cy };

  // Background arc path (grey)
  const bgPath = `M ${arcStart.x} ${arcStart.y} A ${r} ${r} 0 0 1 ${arcEnd.x} ${arcEnd.y}`;

  // Filled arc: fraction of 0–score
  const frac = clampedScore / 100;
  const endAngle = Math.PI - frac * Math.PI; // goes from PI (left) to 0 (right)
  const endX = cx + r * Math.cos(Math.PI - frac * Math.PI);
  const endY = cy - r * Math.sin(Math.PI - frac * Math.PI);
  const largeFrac = frac > 0.5 ? 1 : 0;
  const fillPath = `M ${arcStart.x} ${arcStart.y} A ${r} ${r} 0 ${largeFrac} 1 ${endX} ${endY}`;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.5rem",
        padding: "1rem 0",
      }}
    >
      <div style={{ position: "relative", width: 240, height: 140 }}>
        <svg width={240} height={140} viewBox="0 0 240 140">
          {/* Background track */}
          <path
            d={bgPath}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          {/* Colored fill */}
          <motion.path
            d={fillPath}
            fill="none"
            stroke={gaugeColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
            style={{ filter: `drop-shadow(0 0 6px ${gaugeColor}80)` }}
          />
          {/* Zone markers */}
          <text x={20} y={130} fontSize={9} fill="#94a3b8" textAnchor="middle">{clientLabel}</text>
          <text x={220} y={130} fontSize={9} fill="#94a3b8" textAnchor="middle">{vendorLabel}</text>
          <text x={120} y={40} fontSize={9} fill="#94a3b8" textAnchor="middle">Balanced</text>

          {/* Needle */}
          <motion.g
            initial={{ rotate: -90, transformOrigin: `${cx}px ${cy}px` }}
            animate={{ rotate: needleAngle, transformOrigin: `${cx}px ${cy}px` }}
            transition={{ duration: 1.2, type: "spring", stiffness: 60, damping: 12, delay: 0.4 }}
          >
            <line
              x1={cx}
              y1={cy}
              x2={cx}
              y2={cy - 70}
              stroke="white"
              strokeWidth={2.5}
              strokeLinecap="round"
              opacity={0.9}
            />
          </motion.g>
          {/* Needle hub */}
          <circle cx={cx} cy={cy} r={7} fill="#1e293b" stroke="rgba(255,255,255,0.3)" strokeWidth={2} />

          {/* Score center */}
          <text x={cx} y={cy + 28} fontSize={24} fontWeight={700} fill="white" textAnchor="middle">
            {clampedScore}
          </text>
          <text x={cx} y={cy + 42} fontSize={8} fill="#94a3b8" textAnchor="middle">
            RISK SCORE
          </text>
        </svg>
      </div>
      {/* Label badge */}
      <div
        style={{
          background: `${gaugeColor}15`,
          border: `1px solid ${gaugeColor}40`,
          borderRadius: 999,
          padding: "0.3rem 0.875rem",
          fontSize: "0.75rem",
          fontWeight: 700,
          color: gaugeColor,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
        }}
      >
        {label.text}
      </div>
    </div>
  );
}
