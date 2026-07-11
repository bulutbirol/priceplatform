# Progressive Catalog Density Design

## Goal

Reduce visual crowding while keeping every household product, technical term, guide, and price factor easy to reach.

## Information architecture

- Keep the nine household product groups as the primary navigation spine.
- Group the guide archive by household product group instead of showing one list of hundreds of guides.
- Group price factors into four plain-language layers: product itself, production and durability, brand and sales, and outside costs.
- Group search results by content type so mixed results can be scanned quickly.
- On product pages, collapse long term sections and the full price-factor inventory behind native disclosure controls.

## Interaction

Use semantic `details` and `summary` elements. The first or most relevant group opens by default; every other group remains one click away. This works without client-side JavaScript, supports keyboard navigation, and keeps direct links intact.

## Visual direction

Retain the restrained editorial/Wikipedia-like visual system. Category summaries use thin rules, compact counts, strong headings, and generous reading space rather than card-heavy grids.

## Data and testing

Grouping is deterministic and lives in a small library module. Unit tests cover guide and price-factor classification. Page tests verify that the grouped navigation is rendered, then the complete test suite, lint, migration status, and production build are run.
