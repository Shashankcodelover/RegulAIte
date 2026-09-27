"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { User, Mail, Shield, Save, ArrowLeft, LogOut } from "lucide-react";
import { useAnalysis } from "@/lib/analysisContext";

export default function ProfilePage() {
  const router = useRouter();
  const { user, setUser } = useAnalysis();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(""); // Mock email since user context only stores name and hash
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 800));
    if (user) {
      setUser({ ...user, name });
    }
    setLoading(false);
    setMessage("Profile updated successfully.");
    setTimeout(() => setMessage(""), 3000);
  };

  const handleLogout = () => {
    setUser(null);
    router.push("/");
  };

  if (!user) {
    return (
      <div style={{ padding: "4rem", textAlign: "center" }}>
        <p>Please log in to view your profile.</p>
        <button className="btn-primary" onClick={() => router.push("/auth")} style={{ marginTop: "1rem" }}>
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", padding: "4rem 2rem", position: "relative" }}>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <div style={{ marginBottom: "2rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button
            onClick={() => router.push("/dashboard")}
            style={{
              background: "none",
              border: "none",
              color: "var(--text-secondary)",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              cursor: "pointer",
            }}
          >
            <ArrowLeft size={16} /> Back to Dashboard
          </button>
          <button
            onClick={handleLogout}
            style={{
              background: "none",
              border: "none",
              color: "var(--danger)",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>

        <motion.div
          className="glass-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ padding: "2.5rem" }}
        >
          <h1 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "0.5rem", color: "var(--text-primary)" }}>
            Profile Settings
          </h1>
          <p style={{ color: "var(--text-secondary)", marginBottom: "2rem", fontSize: "0.9rem" }}>
            Manage your personal information and preferences.
          </p>

          <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div>
              <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "0.5rem" }}>
                <User size={14} /> Full Name
              </label>
              <input
                className="input-glass"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
              />
            </div>
            
            <div>
              <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "0.5rem" }}>
                <Mail size={14} /> Email Address
              </label>
              <input
                className="input-glass"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "0.5rem" }}>
                <Shield size={14} /> Current Plan
              </label>
              <div style={{ padding: "0.75rem 1rem", background: "rgba(14,156,116,0.1)", borderRadius: "8px", color: "var(--accent)", fontWeight: 600, fontSize: "0.9rem", textTransform: "capitalize" }}>
                {user.plan || "Free"} Plan
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                padding: "0.75rem",
                marginTop: "1rem",
              }}
            >
              {loading ? <div className="spinner" style={{ width: 16, height: 16 }} /> : <><Save size={16} /> Save Changes</>}
            </button>
            {message && <p style={{ color: "var(--success)", fontSize: "0.85rem", textAlign: "center", marginTop: "0.5rem" }}>{message}</p>}
          </form>
        </motion.div>
      </div>
    </div>
  );
}
