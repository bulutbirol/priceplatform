export default async function EditorialPolicyPage({ params }) {
    const { locale } = await params;
    return (<div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h1 className="text-4xl font-semibold">Editorial Policy</h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">Content should remain neutral, clearly labeled when editorial, and transparent about its sources and limitations.</p>
      </div>
    </div>);
}
