/*
  Ick Check flag list.

  Source: EU endocrine disruptor lists (edlists.org), run by national
  authorities in Belgium, Denmark, France, the Netherlands, Spain and Sweden.
  Lists checked: October 2026 (site shows "Latest update 2026/04").

  Only substances that can appear in cosmetics and personal care products are
  included. Each entry lists every edlists.org list it appears on; the app
  shows the strongest one (I, then II, then III).

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
  { name: '4-Methylbenzylidene camphor', cas: '36861-47-9', lists: ['I', 'III'], terms: ['4-methylbenzylidene camphor', 'methylbenzylidene camphor', '4-mbc', 'enzacamene'] },
  { name: '3-Benzylidene camphor', cas: '15087-24-8', lists: ['I'], terms: ['3-benzylidene camphor', 'benzylidene camphor', '3-bc'] },
  { name: 'Butylparaben', cas: '94-26-8', lists: ['I', 'III'], terms: ['butylparaben', 'butyl paraben', 'butyl 4-hydroxybenzoate', 'butyl p-hydroxybenzoate'] },
  { name: 'Isobutylparaben', cas: '4247-02-3', lists: ['I', 'III'], terms: ['isobutylparaben', 'isobutyl paraben', 'isobutyl 4-hydroxybenzoate', 'isobutyl p-hydroxybenzoate'] },
  { name: 'Dibutyl phthalate', cas: '84-74-2', lists: ['I'], terms: ['dibutyl phthalate', 'dbp'] },
  { name: 'Diethylhexyl phthalate', cas: '117-81-7', lists: ['I'], terms: ['diethylhexyl phthalate', 'bis(2-ethylhexyl) phthalate', 'di(2-ethylhexyl) phthalate', 'dehp'] },
  { name: 'Benzyl butyl phthalate', cas: '85-68-7', lists: ['I'], terms: ['benzyl butyl phthalate', 'butyl benzyl phthalate', 'bbp'] },
  { name: 'Diisobutyl phthalate', cas: '84-69-5', lists: ['I'], terms: ['diisobutyl phthalate', 'dibp'] },
  { name: 'Dicyclohexyl phthalate', cas: '84-61-7', lists: ['I', 'II'], terms: ['dicyclohexyl phthalate', 'dchp'] },
  { name: 'Triphenyl phosphate', cas: '115-86-6', lists: ['I'], terms: ['triphenyl phosphate', 'tphp'] },
  { name: 'Bisphenol A', cas: '80-05-7', lists: ['I'], terms: ['bisphenol a', 'bpa'] },
  { name: 'Nonylphenol ethoxylates (nonoxynols)', cas: '9016-45-9', lists: ['I'], terms: ['nonoxynol', 'nonylphenol', 'nonylphenol ethoxylate'] },
  { name: 'Octylphenol ethoxylates (octoxynols)', cas: '9036-19-5', lists: ['I'], terms: ['octoxynol', 'octylphenol', 'octylphenol ethoxylate'] },

  /* ---- List II ---- */
  { name: 'BHA (butylated hydroxyanisole)', cas: '25013-16-5', lists: ['II', 'III'], terms: ['bha', 'butylated hydroxyanisole', 'tert-butyl-4-methoxyphenol'] },
  { name: 'BHT (butylated hydroxytoluene)', cas: '128-37-0', lists: ['II'], terms: ['bht', 'butylated hydroxytoluene'] },
  { name: 'Avobenzone', cas: '70356-09-1', lists: ['II'], terms: ['avobenzone', 'butyl methoxydibenzoylmethane'] },
  { name: 'Oxybenzone (benzophenone-3)', cas: '131-57-7', lists: ['II', 'III'], terms: ['oxybenzone', 'benzophenone-3', 'bp-3'] },
  { name: 'Benzophenone-1', cas: '131-56-6', lists: ['II'], terms: ['benzophenone-1', 'bp-1'] },
  { name: 'Isoamyl p-methoxycinnamate', cas: '71617-10-2', lists: ['II'], terms: ['isoamyl p-methoxycinnamate', 'isoamyl methoxycinnamate', 'isopentyl p-methoxycinnamate', 'amiloxate'] },
  { name: 'Methylparaben', cas: '99-76-3', lists: ['II', 'III'], terms: ['methylparaben', 'methyl paraben', 'methyl 4-hydroxybenzoate', 'methyl p-hydroxybenzoate'] },
  { name: 'Propylparaben', cas: '94-13-3', lists: ['II', 'III'], terms: ['propylparaben', 'propyl paraben', 'propyl 4-hydroxybenzoate', 'propyl p-hydroxybenzoate'] },
  { name: 'Triclosan', cas: '3380-34-5', lists: ['II'], terms: ['triclosan'] },
  { name: 'Resorcinol', cas: '108-46-3', lists: ['II', 'III'], terms: ['resorcinol'] },
  { name: 'Butylphenyl methylpropional (lilial)', cas: '80-54-6', lists: ['II'], terms: ['butylphenyl methylpropional', 'lilial'] },
  { name: 'Galaxolide (HHCB)', cas: '1222-05-5', lists: ['II'], terms: ['galaxolide', 'hexamethylindanopyran', 'hhcb'] },
  { name: 'Tonalide (AHTN)', cas: '21145-77-7', lists: ['II'], terms: ['tonalide', 'acetyl hexamethyl tetralin', 'ahtn'] },
  { name: 'OTNE (Iso E Super)', cas: '', lists: ['II'], terms: ['tetramethyl acetyloctahydronaphthalenes', 'iso e super', 'otne'] },
  { name: 'Climbazole', cas: '38083-17-9', lists: ['II'], terms: ['climbazole'] },
  { name: 'Cyclomethicone', cas: '69430-24-6', lists: ['II'], terms: ['cyclomethicone'] },
  { name: 'Cyclopentasiloxane (D5)', cas: '541-02-6', lists: ['II'], terms: ['cyclopentasiloxane', 'decamethylcyclopentasiloxane', 'd5'] },
  { name: 'Sodium fluoride', cas: '7681-49-4', lists: ['II'], terms: ['sodium fluoride'] },

  /* ---- List III ---- */
  { name: 'Cyclotetrasiloxane (D4)', cas: '556-67-2', lists: ['III'], terms: ['cyclotetrasiloxane', 'octamethylcyclotetrasiloxane', 'd4'] },
  { name: 'Benzophenone-2', cas: '131-55-5', lists: ['III'], terms: ['benzophenone-2', 'bp-2'] },
  { name: 'Salicylic acid', cas: '69-72-7', lists: ['III'], terms: ['salicylic acid'] },
  { name: 'Triclocarban', cas: '101-20-2', lists: ['III'], terms: ['triclocarban'] },
  { name: 'Dipentyl phthalate', cas: '131-18-0', lists: ['III'], terms: ['dipentyl phthalate'] },
  { name: 'Tricresyl phosphate', cas: '1330-78-5', lists: ['III'], terms: ['tricresyl phosphate', 'tris(methylphenyl) phosphate'] }
];
