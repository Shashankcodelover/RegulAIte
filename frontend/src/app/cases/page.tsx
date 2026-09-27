"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, ExternalLink } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { useAnalysis } from "@/lib/analysisContext";
import { MOCK_ANALYSIS } from "@/lib/mockData";

// Extended precedents db for the cases page
const FULL_PRECEDENTS = [
  ...MOCK_ANALYSIS.precedents,
  {
    case_name: "Facebook Inc. v. Duguid",
    jurisdiction: "SCOTUS",
    year: 2021,
    relevance: 62,
    clause_ref: "Automated Communication / Privacy",
    outcome: "Vendor Win",
  },
  {
    case_name: "Oracle America Inc. v. Google LLC",
    jurisdiction: "SCOTUS",
    year: 2021,
    relevance: 78,
    clause_ref: "IP Scope / API Copyright",
    outcome: "Client Win",
  },
  {
    case_name: "Schrems II — Data Ireland Ltd v. DPC",
    jurisdiction: "ECJ",
    year: 2020,
    relevance: 85,
    clause_ref: "Data Transfer / GDPR",
    outcome: "Client Win",
  },
  {
    case_name: "Zoom Video Comms. Privacy Litigation",
    jurisdiction: "N.D.Cal.",
    year: 2021,
    relevance: 70,
    clause_ref: "Data Sharing / Indemnification",
    outcome: "Settled",
  },
  {
    case_name: "Equifax Inc. Securities Litigation",
    jurisdiction: "N.D.Ga.",
    year: 2020,
    relevance: 58,
    clause_ref: "Data Breach / Liability Cap",
    outcome: "Settled",
  },
];

const ALL_JURISDICTIONS = ["All", ...Array.from(new Set(FULL_PRECEDENTS.map((p) => p.jurisdiction)))];
const ALL_OUTCOMES = ["All", "Client Win", "Vendor Win", "Settled"];

export default function CasesPage() {
  const { analysisData } = useAnalysis();
  const data = analysisData || MOCK_ANALYSIS;

  const [search, setSearch] = useState("");
  const [jurisFilter, setJurisFilter] = useState("All");
  const [outcomeFilter, setOutcomeFilter] = useState("All");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const filtered = FULL_PRECEDENTS.filter((p) => {
    const matchSearch =
      search === "" ||
      p.case_name.toLowerCase().includes(search.toLowerCase()) ||
      p.clause_ref.toLowerCase().includes(search.toLowerCase());
    const matchJuris = jurisFilter === "All" || p.jurisdiction === jurisFilter;
    const matchOutcome = outcomeFilter === "All" || p.outcome === outcomeFilter;
    return matchSearch && matchJuris && matchOutcome;
  }).sort((a, b) => (sortDir === "desc" ? b.relevance - a.relevance : a.relevance - b.relevance));

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <main className="main-with-sidebar">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{ marginBottom: "1.75rem" }}
        >
          <h1 style={{ fontSize: "1.375rem", fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.02em", marginBottom: "0.25rem" }}>
            Precedents & Cases Database
          </h1>
          <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
            {FULL_PRECEDENTS.length} cases across {ALL_JURISDICTIONS.length - 1} jurisdictions
          </p>
        </motion.div>

        {/* Filter bar */}
        <motion.div
          className="glass-card"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          style={{ padding: "1rem 1.25rem", marginBottom: "1.25rem", display: "flex", gap: "0.875rem", flexWrap: "wrap", alignItems: "center" }}
        >
          <input
            className="input-glass"
            placeholder="Search cases or clause references…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: 280 }}
          />
          <select
            className="input-glass"
            value={jurisFilter}
            onChange={(e) => setJurisFilter(e.target.value)}
            style={{ width: 180, appearance: "none" }}
          >
            {ALL_JURISDICTIONS.map((j) => (
              <option key={j} value={j} style={{ background: "#0a1628" }}>{j}</option>
            ))}
          </select>
          <select
            className="input-glass"
            value={outcomeFilter}
            onChange={(e) => setOutcomeFilter(e.target.value)}
            style={{ width: 150, appearance: "none" }}
          >
            {ALL_OUTCOMES.map((o) => (
              <option key={o} value={o} style={{ background: "#0a1628" }}>{o}</option>
            ))}
          </select>
          <button
            className="btn-ghost"
            onClick={() => setSortDir(sortDir === "desc" ? "asc" : "desc")}
            style={{ fontSize: "0.78rem", padding: "0.5rem 0.875rem", whiteSpace: "nowrap" }}
          >
            Relevance {sortDir === "desc" ? "↓" : "↑"}
          </button>
          <div style={{ marginLeft: "auto", fontSize: "0.75rem", color: "var(--text-muted)" }}>
            {filtered.length} result{filtered.length !== 1 ? "s" : ""}
          </div>
        </motion.div>

        {/* Table */}
        <motion.div
          className="glass-card"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          style={{ padding: "0" }}
        >
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ paddingLeft: "1.5rem" }}>Case Name</th>
                <th>Jurisdiction</th>
                <th>Year</th>
                <th>Relevance</th>
                <th>Clause Reference</th>
                <th>Outcome</th>
                <th style={{ paddingRight: "1.5rem" }}></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => (
                <motion.tr
                  key={p.case_name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2, delay: i * 0.04 }}
                >
                  <td style={{ paddingLeft: "1.5rem", fontWeight: 600, color: "var(--accent)", maxWidth: 260 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <BookOpen size={13} color="var(--text-muted)" strokeWidth={2} style={{ flexShrink: 0 }} />
                      {p.case_name}
                    </div>
                  </td>
                  <td>
                    <span
                      className="badge"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        color: "var(--text-secondary)",
                        border: "none",
                        fontSize: "0.68rem",
                      }}
                    >
                      {p.jurisdiction}
                    </span>
                  </td>
                  <td style={{ color: "var(--text-secondary)" }}>{p.year}</td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <div style={{ width: 60, height: 5, borderRadius: 999, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
                        <div
                          style={{
                            width: `${p.relevance}%`,
                            height: "100%",
                            borderRadius: 999,
                            background:
                              p.relevance >= 80
                                ? "var(--accent)"
                                : p.relevance >= 60
                                ? "var(--secondary)"
                                : "var(--text-muted)",
                          }}
                        />
                      </div>
                      <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)", fontWeight: 600 }}>
                        {p.relevance}%
                      </span>
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
                  <td style={{ paddingRight: "1.5rem" }}>
                    <button
                      className="btn-ghost"
                      style={{ fontSize: "0.68rem", padding: "0.25rem 0.5rem", display: "flex", alignItems: "center", gap: "0.25rem" }}
                    >
                      <ExternalLink size={10} /> Details
                    </button>
                  </td>
                </motion.tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", color: "var(--text-muted)", padding: "2rem" }}>
                    No cases match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </motion.div>
      </main>
    </div>
  );
}
