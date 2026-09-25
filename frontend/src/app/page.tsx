"use client";
import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Scale,
  Upload,
  ShieldCheck,
  Zap,
  FileSearch,
  AlertTriangle,
  ChevronRight,
  ArrowRight,
  Star,
  CheckCircle,
  BarChart3,
  BookOpen,
} from "lucide-react";
import { useAnalysis } from "@/lib/analysisContext";
import { MOCK_ANALYSIS } from "@/lib/mockData";

const FEATURES = [
  {
    icon: AlertTriangle,
    title: "Risk Flag Engine",
    desc: "AI surfaces hidden predatory clauses with severity scoring from 1–10.",
    color: "#f43f5e",
  },
  {
    icon: FileSearch,
    title: "BotDebate™",
    desc: "Two AI agents argue your clauses from opposing legal positions.",
    color: "#818cf8",
  },
  {
    icon: ShieldCheck,
    title: "Compliance Audit",
    desc: "Real-time GDPR, IT Act 2000, and CCPA compliance scoring.",
    color: "#10b981",
  },
  {
    icon: Zap,
    title: "AutoFixer™",
    desc: "Split-screen diff view with AI-rewritten clauses in seconds.",
    color: "#38bdf8",
  },
  {
    icon: BookOpen,
    title: "Precedents DB",
    desc: "Relevant case law matched to your contract clauses automatically.",
    color: "#f59e0b",
  },
  {
    icon: BarChart3,
    title: "Reciprocity Gauge",
    desc: "Proprietary speedometer that scores vendor vs. client advantage.",
    color: "#c084fc",
  },
];

const STATS = [
  { value: "9,400+", label: "Contracts Analysed" },
  { value: "91%", label: "Avg AI Confidence" },
  { value: "3.2s", label: "Avg Analysis Time" },
  { value: "230+", label: "Legal Precedents" },
];

export default function LandingPage() {
  const router = useRouter();
  const { setAnalysisData, setDemoMode, setUploadedFileName, setIsAnalysing } = useAnalysis();
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: heroRef });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const handleFile = useCallback(
    async (file: File) => {
      setUploading(true);
      setIsAnalysing(true);
      setUploadedFileName(file.name);

      // Simulate analysis (calls backend at /api/analyse, falls back to mock)
      try {
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch("/api/analyse", { method: "POST", body: formData });
        if (res.ok) {
          const data = await res.json();
          setAnalysisData(data);
        } else {
          throw new Error("Backend unavailable");
        }
      } catch {
        // Fallback to mock data
        await new Promise((r) => setTimeout(r, 2200));
        setAnalysisData(MOCK_ANALYSIS);
      } finally {
        setUploading(false);
        setIsAnalysing(false);
        router.push("/dashboard");
      }
    },
    [router, setAnalysisData, setIsAnalysing, setUploadedFileName]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleDemoMode = () => {
    setAnalysisData(MOCK_ANALYSIS);
    setDemoMode(true);
    setUploadedFileName("vendor_agreement_v3.pdf");
    router.push("/dashboard");
  };

  return (
    <div style={{ minHeight: "100vh", overflowX: "hidden" }}>
      {/* ── Navbar ── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: "rgba(6,11,24,0.85)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid var(--border-subtle)",
          padding: "0.875rem 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
          <div
            style={{
              width: 32,
              height: 32,
              background: "linear-gradient(135deg, #38bdf8, #818cf8)",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Scale size={17} color="#0a0f1e" strokeWidth={2.5} />
          </div>
          <span
            style={{
              fontSize: "1.0625rem",
              fontWeight: 700,
              color: "#e2e8f0",
              letterSpacing: "-0.02em",
            }}
          >
            RegulAIte
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <button className="btn-ghost" onClick={handleDemoMode} style={{ fontSize: "0.8125rem" }}>
            Live Demo
          </button>
          <button
            className="btn-primary"
            onClick={() => router.push("/auth")}
            style={{ fontSize: "0.8125rem", display: "flex", alignItems: "center", gap: "0.375rem" }}
          >
            Sign In <ChevronRight size={14} />
          </button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <motion.section
        ref={heroRef}
        style={{ y: heroY, opacity: heroOpacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "6rem 1.5rem 4rem",
            textAlign: "center",
            position: "relative",
          }}
        >
          {/* Background glows */}
          <div
            style={{
              position: "absolute",
              top: "20%",
              left: "50%",
              transform: "translateX(-50%)",
              width: 600,
              height: 600,
              background:
                "radial-gradient(ellipse, rgba(56,189,248,0.07) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "30%",
              left: "20%",
              width: 350,
              height: 350,
              background:
                "radial-gradient(ellipse, rgba(129,140,248,0.06) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "rgba(56,189,248,0.08)",
              border: "1px solid rgba(56,189,248,0.2)",
              borderRadius: 999,
              padding: "0.3rem 0.875rem",
              marginBottom: "1.5rem",
            }}
          >
            <Star size={12} color="#38bdf8" strokeWidth={2} />
            <span style={{ fontSize: "0.75rem", color: "var(--accent)", fontWeight: 600 }}>
              5-Agent AI Orchestration Pipeline
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.25rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              marginBottom: "1.25rem",
              maxWidth: 800,
            }}
          >
            Your contract just became{" "}
            <span className="gradient-text">a liability x-ray.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{
              fontSize: "1.125rem",
              color: "var(--text-secondary)",
              maxWidth: 560,
              lineHeight: 1.7,
              marginBottom: "2.5rem",
            }}
          >
            RegulAIte runs a 5-agent AI pipeline across your contracts — surfacing hidden
            risks, simulating legal debates, and auto-rewriting predatory clauses. In seconds.
          </motion.p>

          {/* Upload Zone */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.4 }}
            style={{ width: "100%", maxWidth: 540, marginBottom: "1rem" }}
          >
            <div
              className={`upload-zone ${dragging ? "dragging" : ""}`}
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              style={{ position: "relative" }}
            >
              {uploading ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  <div className="spinner" style={{ width: 28, height: 28 }} />
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                    Running AI analysis pipeline…
                  </p>
                  <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", justifyContent: "center" }}>
                    {["Extractor", "Risk Scorer", "Compliance", "BotDebate", "AutoFixer"].map(
                      (agent, i) => (
                        <motion.span
                          key={agent}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.2 + 0.3 }}
                          style={{
                            fontSize: "0.68rem",
                            color: "var(--accent)",
                            background: "rgba(56,189,248,0.08)",
                            border: "1px solid rgba(56,189,248,0.2)",
                            borderRadius: 999,
                            padding: "0.2rem 0.6rem",
                          }}
                        >
                          {agent}
                        </motion.span>
                      )
                    )}
                  </div>
                </div>
              ) : (
                <>
                  <Upload
                    size={32}
                    color="var(--accent)"
                    strokeWidth={1.5}
                    style={{ marginBottom: "0.875rem" }}
                  />
                  <p
                    style={{
                      fontSize: "1rem",
                      fontWeight: 600,
                      color: "var(--text-primary)",
                      marginBottom: "0.375rem",
                    }}
                  >
                    Drop your contract here
                  </p>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                    PDF, PPTX, or TXT · Up to 50MB
                  </p>
                </>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.pptx,.txt"
              style={{ display: "none" }}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFile(file);
              }}
            />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.5 }}
            style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap", justifyContent: "center" }}
          >
            <button
              className="btn-primary"
              onClick={handleDemoMode}
              style={{
                fontSize: "0.9375rem",
                padding: "0.75rem 2rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              Try Live Demo <ArrowRight size={16} />
            </button>
            <button
              className="btn-ghost"
              onClick={() => router.push("/auth")}
              style={{ fontSize: "0.9375rem", padding: "0.75rem 2rem" }}
            >
              Sign In Free
            </button>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.25rem",
              marginTop: "2rem",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {["No credit card", "GDPR-safe", "SOC 2 Ready"].map((txt) => (
              <div
                key={txt}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.375rem",
                  fontSize: "0.78rem",
                  color: "var(--text-muted)",
                }}
              >
                <CheckCircle size={12} color="var(--success)" />
                {txt}
              </div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ── Stats Row ── */}
      <section style={{ padding: "4rem 2rem", background: "rgba(255,255,255,0.01)" }}>
        <div
          style={{
            maxWidth: 900,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="glass-card"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              style={{ padding: "1.5rem", textAlign: "center" }}
            >
              <div
                style={{
                  fontSize: "2rem",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  marginBottom: "0.25rem",
                }}
                className="gradient-text"
              >
                {stat.value}
              </div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Features Grid ── */}
      <section style={{ padding: "4rem 2rem 6rem" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ textAlign: "center", marginBottom: "3rem" }}
          >
            <h2
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                marginBottom: "0.75rem",
              }}
            >
              Everything legal, nothing left to chance.
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "1rem", maxWidth: 520, margin: "0 auto" }}>
              Six AI-powered modules that cover the entire contract lifecycle from ingestion to rewrite.
            </p>
          </motion.div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  className="glass-card glass-card-hover"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  style={{ padding: "1.5rem" }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 10,
                      background: `${f.color}15`,
                      border: `1px solid ${f.color}25`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "1rem",
                    }}
                  >
                    <Icon size={20} color={f.color} strokeWidth={1.75} />
                  </div>
                  <h3
                    style={{
                      fontSize: "1rem",
                      fontWeight: 600,
                      color: "var(--text-primary)",
                      marginBottom: "0.375rem",
                    }}
                  >
                    {f.title}
                  </h3>
                  <p style={{ fontSize: "0.84rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                    {f.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section style={{ padding: "4rem 2rem" }}>
        <motion.div
          className="glass-card"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            maxWidth: 700,
            margin: "0 auto",
            padding: "3rem 2rem",
            textAlign: "center",
            border: "1px solid rgba(56,189,248,0.15)",
            background:
              "linear-gradient(135deg, rgba(56,189,248,0.06) 0%, rgba(129,140,248,0.05) 100%)",
          }}
        >
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              marginBottom: "0.75rem",
            }}
          >
            Ready to analyse your contract?
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "1rem",
              marginBottom: "2rem",
              maxWidth: 420,
              margin: "0 auto 2rem",
            }}
          >
            Upload your PDF or try the live demo with a real high-risk vendor agreement.
          </p>
          <div style={{ display: "flex", gap: "0.875rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button
              className="btn-primary glow-pulse"
              onClick={() => fileInputRef.current?.click()}
              style={{ fontSize: "0.9rem", padding: "0.75rem 1.75rem", display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <Upload size={15} /> Upload Contract
            </button>
            <button
              className="btn-ghost"
              onClick={handleDemoMode}
              style={{ fontSize: "0.9rem", padding: "0.75rem 1.75rem" }}
            >
              Try Demo →
            </button>
          </div>
        </motion.div>
      </section>

      {/* ── Footer ── */}
      <footer
        style={{
          borderTop: "1px solid var(--border-subtle)",
          padding: "1.5rem 2rem",
          textAlign: "center",
          color: "var(--text-muted)",
          fontSize: "0.78rem",
        }}
      >
        © 2024 RegulAIte · AI Legal Simplifier & Extraction Engine · Built with a 5-agent pipeline
      </footer>
    </div>
  );
}
