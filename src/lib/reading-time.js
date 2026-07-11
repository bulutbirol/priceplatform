export function calculateReadingTime(content, wordsPerMinute = 180) {
  const text = (Array.isArray(content) ? content : [content]).filter(Boolean).join(" ").trim();
  const wordCount = text ? text.split(/\s+/u).filter(Boolean).length : 0;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}
