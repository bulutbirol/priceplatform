import { getUiCopy } from "@/lib/ui-copy";

function selectChecklistTerms(terms) {
  const safety = terms.find((term) => /güven|koruma|sigorta|yalıtım|dayanıklılık|garanti/i.test(term.title));
  const ownership = terms.find((term) => /bakım|filtre|sarf|yedek|ömür|temizleme|enerji/i.test(term.title));
  return [...new Map([terms[0], safety, ownership, terms.at(-1)].filter(Boolean).map((term) => [term.id, term])).values()].slice(0, 3);
}

export function ProductExplainer({ title, terms, locale = "tr" }) {
  const copy = getUiCopy(locale).product;
  const normalizedTerms = terms.map(({ term }) => term);
  const coreSystems = normalizedTerms.slice(0, 4);
  const checklistTerms = selectChecklistTerms(normalizedTerms);

  return <section className="product-explainer shell section-space" aria-labelledby="product-system-title">
    <header className="product-explainer__intro">
      <div><span className="section-index">01</span><p className="kicker">{copy.seeInside}</p></div>
      <div><h2 id="product-system-title">{title} {copy.systemQuestion}?</h2><p>{copy.systemLead}</p></div>
    </header>

    <div className="product-system-map" role="img" aria-label={`${title} ${copy.systemMap}`}>
      <div className="product-system-map__core"><small>{copy.product}</small><strong>{title}</strong></div>
      {coreSystems.map((term, index) => <div className={`product-system-map__node product-system-map__node--${index + 1}`} key={term.id}>
        <span>{String(index + 1).padStart(2, "0")}</span><strong>{term.title}</strong><small>{term.shortDescription}</small>
      </div>)}
    </div>

    <div className="core-system-notes">{coreSystems.map((term, index) => <details key={term.id}>
      <summary><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{term.title}</h3><p>{term.shortDescription}</p></div></summary>
      <dl><div><dt>{copy.priceReason}</dt><dd>{term.whyPriceMatters}</dd></div><div><dt>{copy.pro}</dt><dd>{term.advantages[0]?.text}</dd></div><div><dt>{copy.con}</dt><dd>{term.disadvantages[0]?.text}</dd></div></dl>
    </details>)}</div>

    <aside className="product-checklist">
      <div><p className="kicker">{copy.shortPath}</p><h2>{copy.checklist}</h2></div>
      <ol>{checklistTerms.map((term, index) => <li key={term.id}><span>{index + 1}</span><div><strong>{term.title}</strong><p>{copy.checklistText}</p></div></li>)}</ol>
    </aside>
  </section>;
}
