import { FeedbackForm } from "@/components/feedback/feedback-form";
import { InfoPage } from "@/components/reading/info-page";
import { getInfoPageCopy } from "@/lib/info-page-copy";
export default async function FeedbackPage({ params }) { const { locale } = await params; return <><InfoPage {...getInfoPageCopy(locale).feedback} /><div className="mx-auto -mt-6 max-w-5xl px-4 pb-10 sm:px-6 lg:px-8"><FeedbackForm locale={locale} /></div></>; }
