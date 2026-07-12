export function InfoPage({ eyebrow, title, lead, sections = [], children }) {
  return <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
    <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      {eyebrow && <p className="text-sm uppercase tracking-[0.2em] text-slate-500">{eyebrow}</p>}
      <h1 className="mt-3 text-4xl font-semibold">{title}</h1>
      <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">{lead}</p>
      {sections.length > 0 && <div className="mt-8 grid gap-6 md:grid-cols-2">{sections.map((section) => <section key={section.title} className="rounded-2xl border border-slate-200 p-6 dark:border-slate-700"><h2 className="text-xl font-semibold">{section.title}</h2><p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{section.body}</p></section>)}</div>}
      {children}
    </article>
  </div>;
}
