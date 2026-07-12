"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  const { locale } = useParams();
  const english = locale === "en";
  return <main className="status-page"><span>404</span><p className="eyebrow">{english ? "Page not found" : "Sayfa bulunamadı"}</p><h1>{english ? <>The content is not here.</> : <>Aradığın içerik<br />burada yok.</>}</h1><p>{english ? "The address may have changed or the content may no longer be published." : "Adres değişmiş veya içerik yayından kaldırılmış olabilir."}</p><Link href={`/${english ? "en" : "tr"}`}><ArrowLeft /> {english ? "Back to home" : "Ana sayfaya dön"}</Link></main>;
}
