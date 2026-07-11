# Product–Term Relevance Design

## Problem

New household categories currently inherit every term from their upper product group. A term can be valid for one product and impossible for another: waterproofing may apply to a shaver, but not to a mains-powered hair dryer.

## Decision

Replace group-wide term copying with explicit product technology profiles. A profile may be shared only by products with the same physical system and usage model. Every category must still receive twenty useful terms, but relevance takes priority over uniform vocabulary.

## Guardrails

- Keep a machine-readable list of forbidden category–term combinations for high-risk contradictions.
- Content contract tests fail if a forbidden pair appears.
- Tests also require twenty unique terms per new category.
- Established deep categories retain their existing curated catalogs.
- Seed remains idempotent and updates fixed IDs, preventing stale invalid terms from surviving a reseed.

## Review scope

Audit all nine groups, especially water/electricity, heating, food contact, batteries, cameras, displays, motors, pumps, and software. Prefer a smaller accurate profile vocabulary over speculative premium features.
