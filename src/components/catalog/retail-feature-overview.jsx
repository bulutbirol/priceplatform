import { getUiCopy } from "@/lib/ui-copy";

export function RetailFeatureOverview({ features, locale = "tr" }) {
  if (!features?.length) return null;

  const copy = getUiCopy(locale).retail;
  const priorities = features.filter((feature) => feature.importance === "yüksek").slice(0, 3);
  const dateLocale = locale === "en" ? "en-US" : "tr-TR";

  return <section id="magaza-ozellikleri" className="retail-overview shell section-space" aria-labelledby="retail-overview-title">
    <header className="retail-overview__header">
      <p className="kicker">{copy.eyebrow}</p>
      <h2 id="retail-overview-title">{copy.title}</h2>
      <p>{copy.lead}</p>
    </header>

    <aside className="retail-decision" aria-labelledby="retail-decision-title">
      <h3 id="retail-decision-title">{copy.decisionTitle}</h3>
      <ul>{priorities.map((feature) => <li key={feature.id}><strong>{feature.title}</strong><span>{feature.decision}</span></li>)}</ul>
    </aside>

    <div className="retail-feature-list">{features.map((feature) => <article key={feature.id}>
      <header>
        <div><h3>{feature.title}</h3><p><span>{copy.commonValues}:</span> {feature.commonValues.join(" · ")}</p></div>
        <div className="retail-feature-list__signals">
          <strong className={`retail-impact retail-impact--${feature.priceImpact}`}>{copy.priceImpact}: {copy.impacts[feature.priceImpact]}</strong>
          <span>{copy.importance}: {copy.impacts[feature.importance]}</span>
        </div>
      </header>
      <p className="retail-feature-list__decision">{feature.decision}</p>
      <details>
        <summary>{copy.details}</summary>
        <p>{feature.shortDescription}</p>
        <footer><span>{copy.sources[feature.sourceStatus]}</span><time dateTime={feature.reviewedAt}>{copy.reviewed}: {new Intl.DateTimeFormat(dateLocale).format(new Date(feature.reviewedAt))}</time></footer>
      </details>
    </article>)}</div>
  </section>;
}
