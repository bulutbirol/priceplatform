"use client";
import { useParams } from "next/navigation";
import { RotateCcw } from "lucide-react";

export default function ErrorPage({ reset }) {
  const { locale } = useParams();
  const english = locale === "en";
  return <div className="status-page"><span>!</span><p className="eyebrow">{english ? "Unexpected problem" : "Beklenmeyen bir sorun"}</p><h1>{english ? <>We could not open<br />this page.</> : <>Sayfayı açarken<br />bir şeyler karıştı.</>}</h1><p>{english ? "The content could not be loaded. You can try the request again." : "İçerik yüklenemedi. İsteği yeniden deneyebilirsin."}</p><button type="button" onClick={reset}><RotateCcw /> {english ? "Try again" : "Yeniden dene"}</button></div>;
}
