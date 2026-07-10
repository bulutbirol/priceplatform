export default async function ContactPage({ params }) {
    const { locale } = await params;
    return (<div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h1 className="text-4xl font-semibold">Contact</h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">Use the feedback form if you want to report an issue, suggest a topic, or share a correction. This contact page is a placeholder for future direct communication.</p>
      </div>
    </div>);
}
