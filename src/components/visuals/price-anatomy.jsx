import { BadgeDollarSign, Box, FlaskConical, Megaphone, Microchip, ShieldCheck } from "lucide-react";

const layers = [
  ["Teknoloji", "Bileşen ve lisans", Microchip, "coral"],
  ["Üretim", "Montaj ve kalite", Box, "blue"],
  ["Ar-Ge", "Tasarım ve test", FlaskConical, "lime"],
  ["Marka primi", "Konumlandırma", BadgeDollarSign, "amber"],
  ["PR ve pazarlama", "Lansman ve görünürlük", Megaphone, "pink"],
  ["Servis", "Garanti ve destek", ShieldCheck, "teal"],
];

export function PriceAnatomy() {
  return (
    <div className="price-anatomy" aria-label="Bir ürün fiyatını oluşturan katmanlar">
      <div className="price-anatomy__topline">
        <span>Etiket fiyatı</span>
        <strong>Tek sayı, çok neden</strong>
      </div>
      <div className="price-anatomy__layers">
        {layers.map(([title, subtitle, Icon, color], index) => (
          <div className={`price-layer price-layer--${color}`} key={title} style={{ "--delay": `${index * 70}ms` }}>
            <Icon aria-hidden="true" size={19} />
            <span><strong>{title}</strong><small>{subtitle}</small></span>
            <i aria-hidden="true">0{index + 1}</i>
          </div>
        ))}
      </div>
      <p>Bu katmanların ağırlığı ürüne, markaya ve zamana göre değişir.</p>
    </div>
  );
}
