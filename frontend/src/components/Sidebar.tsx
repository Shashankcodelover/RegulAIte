"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  FileSearch,
  ShieldCheck,
  BookOpen,
  FileText,
  LogOut,
  Scale,
  Sparkles,
} from "lucide-react";
import { useAnalysis } from "@/lib/analysisContext";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/smart-review", label: "SmartReview", icon: FileSearch },
  { href: "/compliance", label: "Compliance", icon: ShieldCheck },
  { href: "/cases", label: "Cases & Precedents", icon: BookOpen },
  { href: "/legal-forms", label: "Legal Forms", icon: FileText },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, analysisData, demoMode, clearSession } = useAnalysis();

  const hasSession = !!(analysisData || demoMode);

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <Link href="/" style={{ textDecoration: "none" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
            <div
              style={{
                width: 34,
                height: 34,
                background: "linear-gradient(135deg, #38bdf8 0%, #818cf8 100%)",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Scale size={18} color="#0a0f1e" strokeWidth={2.5} />
            </div>
            <div>
              <div
                style={{
                  fontSize: "1.0625rem",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: "#e2e8f0",
                }}
              >
                RegulAIte
              </div>
              <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", letterSpacing: "0.04em" }}>
                AI Legal Engine
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Session Status */}
      {hasSession && (
        <div style={{ padding: "0 1rem 1rem" }}>
          <div
            style={{
              background: "rgba(56,189,248,0.06)",
              border: "1px solid rgba(56,189,248,0.15)",
              borderRadius: 8,
              padding: "0.5rem 0.75rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <Sparkles size={12} color="var(--accent)" />
            <span style={{ fontSize: "0.7rem", color: "var(--accent)", fontWeight: 600 }}>
              {demoMode ? "Demo Mode Active" : "Analysis Loaded"}
            </span>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: "2px" }}>
        {NAV_ITEMS.map((item) => {
          const active = pathname.startsWith(item.href);
          const Icon = item.icon;
          const disabled = !hasSession && item.href !== "/dashboard";

          return (
            <Link
              key={item.href}
              href={hasSession || item.href === "/dashboard" ? item.href : "#"}
              className={`nav-link ${active ? "active" : ""}`}
              style={{
                opacity: disabled ? 0.4 : 1,
                pointerEvents: disabled ? "none" : "auto",
              }}
            >
              <Icon size={16} strokeWidth={1.75} />
              <span>{item.label}</span>
              {active && (
                <motion.div
                  layoutId="sidebar-active"
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: 3,
                    background: "var(--accent)",
                    borderRadius: "0 2px 2px 0",
                  }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* User / Logout */}
      <div style={{ padding: "1rem 1.5rem", borderTop: "1px solid var(--border-subtle)" }}>
        {user ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #38bdf8, #818cf8)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "#0a0f1e",
                  flexShrink: 0,
                }}
              >
                {user.name[0]?.toUpperCase()}
              </div>
              <div>
                <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-primary)" }}>
                  {user.name}
                </div>
                <div style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>
                  {user.plan} plan
                </div>
              </div>
            </div>
            <button
              className="btn-ghost"
              onClick={() => {
                clearSession();
                router.push("/");
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                fontSize: "0.75rem",
                padding: "0.4rem 0.75rem",
                justifyContent: "center",
              }}
            >
              <LogOut size={13} />
              Sign Out
            </button>
          </div>
        ) : (
          <Link href="/auth" style={{ textDecoration: "none" }}>
            <button className="btn-primary" style={{ width: "100%", fontSize: "0.8rem", padding: "0.5rem" }}>
              Sign In
            </button>
          </Link>
        )}
      </div>
    </aside>
  );
}
