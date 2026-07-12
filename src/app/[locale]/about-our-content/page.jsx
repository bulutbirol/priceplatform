import { InfoPage } from "@/components/reading/info-page";
import { getInfoPageCopy } from "@/lib/info-page-copy";
export default async function AboutOurContentPage({ params }) { const { locale } = await params; return <InfoPage {...getInfoPageCopy(locale).about} />; }
