"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Download, Search, X } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { LEGAL_FORMS } from "@/lib/mockData";

const CATEGORIES = ["All", ...Array.from(new Set(LEGAL_FORMS.map((f) => f.category)))];

export default function LegalFormsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState<(typeof LEGAL_FORMS)[0] | null>(null);

  const filtered = LEGAL_FORMS.filter((f) => {
    const matchSearch =
      search === "" ||
      f.title.toLowerCase().includes(search.toLowerCase()) ||
      f.description.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || f.category === category;
    return matchSearch && matchCat;
  });

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
            Legal Forms Library
          </h1>
          <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
            {LEGAL_FORMS.length} AI-reviewed, compliance-ready templates
          </p>
        </motion.div>

        {/* Filter row */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap", marginBottom: "1.5rem", alignItems: "center" }}
        >
          <div style={{ position: "relative" }}>
            <Search size={14} color="var(--text-muted)" style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)" }} />
            <input
              className="input-glass"
              placeholder="Search templates…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ paddingLeft: "2.25rem", width: 260 }}
            />
          </div>
          <div className="tab-bar" style={{ width: "auto" }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`tab-btn ${category === cat ? "active" : ""}`}
                onClick={() => setCategory(cat)}
                style={{ fontSize: "0.75rem" }}
              >
                {cat}
              </button>
            ))}
          </div>
          <div style={{ marginLeft: "auto", fontSize: "0.75rem", color: "var(--text-muted)" }}>
            {filtered.length} template{filtered.length !== 1 ? "s" : ""}
          </div>
        </motion.div>

        {/* Cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {filtered.map((form, i) => (
            <motion.div
              key={form.id}
              className="glass-card glass-card-hover"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.07 }}
              style={{ padding: "1.25rem", cursor: "pointer", display: "flex", flexDirection: "column", gap: "0.75rem" }}
              onClick={() => setSelected(form)}
            >
              {/* Icon & badge row */}
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 10,
                    background: "rgba(56,189,248,0.1)",
                    border: "1px solid rgba(56,189,248,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FileText size={19} color="var(--accent)" strokeWidth={1.75} />
                </div>
                <span
                  className="badge"
                  style={{
                    background:
                      form.risk_level === "LOW"
                        ? "rgba(16,185,129,0.1)"
                        : "rgba(245,158,11,0.1)",
                    color: form.risk_level === "LOW" ? "var(--success)" : "#f59e0b",
                    border: "none",
                  }}
                >
                  {form.risk_level} RISK
                </span>
              </div>

              {/* Title */}
              <div>
                <h3 style={{ fontWeight: 600, fontSize: "0.9375rem", color: "var(--text-primary)", marginBottom: "0.25rem" }}>
                  {form.title}
                </h3>
                <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                  {form.description}
                </p>
              </div>

              {/* Footer row */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", paddingTop: "0.5rem", borderTop: "1px solid var(--border-subtle)" }}>
                <span
                  className="badge badge-info"
                  style={{ fontSize: "0.65rem" }}
                >
                  {form.category}
                </span>
                <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                  {form.pages} pages
                </span>
              </div>
            </motion.div>
          ))}

          {filtered.length === 0 && (
            <div
              style={{
                gridColumn: "1 / -1",
                textAlign: "center",
                color: "var(--text-muted)",
                padding: "3rem",
                fontSize: "0.875rem",
              }}
            >
              No templates match &ldquo;{search}&rdquo;
            </div>
          )}
        </div>

        {/* Detail modal */}
        <AnimatePresence>
          {selected && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  position: "fixed",
                  inset: 0,
                  background: "rgba(0,0,0,0.7)",
                  zIndex: 200,
                  backdropFilter: "blur(4px)",
                }}
                onClick={() => setSelected(null)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.25 }}
                className="glass-card"
                style={{
                  position: "fixed",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "min(500px, 90vw)",
                  padding: "1.75rem",
                  zIndex: 201,
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1.25rem" }}>
                  <div>
                    <h2 style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.25rem" }}>
                      {selected.title}
                    </h2>
                    <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>{selected.description}</p>
                  </div>
                  <button
                    onClick={() => setSelected(null)}
                    style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", padding: "0.25rem" }}
                  >
                    <X size={18} />
                  </button>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem", marginBottom: "1.5rem" }}>
                  {[
                    { label: "Category", value: selected.category },
                    { label: "Pages", value: `${selected.pages} pages` },
                    { label: "Risk Level", value: selected.risk_level },
                    { label: "Compliance", value: "GDPR · IT Act 2000 · CCPA ready" },
                    { label: "Last Updated", value: "November 2024" },
                  ].map((row) => (
                    <div key={row.label} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.83rem" }}>
                      <span style={{ color: "var(--text-muted)" }}>{row.label}</span>
                      <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>{row.value}</span>
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", gap: "0.75rem" }}>
                  <button
                    className="btn-primary"
                    style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", fontSize: "0.875rem" }}
                  >
                    <Download size={14} /> Download Template
                  </button>
                  <button
                    className="btn-ghost"
                    onClick={() => setSelected(null)}
                    style={{ fontSize: "0.875rem", padding: "0.625rem 1rem" }}
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
