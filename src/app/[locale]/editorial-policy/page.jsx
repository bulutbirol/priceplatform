import { InfoPage } from "@/components/reading/info-page";
import { getInfoPageCopy } from "@/lib/info-page-copy";
export default async function EditorialPolicyPage({ params }) { const { locale } = await params; return <InfoPage {...getInfoPageCopy(locale).editorial} />; }
