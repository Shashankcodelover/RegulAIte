"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  FileText,
  AlertTriangle,
  BookOpen,
  Brain,
  TrendingUp,
  Download,
  Search,
  ChevronDown,
  ChevronUp,
  Calendar,
  User,
  Clock,
} from "lucide-react";
import Sidebar from "@/components/Sidebar";
import KpiCard from "@/components/KpiCard";
import RiskGauge from "@/components/RiskGauge";
import RedFlagCard from "@/components/RedFlagCard";
import { useAnalysis } from "@/lib/analysisContext";
import { MOCK_ANALYSIS } from "@/lib/mockData";

const CHART_MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

// Simple SVG risk trend chart
function RiskTrendChart({ riskScore }: { riskScore: number }) {
  const docsData = [12, 18, 14, 22, 19, 28, 25, 33, 30, 41, 38, 47];
  const riskData = [45, 52, 38, 61, 55, 49, 72, 65, 58, 77, 69, riskScore];

  const width = 560, height = 180, padL = 36, padB = 28, padR = 12, padT = 16;
  const chartW = width - padL - padR;
  const chartH = height - padB - padT;

  function toPath(data: number[], max: number) {
    return data
      .map((v, i) => {
        const x = padL + (i / (data.length - 1)) * chartW;
        const y = padT + chartH - (v / max) * chartH;
        return `${i === 0 ? "M" : "L"} ${x} ${y}`;
      })
      .join(" ");
  }

  const docsMax = Math.max(...docsData) * 1.2;
  const riskMax = 100;

  return (
    <svg
      width="100%"
      viewBox={`0 0 ${width} ${height}`}
      style={{ overflow: "visible", display: "block" }}
    >
      {/* Grid lines */}
      {[0, 0.25, 0.5, 0.75, 1].map((frac) => (
        <line
          key={frac}
          x1={padL}
          y1={padT + frac * chartH}
          x2={width - padR}
          y2={padT + frac * chartH}
          stroke="rgba(255,255,255,0.05)"
          strokeWidth={1}
        />
      ))}
      {/* Docs line (blue) */}
      <path
        d={toPath(docsData, docsMax)}
        fill="none"
        stroke="#38bdf8"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.75}
      />
      {/* Risk line (red) */}
      <path
        d={toPath(riskData, riskMax)}
        fill="none"
        stroke="#f43f5e"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Month labels */}
      {CHART_MONTHS.map((m, i) => (
        <text
          key={m}
          x={padL + (i / (CHART_MONTHS.length - 1)) * chartW}
          y={height - 6}
          fontSize={8}
          fill="#475569"
          textAnchor="middle"
        >
          {m}
        </text>
      ))}
      {/* Legend */}
      <circle cx={padL} cy={padT - 6} r={4} fill="#38bdf8" />
      <text x={padL + 8} y={padT - 2} fontSize={8} fill="#94a3b8">
        Docs Analyzed
      </text>
      <circle cx={padL + 120} cy={padT - 6} r={4} fill="#f43f5e" />
      <text x={padL + 128} y={padT - 2} fontSize={8} fill="#94a3b8">
        Risk Exposure
      </text>
    </svg>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const { analysisData, demoMode, uploadedFileName } = useAnalysis();
  const [clauseSearch, setClauseSearch] = useState("");
  const [expandedClause, setExpandedClause] = useState<number | null>(null);
  const [view, setView] = useState<"audit" | "contract">("audit");

  const data = analysisData || MOCK_ANALYSIS;

  // Redirect if no session at all
  useEffect(() => {
    if (!analysisData && !demoMode) {
      // Allow fallback to mock after 500ms so page renders
    }
  }, [analysisData, demoMode]);

  const filteredFlags = data.red_flags.filter(
    (f) =>
      clauseSearch === "" ||
      f.category.toLowerCase().includes(clauseSearch.toLowerCase()) ||
      f.clause_text.toLowerCase().includes(clauseSearch.toLowerCase())
  );

  const kpis = [
    {
      label: "Pages Analyzed",
      value: data.pages_analyzed,
      trend: data.pages_trend,
      trendDir: "up" as const,
      icon: FileText,
      color: "#38bdf8",
    },
    {
      label: "Precedents Found",
      value: data.relevant_precedents,
      trend: data.precedents_trend,
      trendDir: "up" as const,
      icon: BookOpen,
      color: "#818cf8",
    },
    {
      label: "Identified Risks",
      value: data.identified_risks,
      trend: data.risks_trend,
      trendDir: "down" as const,
      icon: AlertTriangle,
      color: "#f43f5e",
    },
    {
      label: "AI Confidence",
      value: data.ai_confidence,
      trend: data.confidence_trend,
      trendDir: "up" as const,
      icon: Brain,
      color: "#10b981",
    },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <main className="main-with-sidebar">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1.75rem",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "1.375rem",
                fontWeight: 700,
                color: "var(--text-primary)",
                letterSpacing: "-0.02em",
              }}
            >
              Risk Audit Dashboard
            </h1>
            <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: "0.2rem" }}>
              {demoMode ? "📊 Demo — vendor_agreement_v3.pdf" : `📄 ${uploadedFileName || "Analysed Contract"}`}
            </p>
          </div>
          {/* View toggle */}
          <div className="tab-bar" style={{ width: "auto" }}>
            <button
              className={`tab-btn ${view === "audit" ? "active" : ""}`}
              onClick={() => setView("audit")}
            >
              📊 Active Risk Audit
            </button>
            <button
              className={`tab-btn ${view === "contract" ? "active" : ""}`}
              onClick={() => setView("contract")}
            >
              📄 Harmonized Contract
            </button>
          </div>
        </motion.div>

        {view === "audit" ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
            {/* KPI Row */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
                gap: "1rem",
              }}
            >
              {kpis.map((kpi, i) => (
                <KpiCard
                  key={kpi.label}
                  label={kpi.label}
                  value={kpi.value}
                  trend={kpi.trend}
                  trendDir={kpi.trendDir}
                  icon={kpi.icon}
                  accentColor={kpi.color}
                  delay={i * 0.08}
                />
              ))}
            </div>

            {/* Middle row: gauge + document status + AI summary */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "280px 1fr",
                gap: "1.25rem",
                alignItems: "start",
              }}
            >
              {/* Reciprocity Speedometer */}
              <motion.div
                className="glass-card"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, delay: 0.2 }}
                style={{ padding: "1.25rem", textAlign: "center" }}
              >
                <div className="section-header" style={{ justifyContent: "center", marginBottom: "0.25rem" }}>
                  Reciprocity Gauge
                </div>
                <div className="section-sub" style={{ marginBottom: "0.75rem" }}>
                  Vendor vs. Client advantage
                </div>
                <RiskGauge score={data.score} />
              </motion.div>

              {/* Right column: document status + AI summary stacked */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {/* Document status */}
                <motion.div
                  className="glass-card"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.25 }}
                  style={{ padding: "1.25rem" }}
                >
                  <div className="section-header" style={{ marginBottom: "1rem" }}>
                    Document Status
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "0.75rem",
                      marginBottom: "1rem",
                    }}
                  >
                    {[
                      { icon: FileText, label: "File", value: uploadedFileName || data.filename },
                      { icon: Calendar, label: "Analysed", value: data.analyzed_date },
                      { icon: User, label: "Last Editor", value: data.last_edited },
                      { icon: Clock, label: "Stage", value: "AI Review Complete" },
                    ].map((row) => {
                      const Icon = row.icon;
                      return (
                        <div key={row.label} style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
                          <Icon size={13} color="var(--text-muted)" strokeWidth={2} style={{ marginTop: 2, flexShrink: 0 }} />
                          <div>
                            <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{row.label}</div>
                            <div style={{ fontSize: "0.8rem", color: "var(--text-primary)", fontWeight: 500, wordBreak: "break-all" }}>{row.value}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.375rem" }}>
                      <span style={{ fontSize: "0.72rem", color: "var(--text-secondary)" }}>Analysis progress</span>
                      <span style={{ fontSize: "0.72rem", color: "var(--accent)", fontWeight: 600 }}>91%</span>
                    </div>
                    <div className="progress-track">
                      <motion.div
                        className="progress-fill"
                        style={{ height: "100%", borderRadius: 999 }}
                        initial={{ width: 0 }}
                        animate={{ width: "91%" }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                      />
                    </div>
                  </div>
                </motion.div>

                {/* AI Summary */}
                <motion.div
                  className="glass-card"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.35 }}
                  style={{ padding: "1.25rem" }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.875rem" }}>
                    <div className="section-header">AI Summary</div>
                    <span className="badge badge-critical">{data.risk_zone}</span>
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "0.625rem",
                      marginBottom: "0.875rem",
                    }}
                  >
                    {[
                      { label: "Clause Type", value: data.clause_type },
                      { label: "Impact", value: data.impact },
                    ].map((item) => (
                      <div key={item.label}>
                        <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.2rem" }}>{item.label}</div>
                        <div style={{ fontSize: "0.8rem", color: "var(--text-primary)" }}>{item.value}</div>
                      </div>
                    ))}
                  </div>
                  <div
                    style={{
                      background: "rgba(244,63,94,0.06)",
                      border: "1px solid rgba(244,63,94,0.15)",
                      borderRadius: 8,
                      padding: "0.75rem",
                      fontSize: "0.8125rem",
                      color: "var(--text-secondary)",
                      lineHeight: 1.6,
                    }}
                  >
                    {data.recommendation}
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Risk Trend Chart */}
            <motion.div
              className="glass-card"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.3 }}
              style={{ padding: "1.25rem" }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                <div>
                  <div className="section-header">AI Risk Trend</div>
                  <div className="section-sub">12-month contract risk vs. volume</div>
                </div>
                <TrendingUp size={16} color="var(--text-muted)" />
              </div>
              <RiskTrendChart riskScore={data.score} />
            </motion.div>

            {/* Line-by-Line Loophole Visualizer */}
            <motion.div
              className="glass-card"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.35 }}
              style={{ padding: "1.25rem" }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem", flexWrap: "wrap", gap: "0.75rem" }}>
                <div>
                  <div className="section-header">Line-by-Line Loophole Visualizer</div>
                  <div className="section-sub">Click any clause to expand AI analysis</div>
                </div>
                <div style={{ position: "relative" }}>
                  <Search size={14} color="var(--text-muted)" style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)" }} />
                  <input
                    className="input-glass"
                    placeholder="Search clauses…"
                    value={clauseSearch}
                    onChange={(e) => setClauseSearch(e.target.value)}
                    style={{ paddingLeft: "2rem", width: 220 }}
                  />
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {filteredFlags.map((flag, i) => (
                  <div key={flag.id}>
                    <div
                      style={{
                        background:
                          flag.severity >= 7
                            ? "rgba(244,63,94,0.05)"
                            : flag.severity >= 5
                            ? "rgba(245,158,11,0.05)"
                            : "rgba(16,185,129,0.04)",
                        border: `1px solid ${
                          flag.severity >= 7
                            ? "rgba(244,63,94,0.15)"
                            : flag.severity >= 5
                            ? "rgba(245,158,11,0.12)"
                            : "rgba(16,185,129,0.12)"
                        }`,
                        borderRadius: 8,
                        padding: "0.75rem 1rem",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "0.75rem",
                      }}
                      onClick={() => setExpandedClause(expandedClause === i ? null : i)}
                    >
                      <span
                        style={{
                          fontSize: "0.65rem",
                          fontWeight: 700,
                          background: "rgba(255,255,255,0.08)",
                          borderRadius: 4,
                          padding: "0.15rem 0.4rem",
                          color: "var(--text-muted)",
                          flexShrink: 0,
                          marginTop: 2,
                        }}
                      >
                        §{i + 1}
                      </span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: "0.8125rem", color: "var(--text-primary)", lineHeight: 1.5 }}>
                          {flag.clause_text}
                        </div>
                        {expandedClause === i && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            style={{ marginTop: "0.75rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}
                          >
                            <div style={{ fontSize: "0.75rem", color: "#fda4af" }}>⚠ {flag.impact}</div>
                            <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontStyle: "italic" }}>ELI12: {flag.eli12}</div>
                            <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>📚 {flag.historical_match}</div>
                          </motion.div>
                        )}
                      </div>
                      {expandedClause === i ? (
                        <ChevronUp size={14} color="var(--text-muted)" style={{ flexShrink: 0 }} />
                      ) : (
                        <ChevronDown size={14} color="var(--text-muted)" style={{ flexShrink: 0 }} />
                      )}
                    </div>
                  </div>
                ))}
                {filteredFlags.length === 0 && (
                  <p style={{ color: "var(--text-muted)", fontSize: "0.8rem", padding: "1rem", textAlign: "center" }}>
                    No clauses match &ldquo;{clauseSearch}&rdquo;
                  </p>
                )}
              </div>
            </motion.div>

            {/* Detailed Red Flag Analysis */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.4 }}
            >
              <div style={{ marginBottom: "1rem" }}>
                <div className="section-header">Detailed Red Flag Analysis</div>
                <div className="section-sub">Click any flag to see full legal breakdown + ELI12 + corporate parallel</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {data.red_flags.map((flag, i) => (
                  <RedFlagCard key={flag.id} flag={flag} index={i} />
                ))}
              </div>
            </motion.div>

            {/* Precedents table */}
            <motion.div
              className="glass-card"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.45 }}
              style={{ padding: "1.25rem" }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                <div>
                  <div className="section-header">Matched Precedents</div>
                  <div className="section-sub">Relevant case law auto-matched to your clauses</div>
                </div>
                <button
                  className="btn-ghost"
                  style={{ fontSize: "0.75rem", padding: "0.4rem 0.875rem", display: "flex", alignItems: "center", gap: "0.375rem" }}
                  onClick={() => router.push("/cases")}
                >
                  <BookOpen size={12} /> View All Cases
                </button>
              </div>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Case Name</th>
                    <th>Jurisdiction</th>
                    <th>Year</th>
                    <th>Relevance</th>
                    <th>Clause Ref</th>
                    <th>Outcome</th>
                  </tr>
                </thead>
                <tbody>
                  {data.precedents.map((p) => (
                    <tr key={p.case_name}>
                      <td style={{ fontWeight: 500, color: "var(--accent)" }}>{p.case_name}</td>
                      <td style={{ color: "var(--text-secondary)" }}>{p.jurisdiction}</td>
                      <td style={{ color: "var(--text-secondary)" }}>{p.year}</td>
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          <div style={{ width: 50, height: 4, borderRadius: 999, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
                            <div style={{ width: `${p.relevance}%`, height: "100%", background: "var(--accent)", borderRadius: 999 }} />
                          </div>
                          <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>{p.relevance}%</span>
                        </div>
                      </td>
                      <td style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>{p.clause_ref}</td>
                      <td>
                        <span
                          className="badge"
                          style={{
                            background:
                              p.outcome === "Client Win"
                                ? "rgba(16,185,129,0.1)"
                                : p.outcome === "Vendor Win"
                                ? "rgba(244,63,94,0.1)"
                                : "rgba(245,158,11,0.1)",
                            color:
                              p.outcome === "Client Win"
                                ? "var(--success)"
                                : p.outcome === "Vendor Win"
                                ? "var(--danger)"
                                : "#f59e0b",
                            border: "none",
                          }}
                        >
                          {p.outcome}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </div>
        ) : (
          /* ── Harmonized Contract View ── */
          <motion.div
            className="glass-card"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            style={{ padding: "2rem", maxWidth: 800, margin: "0 auto" }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
              <div className="section-header">Harmonized Contract</div>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button className="btn-ghost" style={{ fontSize: "0.78rem", padding: "0.4rem 0.75rem", display: "flex", alignItems: "center", gap: "0.375rem" }}>
                  <Download size={13} /> PDF
                </button>
                <button className="btn-ghost" style={{ fontSize: "0.78rem", padding: "0.4rem 0.75rem", display: "flex", alignItems: "center", gap: "0.375rem" }}>
                  <Download size={13} /> TXT
                </button>
              </div>
            </div>
            <div
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 10,
                padding: "1.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
              }}
            >
              <h3 style={{ fontSize: "1rem", fontWeight: 600, textAlign: "center", marginBottom: "0.5rem" }}>
                VENDOR MASTER SERVICES AGREEMENT
              </h3>
              {data.auto_fixes.map((fix, i) => (
                <div key={fix.id}>
                  <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.375rem" }}>
                    Clause {i + 1} — {fix.issue}
                  </div>
                  <p
                    style={{
                      fontSize: "0.85rem",
                      lineHeight: 1.7,
                      textDecoration: "line-through",
                      color: "var(--danger)",
                      opacity: 0.6,
                      marginBottom: "0.375rem",
                    }}
                  >
                    {fix.original}
                  </p>
                  <p
                    style={{
                      fontSize: "0.85rem",
                      lineHeight: 1.7,
                      color: "var(--success)",
                      background: "rgba(16,185,129,0.05)",
                      border: "1px solid rgba(16,185,129,0.15)",
                      borderRadius: 6,
                      padding: "0.625rem 0.875rem",
                    }}
                  >
                    ✓ {fix.suggested}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
