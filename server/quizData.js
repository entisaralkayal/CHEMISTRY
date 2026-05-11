export const quizzes = {
  first: {
    id: "first",
    title: "First Exam",
    source: "Chapter 1: Conjugated unsaturated systems",
    questions: [
      {
        id: "first-1",
        text: "What best describes a conjugated unsaturated system?",
        options: [
          "A p orbital adjacent to a double or triple bond",
          "A saturated carbon chain with only single bonds",
          "A molecule with no planar atoms",
          "A compound that contains only sigma bonds",
        ],
        answerIndex: 0,
      },
      {
        id: "first-2",
        text: "Which particles may be moved when writing resonance structures?",
        options: ["Only atoms", "Only electrons", "Both atoms and nuclei", "Only protons"],
        answerIndex: 1,
      },
      {
        id: "first-3",
        text: "Why is the allyl radical unusually stable?",
        options: [
          "Its electron density is localized on one carbon",
          "It has no p orbitals",
          "Resonance delocalizes electron density over the allylic system",
          "Its carbon atoms are all sp3 hybridized",
        ],
        answerIndex: 2,
      },
      {
        id: "first-4",
        text: "N-bromosuccinimide favors allylic bromination because it maintains what condition?",
        options: [
          "A high concentration of bromine",
          "A low concentration of bromine",
          "A strongly acidic solution",
          "A nonradical ionic pathway only",
        ],
        answerIndex: 1,
      },
      {
        id: "first-5",
        text: "Which conformation of 1,3-butadiene is less sterically hindered and more stable?",
        options: ["s-cis", "s-trans", "gauche", "eclipsed"],
        answerIndex: 1,
      },
      {
        id: "first-6",
        text: "A lower heat of hydrogenation for 1,3-butadiene indicates that it is:",
        options: [
          "less stable than isolated dienes",
          "more stable because of conjugation",
          "unable to react with hydrogen",
          "not a diene",
        ],
        answerIndex: 1,
      },
      {
        id: "first-7",
        text: "At lower temperature, electrophilic addition to a conjugated diene usually favors:",
        options: [
          "the thermodynamic 1,4-product",
          "the kinetic 1,2-product",
          "only polymerization",
          "no reaction",
        ],
        answerIndex: 1,
      },
      {
        id: "first-8",
        text: "At higher temperature, the major product of conjugated diene addition is often the:",
        options: [
          "less stable kinetic product",
          "more stable thermodynamic product",
          "product with no double bond",
          "vinyl radical",
        ],
        answerIndex: 1,
      },
      {
        id: "first-9",
        text: "What conformation must a diene adopt to react in a Diels-Alder reaction?",
        options: ["s-trans", "s-cis", "anti-periplanar", "fully saturated"],
        answerIndex: 1,
      },
      {
        id: "first-10",
        text: "The Diels-Alder reaction is best described as a:",
        options: [
          "1,4-cycloaddition of a diene and dienophile",
          "free-radical substitution of an alkane",
          "reduction of a carbonyl compound",
          "retro-aldol cleavage",
        ],
        answerIndex: 0,
      },
    ],
  },
  mid: {
    id: "mid",
    title: "Mid Exam",
    source: "Chapter 2: Aldol, Michael, Robinson, and Mannich reactions",
    questions: [
      {
        id: "mid-1",
        text: "An aldol addition begins with addition of an enolate or enol to which functional group?",
        options: ["An alkane", "A carbonyl group", "An ether oxygen", "An aromatic ring"],
        answerIndex: 1,
      },
      {
        id: "mid-2",
        text: "The initial product of a typical aldol addition is a:",
        options: [
          "beta-hydroxy aldehyde or ketone",
          "simple alkane",
          "phosphonium salt",
          "nitrile oxide",
        ],
        answerIndex: 0,
      },
      {
        id: "mid-3",
        text: "Aldol condensation differs from aldol addition because it includes:",
        options: ["hydrogenation", "dehydration", "ozonolysis", "halogen exchange"],
        answerIndex: 1,
      },
      {
        id: "mid-4",
        text: "Why is dehydration of an aldol product often favorable?",
        options: [
          "It destroys conjugation",
          "It forms a conjugated alpha,beta-unsaturated carbonyl system",
          "It removes the carbonyl group",
          "It creates an alkane",
        ],
        answerIndex: 1,
      },
      {
        id: "mid-5",
        text: "A crossed aldol reaction starts with:",
        options: [
          "two different carbonyl compounds",
          "two identical alkanes",
          "one diene and one dienophile",
          "one alkyl halide and PPh3",
        ],
        answerIndex: 0,
      },
      {
        id: "mid-6",
        text: "A Claisen-Schmidt condensation is a crossed aldol reaction in which one partner is usually a:",
        options: ["ketone", "noble gas", "sulfide", "salt only"],
        answerIndex: 0,
      },
      {
        id: "mid-7",
        text: "Intramolecular aldol condensations are especially useful for forming:",
        options: [
          "five- and six-membered rings",
          "only linear polymers",
          "isolated noble gases",
          "phosphorus ylides",
        ],
        answerIndex: 0,
      },
      {
        id: "mid-8",
        text: "In alpha,beta-unsaturated carbonyl compounds, weak nucleophiles commonly favor:",
        options: [
          "conjugate addition at the beta carbon",
          "attack on an alkane C-H bond",
          "Diels-Alder dimerization",
          "formation of bromine radicals",
        ],
        answerIndex: 0,
      },
      {
        id: "mid-9",
        text: "The Michael reaction forms a new carbon-carbon bond by adding an enolate to:",
        options: [
          "the beta carbon of an alpha,beta-unsaturated carbonyl compound",
          "a saturated alcohol",
          "a phosphonium salt",
          "molecular nitrogen",
        ],
        answerIndex: 0,
      },
      {
        id: "mid-10",
        text: "The Robinson annulation combines which two reaction types?",
        options: [
          "Michael addition followed by aldol condensation",
          "Wittig reaction followed by ozonolysis",
          "SN1 followed by SN2",
          "NBS bromination followed by vulcanization",
        ],
        answerIndex: 0,
      },
    ],
  },
  final: {
    id: "final",
    title: "Final Exam",
    source: "Chapter 3: Synthesis of alpha,beta-unsaturated carboxylic acids",
    questions: [
      {
        id: "final-1",
        text: "Cinnamic acid belongs to which important class of compounds?",
        options: [
          "alpha,beta-unsaturated carboxylic acids",
          "simple alkanes",
          "alkyl chlorides only",
          "saturated ethers",
        ],
        answerIndex: 0,
      },
      {
        id: "final-2",
        text: "The Perkin reaction converts an aromatic aldehyde and an anhydride into:",
        options: [
          "an alpha,beta-unsaturated carboxylic acid",
          "a phosphonium salt",
          "an alkane",
          "a nitroalkane only",
        ],
        answerIndex: 0,
      },
      {
        id: "final-3",
        text: "Which base is named in the chapter for the Perkin reaction conditions?",
        options: ["Sodium acetate", "Silver nitrate", "Hydrogen chloride", "Sodium chloride"],
        answerIndex: 0,
      },
      {
        id: "final-4",
        text: "Knoevenagel condensation is a modification of which reaction type?",
        options: ["Aldol condensation", "Diels-Alder reaction", "Hydrogenation", "Combustion"],
        answerIndex: 0,
      },
      {
        id: "final-5",
        text: "In a Knoevenagel condensation, the active hydrogen compound commonly has which form?",
        options: ["Z-CH2-Z or Z-CHR-Z", "R-H only", "Ar-Cl only", "H2O"],
        answerIndex: 0,
      },
      {
        id: "final-6",
        text: "The Doebner modification may include pyridine-induced:",
        options: ["decarboxylation", "vulcanization", "hydrogenation", "radical bromination"],
        answerIndex: 0,
      },
      {
        id: "final-7",
        text: "The Reformatsky reaction uses an aldehyde or ketone with an alpha-halo ester in the presence of:",
        options: ["zinc metal", "sulfuric acid only", "bromine radicals", "ozone"],
        answerIndex: 0,
      },
      {
        id: "final-8",
        text: "The Wittig reaction is especially important because it forms:",
        options: ["carbon-carbon double bonds", "only carbon-oxygen single bonds", "only amides", "free bromine"],
        answerIndex: 0,
      },
      {
        id: "final-9",
        text: "A phosphorus ylide is commonly prepared from triphenylphosphine and:",
        options: ["a primary or secondary alkyl halide", "water", "benzene only", "oxygen gas"],
        answerIndex: 0,
      },
      {
        id: "final-10",
        text: "Addition of a ylide to a carbonyl in the Wittig reaction gives an oxaphosphetane that rearranges to:",
        options: ["an alkene and triphenylphosphine oxide", "a saturated alkane only", "a Michael donor", "a bridged diene"],
        answerIndex: 0,
      },
    ],
  },
};

export function getPublicQuizzes() {
  return Object.values(quizzes).map(({ id, title, source, questions }) => ({
    id,
    title,
    source,
    questionCount: questions.length,
  }));
}

export function getQuizForStudent(quizId) {
  const quiz = quizzes[quizId];
  if (!quiz) return null;

  return {
    id: quiz.id,
    title: quiz.title,
    source: quiz.source,
    questions: quiz.questions.map(({ answerIndex, ...question }) => question),
  };
}
