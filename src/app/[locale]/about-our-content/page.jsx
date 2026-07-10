export default async function AboutOurContentPage({ params }) {
    const { locale } = await params;
    return (<div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Transparency</p>
        <h1 className="mt-3 text-4xl font-semibold">How Our Content Is Created</h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">This platform is an independent educational project. It is not a professional testing laboratory, engineering firm, or certified technical authority. Content is created for general educational purposes.</p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {[
            { title: "Our Purpose", body: "We explain the reasons behind technology pricing in clear language." },
            { title: "Our Research Process", body: "We review public sources, official documentation, and online research to build accessible explanations." },
            { title: "Our Limitations", body: "Specifications, features, and prices can change over time." },
            { title: "Corrections and Feedback", body: "If you find inaccurate or outdated information, use the feedback form on the site." },
        ].map((section) => (<section key={section.title} className="rounded-2xl border border-slate-200 p-6 dark:border-slate-700">
              <h2 className="text-xl font-semibold">{section.title}</h2>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{section.body}</p>
            </section>))}
        </div>
      </article>
    </div>);
}
