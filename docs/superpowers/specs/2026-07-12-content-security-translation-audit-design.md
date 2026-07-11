# Content, Secret, and Translation Audit

## Security

- Environment files must remain ignored and untracked.
- Tracked source files are scanned for common credential patterns without printing secret values.
- No runtime environment value is serialized into client components.

## Content integrity

- Every category, term, factor, and guide keeps required text and relationships.
- Draft-source status remains visible; placeholder editorial sources are not presented as verified manufacturer evidence.

## Translation architecture

- Turkish and English interface copy live in one parity-tested module.
- Locale pages select copy by locale; untranslated database articles continue to use the Turkish fallback with a visible notice.
- Navigation, page headings, buttons, labels, accessibility names, article chrome, and footer are translated even when the article body is still Turkish.

## Validation

- A translation contract checks identical keys and non-empty values.
- English page tests check representative leaf, search, and article routes.
- Full tests, lint, migration status, build, and secret-pattern scans run before completion.
