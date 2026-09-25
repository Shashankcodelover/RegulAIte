"use client";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Props = {
  label: string;
  value: string | number;
  trend?: string;
  trendDir?: "up" | "down" | "flat";
  icon?: LucideIcon;
  accentColor?: string;
  delay?: number;
};

export default function KpiCard({
  label,
  value,
  trend,
  trendDir = "flat",
  icon: Icon,
  accentColor = "#38bdf8",
  delay = 0,
}: Props) {
  const TrendIcon =
    trendDir === "up" ? TrendingUp : trendDir === "down" ? TrendingDown : Minus;
  const trendClass =
    trendDir === "up"
      ? "kpi-trend-up"
      : trendDir === "down"
      ? "kpi-trend-down"
      : "kpi-trend-flat";

  return (
    <motion.div
      className="kpi-card glass-card-hover"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "0.25rem",
        }}
      >
        <span className="kpi-label">{label}</span>
        {Icon && (
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: 8,
              background: `${accentColor}15`,
              border: `1px solid ${accentColor}30`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon size={14} color={accentColor} strokeWidth={2} />
          </div>
        )}
      </div>
      <div className="kpi-value">{value}</div>
      {trend && (
        <div
          className={trendClass}
          style={{ display: "flex", alignItems: "center", gap: "0.25rem", marginTop: "0.25rem" }}
        >
          <TrendIcon size={11} strokeWidth={2} />
          {trend}
        </div>
      )}
    </motion.div>
  );
}
