# Deep Category Tree Design

## Goal

Make any of the 72 product types reachable without scanning long lists. Use the familiar classified-site model: main category, intermediate family, product type, then content.

## Hierarchy

1. Nine main household technology categories.
2. Two or three meaningful product families inside each main category.
3. Concrete product types inside each family.
4. Product content: price drivers, parts and technologies, guides, and comparisons.

Every product belongs to exactly one family. Family names describe user intent or physical system, not marketing language.

## Desktop interaction

A three-column category browser appears below the main search. The first column lists main categories, the second lists families for the selected category, and the third lists products for the selected family. Selection uses buttons; final products are links. Counts and a visible breadcrumb show where the user is.

## Mobile interaction

The same data becomes a progressive single-column drill-down. Only the active level is visually dominant. Back controls and the breadcrumb preserve context. No horizontal scrolling is required.

## Accessibility and fallback

Use real buttons for level selection and links for destinations, with `aria-pressed`, labelled regions, visible focus states, and server-provided initial content. Search remains available above the tree.

## Validation

Tests require all 72 products to occur exactly once, all nine groups to have families, and the browser to change family/product columns when a selection changes.
