const factorLayers = [
  { slug: "urun", title: "Ürünün kendisi", description: "Parça, malzeme, kapasite, donanım ve yazılım." },
  { slug: "uretim", title: "Üretim ve ömür", description: "Üretim kalitesi, test, bakım, servis ve dayanıklılık." },
  { slug: "satis", title: "Marka ve satış", description: "Marka primi, lisans, reklam, PR, dağıtım ve mağaza payı." },
  { slug: "dis", title: "Dış maliyetler", description: "Vergi, kur, ithalat, lojistik ve enerji gibi dış etkiler." },
];

function normalizedFactorText(factor) {
  return `${factor.slug} ${factor.title}`.toLocaleLowerCase("tr-TR");
}

function layerForFactor(factor) {
  const text = normalizedFactorText(factor);
  if (/vergi|tax|exchange|kur|ithalat|import|lojistik|logistics|nakliye|enerji maliyeti|gümrük|customs/.test(text)) return "dis";
  if (/marka|brand|marketing|pazarlama|reklam|advertising|\bpr\b|perakende|retail|dağıtım|dagitim|distribution|lisans|abonelik|satış/.test(text)) return "satis";
  if (/üretim|uretim|manufacturing|test|dayanıklılık|dayaniklilik|warranty|garanti|service|servis|bakım|bakim|yedek|montaj|işçilik|iscilik|research|development|arge|ar-ge|kalite kontrol|onarılabilirlik/.test(text)) return "uretim";
  return "urun";
}

export function groupPriceFactors(factors) {
  return factorLayers.map((layer) => ({
    ...layer,
    items: factors.filter((factor) => layerForFactor(factor) === layer.slug),
  }));
}

export function groupGuidesByProductGroup(guides) {
  const groups = new Map();
  for (const guide of guides) {
    const productGroup = guide.category?.group || { slug: "diger", title: "Diğer ürünler", position: 99 };
    if (!groups.has(productGroup.slug)) groups.set(productGroup.slug, { ...productGroup, items: [] });
    groups.get(productGroup.slug).items.push(guide);
  }
  return [...groups.values()].sort((a, b) => a.position - b.position);
}

export function groupSearchResults(results) {
  const definitions = [
    ["groups", "Ürün grupları", (item) => item.description && Number.isInteger(item.position)],
    ["categories", "Ürün türleri", (item) => item.eyebrow],
    ["features", "Mağaza özellikleri", (item) => item.contentType === "retail-feature"],
    ["terms", "Teknik terimler", (item) => item.summary],
    ["guides", "Rehberler", (item) => item.readingTime],
    ["factors", "Fiyat faktörleri ve markalar", () => true],
  ];
  const remaining = [...results];
  return definitions.map(([slug, title, matches]) => {
    const items = remaining.filter(matches);
    for (const item of items) remaining.splice(remaining.indexOf(item), 1);
    return { slug, title, items };
  }).filter((group) => group.items.length);
}
