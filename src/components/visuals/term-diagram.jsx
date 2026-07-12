function PhoneDiagram() {
  return <g><rect x="150" y="35" width="180" height="250" rx="28" /><rect x="175" y="72" width="130" height="160" rx="8" className="diagram-fill" /><circle cx="240" cy="258" r="9" /><path d="M205 55h70" /><path d="M195 115h90M195 145h90M195 175h90" className="diagram-accent" /></g>;
}
function CameraDiagram() {
  return <g><path d="M120 105h75l20-30h70l20 30h75v150H120z" /><circle cx="250" cy="180" r="72" className="diagram-fill" /><circle cx="250" cy="180" r="42" /><circle cx="250" cy="180" r="12" className="diagram-accent-fill" /><path d="M325 132h30" className="diagram-accent" /></g>;
}
function TvDiagram() {
  return <g><rect x="85" y="55" width="330" height="205" rx="10" /><path d="M220 260v28m60-28v28m-105 0h150" /><g className="diagram-fill"><rect x="110" y="80" width="84" height="68" /><rect x="207" y="80" width="84" height="68" /><rect x="304" y="80" width="84" height="68" /><rect x="110" y="160" width="84" height="74" /><rect x="207" y="160" width="84" height="74" /><rect x="304" y="160" width="84" height="74" /></g><circle cx="249" cy="194" r="18" className="diagram-accent-fill" /></g>;
}
function ApplianceDiagram() {
  return <g><rect x="145" y="36" width="210" height="252" rx="15" /><circle cx="250" cy="174" r="78" className="diagram-fill" /><circle cx="250" cy="174" r="48" /><path d="M220 174c12-28 28-28 40 0s28 28 40 0" className="diagram-accent" /><circle cx="185" cy="68" r="7" /><path d="M205 68h58" /></g>;
}

import { getUiCopy } from "@/lib/ui-copy";

export function TermDiagram({ term, locale = "tr" }) {
  const copy = getUiCopy(locale).visuals;
  const category = term.categories?.[0]?.category?.slug || term.categorySlugs?.[0] || "telefonlar";
  const Diagram = category === "kameralar" ? CameraDiagram : category === "televizyonlar" ? TvDiagram : category === "beyaz-esya" ? ApplianceDiagram : PhoneDiagram;
  return (
    <div className="term-diagram" role="img" aria-label={`${term.title} ${copy.diagram}`}>
      <svg viewBox="0 0 500 330" aria-hidden="true">
        <path d="M35 165h55m320 0h55" className="diagram-flow" />
        <circle cx="35" cy="165" r="8" className="diagram-accent-fill" />
        <circle cx="465" cy="165" r="8" className="diagram-accent-fill" />
        <Diagram />
      </svg>
      <div className="term-diagram__legend"><span>{copy.input}</span><strong>{term.title}</strong><span>{copy.userEffect}</span></div>
    </div>
  );
}
