import { AirVent, Camera, CookingPot, Refrigerator, Smartphone, Sparkles, Tv, WashingMachine, Wind } from "lucide-react";

const iconSets = {
  telefonlar: [Smartphone, Camera, Sparkles],
  kameralar: [Camera, Sparkles, Camera],
  televizyonlar: [Tv, Sparkles, Tv],
  "beyaz-esya": [WashingMachine, Refrigerator, CookingPot],
  buzdolaplari: [Refrigerator, Sparkles, Refrigerator],
  "camasir-makineleri": [WashingMachine, Sparkles, WashingMachine],
  "bulasik-makineleri": [CookingPot, Sparkles, WashingMachine],
  "kurutma-makineleri": [Wind, Sparkles, WashingMachine],
  firinlar: [CookingPot, Sparkles, CookingPot],
  klimalar: [AirVent, Wind, Sparkles],
};

export function CategoryIllustration({ slug, title }) {
  const [Primary, Secondary, Tertiary] = iconSets[slug] || iconSets.telefonlar;
  return (
    <div className={`category-illustration category-illustration--${slug}`} role="img" aria-label={`${title} teknolojileri illüstrasyonu`}>
      <span className="category-illustration__orbit" />
      <Primary className="category-illustration__primary" strokeWidth={1.25} />
      <Secondary className="category-illustration__secondary" strokeWidth={1.5} />
      <Tertiary className="category-illustration__tertiary" strokeWidth={1.5} />
      <span className="category-illustration__dot category-illustration__dot--one" />
      <span className="category-illustration__dot category-illustration__dot--two" />
    </div>
  );
}
