# Security-First-RAG-Portfolio
A high-performance RAG system designed for critical infrastructure environments with role-based access control, comprehensive audit logging, and PII redaction. Built for utilities handling sensitive operational and customer data.

📖 Executive Summary

This project demonstrates a Security-First Retrieval-Augmented Generation (RAG) architecture designed for high-stakes environments such as public power districts. Unlike standard AI implementations, this system prioritizes data sovereignty, immutable auditing, and multi-tier access control to prevent data leakage and ensure compliance with federal utility standards.
🏗️ Security Architecture

The system is built on a "Defense in Depth" philosophy, ensuring that security is not an afterthought but the foundation of the RAG pipeline.

    Zero-Trust Retrieval: Documents are indexed with metadata tags that enforce security boundaries at the point of retrieval.

    Automated PII Redaction: A pre-processing layer that identifies and masks Personally Identifiable Information (PII) before data reaches the Large Language Model (LLM).

    Immutable Audit Logging: All queries and failed access attempts are logged to a write-once-read-many (WORM) style system for forensic analysis.

🔐 RBAC Tiers (Role-Based Access Control)

The system enforces strict logical separation of data based on user roles:
Tier	Role	Access Level	Data Visibility
Tier 1	Security Admin	Full System	All logs, system configurations, and raw data.
Tier 2	Power Engineer	Operational	Technical manuals, grid documentation, no PII.
Tier 3	General Staff	Restricted	Public-facing docs and non-sensitive internal FAQs.
⚖️ Compliance Standards

This system is architected to align with the stringent requirements of the energy and utility sector:
NERC CIP (Critical Infrastructure Protection)

    CIP-007 (Systems Security Management): Implements failed access detection and alerting (as seen in log_failed_access_attempt).

    CIP-011 (Information Protection): Ensures sensitive grid data is encrypted and access-restricted.

NIST 800-53 & SOC 2

    AC-3 (Access Enforcement): Granular control over who can query specific vector databases.

    AU-6 (Audit Review): Automated escalation to security teams when suspicious query patterns are detected.

🚀 Technical Implementation

The codebase features several critical security components:

    Failed Access Detection: Real-time monitoring of auth failures with automatic escalation after 3 attempts.

    Secure API Gateway: Rate limiting and request validation to prevent prompt injection attacks.

    Frontend Logic: A tab-based observability dashboard built with responsive CSS/JS for real-time monitoring.
