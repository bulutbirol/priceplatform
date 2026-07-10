import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function Footer({ locale }) {
  return <footer className="site-footer"><div className="shell">
    <div className="site-footer__lead"><div className="wordmark wordmark--footer"><span className="wordmark__mark">₺</span><span><strong>Fiyatın</strong><small>Anatomisi</small></span></div><h2>Neye para verdiğini<br /><em>bilerek</em> seç.</h2><p>Teknolojik ürün fiyatlarını ve karmaşık terimleri bağımsız, sade ve anlaşılır bir dille açıklıyoruz.</p></div>
    <div className="site-footer__links"><div><p className="kicker">Keşfet</p><Link href={`/${locale}/categories`}>Kategoriler</Link><Link href={`/${locale}/guides`}>Rehberler</Link><Link href={`/${locale}/pricing-factors`}>Fiyat faktörleri</Link><Link href={`/${locale}/comparisons`}>Karşılaştırmalar</Link></div><div><p className="kicker">Şeffaflık</p><Link href={`/${locale}/about-our-content`}>İçeriklerimiz</Link><Link href={`/${locale}/editorial-policy`}>Editoryal politika</Link><Link href={`/${locale}/privacy-policy`}>Gizlilik</Link><Link href={`/${locale}/contact`}>İletişim</Link></div><Link className="footer-feedback" href={`/${locale}/feedback`}>Bir hata mı gördün?<br /><strong>Bize bildir</strong><ArrowUpRight /></Link></div>
    <div className="site-footer__bottom"><span>© 2026 Price Explained</span><p>Bağımsız eğitim platformu · Fiyat değerlendirmeleri kesin maliyet hesabı değildir.</p></div>
  </div></footer>;
}
