// TypeScript port of mock_data.py — Level 3 (High Risk) dataset
export const MOCK_ANALYSIS: AnalysisData = {
  score: 84,
  pages_analyzed: 47,
  pages_trend: "+3 this week",
  relevant_precedents: 12,
  precedents_trend: "+2 matched",
  identified_risks: 9,
  risks_trend: "Critical",
  ai_confidence: "91%",
  confidence_trend: "High",
  risk_zone: "HIGH RISK",
  clause_type: "Termination & IP",
  impact: "Material Adverse Change",
  recommendation: "Renegotiate Clause 14.3 — asymmetric termination window creates 180-day vendor lock.",
  analyzed_date: "2024-11-18",
  last_edited: "Ananya R.",
  filename: "vendor_agreement_v3.pdf",
  red_flags: [
    {
      id: "rf-001",
      category: "Termination Asymmetry",
      clause_text:
        "The Vendor may terminate this Agreement with 30 days written notice. The Client may terminate only for cause, subject to a 180-day cure period.",
      impact: "Material — Client has effectively no exit right.",
      citation: "Clause 14.3, Page 22",
      severity: 9,
      advantage: "vendor",
      eli12:
        "Imagine you rent a toy but you can return it anytime, but the shop can only give it back after 6 months of trying to fix it. That's very unfair.",
      historical_match: "Lucent Technologies v. Gateway (2007) — asymmetric termination led to $1.2B lock-in liability.",
    },
    {
      id: "rf-002",
      category: "Uncapped Liability",
      clause_text:
        "The Client shall indemnify the Vendor against any and all claims, losses, damages, and expenses of any nature whatsoever arising from Client's use of the service.",
      impact: "Critical — blanket indemnity with no cap or carve-outs.",
      citation: "Clause 18.1, Page 29",
      severity: 10,
      advantage: "vendor",
      eli12:
        "You agreed to pay for literally anything bad that happens — even things you didn't cause.",
      historical_match: "AOL Time Warner merger (2001) — uncapped indemnity clauses contributed to $54B write-down.",
    },
    {
      id: "rf-003",
      category: "Overbroad IP Scope",
      clause_text:
        "All inventions, innovations, works of authorship, and improvements made by Client personnel in connection with or related to the services shall be owned exclusively by Vendor.",
      impact: "High — Client loses IP on everything adjacent to the engagement.",
      citation: "Clause 9.2, Page 14",
      severity: 8,
      advantage: "vendor",
      eli12:
        "If you draw a picture near their shop, they own it. Even if you drew it at home thinking about their shop.",
      historical_match: "Mattel v. MGA Entertainment (2010) — overbroad IP assignment clause cost MGA $100M+ in litigation.",
    },
    {
      id: "rf-004",
      category: "Data Retention Risk",
      clause_text:
        "Vendor retains the right to store and process Client data for up to 7 years post-termination for internal analytics and product improvement.",
      impact: "High — GDPR Art. 17 (right to erasure) directly violated.",
      citation: "Clause 11.4, Page 18",
      severity: 7,
      advantage: "vendor",
      eli12:
        "Even after you leave, they keep a copy of everything you did and use it to make money. That's against the law in Europe.",
      historical_match: "Google Spain v. AEPD (2014) — established right-to-erasure precedent in EU law.",
    },
    {
      id: "rf-005",
      category: "Governing Law Conflict",
      clause_text:
        "This Agreement shall be governed by the laws of Delaware, USA, and any dispute shall be resolved exclusively in the courts of Wilmington, Delaware.",
      impact: "Medium — Indian entity forced to litigate offshore.",
      citation: "Clause 22.1, Page 38",
      severity: 5,
      advantage: "vendor",
      eli12:
        "If there's a fight, you have to fly to America to argue. That costs a lot and they know it.",
      historical_match: "Vodafone India (2012) — jurisdiction clauses cost ₹11,000 Cr in tax dispute.",
    },
  ],
  compliance_audit: {
    gdpr_score: 34,
    gdpr_violations: [
      "Art. 17 — Right to erasure violated (Clause 11.4)",
      "Art. 5(1)(e) — Storage limitation exceeded",
      "Art. 13 — Inadequate data processing transparency",
    ],
    itact_score: 58,
    itact_violations: [
      "Section 43A — Reasonable security practice undefined",
      "Section 72A — Unauthorized disclosure risk",
    ],
    ccpa_score: 47,
    ccpa_violations: [
      "§1798.100 — Consumer right to access not guaranteed",
      "§1798.105 — Deletion rights blocked by 7-year retention",
    ],
  },
  loophole_logs: [
    {
      role: "assistant",
      content:
        "Clause 14.3 contains a material asymmetry — the vendor can exit in 30 days while client is bound for 180+. This is a classic lock-in pattern used to extract renegotiation leverage at the 60-day mark.",
    },
  ],
  logic_conflicts: [
    {
      id: "lc-001",
      conflict: "Termination vs. Data Retention Contradiction",
      severity: "HIGH",
      rule_a: "Clause 14.3: Client may terminate with 180-day notice.",
      rule_b: "Clause 11.4: Vendor retains data for 7 years post-termination.",
      explanation:
        "If termination triggers data deletion rights (GDPR Art. 17), the 7-year retention window directly contradicts the termination clause's implied data-clean-up obligations.",
      resolved_clause:
        "Upon termination, Vendor shall delete all Client personal data within 30 days, retaining only anonymized aggregate analytics for no longer than 24 months.",
      z3_code: `from z3 import *\ns = Solver()\nterminate = Bool('terminate')\nretain_data = Bool('retain_data')\n# Clause 14.3: termination is possible\ns.add(terminate == True)\n# Clause 11.4: data retained 7 years post-termination\ns.add(Implies(terminate, retain_data == True))\n# GDPR Art. 17: data must be deleted upon termination\ns.add(Implies(terminate, retain_data == False))\nprint(s.check())  # UNSAT — contradiction confirmed`,
    },
  ],
  auto_fixes: [
    {
      id: "af-001",
      issue: "Termination Asymmetry",
      original:
        "The Vendor may terminate this Agreement with 30 days written notice. The Client may terminate only for cause, subject to a 180-day cure period.",
      suggested:
        "Either party may terminate this Agreement with 60 days written notice. In the event of material breach, the non-breaching party may terminate with 14 days notice following a 30-day cure period.",
      rationale:
        "Symmetric termination rights restore commercial balance. The 60-day window gives both parties sufficient runway while eliminating the predatory lock-in asymmetry.",
      risk_level: "LOW",
      risk_score: 2,
    },
    {
      id: "af-002",
      issue: "Uncapped Liability / Indemnification",
      original:
        "The Client shall indemnify the Vendor against any and all claims, losses, damages, and expenses of any nature whatsoever arising from Client's use of the service.",
      suggested:
        "Each party's total liability under this Agreement shall not exceed the fees paid by Client in the 12 months preceding the claim. Client's indemnification obligations are limited to claims arising directly from Client's wilful misconduct or gross negligence.",
      rationale:
        "Cap aligns with industry standard (12-month fee cap). Carve-out for wilful misconduct is standard and non-negotiable — vendor retains protection where it matters.",
      risk_level: "LOW",
      risk_score: 2,
    },
    {
      id: "af-003",
      issue: "Overbroad IP Scope",
      original:
        "All inventions, innovations, works of authorship, and improvements made by Client personnel in connection with or related to the services shall be owned exclusively by Vendor.",
      suggested:
        "Vendor retains ownership of its pre-existing intellectual property and any improvements thereto. Client retains ownership of all work product created by Client personnel. Any jointly developed innovations shall be jointly owned, with each party retaining a royalty-free licence.",
      rationale:
        "Returns to the industry-standard 'background IP stays yours' model. Joint development gets joint ownership — prevents vendor from claiming Client's core innovations.",
      risk_level: "LOW",
      risk_score: 1,
    },
  ],
  precedents: [
    {
      case_name: "Lucent Technologies v. Gateway Inc.",
      jurisdiction: "D.Del.",
      year: 2007,
      relevance: 94,
      clause_ref: "Termination / Lock-in",
      outcome: "Settled",
    },
    {
      case_name: "Google Spain SL v. AEPD",
      jurisdiction: "ECJ",
      year: 2014,
      relevance: 88,
      clause_ref: "Data Retention / GDPR",
      outcome: "Client Win",
    },
    {
      case_name: "Mattel Inc. v. MGA Entertainment",
      jurisdiction: "9th Cir.",
      year: 2010,
      relevance: 82,
      clause_ref: "IP Scope / Ownership",
      outcome: "Settled",
    },
    {
      case_name: "Cubby Inc. v. CompuServe",
      jurisdiction: "S.D.N.Y.",
      year: 1991,
      relevance: 71,
      clause_ref: "Indemnification",
      outcome: "Vendor Win",
    },
    {
      case_name: "Vodafone International Holdings BV v. Union of India",
      jurisdiction: "Supreme Court of India",
      year: 2012,
      relevance: 67,
      clause_ref: "Governing Law / Jurisdiction",
      outcome: "Client Win",
    },
  ],
  debate_transcript: [
    {
      role: "attacker",
      agent: "⚔️ RedTeam",
      content:
        "Clause 14.3 is predatory on its face. A 30-day vendor exit vs. a 180-day client cure period is not a negotiated commercial term — it's a deliberate lock-in mechanism. Under Indian Contract Act Section 23, a clause that creates this level of commercial coercion may be void as against public policy.",
    },
    {
      role: "defender",
      agent: "🛡️ BlueTeam",
      content:
        "The 180-day cure period exists to protect service continuity. SaaS infrastructure contracts require runway to migrate workloads. A symmetric 30-day clause would expose the vendor to abrupt terminations that leave enterprise clients with no transition support. The asymmetry is commercially justified.",
    },
    {
      role: "attacker",
      agent: "⚔️ RedTeam",
      content:
        "That argument conflates service transition with contractual exit rights. The clause does not mention transition support — it simply extends the cure period indefinitely. If the vendor's position is service continuity, the fix is a transition services clause, not an asymmetric termination window. The current drafting is indefensible.",
    },
    {
      role: "defender",
      agent: "🛡️ BlueTeam",
      content:
        "Accepted in part. A transition services addendum at 90 days with mutual termination rights thereafter would address both parties' concerns. We propose: either party may terminate on 60 days notice; a mandatory 90-day transition services period follows; data portability guaranteed within 30 days of termination notice.",
    },
  ],
};

export type RedFlag = {
  id: string;
  category: string;
  clause_text: string;
  impact: string;
  citation: string;
  severity: number;
  advantage: string;
  eli12: string;
  historical_match: string;
};

export type ComplianceAudit = {
  gdpr_score: number;
  gdpr_violations: string[];
  itact_score: number;
  itact_violations: string[];
  ccpa_score: number;
  ccpa_violations: string[];
};

export type LogicConflict = {
  id: string;
  conflict: string;
  severity: string;
  rule_a: string;
  rule_b: string;
  explanation: string;
  resolved_clause: string;
  z3_code: string;
};

export type AutoFix = {
  id: string;
  issue: string;
  original: string;
  suggested: string;
  rationale: string;
  risk_level: string;
  risk_score: number;
};

export type Precedent = {
  case_name: string;
  jurisdiction: string;
  year: number;
  relevance: number;
  clause_ref: string;
  outcome: string;
};

export type DebateMessage = {
  role: "attacker" | "defender";
  agent: string;
  content: string;
};

export type AnalysisData = {
  score: number;
  pages_analyzed: number;
  pages_trend: string;
  relevant_precedents: number;
  precedents_trend: string;
  identified_risks: number;
  risks_trend: string;
  ai_confidence: string;
  confidence_trend: string;
  risk_zone: string;
  clause_type: string;
  impact: string;
  recommendation: string;
  analyzed_date: string;
  last_edited: string;
  filename: string;
  red_flags: RedFlag[];
  compliance_audit: ComplianceAudit;
  loophole_logs: { role: string; content: string }[];
  logic_conflicts: LogicConflict[];
  auto_fixes: AutoFix[];
  precedents: Precedent[];
  debate_transcript: DebateMessage[];
};

export const LEGAL_FORMS = [
  {
    id: "nda-mutual",
    title: "Mutual NDA",
    description: "GDPR-compliant mutual non-disclosure agreement with balanced terms.",
    category: "Confidentiality",
    pages: 4,
    risk_level: "LOW",
  },
  {
    id: "sow-it",
    title: "IT Services Statement of Work",
    description: "Detailed SOW for software development engagements with milestone-based payment.",
    category: "Services",
    pages: 8,
    risk_level: "MEDIUM",
  },
  {
    id: "saas-tos",
    title: "SaaS Terms of Service",
    description: "Comprehensive ToS covering data processing, IP ownership, and SLA provisions.",
    category: "Product",
    pages: 12,
    risk_level: "LOW",
  },
  {
    id: "employment",
    title: "Employment Agreement (India)",
    description: "IT Act 2000 and Companies Act compliant employment contract.",
    category: "HR",
    pages: 6,
    risk_level: "LOW",
  },
  {
    id: "vendor-master",
    title: "Vendor Master Agreement",
    description: "Balanced vendor agreement with symmetric termination and capped liability.",
    category: "Procurement",
    pages: 14,
    risk_level: "MEDIUM",
  },
  {
    id: "data-processing",
    title: "Data Processing Agreement (DPA)",
    description: "GDPR Art. 28-compliant DPA for data controllers and processors.",
    category: "Compliance",
    pages: 10,
    risk_level: "LOW",
  },
];
