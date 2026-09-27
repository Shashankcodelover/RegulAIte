import Link from "next/link";
import { AlertTriangle, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem", textAlign: "center", background: "var(--bg-base)" }}>
      <AlertTriangle size={64} color="var(--accent)" style={{ marginBottom: "1.5rem" }} />
      <h1 style={{ fontSize: "3rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "1rem" }}>
        404 - Page Not Found
      </h1>
      <p style={{ fontSize: "1.125rem", color: "var(--text-secondary)", marginBottom: "2.5rem", maxWidth: 500 }}>
        The legal document or page you are looking for does not exist or has been moved.
      </p>
      <Link href="/" className="btn-primary" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
        <ArrowLeft size={16} /> Return to Dashboard
      </Link>
    </div>
  );
}
