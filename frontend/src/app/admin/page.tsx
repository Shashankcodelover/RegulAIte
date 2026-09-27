"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Users, FileText, Settings, Activity, ArrowLeft, ShieldAlert } from "lucide-react";
import { useAnalysis } from "@/lib/analysisContext";

export default function AdminPage() {
  const router = useRouter();
  const { user } = useAnalysis();
  const [activeTab, setActiveTab] = useState("overview");

  // In a real app, we'd check if user.role === 'admin'
  // Here we just allow it for demonstration, but show a banner if not explicitly admin

  return (
    <div style={{ minHeight: "100vh", padding: "4rem 2rem", position: "relative" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ marginBottom: "2rem" }}>
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
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
          <div style={{ background: "var(--accent)", padding: "0.75rem", borderRadius: "12px", color: "white" }}>
            <Settings size={24} />
          </div>
          <div>
            <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "var(--text-primary)" }}>Admin Panel</h1>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>System Overview and Management</p>
          </div>
        </div>

        <div style={{ display: "flex", gap: "2rem", flexDirection: "row" }}>
          {/* Sidebar */}
          <div style={{ width: "200px", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {[
              { id: "overview", label: "Overview", icon: Activity },
              { id: "users", label: "Users", icon: Users },
              { id: "documents", label: "Documents", icon: FileText },
              { id: "security", label: "Security", icon: ShieldAlert },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "0.75rem 1rem",
                    borderRadius: "8px",
                    background: activeTab === tab.id ? "rgba(14,156,116,0.15)" : "transparent",
                    color: activeTab === tab.id ? "var(--accent)" : "var(--text-secondary)",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    fontWeight: activeTab === tab.id ? 600 : 400,
                    transition: "all 0.2s"
                  }}
                >
                  <Icon size={16} /> {tab.label}
                </button>
              );
            })}
          </div>

          {/* Main Content */}
          <motion.div
            className="glass-card"
            style={{ flex: 1, padding: "2rem", minHeight: "400px" }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            key={activeTab}
          >
            {activeTab === "overview" && (
              <div>
                <h2 style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }}>System Overview</h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
                  <div className="glass-card" style={{ padding: "1.5rem" }}>
                    <div style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginBottom: "0.5rem" }}>Total Users</div>
                    <div style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--accent)" }}>1,248</div>
                  </div>
                  <div className="glass-card" style={{ padding: "1.5rem" }}>
                    <div style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginBottom: "0.5rem" }}>Contracts Analysed</div>
                    <div style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--accent)" }}>9,403</div>
                  </div>
                  <div className="glass-card" style={{ padding: "1.5rem" }}>
                    <div style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginBottom: "0.5rem" }}>Avg Risk Score</div>
                    <div style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--warning)" }}>42/100</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "users" && (
              <div>
                <h2 style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }}>User Management</h2>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid var(--border-subtle)", textAlign: "left" }}>
                      <th style={{ padding: "1rem 0", color: "var(--text-secondary)", fontWeight: 500 }}>Name</th>
                      <th style={{ padding: "1rem 0", color: "var(--text-secondary)", fontWeight: 500 }}>Email</th>
                      <th style={{ padding: "1rem 0", color: "var(--text-secondary)", fontWeight: 500 }}>Role</th>
                      <th style={{ padding: "1rem 0", color: "var(--text-secondary)", fontWeight: 500 }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: "Ananya Rao", email: "ananya@company.com", role: "Admin" },
                      { name: "Vikram Singh", email: "vikram@company.com", role: "User" },
                      { name: "Priya Sharma", email: "priya@company.com", role: "User" },
                    ].map((u, i) => (
                      <tr key={i} style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                        <td style={{ padding: "1rem 0" }}>{u.name}</td>
                        <td style={{ padding: "1rem 0", color: "var(--text-secondary)" }}>{u.email}</td>
                        <td style={{ padding: "1rem 0" }}>
                          <span style={{ padding: "0.25rem 0.75rem", borderRadius: "999px", fontSize: "0.75rem", background: u.role === 'Admin' ? "rgba(109,74,235,0.1)" : "rgba(14,156,116,0.1)", color: u.role === 'Admin' ? "#c084fc" : "var(--accent)" }}>
                            {u.role}
                          </span>
                        </td>
                        <td style={{ padding: "1rem 0" }}>
                          <button style={{ background: "none", border: "none", color: "var(--accent)", cursor: "pointer" }}>Edit</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "documents" && (
              <div>
                <h2 style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }}>Document Logs</h2>
                <p style={{ color: "var(--text-secondary)" }}>Recent document analyses across the system.</p>
                {/* Mock logs */}
                <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {["MSA_Global_2026.pdf", "Vendor_Agreement_v3.docx", "NDA_Standard.pdf"].map((doc, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "1rem", background: "rgba(255,255,255,0.02)", borderRadius: "8px", border: "1px solid var(--border-subtle)" }}>
                      <span>{doc}</span>
                      <span style={{ color: "var(--text-secondary)" }}>{new Date().toLocaleDateString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div>
                <h2 style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }}>Security Settings</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <input type="checkbox" defaultChecked className="input-glass" style={{ width: "auto" }} />
                    Enforce Two-Factor Authentication (2FA) for all users
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <input type="checkbox" defaultChecked className="input-glass" style={{ width: "auto" }} />
                    Auto-delete analysed documents after 24 hours
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <input type="checkbox" className="input-glass" style={{ width: "auto" }} />
                    Require complex passwords
                  </label>
                  <button className="btn-primary" style={{ alignSelf: "flex-start", marginTop: "1rem", padding: "0.5rem 1.5rem" }}>Save Security Settings</button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
