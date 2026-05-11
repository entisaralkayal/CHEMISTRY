export const clos = [
  ["CLO1", "Identify structures and terminology", "Recognize structures, functional groups, nomenclature, and key vocabulary."],
  ["CLO2", "Explain core concepts", "Explain stability, acidity, conjugation, stereochemistry, and reactivity trends."],
  ["CLO3", "Analyze reaction mechanisms", "Follow electron flow, intermediates, regioselectivity, and product control."],
  ["CLO4", "Plan organic synthesis", "Choose reagents, starting materials, and routes for target molecules."],
  ["CLO5", "Connect chemistry to applications", "Relate reactions and compounds to biological, cosmetic, pharmaceutical, or material uses."],
].map(([id, title, description]) => ({ id, title, description }));

const chapterSeeds = [
  {
    number: 1,
    title: "Conjugated Unsaturated Systems",
    shortTitle: "Conjugation",
    theme: "Dienes, allylic stability, electrophilic addition, and Diels-Alder reactions.",
    objectives: [
      ["CLO1", "Define conjugated, isolated, and cumulated unsaturated systems."],
      ["CLO2", "Explain why allyl radicals, allyl cations, and conjugated dienes are stabilized."],
      ["CLO3", "Distinguish kinetic 1,2-addition from thermodynamic 1,4-addition."],
      ["CLO4", "Predict Diels-Alder products and identify diene/dienophile pairs."],
    ],
    explanation: "Conjugated systems contain adjacent p orbitals that overlap, allowing pi electrons or charges to delocalize. This explains allylic stability, the stability of conjugated dienes, temperature-dependent addition products, and Diels-Alder cycloadditions.",
    map: [["Conjugation", "requires adjacent p orbitals"], ["Resonance", "stabilizes allylic systems"], ["Conjugated dienes", "undergo 1,2 and 1,4 addition"], ["s-cis diene", "reacts in Diels-Alder reaction"]],
    reactions: [["1,3-butadiene + HCl", "allylic carbocation", "1,2 + 1,4 products"], ["propene + NBS / light", "low Br2 concentration", "allylic bromide"], ["s-cis diene + dienophile", "concerted", "cyclohexene adduct"]],
    terms: [["Conjugation", "Overlap of adjacent p orbitals."], ["Allylic", "The carbon next to a C=C bond."], ["Kinetic product", "Product formed faster."], ["Thermodynamic product", "More stable equilibrium product."]],
    summary: "Conjugation changes stability and reactivity. Low temperature favors fast products, high temperature favors stable products, and Diels-Alder reactions need an s-cis diene.",
    resources: ["Review s-cis/s-trans dienes.", "Practice 1,2 versus 1,4 addition.", "Use the reaction summary for NBS and Diels-Alder patterns."],
  },
  {
    number: 2,
    title: "Condensation and Conjugate Addition Reactions",
    shortTitle: "Enolates",
    theme: "Enolates, aldol, Claisen, Michael, Robinson annulation, and Mannich reactions.",
    objectives: [["CLO1", "Identify keto, enol, enolate, and alpha,beta-unsaturated carbonyl compounds."], ["CLO2", "Explain alpha hydrogen acidity."], ["CLO3", "Analyze aldol, Michael, Robinson, and Mannich mechanisms."], ["CLO4", "Choose starting materials for condensation reactions."]],
    explanation: "Carbonyl compounds with alpha hydrogens form enols and enolates. These nucleophiles create new carbon-carbon bonds by attacking carbonyl groups or beta carbons of conjugated carbonyl systems.",
    map: [["Carbonyl", "forms enol/enolate"], ["Enolate", "attacks carbonyl in aldol"], ["Aldol product", "dehydrates to enone/enal"], ["Enolate", "adds to beta carbon in Michael reaction"]],
    reactions: [["aldehyde + base", "enolate formation", "beta-hydroxy aldehyde"], ["aldol product + heat", "dehydration", "alpha,beta-unsaturated carbonyl"], ["enolate + enone", "1,4-addition", "Michael product"]],
    terms: [["Enolate", "Resonance-stabilized anion from alpha deprotonation."], ["Aldol condensation", "Aldol addition followed by dehydration."], ["Michael acceptor", "Alpha,beta-unsaturated carbonyl electrophile."], ["Mannich base", "Beta-amino carbonyl compound."]],
    summary: "Enolate chemistry is a toolkit for carbon-carbon bond formation. Identify where the enolate forms and which electrophilic site it attacks.",
    resources: ["Review alpha hydrogen acidity.", "Trace electron flow in aldol and Michael mechanisms.", "Compare direct and conjugate addition."],
  },
  {
    number: 3,
    title: "Synthesis of Alpha,Beta-Unsaturated Carboxylic Acids",
    shortTitle: "Unsaturated Acids",
    theme: "Perkin, Knoevenagel, Reformatsky, and Wittig routes to cinnamic-acid-like products.",
    objectives: [["CLO1", "Recognize alpha,beta-unsaturated carboxylic acids."], ["CLO3", "Explain named reaction mechanisms."], ["CLO4", "Select reagents for Perkin, Knoevenagel, Reformatsky, and Wittig syntheses."], ["CLO5", "Connect cinnamic acid derivatives with uses."]],
    explanation: "This chapter compares named reactions that create C=C bonds conjugated with carboxylic acid derivatives. Perkin, Knoevenagel, Reformatsky, and Wittig reactions each use different starting materials.",
    map: [["Aromatic aldehyde", "reacts in Perkin"], ["Active methylene", "reacts in Knoevenagel"], ["Alpha-halo ester + Zn", "forms Reformatsky reagent"], ["Ylide + carbonyl", "forms alkene in Wittig"]],
    reactions: [["benzaldehyde + acetic anhydride", "sodium acetate", "cinnamic acid"], ["aldehyde + malonic acid", "pyridine", "unsaturated acid"], ["ylide + carbonyl", "oxaphosphetane", "alkene + Ph3P=O"]],
    terms: [["Perkin reaction", "Aromatic aldehyde plus anhydride to unsaturated acid."], ["Knoevenagel", "Active hydrogen compound plus carbonyl then dehydration."], ["Reformatsky", "Zinc-mediated alpha-halo ester reaction."], ["Wittig", "Ylide plus carbonyl to alkene."]],
    summary: "Match the target alkene and acid derivative to the named reaction and its starting materials.",
    resources: ["Review the named reaction comparison.", "Practice ylide formation.", "Use reaction flow for cinnamic acid routes."],
  },
  {
    number: 4,
    title: "Reaction at the Alpha-Carbon of Carbonyl Compounds",
    shortTitle: "Dicarbonyls",
    theme: "Dicarbonyl compounds, acetoacetic ester synthesis, malonic ester synthesis, and heterocycle precursors.",
    objectives: [["CLO1", "Classify 1,2-, 1,3-, and 1,4-dicarbonyl compounds."], ["CLO2", "Explain beta-dicarbonyl acidity."], ["CLO4", "Apply acetoacetic and malonic ester syntheses."], ["CLO3", "Differentiate benzoin and Stetter reactions."]],
    explanation: "Dicarbonyl compounds contain two carbonyl groups. Beta-dicarbonyls form stable enolates, making them powerful starting materials for acetoacetic ester and malonic ester syntheses.",
    map: [["Dicarbonyls", "classified by spacing"], ["1,3-dicarbonyl", "has acidic central H"], ["Acetoacetic ester", "prepares methyl ketones"], ["Malonic ester", "prepares substituted acetic acids"]],
    reactions: [["acetoacetic ester + RX", "alkylation/hydrolysis/decarboxylation", "methyl ketone"], ["diethyl malonate + RX", "alkylation/hydrolysis/decarboxylation", "acetic acid derivative"], ["aldehyde + Michael acceptor", "Stetter", "1,4-dicarbonyl"]],
    terms: [["Beta-dicarbonyl", "Two carbonyls separated by one carbon."], ["Acetoacetic ester synthesis", "Route to substituted methyl ketones."], ["Malonic ester synthesis", "Route to substituted acetic acids."], ["Stetter reaction", "Conjugate addition of aldehyde equivalent."]],
    summary: "Choose acetoacetic ester for ketone targets and malonic ester for carboxylic acid targets.",
    resources: ["Review dicarbonyl classification.", "Practice malonic ester retrosynthesis.", "Compare benzoin and Stetter reactions."],
  },
  {
    number: 5,
    title: "Carboxylic Acids and Their Derivatives",
    shortTitle: "Carboxylic Acids",
    theme: "Nomenclature, acidity, preparation, alpha-halogenation, hydroxy acids, and dicarboxylic acids.",
    objectives: [["CLO1", "Name carboxylic acids and derivatives."], ["CLO2", "Explain acidity effects of electron-withdrawing substituents."], ["CLO3", "Analyze HVZ and hydroxy acid reactions."], ["CLO5", "Relate hydroxy acids and carbonic acid derivatives to uses."]],
    explanation: "Carboxylic acids contain COOH. Their acidity increases with electron-withdrawing groups. They can be prepared by oxidation, Grignard reaction with CO2, or nitrile hydrolysis, and alpha-halo acids are useful intermediates.",
    map: [["COOH", "defines carboxylic acids"], ["Electron withdrawing groups", "increase acidity"], ["Primary alcohol", "oxidizes to acid"], ["Alpha-H acid", "undergoes HVZ"]],
    reactions: [["primary alcohol", "KMnO4 / acid", "carboxylic acid"], ["acid + Br2/P", "HVZ", "alpha-bromo acid"], ["beta-hydroxy acid + heat", "-H2O", "alpha,beta-unsaturated acid"]],
    terms: [["Carboxyl group", "COOH functional group."], ["HVZ", "Alpha-halogenation of carboxylic acids."], ["Hydroxy acid", "Acid containing OH group."], ["Lactone", "Cyclic ester."]],
    summary: "Position effects are central in halo and hydroxy acid chemistry.",
    resources: ["Review acidity trends.", "Practice alpha, beta, gamma labeling.", "Use reaction flow for preparation methods."],
  },
  {
    number: 6,
    title: "Carbohydrates",
    shortTitle: "Carbohydrates",
    theme: "Monosaccharides, cyclic structures, mutarotation, oxidation, reduction, disaccharides, and polysaccharides.",
    objectives: [["CLO1", "Classify carbohydrates."], ["CLO2", "Explain anomers and mutarotation."], ["CLO3", "Analyze reactions of monosaccharides."], ["CLO5", "Connect polysaccharide structure to function."]],
    explanation: "Carbohydrates are polyhydroxy aldehydes or ketones and their derivatives. Monosaccharides cyclize to hemiacetals, forming alpha and beta anomers that interconvert by mutarotation.",
    map: [["Carbohydrates", "classified by hydrolysis"], ["Monosaccharides", "form hemiacetals"], ["Anomers", "mutarotate"], ["Glycosidic linkages", "build polysaccharides"]],
    reactions: [["aldose + Br2/H2O", "selective oxidation", "aldonic acid"], ["sugar + reducing agent", "reduction", "alditol"], ["sugar + phenylhydrazine", "3 equivalents", "osazone"]],
    terms: [["Monosaccharide", "Single sugar unit."], ["Anomer", "Cyclic sugar stereoisomer at anomeric carbon."], ["Mutarotation", "Optical rotation change during anomer equilibrium."], ["Glycosidic linkage", "Bond joining sugar units."]],
    summary: "Carbohydrate chemistry links stereochemistry, cyclic hemiacetals, and glycosidic bonding.",
    resources: ["Review Haworth projections.", "Practice alpha/beta identification.", "Compare starch, glycogen, and cellulose."],
  },
  {
    number: 7,
    title: "Polynuclear Hydrocarbons",
    shortTitle: "Polynuclear Arenes",
    theme: "Biphenyl, naphthalene, anthracene, fused rings, electrophilic substitution, oxidation, and reduction.",
    objectives: [["CLO1", "Name isolated and fused benzenoid hydrocarbons."], ["CLO2", "Explain substitution positions."], ["CLO3", "Analyze reactions of biphenyl, naphthalene, and anthracene."], ["CLO5", "Relate polynuclear hydrocarbons to dyes and applications."]],
    explanation: "Polynuclear hydrocarbons contain more than one aromatic ring. Biphenyl has isolated rings, while naphthalene and anthracene have fused rings. Resonance explains their substitution and oxidation patterns.",
    map: [["Polynuclear hydrocarbons", "benzenoid or non-benzenoid"], ["Biphenyl", "isolated rings"], ["Naphthalene", "fused rings"], ["Anthracene", "oxidizes to anthraquinone"]],
    reactions: [["aryl halide + alkyl halide + Na", "Wurtz-Fittig", "biphenyl derivative"], ["benzene + phthalic anhydride", "Haworth sequence", "anthracene"], ["anthracene + dilute HNO3", "oxidation", "9,10-anthraquinone"]],
    terms: [["Polynuclear hydrocarbon", "Hydrocarbon with multiple ring systems."], ["Fused ring", "Two rings sharing adjacent atoms."], ["Biphenyl", "Two benzene rings connected by one bond."], ["Anthraquinone", "Oxidized anthracene derivative."]],
    summary: "Ring arrangement and resonance control substitution, oxidation, and reduction patterns.",
    resources: ["Review isolated versus fused rings.", "Practice naphthalene numbering.", "Compare anthracene products."],
  },
];

export const chapters = chapterSeeds.map((chapter) => ({
  id: `chapter-${chapter.number}`,
  ...chapter,
  objectives: chapter.objectives.map(([clo, text]) => ({ clo, text })),
  conceptMap: chapter.map,
  keyTerms: chapter.terms,
}));

const quizSeeds = [
  [1, "CLO1", "Conjugated systems", "easy", "understanding", "Which arrangement contains a conjugated diene?", "C=C-C=C", ["C=C-C=C", "C=C-C-C", "C-C-C-C", "C=C-C(sp3)-C=C"], 0],
  [1, "CLO2", "Allylic stability", "medium", "understanding", "Why is an allyl cation more stable than a simple alkyl cation?", "CH2=CH-CH2+", ["Positive charge is delocalized by resonance", "It has no empty p orbital", "It is fully saturated", "It cannot react further"], 0],
  [1, "CLO2", "Diene stability", "medium", "analysis", "Conjugated dienes are more stable than isolated dienes mainly because of:", "pi-electron delocalization", ["resonance delocalization", "higher ring strain", "loss of pi overlap", "absence of sigma bonds"], 0],
  [1, "CLO3", "Electrophilic addition", "medium", "analysis", "At low temperature, HX addition to 1,3-butadiene favors:", "kinetic control", ["1,2-addition product", "1,4-addition product only", "substitution only", "no reaction"], 0],
  [1, "CLO3", "Thermodynamic control", "hard", "analysis", "At higher temperature, the major product from addition to a conjugated diene is usually:", "thermodynamic control", ["1,4-addition product", "1,2-addition product", "free radical polymer", "allylic alcohol"], 0],
  [1, "CLO4", "Diels-Alder", "hard", "application", "Which diene conformation is required in the Diels-Alder reaction?", "s-cis diene + dienophile", ["s-cis", "s-trans", "completely saturated", "orthogonal p orbitals"], 0],
  [1, "CLO4", "Dienophile selection", "medium", "application", "In a Diels-Alder reaction, the dienophile is commonly:", "electron-poor alkene", ["an alkene activated by electron-withdrawing groups", "a simple alkane", "a metal hydride", "a tertiary alcohol"], 0],
  [1, "CLO3", "Allylic bromination", "medium", "application", "NBS and light are used mainly to prepare:", "allylic bromide", ["allylic bromides", "vicinal dibromides", "aryl iodides", "alcohols"], 0],
  [1, "CLO1", "System classification", "easy", "understanding", "A cumulated diene contains:", "C=C=C", ["adjacent double bonds sharing one carbon", "two isolated double bonds", "one triple bond and one single bond", "a benzene ring"], 0],
  [1, "CLO5", "Applied synthesis", "medium", "application", "The Diels-Alder reaction is valuable in synthesis because it directly forms:", "six-membered rings", ["six-membered rings with stereochemical control", "only linear alcohols", "amines from acids", "carbohydrates from alkenes"], 0],

  [2, "CLO1", "Enolates", "easy", "understanding", "What is an enolate?", "R-CO-CH2-R + base", ["a resonance-stabilized alpha-carbon anion", "a fully saturated alcohol", "an aryl halide", "a radical cation"], 0],
  [2, "CLO2", "Alpha acidity", "medium", "understanding", "Alpha-hydrogen atoms of carbonyl compounds are acidic because the conjugate base is:", "enolate resonance", ["resonance-stabilized", "always aromatic", "neutralized by water only", "unable to react with electrophiles"], 0],
  [2, "CLO3", "Aldol addition", "medium", "analysis", "The first product of aldol addition is usually a:", "beta-hydroxy carbonyl", ["beta-hydroxy carbonyl compound", "ylide", "carboxylic acid chloride", "glycoside"], 0],
  [2, "CLO3", "Aldol condensation", "medium", "analysis", "Aldol condensation differs from aldol addition because it includes:", "dehydration step", ["dehydration to form an alpha,beta-unsaturated carbonyl", "hydrogenation of the carbonyl", "formation of a diazonium salt", "halogenation at oxygen"], 0],
  [2, "CLO3", "Michael addition", "hard", "application", "In a Michael reaction, the nucleophile attacks the:", "beta carbon of enone", ["beta carbon of an alpha,beta-unsaturated carbonyl", "carbonyl oxygen only", "terminal methyl group", "halide leaving group"], 0],
  [2, "CLO4", "Michael acceptor", "medium", "application", "Which compound is the typical Michael acceptor?", "O=C-C=C", ["alpha,beta-unsaturated carbonyl compound", "simple alkane", "tertiary amine", "saturated ether"], 0],
  [2, "CLO3", "Robinson annulation", "hard", "analysis", "Robinson annulation combines which two reaction types?", "Michael then aldol", ["Michael addition followed by aldol condensation", "Wittig then oxidation", "nitration then reduction", "Diels-Alder then bromination"], 0],
  [2, "CLO3", "Mannich reaction", "hard", "application", "The Mannich reaction typically gives a:", "beta-amino carbonyl", ["beta-amino carbonyl compound", "dicarboxylic acid", "aryl diazonium salt", "glycosidic acetal"], 0],
  [2, "CLO4", "Synthetic planning", "hard", "application", "When choosing between direct addition and conjugate addition to an enone, conjugate addition gives a bond at the:", "beta carbon", ["beta carbon", "oxygen only", "alpha hydrogen only", "remote aromatic carbon"], 0],
  [2, "CLO5", "Strategic value", "medium", "understanding", "Enolate chemistry is central in synthesis because it helps build:", "new carbon-carbon bonds", ["new carbon-carbon bonds", "only ionic salts", "only sugars", "only aromatic nitro groups"], 0],

  [3, "CLO1", "Unsaturated acids", "easy", "understanding", "Cinnamic acid is best described as:", "Ph-CH=CH-CO2H", ["an alpha,beta-unsaturated carboxylic acid", "a saturated alcohol", "a beta-dicarbonyl only", "a fused aromatic hydrocarbon"], 0],
  [3, "CLO3", "Perkin reaction", "medium", "analysis", "The Perkin reaction uses an aromatic aldehyde together with:", "acid anhydride", ["an acid anhydride and base such as acetate", "a Grignard reagent only", "a nitrile and bromine", "a thiazolium salt only"], 0],
  [3, "CLO4", "Perkin planning", "medium", "application", "A classic route to cinnamic acid from benzaldehyde is the:", "Perkin reaction", ["Perkin reaction", "Wurtz-Fittig reaction", "Hell-Volhard-Zelinsky reaction", "Paal-Knorr synthesis"], 0],
  [3, "CLO3", "Knoevenagel reaction", "medium", "analysis", "The Knoevenagel reaction commonly involves a carbonyl compound and:", "an active methylene compound", ["an active methylene compound", "a diazonium salt", "a carbohydrate", "an alkyl radical"], 0],
  [3, "CLO4", "Reformatsky reaction", "hard", "application", "The Reformatsky reaction begins from:", "alpha-halo ester + Zn", ["an alpha-halo ester and zinc", "anthracene and nitric acid", "glucose and bromine water", "a chloroformate and ammonia"], 0],
  [3, "CLO3", "Wittig outcome", "hard", "analysis", "The Wittig reaction converts a carbonyl compound into:", "an alkene", ["an alkene", "a beta-hydroxy acid", "a dicarboxylic acid", "a nitroarene"], 0],
  [3, "CLO4", "Wittig reagent", "hard", "application", "The key reagent in the Wittig reaction is a:", "phosphonium ylide", ["phosphonium ylide", "cyanohydrin", "Grignard carboxylate", "glycoside"], 0],
  [3, "CLO1", "Conjugation recognition", "easy", "understanding", "In alpha,beta-unsaturated acids, the carbon-carbon double bond is conjugated with the:", "carboxyl group", ["carboxyl group", "amide nitrogen only", "alkane chain only", "halogen atom only"], 0],
  [3, "CLO5", "Applications", "easy", "understanding", "Cinnamic acid derivatives are highlighted in the chapter for use in:", "perfume and pharmaceuticals", ["perfume and pharmaceuticals", "metal extraction only", "nuclear shielding only", "blood buffering only"], 0],
  [3, "CLO4", "Reaction matching", "medium", "application", "If the target is an alkene formed from a carbonyl carbon and an ylide carbon, the best reaction is:", "Wittig", ["Wittig", "HVZ", "Benzoin", "Mutarotation"], 0],

  [4, "CLO1", "Dicarbonyl classification", "easy", "understanding", "A 1,3-dicarbonyl compound has two carbonyl groups separated by:", "one carbon atom", ["one carbon atom", "two oxygen atoms", "a benzene ring", "no intervening atoms"], 0],
  [4, "CLO1", "Diketone naming", "easy", "understanding", "A 1,2-diketone is also called an:", "alpha-diketone", ["alpha-diketone", "gamma-diketone", "beta-keto acid", "aryl malonate"], 0],
  [4, "CLO2", "Acidity of beta-dicarbonyls", "medium", "analysis", "The alpha-hydrogen of a beta-dicarbonyl compound is unusually acidic because the enolate is stabilized by:", "two carbonyl groups", ["two carbonyl groups", "a single sigma bond only", "loss of resonance", "absence of induction"], 0],
  [4, "CLO2", "Enol content", "medium", "analysis", "Beta-dicarbonyl compounds often contain a high percentage of enol form because of:", "resonance and hydrogen bonding", ["resonance stabilization and intramolecular hydrogen bonding", "complete lack of polarity", "steric repulsion only", "free radical stability"], 0],
  [4, "CLO3", "Benzoin condensation", "medium", "analysis", "Benzoin condensation of benzaldehyde gives:", "benzoin", ["benzoin", "anthracene", "malonic acid", "salicylic acid"], 0],
  [4, "CLO3", "Stetter reaction", "hard", "analysis", "The Stetter reaction is best described as:", "1,4-addition of an aldehyde equivalent", ["1,4-addition of an aldehyde equivalent to an alpha,beta-unsaturated compound", "oxidation of glucose", "dehydration of hydroxy acids", "alpha-halogenation of acids"], 0],
  [4, "CLO4", "Acetoacetic ester synthesis", "hard", "application", "Acetoacetic ester synthesis is especially useful for preparing:", "substituted methyl ketones", ["substituted methyl ketones", "nonreducing disaccharides", "aryl diazonium salts", "anthraquinone only"], 0],
  [4, "CLO4", "Malonic ester synthesis", "hard", "application", "Malonic ester synthesis is especially useful for preparing:", "substituted acetic acids", ["substituted acetic acids", "allylic bromides", "glycosides", "biphenyl nitration products"], 0],
  [4, "CLO4", "Alkyl halide choice", "medium", "application", "Best yields in acetoacetic ester alkylation are obtained with:", "primary alkyl halides", ["primary alkyl halides", "tertiary halides", "aryl chlorides only", "vinyl chlorides only"], 0],
  [4, "CLO5", "Heterocycle synthesis", "medium", "understanding", "The Paal-Knorr synthesis uses 1,4-dicarbonyl compounds to make heterocycles such as:", "furans and pyrroles", ["furans and pyrroles", "only nitriles", "only alditols", "only acid chlorides"], 0],

  [5, "CLO1", "Carboxyl group", "easy", "understanding", "The functional group of a carboxylic acid is:", "R-COOH", ["-COOH", "-CHO only", "-NH2 only", "-C=C- only"], 0],
  [5, "CLO1", "Aromatic dicarboxylic acids", "medium", "understanding", "Benzene-1,2-dicarboxylic acid is commonly known as:", "phthalic acid", ["phthalic acid", "succinic acid", "oxalic acid", "benzoic acid"], 0],
  [5, "CLO2", "Acidity trends", "medium", "analysis", "Electron-withdrawing groups increase the acidity of carboxylic acids because they:", "stabilize the conjugate base", ["stabilize the conjugate base", "destroy resonance in the acid", "prevent proton loss entirely", "eliminate the carbonyl group"], 0],
  [5, "CLO3", "Oxidation to acids", "medium", "application", "A primary alcohol can be converted to a carboxylic acid by:", "strong oxidation", ["strong oxidation with reagents such as KMnO4 or dichromate", "sodium borohydride", "hydrogenation only", "dry ether only"], 0],
  [5, "CLO3", "Grignard synthesis", "medium", "application", "Reaction of a Grignard reagent with CO2 followed by acid workup gives a:", "carboxylic acid", ["carboxylic acid", "glycoside", "diketone only", "biphenyl"], 0],
  [5, "CLO3", "Nitrile hydrolysis", "medium", "application", "Hydrolysis of a nitrile yields a:", "carboxylic acid", ["carboxylic acid", "tertiary alcohol", "fused hydrocarbon", "ylide"], 0],
  [5, "CLO3", "HVZ reaction", "hard", "analysis", "The Hell-Volhard-Zelinsky reaction converts an acid with an alpha-hydrogen into an:", "alpha-halo acid", ["alpha-halo acid", "anthraquinone", "nonreducing sugar", "diazonium salt"], 0],
  [5, "CLO3", "Hydroxy acid dehydration", "hard", "analysis", "Upon heating, a beta-hydroxy acid commonly forms:", "an alpha,beta-unsaturated acid", ["an alpha,beta-unsaturated acid", "a nitrile", "a glycoside", "a dioxime"], 0],
  [5, "CLO5", "Cosmetic applications", "easy", "understanding", "Alpha-hydroxy acids such as glycolic and lactic acid are highlighted in the chapter because of their use in:", "skin-care and cosmetic formulations", ["skin-care and cosmetic formulations", "only fuel additives", "only insect repellents", "only polymer explosives"], 0],
  [5, "CLO5", "Buffer chemistry", "medium", "understanding", "Carbonic acid is important biologically because it helps:", "buffer blood pH", ["buffer blood pH", "oxidize anthracene", "form allylic bromides", "reduce nitriles"], 0],

  [6, "CLO1", "Carbohydrate definition", "easy", "understanding", "A monosaccharide is:", "one sugar unit", ["one sugar unit that cannot be hydrolyzed to simpler sugars", "two aromatic rings joined together", "a beta-dicarbonyl compound", "a saturated hydrocarbon"], 0],
  [6, "CLO1", "Classification", "easy", "understanding", "Sucrose is classified as a:", "disaccharide", ["disaccharide", "monosaccharide", "dicarbonyl compound", "polynuclear hydrocarbon"], 0],
  [6, "CLO2", "D/L notation", "medium", "understanding", "The D/L designation of a monosaccharide is based on the configuration at the:", "highest-numbered chiral carbon", ["highest-numbered chiral carbon", "anomeric carbon only", "carbonyl carbon only", "oxygen atom in the ring"], 0],
  [6, "CLO2", "Mutarotation", "medium", "analysis", "Mutarotation occurs because alpha and beta anomers interconvert through:", "the open-chain form", ["the open-chain form", "nitration", "decarboxylation", "electrophilic aromatic substitution"], 0],
  [6, "CLO3", "Bromine oxidation", "medium", "application", "Bromine water oxidizes an aldose to an:", "aldonic acid", ["aldonic acid", "alditol", "anthraquinone", "aryl bromide"], 0],
  [6, "CLO3", "Nitric acid oxidation", "hard", "application", "Dilute nitric acid oxidation of an aldose gives an:", "aldaric acid", ["aldaric acid", "acetal only", "beta-keto acid", "phosphonium ylide"], 0],
  [6, "CLO3", "Reduction", "medium", "application", "Reduction of an aldose or ketose gives a:", "alditol", ["alditol", "carboxylic acid chloride", "diazonium salt", "fused arene"], 0],
  [6, "CLO3", "Osazone formation", "hard", "analysis", "A sugar reacts with excess phenylhydrazine to form an:", "osazone", ["osazone", "acid anhydride", "acyl chloride", "cyclobutanecarboxylic acid"], 0],
  [6, "CLO5", "Polysaccharides", "medium", "understanding", "Humans cannot digest cellulose because cellulose contains:", "beta glycosidic linkages", ["beta glycosidic linkages", "no oxygen atoms", "only ketone groups", "a phosphonium center"], 0],
  [6, "CLO5", "Storage polysaccharides", "medium", "analysis", "Glycogen differs from amylose because glycogen is:", "much more highly branched", ["much more highly branched", "built from fructose only", "nonreducing because it lacks acetal bonds", "completely insoluble because of beta linkages"], 0],

  [7, "CLO1", "Classification", "easy", "understanding", "Naphthalene is classified as a:", "fused benzenoid hydrocarbon", ["fused benzenoid hydrocarbon", "monosaccharide", "alpha-hydroxy acid", "phosphonium salt"], 0],
  [7, "CLO1", "Isolated versus fused", "easy", "understanding", "Biphenyl contains:", "two isolated benzene rings joined by a single bond", ["two isolated benzene rings joined by a single bond", "two fused benzene rings", "a benzene ring and a sugar ring", "a carbonyl-linked diene"], 0],
  [7, "CLO2", "Biphenyl orientation", "medium", "analysis", "Electrophilic substitution of biphenyl occurs mainly at the para position because it is:", "activated and less sterically crowded", ["activated and less sterically crowded", "the only carbon that contains hydrogen", "unable to form ortho products", "sp3-hybridized"], 0],
  [7, "CLO3", "Wurtz-Fittig", "medium", "application", "One preparation of biphenyl derivatives described in the chapter is the:", "Wurtz-Fittig reaction", ["Wurtz-Fittig reaction", "HVZ reaction", "Kiliani-Fischer synthesis", "Paal-Knorr synthesis"], 0],
  [7, "CLO4", "Haworth synthesis", "hard", "application", "The Haworth method is used in the chapter to prepare:", "naphthalene and anthracene frameworks", ["naphthalene and anthracene frameworks", "amino acids from alpha-halo acids", "alditols from sugars", "brominated carboxylic acids"], 0],
  [7, "CLO3", "Naphthalene reactions", "medium", "analysis", "A common electrophilic substitution reaction of naphthalene is:", "sulfonation", ["sulfonation", "Grignard carboxylation", "cyanohydrin formation", "osazone formation"], 0],
  [7, "CLO3", "Anthracene oxidation", "medium", "application", "Oxidation of anthracene with dilute nitric acid gives:", "9,10-anthraquinone", ["9,10-anthraquinone", "salicylic acid", "beta-naphthol", "benzoin"], 0],
  [7, "CLO3", "Anthracene reduction", "medium", "application", "Reduction of anthracene gives:", "9,10-dihydroanthracene", ["9,10-dihydroanthracene", "biphenyl", "naphthoic acid", "a carbohydrate"], 0],
  [7, "CLO2", "Resonance reasoning", "hard", "analysis", "Drawing resonance structures of naphthalene and anthracene helps explain their:", "preferred substitution positions", ["preferred substitution positions", "optical activity in sugars", "acid-base neutralization only", "formation of enolates"], 0],
  [7, "CLO5", "Applications", "easy", "understanding", "The chapter links polynuclear aromatic compounds with applications such as:", "fluorescent dyes", ["fluorescent dyes", "protein hydrolysis only", "blood buffering only", "AHA skin peels only"], 0],
];

const chapterQuestionCounters = {};

export const questions = quizSeeds.map(([chapter, clo, topic, difficulty, skill, prompt, formula, options, correct]) => {
  chapterQuestionCounters[chapter] = (chapterQuestionCounters[chapter] || 0) + 1;
  const id = `q${chapter}-${chapterQuestionCounters[chapter]}`;
  return {
    id,
    chapter,
    clo,
    topic,
    difficulty,
    skill,
    prompt,
    visual: { type: "structure", formula, caption: topic },
    options: options.map((text, optionIndex) => ({
      id: `${id}-o${optionIndex + 1}`,
      text,
      isCorrect: optionIndex === correct,
    })),
  };
});

export function shuffle(items) {
  return [...items]
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
}

export function getCourse() {
  return { clos, chapters };
}

export function getChapter(chapterNumber) {
  return chapters.find((chapter) => chapter.number === Number(chapterNumber));
}

export function getQuizForChapter(chapterNumber) {
  const chapter = getChapter(chapterNumber);
  if (!chapter) return null;
  return {
    chapter: chapter.number,
    title: chapter.title,
    questions: shuffle(questions.filter((question) => question.chapter === chapter.number)).map((question) => ({
      id: question.id,
      chapter: question.chapter,
      clo: question.clo,
      topic: question.topic,
      difficulty: question.difficulty,
      skill: question.skill,
      prompt: question.prompt,
      visual: question.visual,
      options: shuffle(question.options).map(({ id, text }) => ({ id, text })),
    })),
  };
}

export function getQuestionById(questionId) {
  return questions.find((question) => question.id === questionId);
}

export function getCorrectOption(question) {
  return question.options.find((option) => option.isCorrect);
}

export function getChapterQuestions(chapterNumber) {
  return questions.filter((question) => question.chapter === Number(chapterNumber));
}
