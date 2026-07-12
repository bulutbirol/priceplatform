"use client";
import { RotateCcw } from "lucide-react";

export default function ErrorPage({ reset }) {
  return <div className="status-page"><span>!</span><p className="eyebrow">Beklenmeyen bir sorun</p><h1>Sayfayı açıklarken<br />bir şeyler karıştı.</h1><p>İçerik verisi geçici olarak okunamamış olabilir.</p><button type="button" onClick={reset}><RotateCcw /> Yeniden dene</button></div>;
}
