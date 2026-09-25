"use client";
import { motion } from "framer-motion";
import { ShieldCheck, AlertCircle } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import ComplianceBar from "@/components/ComplianceBar";
import { useAnalysis } from "@/lib/analysisContext";
import { MOCK_ANALYSIS } from "@/lib/mockData";

export default function CompliancePage() {
  const { analysisData } = useAnalysis();
  const data = analysisData || MOCK_ANALYSIS;
  const audit = data.compliance_audit;

  const frameworks = [
    {
      label: "GDPR (EU 2016/679)",
      score: audit.gdpr_score,
      violations: audit.gdpr_violations,
      delay: 0,
    },
    {
      label: "IT Act 2000 (India)",
      score: audit.itact_score,
      violations: audit.itact_violations,
      delay: 0.1,
    },
    {
      label: "CCPA (California)",
      score: audit.ccpa_score,
      violations: audit.ccpa_violations,
      delay: 0.2,
    },
  ];

  const overallScore = Math.round(
    (audit.gdpr_score + audit.itact_score + audit.ccpa_score) / 3
  );
  const overallStatus = overallScore >= 70 ? "Compliant" : overallScore >= 40 ? "Partial" : "Non-Compliant";
  const overallColor = overallScore >= 70 ? "var(--success)" : overallScore >= 40 ? "#f59e0b" : "var(--danger)";

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
            Compliance Audit
          </h1>
          <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
            Real-time scoring across GDPR, IT Act 2000, and CCPA
          </p>
        </motion.div>

        {/* Overall score banner */}
        <motion.div
          className="glass-card"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          style={{
            padding: "1.5rem",
            marginBottom: "1.5rem",
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
            background: `linear-gradient(135deg, ${overallColor}08 0%, rgba(11,20,42,0.65) 100%)`,
            borderColor: `${overallColor}20`,
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: `conic-gradient(${overallColor} ${overallScore * 3.6}deg, rgba(255,255,255,0.05) 0deg)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                background: "#060B18",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <span style={{ fontSize: "1.25rem", fontWeight: 800, color: overallColor, lineHeight: 1 }}>
                {overallScore}
              </span>
              <span style={{ fontSize: "0.55rem", color: "var(--text-muted)" }}>/ 100</span>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "0.25rem" }}>
              <ShieldCheck size={18} color={overallColor} />
              <span style={{ fontWeight: 700, fontSize: "1.125rem", color: "var(--text-primary)" }}>
                Overall Compliance Score
              </span>
              <span
                className="badge"
                style={{
                  background: `${overallColor}15`,
                  color: overallColor,
                  border: `1px solid ${overallColor}30`,
                }}
              >
                {overallStatus}
              </span>
            </div>
            <p style={{ fontSize: "0.83rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
              Your contract has been assessed against three major regulatory frameworks.{" "}
              {overallScore < 50 &&
                "Immediate remediation is required before this agreement can be signed."}
              {overallScore >= 50 && overallScore < 70 &&
                "Several key provisions require revision to achieve full compliance."}
              {overallScore >= 70 && "The contract meets most compliance standards with minor gaps."}
            </p>
          </div>
        </motion.div>

        {/* Framework bars */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.75rem" }}>
          {frameworks.map((fw) => (
            <ComplianceBar
              key={fw.label}
              label={fw.label}
              score={fw.score}
              violations={fw.violations}
              delay={fw.delay}
            />
          ))}
        </div>

        {/* Remediation roadmap */}
        <motion.div
          className="glass-card"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          style={{ padding: "1.25rem" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
            <AlertCircle size={16} color="#f59e0b" />
            <div className="section-header">Remediation Roadmap</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
            {[
              ...audit.gdpr_violations.map((v) => ({ framework: "GDPR", violation: v, priority: "HIGH" })),
              ...audit.ccpa_violations.map((v) => ({ framework: "CCPA", violation: v, priority: "MEDIUM" })),
              ...audit.itact_violations.map((v) => ({ framework: "IT Act", violation: v, priority: "MEDIUM" })),
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.06 + 0.4 }}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.75rem",
                  padding: "0.75rem",
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.04)",
                  borderRadius: 8,
                }}
              >
                <span
                  className="badge"
                  style={{
                    background: item.framework === "GDPR" ? "rgba(129,140,248,0.1)" : item.framework === "CCPA" ? "rgba(56,189,248,0.1)" : "rgba(16,185,129,0.1)",
                    color: item.framework === "GDPR" ? "#818cf8" : item.framework === "CCPA" ? "var(--accent)" : "var(--success)",
                    border: "none",
                    flexShrink: 0,
                    marginTop: 1,
                  }}
                >
                  {item.framework}
                </span>
                <span style={{ fontSize: "0.83rem", color: "var(--text-secondary)", lineHeight: 1.5, flex: 1 }}>
                  {item.violation}
                </span>
                <span
                  className="badge"
                  style={{
                    background: item.priority === "HIGH" ? "rgba(244,63,94,0.1)" : "rgba(245,158,11,0.1)",
                    color: item.priority === "HIGH" ? "var(--danger)" : "#f59e0b",
                    border: "none",
                    flexShrink: 0,
                  }}
                >
                  {item.priority}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
