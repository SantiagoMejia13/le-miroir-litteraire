export type BookId = 'harry-potter' | 'jardin-papillons' | 'arpenteurs-monde';
export type QuizChoiceKey = 'A' | 'B' | 'C';
export type NavSection = 'accueil' | 'experience' | 'collection' | 'apropos';

export interface BookExhibit {
  id: BookId;
  roomNumber: 1 | 2 | 3;
  roomLabel: string;
  themeLabel: string;
  title: string;
  originalTitle?: string;
  author: string;
  publicationDate: string;
  writingLocation: string;
  renown: string;
  rating: number;
  critiqueParagraphs: string[];
  motifs: string[];
  quote: string;
}

export interface QuizOption {
  key: QuizChoiceKey;
  text: string;
  targetBookId: BookId;
}

export interface QuizQuestion {
  id: number;
  title: string;
  prompt: string;
  options: QuizOption[];
}

export interface QuizResultProfile {
  bookId: BookId;
  roomNumber: 1 | 2 | 3;
  critiqueText: string;
  ctaLabel: string;
}

export interface CuratorProfile {
  id: string;
  name: string;
  initials: string;
  role: string;
  bio: string;
}

export const BOOKS: BookExhibit[] = [
  {
    id: 'harry-potter',
    roomNumber: 1,
    roomLabel: 'Salle 1',
    themeLabel: 'La filiation',
    title: "Harry Potter et le Prisonnier d'Azkaban",
    author: 'J.K. Rowling',
    publicationDate: '1999 (8 juillet 1999 au Royaume-Uni)',
    writingLocation: 'Édimbourg, Écosse (Royaume-Uni)',
    renown:
      'Phénomène littéraire mondial, vendu à plus de 65 millions d’exemplaires, lauréat du prix Whitbread du livre jeunesse et unanimement considéré comme le tournant psychologique de la saga.',
    rating: 4.6,
    motifs: ['Le Cerf argenté', 'La Mémoire paternelle', 'L’Ombre des Détraqueurs'],
    quote: 'Ce que nous sommes ne procède pas de la seule mémoire de nos pères, mais de la lumière que nous choisissons de projeter dans l’obscurité.',
    critiqueParagraphs: [
      "Troisième volet d’un cycle initiatique d’envergure, Harry Potter et le Prisonnier d’Azkaban marque l’instant précis où le récit merveilleux cède le pas à une méditation grave sur la filiation et la construction du moi. Assailli par les Détraqueurs — allégories saisissantes de la mélancolie et du vide intérieur —, le jeune protagoniste est contraint d’affronter l’écho spectral de ses origines. L’apprentissage du sortilège du Patronus devient alors une véritable ascèse identitaire : pour repousser l’effacement psychique, Harry doit puiser dans la mémoire fragmentaire d’une lignée brisée et transformer la douleur du deuil en une force protectrice.",
      "Le dénouement au bord du lac révèle l’émancipation décisive du sujet face à son héritage. En attendant vainement l’apparition salvatrice de son père, Harry découvre que la silhouette lumineuse qu’il espérait n’est autre que lui-même, revenu du futur par l’artifice du Retourneur de Temps. Par ce vertige temporel, J.K. Rowling signifie avec justesse que la véritable identité ne saurait être un simple reflet passif du passé paternel : elle s’accomplit dans l’acte présent, lorsque l’individu assume pleinement sa propre souveraineté morale et choisit d’incarner l’espérance qu’il cherchait chez autrui."
    ]
  },
  {
    id: 'jardin-papillons',
    roomNumber: 2,
    roomLabel: 'Salle 2',
    themeLabel: 'Le traumatisme',
    title: 'Le Jardin des Papillons',
    originalTitle: 'The Butterfly Garden',
    author: 'Dot Hutchison',
    publicationDate: '2016',
    writingLocation: 'États-Unis',
    renown:
      'Best-seller international du thriller psychologique, phénomène viral sur les plateformes littéraires (plus de 2 millions d’exemplaires vendus) et finaliste des Goodreads Choice Awards.',
    rating: 4.1,
    motifs: ['La Serre close', 'L’Encre sur l’épiderme', 'Le Sanctuaire du nom'],
    quote: 'Ils peuvent inscrire des ailes sur ma peau, mais jamais ils ne pourront redessiner les frontières de ce que je suis.',
    critiqueParagraphs: [
      "Dans Le Jardin des Papillons, Dot Hutchison explore la fracture identitaire provoquée par la séquestration et la réification du corps. Enfermées dans une serre luxuriante conçue comme un reliquaire morbide, les captives sont dépouillées de leurs patronymes, vêtues d’artifices et marquées dans leur chair par le tatouage d’ailes de papillons. Cette mise en scène esthétique de l’oppression vise à dissoudre toute singularité humaine pour réduire chaque femme à un spécimen figé, dépossédé de sa propre temporalité et réduit au seul regard du geôlier.",
      "Face à cette entreprise méthodique d’effacement, l’œuvre met en lumière une résistance psychologique d’une rare intensité à travers la figure de Maya. Au cours de son interrogatoire avec les enquêteurs, la survivante reprend possession de sa voix et orchestre son propre récit avec une lucidité souveraine. La mémoire intime cesse dès lors d’être une simple blessure : elle devient un sanctuaire inexpugnable où la conscience préserve son vrai nom, démontrant que l’identité survit au traumatisme tant que le sujet demeure l’auteur inaliénable de son histoire."
    ]
  },
  {
    id: 'arpenteurs-monde',
    roomNumber: 3,
    roomLabel: 'Salle 3',
    themeLabel: 'La science',
    title: 'Les Arpenteurs du Monde',
    originalTitle: 'Die Vermessung der Welt',
    author: 'Daniel Kehlmann',
    publicationDate: '2005',
    writingLocation: 'Vienne (Autriche) et Berlin (Allemagne)',
    renown:
      'L’un des plus grands succès de la littérature allemande contemporaine, vendu à plusieurs millions d’exemplaires et traduit dans plus de 40 langues.',
    rating: 3.9,
    motifs: ['L’Astrolabe et le Sextant', 'La Courbure du méridien', 'La Solitude de la raison'],
    quote: 'Mesurer le monde avec une rigueur absolue est encore une manière secrète de demander quelle place l’esprit humain y occupe.',
    critiqueParagraphs: [
      "À travers un diptyque romanesque d’une érudition ironique, Daniel Kehlmann confronte deux conceptions radicalement opposées de l’identité savante au seuil de la modernité. Alexander von Humboldt ne se reconnaît qu’en se projetant dans l’immensité physique du globe : gravir le Chimborazo, sonder les courants de l’Orénoque et consigner chaque variation barométrique constituent pour lui les véritables coordonnées de son être. À l’inverse, Carl Friedrich Gauss édifie son identité dans l’immobilité hautaine de l’abstraction mathématique, convaincu que la pureté des nombres révèle l’ordre secret de la création sans qu’il soit nécessaire de franchir le seuil de son cabinet.",
      "Pourtant, derrière la rigueur des instruments et la souveraineté de la raison, Les Arpenteurs du Monde dévoile la fragilité existentielle de ces deux géants. Qu’elle s’exprime par la conquête empirique de l’espace ou par l’ascèse solitaire de l’intellect, leur quête obsessionnelle de mesure se heurte à l’opacité des liens humains, à la fuite du temps et au vertige de la postérité. Kehlmann rappelle ainsi avec finesse que la science, loin d’abolir le mystère de l’identité, en révèle l’inquiétude fondamentale : vouloir cartographier l’univers demeure avant tout une tentative de se situer soi-même face à l’infini."
    ]
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    title: 'Question 1 : Le Miroir de la Dualité',
    prompt:
      '« Face à une part sombre et effrayante de vous-même, quelle est votre réaction instinctive ? »',
    options: [
      {
        key: 'A',
        text: "Je l'affronte pour comprendre l'origine de mes peurs.",
        targetBookId: 'harry-potter'
      },
      {
        key: 'B',
        text: 'Je la dissimule au reste du monde pour assurer ma survie.',
        targetBookId: 'jardin-papillons'
      },
      {
        key: 'C',
        text: "Je l'observe et l'analyse avec une distance purement logique.",
        targetBookId: 'arpenteurs-monde'
      }
    ]
  },
  {
    id: 2,
    title: 'Question 2 : La Brèche du Rationnel',
    prompt:
      '« Quand un événement irrationnel et impossible bouleverse soudainement votre réalité, comment réagissez-vous ? »',
    options: [
      {
        key: 'A',
        text: 'Je cherche la magie ou le sens caché derrière cette illusion.',
        targetBookId: 'harry-potter'
      },
      {
        key: 'B',
        text: "Je m'accroche désespérément à mes souvenirs pour ne pas perdre la raison.",
        targetBookId: 'jardin-papillons'
      },
      {
        key: 'C',
        text: 'Je mesure, je calcule et je tente de cartographier le phénomène.',
        targetBookId: 'arpenteurs-monde'
      }
    ]
  },
  {
    id: 3,
    title: "Question 3 : La Captivité de l'Être",
    prompt:
      '« Si vous étiez enfermé dans un espace clos, privé de votre liberté physique, quelle serait votre arme pour protéger votre identité ? »',
    options: [
      {
        key: 'A',
        text: "La loyauté envers ceux que j'aime et la force de mon passé.",
        targetBookId: 'harry-potter'
      },
      {
        key: 'B',
        text: "Une résistance intérieure silencieuse et le refus d'oublier mon vrai nom.",
        targetBookId: 'jardin-papillons'
      },
      {
        key: 'C',
        text: "Mon intellect, me permettant de voyager par la pensée à travers l'univers.",
        targetBookId: 'arpenteurs-monde'
      }
    ]
  }
];

export const QUIZ_RESULTS: Record<BookId, QuizResultProfile> = {
  'harry-potter': {
    bookId: 'harry-potter',
    roomNumber: 1,
    critiqueText:
      'Votre identité se forge dans la confrontation. Vous êtes défini par votre capacité à regarder vos propres ombres en face et à assumer le poids de votre héritage.',
    ctaLabel: 'Entrer dans la Salle 1'
  },
  'jardin-papillons': {
    bookId: 'jardin-papillons',
    roomNumber: 2,
    critiqueText:
      "Votre identité est une forteresse intime. Face à l'adversité ou à l'effacement, votre véritable essence réside dans votre résilience et la préservation secrète de votre histoire.",
    ctaLabel: 'Entrer dans la Salle 2'
  },
  'arpenteurs-monde': {
    bookId: 'arpenteurs-monde',
    roomNumber: 3,
    critiqueText:
      "Votre identité s'articule autour de la compréhension du vaste monde. Vous existez à travers la soif de mesurer, de comprendre et de rationaliser l'espace qui vous entoure.",
    ctaLabel: 'Entrer dans la Salle 3'
  }
};

export const CURATORS: CuratorProfile[] = [
  {
    id: 'juan-david',
    name: 'Juan David Rodriguez',
    initials: 'JDR',
    role: 'Étudiant en 7e semestre de Langues Modernes',
    bio: "Étudiant en 7e semestre de Langues Modernes. Passionné par la critique littéraire et l'analyse des structures identitaires dans la fiction contemporaine."
  },
  {
    id: 'sofia-sanchez',
    name: 'Sofia Sanchez',
    initials: 'SS',
    role: 'Étudiante en 7e semestre de Langues Modernes',
    bio: "Étudiante en 7e semestre de Langues Modernes. Spécialisée dans l'approche psychologique des récits et la médiation culturelle numérique."
  },
  {
    id: 'santiago-mejia',
    name: 'Santiago Mejia',
    initials: 'SM',
    role: 'Étudiant en 7e semestre de Langues Modernes',
    bio: "Étudiant en 7e semestre de Langues Modernes. Dédié à la didactique des langues, à la littérature comparée et à la conception d'expériences littéraires interactives."
  }
];
