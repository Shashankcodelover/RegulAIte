export default function PrivacyPage() {
  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "4rem 2rem", lineHeight: 1.6 }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "2rem" }}>Privacy Policy</h1>
      <p style={{ color: "var(--text-secondary)" }}>Effective Date: September 2026</p>
      
      <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>1. Information We Collect</h2>
      <p>We only collect information about you if we have a reason to do so—for example, to provide our Services, to communicate with you, or to make our Services better. This includes data explicitly provided by you, such as uploaded documents for analysis.</p>

      <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>2. How We Use Information</h2>
      <p>We use the information we collect in various ways, including to:</p>
      <ul>
        <li>Provide, operate, and maintain our website and AI analysis pipelines</li>
        <li>Improve, personalize, and expand our website</li>
        <li>Understand and analyze how you use our website</li>
      </ul>

      <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>3. Data Processing and Security</h2>
      <p>Documents uploaded to RegulAIte are processed temporarily to perform the AI analysis and are not used to train global AI models without your explicit consent. We use industry-standard security measures to protect your data during transit and processing.</p>
    </div>
  );
}
