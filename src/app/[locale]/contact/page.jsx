import Link from "next/link";
import { InfoPage } from "@/components/reading/info-page";
import { getInfoPageCopy } from "@/lib/info-page-copy";
export default async function ContactPage({ params }) { const { locale } = await params; const copy = getInfoPageCopy(locale).contact; return <InfoPage {...copy}><Link className="mt-8 inline-flex rounded-full bg-slate-900 px-5 py-3 font-semibold text-white dark:bg-slate-100 dark:text-slate-900" href={`/${locale}/feedback`}>{copy.link}</Link></InfoPage>; }
