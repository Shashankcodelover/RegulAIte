"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, AlertTriangle, Eye, BookOpen } from "lucide-react";
import type { RedFlag } from "@/lib/mockData";

type Props = {
  flag: RedFlag;
  index: number;
};

function severityBadgeClass(severity: number): string {
  if (severity >= 9) return "badge badge-critical";
  if (severity >= 7) return "badge badge-high";
  if (severity >= 5) return "badge badge-medium";
  return "badge badge-low";
}

function severityLabel(severity: number): string {
  if (severity >= 9) return "CRITICAL";
  if (severity >= 7) return "HIGH";
  if (severity >= 5) return "MEDIUM";
  return "LOW";
}

export default function RedFlagCard({ flag, index }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      className="glass-card"
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, delay: index * 0.07 }}
      style={{ overflow: "hidden" }}
    >
      {/* Header row */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "1rem",
          padding: "1rem 1.25rem",
          cursor: "pointer",
          userSelect: "none",
        }}
        onClick={() => setOpen(!open)}
      >
        {/* Severity indicator bar */}
        <div
          style={{
            width: 4,
            borderRadius: 4,
            alignSelf: "stretch",
            background:
              flag.severity >= 9
                ? "var(--danger)"
                : flag.severity >= 7
                ? "#f59e0b"
                : flag.severity >= 5
                ? "var(--accent)"
                : "var(--success)",
            flexShrink: 0,
            minHeight: 48,
          }}
        />

        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.625rem",
              flexWrap: "wrap",
              marginBottom: "0.375rem",
            }}
          >
            <AlertTriangle
              size={14}
              color={flag.severity >= 9 ? "var(--danger)" : "#f59e0b"}
              strokeWidth={2}
            />
            <span
              style={{
                fontWeight: 600,
                fontSize: "0.9rem",
                color: "var(--text-primary)",
              }}
            >
              {flag.category}
            </span>
            <span className={severityBadgeClass(flag.severity)}>
              {severityLabel(flag.severity)} · {flag.severity}/10
            </span>
            <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
              {flag.citation}
            </span>
          </div>
          <p
            style={{
              fontSize: "0.8rem",
              color: "var(--text-secondary)",
              lineHeight: 1.5,
              display: "-webkit-box",
              WebkitLineClamp: open ? "unset" : 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            &ldquo;{flag.clause_text}&rdquo;
          </p>
        </div>

        <div style={{ flexShrink: 0, color: "var(--text-muted)" }}>
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </div>

      {/* Expanded content */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ overflow: "hidden" }}
          >
            <div
              style={{
                borderTop: "1px solid var(--border-subtle)",
                padding: "1rem 1.25rem 1.25rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              {/* Impact */}
              <div>
                <div
                  style={{
                    fontSize: "0.7rem",
                    color: "var(--text-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    marginBottom: "0.25rem",
                  }}
                >
                  Legal Impact
                </div>
                <p style={{ fontSize: "0.85rem", color: "#fda4af" }}>{flag.impact}</p>
              </div>

              {/* ELI12 */}
              <div
                style={{
                  background: "rgba(56,189,248,0.06)",
                  border: "1px solid rgba(56,189,248,0.15)",
                  borderRadius: 10,
                  padding: "0.875rem",
                  display: "flex",
                  gap: "0.625rem",
                }}
              >
                <Eye size={15} color="var(--accent)" strokeWidth={2} style={{ flexShrink: 0, marginTop: 2 }} />
                <div>
                  <div
                    style={{
                      fontSize: "0.7rem",
                      color: "var(--accent)",
                      fontWeight: 600,
                      letterSpacing: "0.04em",
                      marginBottom: "0.25rem",
                    }}
                  >
                    ELI12 — Plain English
                  </div>
                  <p style={{ fontSize: "0.83rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                    {flag.eli12}
                  </p>
                </div>
              </div>

              {/* Historical match */}
              <div
                style={{
                  background: "rgba(245,158,11,0.06)",
                  border: "1px solid rgba(245,158,11,0.2)",
                  borderRadius: 10,
                  padding: "0.875rem",
                  display: "flex",
                  gap: "0.625rem",
                }}
              >
                <BookOpen size={15} color="#f59e0b" strokeWidth={2} style={{ flexShrink: 0, marginTop: 2 }} />
                <div>
                  <div
                    style={{
                      fontSize: "0.7rem",
                      color: "#f59e0b",
                      fontWeight: 600,
                      letterSpacing: "0.04em",
                      marginBottom: "0.25rem",
                    }}
                  >
                    Real-World Corporate Parallel
                  </div>
                  <p style={{ fontSize: "0.83rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                    {flag.historical_match}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
