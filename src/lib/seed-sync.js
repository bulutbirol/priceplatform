export function staleCanonicalIds(existingIds, canonicalIds, prefix) {
  const canonical = new Set(canonicalIds);
  return existingIds.filter((id) => id.startsWith(prefix) && !canonical.has(id));
}
