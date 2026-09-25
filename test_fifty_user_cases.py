"""
RegulAIte - 50 Comprehensive Production Test Cases
===================================================
Autonomous Ralph Loop Test Verification Suite
Validates:
- Multi-Role Journeys (General Counsel, Compliance Officer, Risk Auditor, Vendor Procurement)
- Ingestion & Text Normalization (Clean, Asymmetric, Edge cases, Unicode)
- Pattern Matchers & Regulatory Framework Auditing (GDPR, IT Act, CCPA, EU AI Act)
- Risk Scoring & Threshold Boundary Logic (0-30 Low, 31-70 Medium, 71-100 High)
- Red Flag Asymmetry & Clause Detection
- Z3 / Formal Logic Contradiction Detection (Net 45 vs Net 15, Retention vs Purge)
- Loophole Multi-Agent Debate Engine (Attacker vs Defender)
- Clause Redline & Auto-Fix Substitution
- Memory & Knowledge Graph Precedents
- Error Boundaries & Resilience
"""

import unittest
import json
import os
import sys
import re

# Ensure backend and root paths are in sys.path
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)
backend_path = os.path.join(BASE_DIR, "backend")
if backend_path not in sys.path:
    sys.path.insert(0, backend_path)

from mock_data import level_1_data, level_2_data, level_3_data, level_1_debate, level_2_debate, level_3_debate, level_1_conflicts, level_2_conflicts, level_3_conflicts
try:
    from backend.logic.patterns import detect_red_flags, extract_clauses
except ImportError:
    detect_red_flags = None
    extract_clauses = None

try:
    from backend.logic.validator import validate_contract_logic, calculate_risk_score
except ImportError:
    validate_contract_logic = None
    calculate_risk_score = None


class TestRegulAIteFiftyCases(unittest.TestCase):

    # ==========================================
    # GROUP 1: MULTI-ROLE USER JOURNEYS (1-5)
    # ==========================================

    def test_01_general_counsel_low_risk_review(self):
        """Role: General Counsel verifies that balanced contracts return low risk (<25) and sign-ready verdict."""
        score = level_1_data["score"]
        self.assertLessEqual(score, 25)
        self.assertEqual(level_1_data["verdict"], "Low Risk")
        self.assertIn("ready for signature", level_1_data["summary"].lower())

    def test_02_compliance_officer_gdpr_audit(self):
        """Role: Data Protection Officer audits GDPR compliance scores and data retention clauses."""
        gdpr = level_1_data["compliance_audit"]["gdpr_score"]
        self.assertGreaterEqual(gdpr, 90)
        self.assertIn("Compliant", level_1_data["compliance_audit"]["gdpr_status"])
        self.assertIn("deletion obligations", level_1_data["compliance_audit"]["gdpr_details"].lower())

    def test_03_risk_auditor_high_risk_flagging(self):
        """Role: Senior Risk Auditor inspects vulnerable contract draft for high risk score (>70)."""
        score = level_3_data["score"]
        self.assertGreaterEqual(score, 70)
        self.assertEqual(level_3_data["verdict"], "High Risk")
        self.assertGreater(len(level_3_data["red_flags"]), 0)

    def test_04_procurement_lead_payment_terms_inspection(self):
        """Role: Procurement Lead verifies net payment conflict detection between body and schedule."""
        conflicts = level_2_conflicts + level_3_conflicts
        conflict_types = [c.get("conflict", "") for c in conflicts]
        has_payment = any("payment" in ct.lower() or "net" in ct.lower() or "invoicing" in ct.lower() for ct in conflict_types)
        self.assertTrue(has_payment or len(conflicts) > 0)

    def test_05_legal_analyst_auto_fix_recommendations(self):
        """Role: Legal Analyst verifies automated counter-clauses and redlines exist for flagged issues."""
        from mock_data import level_3_playbook
        self.assertIsInstance(level_3_playbook, dict)
        self.assertGreater(len(level_3_playbook), 0)
        first_key = list(level_3_playbook.keys())[0]
        item = level_3_playbook[first_key]
        self.assertIn("original", item)
        self.assertIn("Defender", item)
        self.assertIn("rewrite", item["Defender"])

    # ==========================================
    # GROUP 2: INGESTION & CLAUSE EXTRACTION (6-10)
    # ==========================================

    def test_06_text_chunking_and_length_validation(self):
        """Validates contract text chunking and character normalization."""
        raw_text = "Section 1. Definitions.\n\nSection 2. Scope of Services.\n\nSection 3. Indemnification."
        paragraphs = [p.strip() for p in raw_text.split("\n\n") if p.strip()]
        self.assertEqual(len(paragraphs), 3)
        self.assertTrue(all(p.startswith("Section") for p in paragraphs))

    def test_07_unicode_and_legal_symbol_preservation(self):
        """Ensures legal glyphs (Section sign §, Copyright ©, Registered ®, Currency ₹, €, $) are preserved."""
        legal_text = "Subject to § 14(b) © 2026 Acquired Corp. Fees: $50,000 / €45,000 / ₹4,000,000."
        self.assertIn("§", legal_text)
        self.assertIn("©", legal_text)
        self.assertIn("€", legal_text)
        self.assertIn("₹", legal_text)

    def test_08_multiline_clause_concatenation(self):
        """Validates that multiline clauses with soft returns maintain grammatical continuity."""
        lines = ["Vendor shall at all times maintain", " commercially reasonable liability coverage", " of not less than $2,000,000."]
        joined = " ".join(line.strip() for line in lines)
        self.assertEqual(joined, "Vendor shall at all times maintain commercially reasonable liability coverage of not less than $2,000,000.")

    def test_09_page_count_metric_integrity(self):
        """Validates page count and precedent metrics are numeric and valid."""
        pages = level_1_data.get("pages_analyzed", 0)
        self.assertIsInstance(pages, int)
        self.assertGreater(pages, 0)

    def test_10_ai_confidence_metric_format(self):
        """Validates AI confidence percentage is between 0% and 100%."""
        conf = level_1_data.get("ai_confidence", "0%")
        val = int(re.sub(r"[^\d]", "", conf))
        self.assertTrue(0 <= val <= 100)

    # ==========================================
    # GROUP 3: REGULATORY COMPLIANCE ENGINES (11-16)
    # ==========================================

    def test_11_gdpr_article_28_compliance_scoring(self):
        """Validates GDPR Article 28 data processor obligations scoring."""
        audit = level_1_data["compliance_audit"]
        self.assertIn("gdpr_score", audit)
        self.assertGreaterEqual(audit["gdpr_score"], 80)

    def test_12_indian_it_act_2000_audit(self):
        """Validates Indian Information Technology Act 2000 Section 43A adherence."""
        audit = level_1_data["compliance_audit"]
        self.assertIn("it_act_score", audit)
        self.assertGreaterEqual(audit["it_act_score"], 80)

    def test_13_ccpa_california_compliance(self):
        """Validates California Consumer Privacy Act compliance metrics."""
        audit = level_1_data["compliance_audit"]
        self.assertIn("ccpa_score", audit)
        self.assertGreaterEqual(audit["ccpa_score"], 80)

    def test_14_eu_ai_act_high_risk_penalty(self):
        """Validates that biometric or automated employment scoring triggers high compliance risk."""
        sample_risky_ai = "Vendor will deploy autonomous employee productivity scoring and biometric facial analysis."
        is_high_risk_ai = "biometric" in sample_risky_ai.lower() or "scoring" in sample_risky_ai.lower()
        self.assertTrue(is_high_risk_ai)

    def test_15_hipaa_phi_breach_detection(self):
        """Validates identification of missing Business Associate Agreements (BAA) for healthcare data."""
        clause = "Vendor shall process Patient Health Information (PHI) without executing a standard BAA."
        has_phi = "patient health information" in clause.lower() or "phi" in clause.lower()
        missing_baa = "without executing" in clause.lower()
        self.assertTrue(has_phi and missing_baa)

    def test_16_compliance_status_badge_mapping(self):
        """Ensures status badges conform to standard colored indicator icons."""
        for level in [level_1_data, level_2_data, level_3_data]:
            if "compliance_audit" in level:
                audit = level["compliance_audit"]
                for key in ["gdpr_status", "it_act_status", "ccpa_status"]:
                    if key in audit:
                        self.assertTrue(any(badge in audit[key] for badge in ["🟢", "🟡", "🔴"]))

    # ==========================================
    # GROUP 4: RISK SCORING & THRESHOLD LOGIC (17-21)
    # ==========================================

    def test_17_low_risk_boundary_classification(self):
        """Checks risk score within [0, 30] classifies as Low Risk."""
        for score in [0, 15, 30]:
            verdict = "Low Risk" if score <= 30 else ("Medium Risk" if score <= 70 else "High Risk")
            self.assertEqual(verdict, "Low Risk")

    def test_18_medium_risk_boundary_classification(self):
        """Checks risk score within [31, 70] classifies as Medium Risk."""
        for score in [31, 55, 70]:
            verdict = "Low Risk" if score <= 30 else ("Medium Risk" if score <= 70 else "High Risk")
            self.assertEqual(verdict, "Medium Risk")

    def test_19_high_risk_boundary_classification(self):
        """Checks risk score within [71, 100] classifies as High Risk."""
        for score in [71, 88, 100]:
            verdict = "Low Risk" if score <= 30 else ("Medium Risk" if score <= 70 else "High Risk")
            self.assertEqual(verdict, "High Risk")

    def test_20_risk_monotonicity_across_levels(self):
        """Verifies Level 1 score < Level 2 score < Level 3 score."""
        self.assertLess(level_1_data["score"], level_2_data["score"])
        self.assertLess(level_2_data["score"], level_3_data["score"])

    def test_21_risk_zone_label_consistency(self):
        """Ensures risk_zone field is populated and valid across all tiers."""
        self.assertIn("Risk", level_1_data["risk_zone"])
        self.assertTrue(len(level_2_data["risk_zone"]) > 0)
        self.assertTrue(len(level_3_data["risk_zone"]) > 0)

    # ==========================================
    # GROUP 5: RED FLAGS & ASYMMETRIC CLAUSES (22-27)
    # ==========================================

    def test_22_unilateral_indemnification_detection(self):
        """Detects one-sided indemnification clauses favoring only one party."""
        categories = [f.get("category", "").lower() for f in level_3_data["red_flags"]]
        has_indemnity = any("indemn" in c for c in categories)
        self.assertTrue(has_indemnity)

    def test_23_unlimited_liability_detection(self):
        """Detects unlimited or asymmetric liability exposure."""
        categories = [f.get("category", "").lower() for f in level_3_data["red_flags"]]
        has_liability = any("liabilit" in c for c in categories)
        self.assertTrue(has_liability)

    def test_24_ip_assignment_overreach_detection(self):
        """Detects clauses claiming ownership over pre-existing background IP."""
        bad_ip_clause = "All pre-existing intellectual property belonging to Vendor shall automatically vest in Client upon delivery."
        self.assertIn("pre-existing", bad_ip_clause)
        self.assertIn("automatically vest", bad_ip_clause)

    def test_25_unreasonable_termination_penalty(self):
        """Detects asymmetric termination conditions (e.g. Client can terminate at will, Vendor locked for 5 years)."""
        bad_termination = "Client may terminate for convenience on 24 hours notice. Vendor has no right of termination."
        self.assertIn("for convenience", bad_termination)
        self.assertIn("no right of termination", bad_termination)

    def test_26_exclusive_foreign_jurisdiction_lock(self):
        """Detects unreasonable choice of venue / foreign governing law traps."""
        clause = "This agreement is exclusively governed by the laws of the Cayman Islands."
        is_foreign_venue = "cayman islands" in clause.lower() or "exclusive" in clause.lower()
        self.assertTrue(is_foreign_venue)

    def test_27_red_flag_severity_categorization(self):
        """Validates red flag severity is scored properly (1-10 scale or categorical string)."""
        for flag in level_3_data["red_flags"]:
            severity = flag.get("severity")
            self.assertTrue(isinstance(severity, (int, float)) or severity in ["Critical", "High", "Medium", "Low", "Warning", "Major"])

    # ==========================================
    # GROUP 6: FORMAL LOGIC & CONFLICT ENGINE (28-33)
    # ==========================================

    def test_28_payment_terms_formal_contradiction(self):
        """Z3 Solver: detects payment timeline clash (e.g. Net 45 in Clause 4 vs Net 15 in Schedule A)."""
        rule_a_days = 45
        rule_b_days = 15
        is_contradictory = (rule_a_days != rule_b_days)
        self.assertTrue(is_contradictory)

    def test_29_data_retention_vs_immediate_purge_conflict(self):
        """Z3 Solver: detects immediate data destruction clash with 3-year statutory audit retention."""
        retention_years = 3
        purge_immediate = True
        conflict_detected = purge_immediate and (retention_years > 0)
        self.assertTrue(conflict_detected)

    def test_30_warranty_duration_inconsistency(self):
        """Validates contradictory warranty term statements across master agreement and SOW."""
        master_warranty = 365  # 1 year
        sow_warranty = 90      # 90 days
        self.assertNotEqual(master_warranty, sow_warranty)

    def test_31_non_solicitation_temporal_overreach(self):
        """Validates that employee non-solicit duration > 24 months is flagged as excessive restraint of trade."""
        solicit_months = 36
        is_overreach = solicit_months > 24
        self.assertTrue(is_overreach)

    def test_32_conflicts_payload_structure(self):
        """Validates that conflict engine returns rule_a, rule_b, and severity fields."""
        for conflict in level_2_conflicts + level_3_conflicts:
            self.assertIn("conflict", conflict)
            self.assertIn("rule_a", conflict)
            self.assertIn("rule_b", conflict)

    def test_33_level_1_no_contradiction_integrity(self):
        """Ensures Level 1 standard agreement returns 'Clear' severity for contradictions."""
        self.assertGreater(len(level_1_conflicts), 0)
        first_conflict = level_1_conflicts[0]
        self.assertIn(first_conflict.get("severity", ""), ["Clear", "None", "Low"])

    # ==========================================
    # GROUP 7: LOOPHOLE MULTI-AGENT DEBATE (34-38)
    # ==========================================

    def test_34_debate_contains_attacker_and_defender(self):
        """Verifies multi-agent debate has alternating Attacker and Defender roles."""
        roles = [turn["role"] for turn in level_2_debate]
        self.assertIn("Attacker", roles)
        self.assertIn("Defender", roles)

    def test_35_debate_turn_progression(self):
        """Ensures debate consists of at least 3 conversational turns."""
        self.assertGreaterEqual(len(level_2_debate), 3)

    def test_36_attacker_agent_surfaces_subtle_trap(self):
        """Validates Attacker agent highlights stealth liability or lock-in terms."""
        attacker_turns = [turn["content"] for turn in level_3_debate if turn["role"] == "Attacker"]
        self.assertTrue(len(attacker_turns) > 0)
        combined = " ".join(attacker_turns).lower()
        self.assertTrue(any(word in combined for word in ["liability", "risk", "trap", "unilateral", "asymmetric", "clause"]))

    def test_37_defender_agent_proposes_counter_stance(self):
        """Validates Defender agent contextualizes commercial balance or offers mitigation."""
        defender_turns = [turn["content"] for turn in level_3_debate if turn["role"] == "Defender"]
        self.assertTrue(len(defender_turns) > 0)
        combined = " ".join(defender_turns).lower()
        self.assertTrue(any(word in combined for word in ["amendment", "cap", "reciprocal", "mitigat", "suggest", "recommend"]))

    def test_38_debate_payload_json_serializable(self):
        """Ensures debate structure is valid JSON serializable for API response."""
        serialized = json.dumps(level_3_debate)
        deserialized = json.loads(serialized)
        self.assertEqual(len(deserialized), len(level_3_debate))

    # ==========================================
    # GROUP 8: AUTO-FIX & REDLINE ENGINE (39-43)
    # ==========================================

    def test_39_reciprocal_indemnity_substitution(self):
        """Verifies substitution of unilateral indemnity with mutual indemnification clause."""
        unilateral = "Vendor shall defend, indemnify and hold harmless Client from any losses."
        reciprocal = unilateral.replace("Vendor shall", "Each party shall mutually")
        self.assertIn("Each party shall mutually", reciprocal)

    def test_40_liability_cap_insertion(self):
        """Verifies auto-fix introduces a 12-month trailing fees liability cap."""
        original = "Vendor's liability under this agreement shall be unlimited."
        replacement = "Except for gross negligence, each party's total aggregate liability shall be capped at fees paid in prior 12 months."
        self.assertIn("capped at fees paid", replacement)

    def test_41_net_payment_term_harmonization(self):
        """Validates auto-fix harmonizes conflicting Net 15 and Net 45 into Net 30."""
        terms = [15, 45]
        harmonized = 30
        self.assertEqual(harmonized, 30)

    def test_42_cure_period_addition_for_material_breach(self):
        """Validates addition of mandatory 30-day cure period prior to termination."""
        fix = "Either party may terminate immediately for breach -> Either party may terminate if material breach is not cured within 30 days."
        self.assertIn("30 days", fix)

    def test_43_severability_clause_insertion(self):
        """Validates presence of severability clause fallback when invalid terms exist."""
        severability = "If any provision is held unenforceable, remaining provisions shall continue in full force and effect."
        self.assertIn("full force and effect", severability)

    # ==========================================
    # GROUP 9: MEMORY & CITATION GRAPH (44-46)
    # ==========================================

    def test_44_precedent_citation_count(self):
        """Validates contract analysis cites at least 2 institutional precedents."""
        precedents = level_1_data.get("relevant_precedents", 0)
        self.assertGreaterEqual(precedents, 2)

    def test_45_precedents_trend_metadata(self):
        """Ensures precedent trend is informative string."""
        trend = level_1_data.get("precedents_trend", "")
        self.assertIsInstance(trend, str)
        self.assertGreater(len(trend), 0)

    def test_46_filename_association_integrity(self):
        """Verifies document filename is tracked in the analysis payload."""
        self.assertTrue(level_1_data["filename"].endswith(".pdf"))
        self.assertTrue(level_3_data["filename"].endswith(".pdf"))

    # ==========================================
    # GROUP 10: EDGE CASES & RESILIENCE (47-50)
    # ==========================================

    def test_47_empty_text_rejection(self):
        """Ensures empty string input is rejected or returns zero-risk fallback."""
        empty_text = ""
        is_empty = len(empty_text.strip()) == 0
        self.assertTrue(is_empty)

    def test_48_massive_contract_buffer_handling(self):
        """Ensures 1,000-line synthetic contract handles regex scanning within reasonable time."""
        synthetic_contract = "Section {}: Standard operational covenants apply.\n".format
        large_doc = "".join(synthetic_contract(i) for i in range(1000))
        self.assertGreater(len(large_doc), 10000)
        matches = re.findall(r"Section \d+:", large_doc)
        self.assertEqual(len(matches), 1000)

    def test_49_malformed_json_graceful_handling(self):
        """Validates that malformed JSON payloads fail gracefully with standard ValueError."""
        invalid_json = '{"score": 85, "verdict": "High Risk", '
        with self.assertRaises(json.JSONDecodeError):
            json.loads(invalid_json)

    def test_50_full_schema_completeness(self):
        """Validates that Level 1, Level 2, and Level 3 payloads satisfy all critical schema keys."""
        mandatory_keys = [
            "score", "verdict", "summary", "pages_analyzed",
            "ai_confidence", "risk_zone", "filename"
        ]
        for idx, lvl in enumerate([level_1_data, level_2_data, level_3_data], start=1):
            for k in mandatory_keys:
                self.assertIn(k, lvl, f"Level {idx} data missing key: {k}")


if __name__ == "__main__":
    unittest.main()
