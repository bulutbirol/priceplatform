const defaultLabels = { contents: "İçindekiler", shortInfo: "Kısa bilgiler", pros: "Artıları", cons: "Eksileri", article: "makalesi" };

export function TableOfContents({ items, labels = defaultLabels }) {
  const links = items.filter((item) => item?.id && item?.label);
  if (!links.length) return null;

  const contents = (
    <ol>
      {links.map((item) => (
        <li key={item.id}><a href={`#${item.id}`}>{item.label}</a></li>
      ))}
    </ol>
  );

  return (
    <>
      <nav className="article-toc article-toc--desktop" aria-label={labels.contents}>
        <p>{labels.contents}</p>
        {contents}
      </nav>
      <details className="article-toc article-toc--mobile">
        <summary>{labels.contents}</summary>
        <div>{contents}</div>
      </details>
    </>
  );
}

export function ArticleInfobox({ title = "Kısa bilgiler", items }) {
  const visibleItems = items.filter((item) => item?.label && item?.value !== undefined && item?.value !== null && item.value !== "");
  if (!visibleItems.length) return null;

  return (
    <aside className="article-infobox" aria-label={title}>
      <h2>{title}</h2>
      <dl>
        {visibleItems.map((item) => (
          <div key={item.label}>
            <dt>{item.label}</dt>
            <dd>{item.value}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}

export function ArticleSection({ id, title, children, className = "" }) {
  return (
    <section id={id} className={`article-section ${className}`.trim()}>
      <h2><a href={`#${id}`}>{title}</a></h2>
      {children}
    </section>
  );
}

export function ProsCons({ advantages = [], disadvantages = [], labels = defaultLabels }) {
  return (
    <div className="article-pros-cons">
      <section aria-labelledby="advantages-heading">
        <h3 id="advantages-heading"><span aria-hidden="true">+</span> {labels.pros}</h3>
        <ul>{advantages.map((item) => <li key={item.id || item.text}>{item.text}</li>)}</ul>
      </section>
      <section aria-labelledby="disadvantages-heading">
        <h3 id="disadvantages-heading"><span aria-hidden="true">−</span> {labels.cons}</h3>
        <ul>{disadvantages.map((item) => <li key={item.id || item.text}>{item.text}</li>)}</ul>
      </section>
    </div>
  );
}

export function ReadingLayout({ title, toc, infobox, children, labels = defaultLabels }) {
  return (
    <div className="reading-layout shell">
      <TableOfContents items={toc} labels={labels} />
      <div className="reading-article" role="region" aria-label={`${title} ${labels.article}`}>{children}</div>
      {infobox}
    </div>
  );
}
