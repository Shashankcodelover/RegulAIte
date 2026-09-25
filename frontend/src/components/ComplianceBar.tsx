"use client";
import { motion } from "framer-motion";

type Props = {
  label: string;
  score: number; // 0–100
  violations?: string[];
  accentColor?: string;
  delay?: number;
};

export default function ComplianceBar({
  label,
  score,
  violations = [],
  accentColor,
  delay = 0,
}: Props) {
  const color =
    accentColor ||
    (score >= 70 ? "var(--success)" : score >= 40 ? "#f59e0b" : "var(--danger)");

  const statusLabel =
    score >= 70 ? "Compliant" : score >= 40 ? "Partial" : "Non-Compliant";
  const statusColor =
    score >= 70 ? "var(--success)" : score >= 40 ? "#f59e0b" : "var(--danger)";

  return (
    <motion.div
      className="glass-card"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      style={{ padding: "1.25rem" }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "0.875rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: color,
              boxShadow: `0 0 8px ${color}80`,
            }}
          />
          <span style={{ fontWeight: 600, fontSize: "0.9375rem", color: "var(--text-primary)" }}>
            {label}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
          <span
            style={{
              fontSize: "1.25rem",
              fontWeight: 700,
              color: color,
            }}
          >
            {score}%
          </span>
          <span
            className="badge"
            style={{
              background: `${statusColor}15`,
              color: statusColor,
              border: `1px solid ${statusColor}30`,
            }}
          >
            {statusLabel}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="progress-track" style={{ marginBottom: violations.length ? "1rem" : 0 }}>
        <motion.div
          style={{ height: "100%", borderRadius: 999, background: color }}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.9, ease: "easeOut", delay: delay + 0.2 }}
        />
      </div>

      {/* Violations list */}
      {violations.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
          {violations.map((v, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.5rem",
                fontSize: "0.78rem",
                color: "var(--text-secondary)",
                lineHeight: 1.5,
              }}
            >
              <span style={{ color: "var(--danger)", marginTop: 2, flexShrink: 0 }}>•</span>
              {v}
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
