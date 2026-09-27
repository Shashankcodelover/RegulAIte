"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles, FileText, ArrowLeft, ArrowRight } from "lucide-react";
import { useAnalysis } from "@/lib/analysisContext";
import { MOCK_ANALYSIS } from "@/lib/mockData";

export default function TextDemoPage() {
  const router = useRouter();
  const { setAnalysisData, setDemoMode, setUploadedFileName, setIsAnalysing } = useAnalysis();
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyse = async () => {
    if (text.trim().length < 50) {
      setError("Please paste at least 50 characters of contract text to analyse.");
      return;
    }
    setError("");
    setLoading(true);
    setIsAnalysing(true);
    setUploadedFileName("Pasted_Contract_Text.txt");

    try {
      const res = await fetch("/api/analyse", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ text: text.trim() }),
      });
      
      if (res.ok) {
        const data = await res.json();
        setAnalysisData(data);
      } else {
        throw new Error("Backend unavailable");
      }
    } catch {
      // Fallback to mock data if backend fails
      await new Promise(r => setTimeout(r, 2000));
      setAnalysisData(MOCK_ANALYSIS);
    } finally {
      setDemoMode(true);
      setLoading(false);
      setIsAnalysing(false);
      router.push("/dashboard");
    }
  };

  return (
    <div style={{ minHeight: "100vh", padding: "4rem 2rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div
        style={{
          position: "fixed",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 600,
          height: 600,
          background: "radial-gradient(ellipse, rgba(14,156,116,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <motion.div
        className="glass-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ width: "100%", maxWidth: 800, padding: "3rem" }}
      >
        <button
          onClick={() => router.push("/")}
          style={{
            background: "none",
            border: "none",
            color: "var(--text-secondary)",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            cursor: "pointer",
            marginBottom: "2rem",
            fontSize: "0.85rem"
          }}
        >
          <ArrowLeft size={16} /> Back to Home
        </button>

        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div
            style={{
              width: 52,
              height: 52,
              background: "var(--accent)",
              borderRadius: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1rem",
              boxShadow: "0 0 24px rgba(14,156,116,0.25)",
            }}
          >
            <FileText size={26} color="white" strokeWidth={2.5} />
          </div>
          <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
            Frictionless Text Demo
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1rem" }}>
            Paste any contract clause or full agreement below to see RegulAIte&apos;s instant analysis. No credentials required.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <textarea
            className="input-glass"
            placeholder="Paste your contract text here (e.g. 'Vendor shall indemnify Client against all claims...')"
            value={text}
            onChange={(e) => { setText(e.target.value); setError(""); }}
            style={{
              minHeight: "250px",
              resize: "vertical",
              padding: "1.25rem",
              fontSize: "0.95rem",
              lineHeight: 1.6
            }}
          />
          
          {error && <p style={{ color: "var(--danger)", fontSize: "0.85rem", textAlign: "center" }}>{error}</p>}

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1rem" }}>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
              {text.length} characters
            </span>
            <button
              className="btn-primary"
              onClick={handleAnalyse}
              disabled={loading}
              style={{ padding: "0.75rem 2rem", fontSize: "0.95rem", display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              {loading ? (
                <>
                  <div className="spinner" style={{ width: 16, height: 16 }} /> Analysing...
                </>
              ) : (
                <>
                  <Sparkles size={16} /> Run Analysis <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
