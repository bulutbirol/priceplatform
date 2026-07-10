import { Camera, CookingPot, Refrigerator, Smartphone, Sparkles, Tv, WashingMachine } from "lucide-react";

const iconSets = {
  telefonlar: [Smartphone, Camera, Sparkles],
  kameralar: [Camera, Sparkles, Camera],
  televizyonlar: [Tv, Sparkles, Tv],
  "beyaz-esya": [WashingMachine, Refrigerator, CookingPot],
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
