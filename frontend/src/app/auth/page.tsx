"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Scale, Eye, EyeOff, Sparkles, ArrowLeft } from "lucide-react";
import { useAnalysis } from "@/lib/analysisContext";
import { MOCK_ANALYSIS } from "@/lib/mockData";

type Tab = "signin" | "signup" | "demo";

export default function AuthPage() {
  const router = useRouter();
  const { setUser, setAnalysisData, setDemoMode, setUploadedFileName } = useAnalysis();
  const [tab, setTab] = useState<Tab>("signin");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("Please fill in all fields."); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setUser({ name: email.split("@")[0], hash: btoa(email), plan: "pro" });
    setLoading(false);
    router.push("/dashboard");
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name || !email || !password) { setError("Please fill in all fields."); return; }
    if (password.length < 8) { setError("Password must be at least 8 characters."); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setUser({ name, hash: btoa(email), plan: "free" });
    setLoading(false);
    router.push("/dashboard");
  };

  const handleDemo = () => {
    router.push("/text-demo");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1rem",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "fixed",
          top: "30%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 500,
          height: 500,
          background: "radial-gradient(ellipse, rgba(14,156,116,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <motion.div
        className="glass-card"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        style={{ width: "100%", maxWidth: 420, padding: "2rem" }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div
            style={{
              width: 52,
              height: 52,
              background: "var(--accent)",
              borderRadius: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 0.875rem",
              boxShadow: "0 0 24px rgba(56,189,248,0.25)",
            }}
          >
            <Scale size={26} color="white" strokeWidth={2.5} />
          </div>
          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "var(--text-primary)",
            }}
          >
            RegulAIte
          </h1>
          <p style={{ fontSize: "0.825rem", color: "var(--text-secondary)", marginTop: "0.25rem" }}>
            AI Legal Simplifier & Extraction Engine
          </p>
        </div>

        {/* Tab bar */}
        <div className="tab-bar" style={{ marginBottom: "1.75rem" }}>
          {(["signin", "signup", "demo"] as Tab[]).map((t) => (
            <button
              key={t}
              className={`tab-btn ${tab === t ? "active" : ""}`}
              onClick={() => { setTab(t); setError(""); }}
            >
              {t === "signin" ? "Sign In" : t === "signup" ? "Sign Up" : "Demo"}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          {tab === "signin" && (
            <motion.form
              key="signin"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
              onSubmit={handleSignIn}
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <div>
                <label
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--text-secondary)",
                    display: "block",
                    marginBottom: "0.375rem",
                    fontWeight: 500,
                  }}
                >
                  Email
                </label>
                <input
                  className="input-glass"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
              <div>
                <label
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--text-secondary)",
                    display: "block",
                    marginBottom: "0.375rem",
                    fontWeight: 500,
                  }}
                >
                  Password
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    className="input-glass"
                    type={showPwd ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ paddingRight: "2.5rem" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd(!showPwd)}
                    style={{
                      position: "absolute",
                      right: "0.75rem",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "var(--text-muted)",
                      padding: 0,
                    }}
                  >
                    {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              {error && (
                <p style={{ fontSize: "0.78rem", color: "var(--danger)" }}>{error}</p>
              )}
              <button
                className="btn-primary"
                type="submit"
                disabled={loading}
                style={{
                  marginTop: "0.25rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  fontSize: "0.9rem",
                  padding: "0.7rem",
                }}
              >
                {loading ? <div className="spinner" /> : "Sign In"}
              </button>
            </motion.form>
          )}

          {tab === "signup" && (
            <motion.form
              key="signup"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
              onSubmit={handleSignUp}
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)", display: "block", marginBottom: "0.375rem", fontWeight: 500 }}>
                  Full Name
                </label>
                <input
                  className="input-glass"
                  type="text"
                  placeholder="Ananya Rao"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                />
              </div>
              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)", display: "block", marginBottom: "0.375rem", fontWeight: 500 }}>
                  Email
                </label>
                <input
                  className="input-glass"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)", display: "block", marginBottom: "0.375rem", fontWeight: 500 }}>
                  Password
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    className="input-glass"
                    type={showPwd ? "text" : "password"}
                    placeholder="min. 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ paddingRight: "2.5rem" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd(!showPwd)}
                    style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", padding: 0 }}
                  >
                    {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              {error && <p style={{ fontSize: "0.78rem", color: "var(--danger)" }}>{error}</p>}
              <button
                className="btn-primary"
                type="submit"
                disabled={loading}
                style={{ marginTop: "0.25rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", fontSize: "0.9rem", padding: "0.7rem" }}
              >
                {loading ? <div className="spinner" /> : "Create Account"}
              </button>
              <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", textAlign: "center", lineHeight: 1.5 }}>
                By signing up you agree to our Terms of Service and Privacy Policy.
              </p>
            </motion.form>
          )}

          {tab === "demo" && (
            <motion.div
              key="demo"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <div
                style={{
                  background: "rgba(14,156,116,0.06)",
                  border: "1px solid rgba(14,156,116,0.15)",
                  borderRadius: 10,
                  padding: "1rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginBottom: "0.5rem",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    color: "var(--accent)",
                  }}
                >
                  <Sparkles size={14} />
                  Frictionless Text Demo
                </div>
                <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                  Paste any contract text and test the AI pipeline instantly. No account required.
                </p>
              </div>
              <button
                className="btn-primary"
                onClick={handleDemo}
                style={{ fontSize: "0.9rem", padding: "0.7rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", marginTop: "1rem" }}
              >
                <Sparkles size={15} />
                Launch Text Demo
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Back to home */}
        <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
          <button
            onClick={() => router.push("/")}
            style={{
              background: "none",
              border: "none",
              color: "var(--text-muted)",
              fontSize: "0.78rem",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.3rem",
              transition: "color 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
          >
            <ArrowLeft size={13} />
            Back to RegulAIte
          </button>
        </div>
      </motion.div>
    </div>
  );
}
