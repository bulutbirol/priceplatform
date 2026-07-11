import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getUiCopy } from "@/lib/ui-copy";

export function Footer({ locale }) {
  const copy = getUiCopy(locale).footer;
  return <footer className="site-footer"><div className="shell">
    <div className="site-footer__lead"><div className="wordmark wordmark--footer"><span className="wordmark__mark">₺</span><span><strong>Fiyatın</strong><small>Anatomisi</small></span></div><h2>{copy.headlineBefore}<br /><em>{copy.emphasis}</em> {copy.headlineAfter}</h2><p>{copy.description}</p></div>
    <div className="site-footer__links"><div><p className="kicker">{copy.explore}</p><Link href={`/${locale}/categories`}>{copy.categories}</Link><Link href={`/${locale}/guides`}>{copy.guides}</Link><Link href={`/${locale}/pricing-factors`}>{copy.factors}</Link><Link href={`/${locale}/comparisons`}>{copy.comparisons}</Link></div><div><p className="kicker">{copy.transparency}</p><Link href={`/${locale}/about-our-content`}>{copy.content}</Link><Link href={`/${locale}/editorial-policy`}>{copy.editorial}</Link><Link href={`/${locale}/privacy-policy`}>{copy.privacy}</Link><Link href={`/${locale}/contact`}>{copy.contact}</Link></div><Link className="footer-feedback" href={`/${locale}/feedback`}>{copy.report}<br /><strong>{copy.notify}</strong><ArrowUpRight /></Link></div>
    <div className="site-footer__bottom"><span>© 2026 Price Explained</span><p>{copy.disclaimer}</p></div>
  </div></footer>;
}
