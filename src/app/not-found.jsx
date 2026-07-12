import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return <main className="status-page"><span>404</span><p className="eyebrow">Bu parça yerinde değil</p><h1>Aradığın içerik<br />henüz burada yok.</h1><p>Terim kaldırılmış, adres değişmiş veya bağlantı hatalı olabilir.</p><Link href="/tr"><ArrowLeft /> Ana sayfaya dön</Link></main>;
}
