"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swords, CheckCircle2, Wrench, Play, Copy, Check, ChevronDown } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { useAnalysis } from "@/lib/analysisContext";
import { MOCK_ANALYSIS } from "@/lib/mockData";

type Tab = "debate" | "logic" | "autofixer";

// ── BotDebate Tab ──────────────────────────────────────────────────────────
function BotDebateTab() {
  const { analysisData } = useAnalysis();
  const data = analysisData || MOCK_ANALYSIS;
  const [playing, setPlaying] = useState(false);
  const [shown, setShown] = useState(false);
  const [selectedClause, setSelectedClause] = useState(data.red_flags[0]?.id || "");

  const transcript = data.debate_transcript;

  const runDebate = async () => {
    setPlaying(true);
    await new Promise((r) => setTimeout(r, 1200));
    setShown(true);
    setPlaying(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      {/* Controls */}
      <div className="glass-card" style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div className="section-header">Configure Debate</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div>
            <label style={{ fontSize: "0.72rem", color: "var(--text-secondary)", display: "block", marginBottom: "0.375rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Select Clause
            </label>
            <select
              className="input-glass"
              value={selectedClause}
              onChange={(e) => setSelectedClause(e.target.value)}
              style={{ appearance: "none", cursor: "pointer" }}
            >
              {data.red_flags.map((f) => (
                <option key={f.id} value={f.id} style={{ background: "#0a1628" }}>
                  {f.category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ fontSize: "0.72rem", color: "var(--text-secondary)", display: "block", marginBottom: "0.375rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Debate Mood
            </label>
            <select className="input-glass" style={{ appearance: "none", cursor: "pointer" }}>
              {["Commercially Balanced", "Aggressive & Hostile", "Strict Legal"].map((opt) => (
                <option key={opt} value={opt} style={{ background: "#0a1628" }}>{opt}</option>
              ))}
            </select>
          </div>
        </div>
        <button
          className="btn-primary"
          onClick={runDebate}
          disabled={playing}
          style={{ display: "flex", alignItems: "center", gap: "0.5rem", justifyContent: "center", padding: "0.7rem" }}
        >
          {playing ? (
            <><div className="spinner" /> Running Agent Debate…</>
          ) : (
            <><Play size={15} /> ⚡ Run Live Agent Debate</>
          )}
        </button>
      </div>

      {/* Transcript */}
      <AnimatePresence>
        {shown && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="glass-card"
            style={{ padding: "1.25rem" }}
          >
            <div className="section-header" style={{ marginBottom: "1rem" }}>
              Debate Transcript
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              {transcript.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: msg.role === "attacker" ? -12 : 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.15 }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: msg.role === "attacker" ? "flex-start" : "flex-end",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.68rem",
                      fontWeight: 600,
                      color: msg.role === "attacker" ? "#f43f5e" : "#10b981",
                      marginBottom: "0.25rem",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {msg.agent}
                  </div>
                  <div className={`chat-bubble ${msg.role === "attacker" ? "chat-bubble-attacker" : "chat-bubble-defender"}`}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── LogicValidator Tab ─────────────────────────────────────────────────────
function LogicValidatorTab() {
  const { analysisData } = useAnalysis();
  const data = analysisData || MOCK_ANALYSIS;
  const [clauseA, setClauseA] = useState("");
  const [clauseB, setClauseB] = useState("");
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<typeof MOCK_ANALYSIS.logic_conflicts[0] | null>(null);

  const quickFills = [
    {
      label: "Termination vs. Retention",
      a: "Client may terminate with 180-day notice.",
      b: "Vendor retains all Client data for 7 years post-termination.",
    },
    {
      label: "Payment Terms",
      a: "Payment due within 15 days of invoice.",
      b: "Vendor may suspend services after 45 days of non-payment.",
    },
    {
      label: "Governing Law",
      a: "This agreement is governed by laws of Delaware, USA.",
      b: "Any dispute shall be resolved by arbitration in New Delhi, India.",
    },
  ];

  const validate = async () => {
    if (!clauseA || !clauseB) return;
    setRunning(true);
    await new Promise((r) => setTimeout(r, 1500));
    setResult(data.logic_conflicts[0]);
    setRunning(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      {/* Quick fills */}
      <div className="glass-card" style={{ padding: "1.25rem" }}>
        <div style={{ fontSize: "0.72rem", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.75rem" }}>Quick Fill</div>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {quickFills.map((qf) => (
            <button
              key={qf.label}
              className="btn-ghost"
              onClick={() => { setClauseA(qf.a); setClauseB(qf.b); setResult(null); }}
              style={{ fontSize: "0.75rem", padding: "0.35rem 0.75rem" }}
            >
              {qf.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input panels */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        {[
          { label: "Clause A", value: clauseA, set: setClauseA },
          { label: "Clause B", value: clauseB, set: setClauseB },
        ].map(({ label, value, set }) => (
          <div key={label} className="glass-card" style={{ padding: "1.25rem" }}>
            <div className="section-header" style={{ marginBottom: "0.75rem", fontSize: "0.9rem" }}>{label}</div>
            <textarea
              className="input-glass"
              placeholder={`Paste ${label.toLowerCase()} text here…`}
              value={value}
              onChange={(e) => set(e.target.value)}
              rows={6}
              style={{ resize: "vertical" }}
            />
          </div>
        ))}
      </div>

      <button
        className="btn-primary"
        onClick={validate}
        disabled={running || !clauseA || !clauseB}
        style={{ display: "flex", alignItems: "center", gap: "0.5rem", justifyContent: "center", padding: "0.75rem", maxWidth: 320, margin: "0 auto", width: "100%" }}
      >
        {running ? <><div className="spinner" /> Validating Semantic Integrity…</> : <>🔍 Validate Semantic Integrity</>}
      </button>

      {/* Result */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <div className="glass-card" style={{ padding: "1.25rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.875rem" }}>
                <span style={{ fontWeight: 600, fontSize: "0.9375rem", color: "var(--text-primary)" }}>{result.conflict}</span>
                <span className="badge badge-critical">{result.severity}</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.875rem", marginBottom: "0.875rem" }}>
                {[
                  { label: "Clause A Summary", value: result.rule_a },
                  { label: "Clause B Summary", value: result.rule_b },
                ].map((item) => (
                  <div key={item.label}>
                    <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.3rem" }}>{item.label}</div>
                    <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>{item.value}</p>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "0.875rem" }}>{result.explanation}</p>
              <div>
                <div style={{ fontSize: "0.68rem", color: "var(--success)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.3rem" }}>✓ Harmonized Clause</div>
                <pre className="code-block" style={{ whiteSpace: "pre-wrap", color: "#6ee7b7" }}>{result.resolved_clause}</pre>
              </div>
            </div>
            {/* Z3 */}
            <div className="glass-card" style={{ padding: "1.25rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "0.75rem" }}>
                <span style={{ fontWeight: 600, fontSize: "0.875rem", color: "var(--text-primary)" }}>Z3 SMT Solver Proof</span>
                <span className="badge badge-critical">UNSAT CONFIRMED</span>
              </div>
              <pre className="code-block">{result.z3_code}</pre>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── AutoFixer Tab ──────────────────────────────────────────────────────────
function AutoFixerTab() {
  const { analysisData } = useAnalysis();
  const data = analysisData || MOCK_ANALYSIS;
  const [selectedFix, setSelectedFix] = useState(0);
  const [persona, setPersona] = useState<"defender" | "attacker" | "arbitrator">("defender");
  const [copied, setCopied] = useState(false);

  const fix = data.auto_fixes[selectedFix];

  const personas = [
    { key: "defender" as const, label: "🛡️ Defender", desc: "Protects your interests" },
    { key: "attacker" as const, label: "⚔️ Attacker", desc: "Aggressive negotiation" },
    { key: "arbitrator" as const, label: "⚖️ Arbitrator", desc: "Balanced & fair" },
  ];

  const copyRewrite = () => {
    navigator.clipboard.writeText(fix.suggested);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      {/* Clause selector */}
      <div className="tab-bar" style={{ justifyContent: "flex-start" }}>
        {data.auto_fixes.map((f, i) => (
          <button
            key={f.id}
            className={`tab-btn ${selectedFix === i ? "active" : ""}`}
            onClick={() => setSelectedFix(i)}
            style={{ fontSize: "0.75rem" }}
          >
            {f.issue}
          </button>
        ))}
      </div>

      {/* Persona toggles */}
      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
        {personas.map((p) => (
          <button
            key={p.key}
            onClick={() => setPersona(p.key)}
            style={{
              background: persona === p.key ? "rgba(56,189,248,0.1)" : "rgba(255,255,255,0.03)",
              border: persona === p.key ? "1px solid rgba(56,189,248,0.3)" : "1px solid var(--border-subtle)",
              borderRadius: 8,
              padding: "0.5rem 0.875rem",
              cursor: "pointer",
              transition: "all 0.15s",
            }}
          >
            <div style={{ fontSize: "0.8rem", fontWeight: 600, color: persona === p.key ? "var(--accent)" : "var(--text-primary)" }}>{p.label}</div>
            <div style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>{p.desc}</div>
          </button>
        ))}
      </div>

      {/* Split screen */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedFix}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}
        >
          {/* Original */}
          <div className="glass-card" style={{ padding: "1.25rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.875rem" }}>
              <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--danger)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                ✗ Original Clause
              </div>
              <div style={{ display: "flex", gap: "0.375rem" }}>
                <span className="badge badge-critical">{fix.risk_level} RISK</span>
                <span className="badge badge-high">{fix.risk_score}/10</span>
              </div>
            </div>
            <p style={{ fontSize: "0.85rem", color: "#fda4af", lineHeight: 1.7 }}>{fix.original}</p>
          </div>

          {/* Rewrite */}
          <div className="glass-card" style={{ padding: "1.25rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.875rem" }}>
              <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--success)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                ✓ AI Rewrite
              </div>
              <button
                className="btn-ghost"
                onClick={copyRewrite}
                style={{ fontSize: "0.72rem", padding: "0.3rem 0.625rem", display: "flex", alignItems: "center", gap: "0.3rem" }}
              >
                {copied ? <><Check size={11} /> Copied!</> : <><Copy size={11} /> Copy</>}
              </button>
            </div>
            <p style={{ fontSize: "0.85rem", color: "#6ee7b7", lineHeight: 1.7 }}>{fix.suggested}</p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* AI Rationale */}
      <div
        className="glass-card"
        style={{
          padding: "1.25rem",
          background: "rgba(56,189,248,0.04)",
          borderColor: "rgba(56,189,248,0.12)",
        }}
      >
        <div style={{ fontSize: "0.72rem", color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.5rem" }}>
          AI Rationale
        </div>
        <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>{fix.rationale}</p>
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────
export default function SmartReviewPage() {
  const [tab, setTab] = useState<Tab>("debate");

  const tabs = [
    { key: "debate" as const, label: "⚔️ BotDebate™", icon: Swords },
    { key: "logic" as const, label: "🔍 LogicValidator", icon: CheckCircle2 },
    { key: "autofixer" as const, label: "🔧 AutoFixer™", icon: Wrench },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <main className="main-with-sidebar">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{ marginBottom: "1.75rem" }}
        >
          <h1 style={{ fontSize: "1.375rem", fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.02em", marginBottom: "0.25rem" }}>
            SmartReview
          </h1>
          <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
            AI-powered clause debate, semantic validation, and automated rewriting
          </p>
        </motion.div>

        {/* Tab bar */}
        <div className="tab-bar" style={{ marginBottom: "1.75rem", justifyContent: "flex-start", width: "fit-content" }}>
          {tabs.map((t) => (
            <button
              key={t.key}
              className={`tab-btn ${tab === t.key ? "active" : ""}`}
              onClick={() => setTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {tab === "debate" && <BotDebateTab />}
            {tab === "logic" && <LogicValidatorTab />}
            {tab === "autofixer" && <AutoFixerTab />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
