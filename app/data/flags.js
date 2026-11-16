/*
  Ick Check flag list.

  Source: EU endocrine disruptor lists (edlists.org), run by national
  authorities in Belgium, Denmark, France, the Netherlands, Spain and Sweden.
  Lists checked: October 2026 (site shows "Latest update 2026/04").

  Only substances that can appear in cosmetics and personal care products are
  included. Each entry lists every edlists.org list it appears on; the app
  shows the strongest one (I, then II, then III).

  "role" is what the ingredient typically does in a product. It is given to
  the AI note writer as a fact so it does not guess.

  "terms" are the names the ingredient can appear under on a label (INCI
  names, common names, abbreviations). Matching is case-insensitive and
  whole-word, so "bha" does not match inside another word.
*/
window.ICK_LISTS = {
  I: {
    label: 'EU ED List I',
    desc: 'Identified as an endocrine disruptor at EU level',
    url: 'https://edlists.org/the-ed-lists/list-i-substances-identified-as-endocrine-disruptors-by-the-eu'
  },
  II: {
    label: 'EU ED List II',
    desc: 'Under EU evaluation for endocrine disruption',
    url: 'https://edlists.org/the-ed-lists/list-ii-substances-under-eu-investigation-endocrine-disruption'
  },
  III: {
    label: 'EU ED List III',
    desc: 'Considered an endocrine disruptor by a national authority',
    url: 'https://edlists.org/the-ed-lists/list-iii-substances-identified-as-endocrine-disruptors-by-participating-national-authorities'
  }
};

window.ICK_FLAGS = [
  /* ---- List I ---- */
  { name: '4-Methylbenzylidene camphor', role: 'UV filter used in some sunscreens', cas: '36861-47-9', lists: ['I', 'III'], terms: ['4-methylbenzylidene camphor', 'methylbenzylidene camphor', '4-mbc', 'enzacamene'] },
  { name: '3-Benzylidene camphor', role: 'UV filter used in some sunscreens', cas: '15087-24-8', lists: ['I'], terms: ['3-benzylidene camphor', 'benzylidene camphor', '3-bc'] },
  { name: 'Butylparaben', role: 'preservative that keeps products from spoiling', cas: '94-26-8', lists: ['I', 'III'], terms: ['butylparaben', 'butyl paraben', 'butyl 4-hydroxybenzoate', 'butyl p-hydroxybenzoate'] },
  { name: 'Isobutylparaben', role: 'preservative that keeps products from spoiling', cas: '4247-02-3', lists: ['I', 'III'], terms: ['isobutylparaben', 'isobutyl paraben', 'isobutyl 4-hydroxybenzoate', 'isobutyl p-hydroxybenzoate'] },
  { name: 'Dibutyl phthalate', role: 'plasticizer, historically used in nail polish to keep it flexible', cas: '84-74-2', lists: ['I'], terms: ['dibutyl phthalate', 'dbp'] },
  { name: 'Diethylhexyl phthalate', role: 'plasticizer, mostly found in plastics and packaging rather than added to formulas on purpose', cas: '117-81-7', lists: ['I'], terms: ['diethylhexyl phthalate', 'bis(2-ethylhexyl) phthalate', 'di(2-ethylhexyl) phthalate', 'dehp'] },
  { name: 'Benzyl butyl phthalate', role: 'plasticizer, mostly found in plastics and packaging rather than added to formulas on purpose', cas: '85-68-7', lists: ['I'], terms: ['benzyl butyl phthalate', 'butyl benzyl phthalate', 'bbp'] },
  { name: 'Diisobutyl phthalate', role: 'plasticizer, historically used in nail polish', cas: '84-69-5', lists: ['I'], terms: ['diisobutyl phthalate', 'dibp'] },
  { name: 'Dicyclohexyl phthalate', role: 'plasticizer, mostly used in plastics and packaging', cas: '84-61-7', lists: ['I', 'II'], terms: ['dicyclohexyl phthalate', 'dchp'] },
  { name: 'Triphenyl phosphate', role: 'plasticizer used in some nail polishes to keep them flexible', cas: '115-86-6', lists: ['I'], terms: ['triphenyl phosphate', 'tphp'] },
  { name: 'Bisphenol A', role: 'chemical used to make plastics and packaging, not normally added to formulas on purpose', cas: '80-05-7', lists: ['I'], terms: ['bisphenol a', 'bpa'] },
  { name: 'Nonylphenol ethoxylates (nonoxynols)', role: 'surfactant and emulsifier that helps oil and water mix', cas: '9016-45-9', lists: ['I'], terms: ['nonoxynol', 'nonylphenol', 'nonylphenol ethoxylate'] },
  { name: 'Octylphenol ethoxylates (octoxynols)', role: 'surfactant and emulsifier that helps oil and water mix', cas: '9036-19-5', lists: ['I'], terms: ['octoxynol', 'octylphenol', 'octylphenol ethoxylate'] },

  /* ---- List II ---- */
  { name: 'BHA (butylated hydroxyanisole)', role: 'antioxidant that keeps oils and fragrance in a product from going off', cas: '25013-16-5', lists: ['II', 'III'], terms: ['bha', 'butylated hydroxyanisole', 'tert-butyl-4-methoxyphenol'] },
  { name: 'BHT (butylated hydroxytoluene)', role: 'antioxidant that keeps oils and fragrance in a product from going off', cas: '128-37-0', lists: ['II'], terms: ['bht', 'butylated hydroxytoluene'] },
  { name: 'Avobenzone', role: 'UVA filter used in sunscreens', cas: '70356-09-1', lists: ['II'], terms: ['avobenzone', 'butyl methoxydibenzoylmethane'] },
  { name: 'Oxybenzone (benzophenone-3)', role: 'UV filter used in sunscreens', cas: '131-57-7', lists: ['II', 'III'], terms: ['oxybenzone', 'benzophenone-3', 'bp-3'] },
  { name: 'Benzophenone-1', role: 'UV absorber that protects the product itself, such as nail polish or fragrance, from light', cas: '131-56-6', lists: ['II'], terms: ['benzophenone-1', 'bp-1'] },
  { name: 'Isoamyl p-methoxycinnamate', role: 'UVB filter used in sunscreens', cas: '71617-10-2', lists: ['II'], terms: ['isoamyl p-methoxycinnamate', 'isoamyl methoxycinnamate', 'isopentyl p-methoxycinnamate', 'amiloxate'] },
  { name: 'Methylparaben', role: 'preservative that keeps products from spoiling', cas: '99-76-3', lists: ['II', 'III'], terms: ['methylparaben', 'methyl paraben', 'methyl 4-hydroxybenzoate', 'methyl p-hydroxybenzoate'] },
  { name: 'Propylparaben', role: 'preservative that keeps products from spoiling', cas: '94-13-3', lists: ['II', 'III'], terms: ['propylparaben', 'propyl paraben', 'propyl 4-hydroxybenzoate', 'propyl p-hydroxybenzoate'] },
  { name: 'Triclosan', role: 'antibacterial ingredient, also used as a preservative', cas: '3380-34-5', lists: ['II'], terms: ['triclosan'] },
  { name: 'Resorcinol', role: 'hair dye ingredient that helps form the colour, also used in some acne and peel products', cas: '108-46-3', lists: ['II', 'III'], terms: ['resorcinol'] },
  { name: 'Butylphenyl methylpropional (lilial)', role: 'floral fragrance ingredient', cas: '80-54-6', lists: ['II'], terms: ['butylphenyl methylpropional', 'lilial'] },
  { name: 'Galaxolide (HHCB)', role: 'synthetic musk fragrance ingredient', cas: '1222-05-5', lists: ['II'], terms: ['galaxolide', 'hexamethylindanopyran', 'hhcb'] },
  { name: 'Tonalide (AHTN)', role: 'synthetic musk fragrance ingredient', cas: '21145-77-7', lists: ['II'], terms: ['tonalide', 'acetyl hexamethyl tetralin', 'ahtn'] },
  { name: 'OTNE (Iso E Super)', role: 'woody, amber-like fragrance ingredient', cas: '', lists: ['II'], terms: ['tetramethyl acetyloctahydronaphthalenes', 'iso e super', 'otne'] },
  { name: 'Climbazole', role: 'anti-dandruff and antifungal ingredient, also used as a preservative', cas: '38083-17-9', lists: ['II'], terms: ['climbazole'] },
  { name: 'Cyclomethicone', role: 'silicone that gives products a smooth, silky feel', cas: '69430-24-6', lists: ['II'], terms: ['cyclomethicone'] },
  { name: 'Cyclopentasiloxane (D5)', role: 'lightweight silicone that gives a smooth, silky feel and evaporates quickly', cas: '541-02-6', lists: ['II'], terms: ['cyclopentasiloxane', 'decamethylcyclopentasiloxane', 'd5'] },
  { name: 'Sodium fluoride', role: 'fluoride used in toothpaste and mouthwash to help protect against cavities', cas: '7681-49-4', lists: ['II'], terms: ['sodium fluoride'] },

  /* ---- List III ---- */
  { name: 'Cyclotetrasiloxane (D4)', role: 'lightweight silicone that gives a smooth, silky feel', cas: '556-67-2', lists: ['III'], terms: ['cyclotetrasiloxane', 'octamethylcyclotetrasiloxane', 'd4'] },
  { name: 'Benzophenone-2', role: 'UV absorber that protects the product itself, such as a fragrance, from light', cas: '131-55-5', lists: ['III'], terms: ['benzophenone-2', 'bp-2'] },
  { name: 'Salicylic acid', role: 'exfoliant used in acne and scalp products, also used as a preservative', cas: '69-72-7', lists: ['III'], terms: ['salicylic acid'] },
  { name: 'Triclocarban', role: 'antibacterial ingredient used in some bar soaps', cas: '101-20-2', lists: ['III'], terms: ['triclocarban'] },
  { name: 'Dipentyl phthalate', role: 'plasticizer, mostly used in plastics rather than added to formulas on purpose', cas: '131-18-0', lists: ['III'], terms: ['dipentyl phthalate'] },
  { name: 'Tricresyl phosphate', role: 'plasticizer, historically used in some nail polishes', cas: '1330-78-5', lists: ['III'], terms: ['tricresyl phosphate', 'tris(methylphenyl) phosphate'] }
];
