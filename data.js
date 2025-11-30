// data.js (Contient les catalogues complets et vérifiés)

// =================================================================
// 📱 CATALOGUE TÉLÉPHONES
// =================================================================
const catalogueTelephones = [
    {
        id: "T001",
        nom: "iPhone 15 Pro Max",
        description: "Le dernier modèle avec puce A17 Bionic et écran ProMotion.",
        prix: 150000, // 150 000 F CFA
        etat: "Neuf",
        origine: "USA",
        OS: "iOS 17",
        imageURL: "images/telephones/iphone15promax.jpg",
        couleurAnim: "#8A2BE2" // Bleu-violet
    },
    {
        id: "T002",
        nom: "Samsung Galaxy S24 Ultra",
        description: "Smartphone Android haut de gamme avec S Pen intégré.",
        prix: 130000,
        etat: "Neuf",
        origine: "Corée du Sud",
        OS: "Android 14",
        imageURL: "images/telephones/samsungs24ultra.jpg",
        couleurAnim: "#00CED1" // Cyan
    },
    {
        id: "T003",
        nom: "Xiaomi 13T Pro",
        description: "Performances solides à un prix compétitif.",
        prix: 85000,
        etat: "Occasion",
        origine: "Chine",
        OS: "Android 13",
        imageURL: "images/telephones/xiaomi13tpro.jpg",
        couleurAnim: "#FF4500" // Orange-Rouge
    },
    {
        id: "T004",
        nom: "Google Pixel 8",
        description: "Le meilleur de l'IA de Google dans un smartphone compact.",
        prix: 95000,
        etat: "Neuf",
        origine: "USA",
        OS: "Android 14",
        imageURL: "images/telephones/googlepixel8.jpg",
        couleurAnim: "#32CD32" // Vert citron
    }
];

// =================================================================
// 🎬 CATALOGUE FILMS (Avec Synopsis)
// =================================================================
const catalogueFilms = [
    {
        id: "F001",
        nom: "Inception",
        description: "Un voleur de rêves est engagé pour implanter une idée.",
        synopsis: "Dom Cobb est un voleur expérimenté, le meilleur dans l'art dangereux de l'extraction : voler de précieux secrets au plus profond du subconscient pendant l'état de rêve. Sa capacité unique en a fait un acteur convoité dans le monde de l'espionnage, mais aussi un fugitif. On lui offre une chance de rédemption avec une dernière mission impossible : l'inception.",
        prix: 8000,
        etat: "Neuf",
        origine: "USA",
        genre: "Action",
        imageURL: "images/films/inception.jpg",
        couleurAnim: "#8B0000"
    },
    {
        id: "F002",
        nom: "Interstellar",
        description: "Un groupe d'explorateurs voyage à travers un trou de ver.",
        synopsis: "Alors que la Terre se meurt, un groupe de scientifiques et d'explorateurs entreprennent la mission la plus importante de l'histoire de l'humanité : voyager au-delà de notre galaxie pour découvrir si l'espèce humaine a un avenir parmi les étoiles.",
        prix: 7500,
        etat: "Occasion",
        origine: "USA",
        genre: "Fantastique",
        imageURL: "images/films/interstellar.jpg",
        couleurAnim: "#1E90FF"
    },
    {
        id: "F003",
        nom: "La Ligne Verte",
        description: "L'histoire d'un gardien de prison et d'un détenu aux pouvoirs étranges.",
        synopsis: "Dans les années 1930, Paul Edgecomb, gardien-chef du couloir de la mort, est témoin de phénomènes inexplicables après l'arrivée d'un nouveau détenu, John Coffey, un homme au physique impressionnant accusé de meurtre mais doté d'un don mystérieux et miraculeux.",
        prix: 6000,
        etat: "Neuf",
        origine: "USA",
        genre: "Drame",
        imageURL: "images/films/la-ligne-verte.jpg",
        couleurAnim: "#3CB371"
    },
    {
        id: "F004",
        nom: "Le Loup de Wall Street",
        description: "L'ascension et la chute d'un courtier en bourse corrompu.",
        synopsis: "Basé sur l'histoire vraie de Jordan Belfort, le film retrace son incroyable ascension, depuis sa modestie jusqu'à la richesse légendaire, en passant par la fraude, la corruption et un train de vie décadent menant à sa chute, le tout à travers l'excès et la comédie noire.",
        prix: 5500,
        etat: "Occasion",
        origine: "USA",
        genre: "Comédie",
        imageURL: "images/films/le-loup-de-wall-street.jpg",
        couleurAnim: "#FFD700"
    },
];

// =================================================================
// 📺 CATALOGUE SÉRIES (Avec Synopsis)
// =================================================================
const catalogueSeries = [
    {
        id: "S001",
        nom: "Breaking Bad",
        description: "Un professeur de chimie se lance dans la fabrication de drogues.",
        synopsis: "Walter White, professeur de chimie au lycée atteint d'un cancer du poumon incurable, s'associe à un ancien élève pour fabriquer et vendre de la méthamphétamine. Son but initial est d'assurer la sécurité financière de sa famille après sa mort, mais il découvre rapidement un côté sombre et puissant de lui-même, faisant de lui une figure redoutée du monde criminel.",
        prix: 15000,
        etat: "Occasion",
        origine: "USA",
        genre: "Drame",
        imageURL: "images/films/breaking-bad.jpg",
        couleurAnim: "#006400"
    },
    {
        id: "S002",
        nom: "Game of Thrones (Saison 1)",
        description: "Neuf familles nobles luttent pour le contrôle des terres mythiques de Westeros.",
        synopsis: "Dans un monde où les étés peuvent durer des décennies et les hivers une vie entière, la lutte pour le Trône de Fer reprend. De la froide forteresse de Winterfell aux terres ensoleillées du Sud, la saison 1 dépeint la trahison, la noblesse, la conquête et les forces surnaturelles qui menacent d'éteindre la paix fragile des Sept Couronnes.",
        prix: 18000,
        etat: "Neuf",
        origine: "USA",
        genre: "Fantastique",
        imageURL: "images/films/got.jpg",
        couleurAnim: "#4B0082"
    },
    {
        id: "S003",
        nom: "Stranger Things (Saison 3)",
        description: "Les amis de Hawkins sont confrontés à de nouvelles menaces surnaturelles.",
        synopsis: "L'été 1985 est arrivé à Hawkins. L'école est finie et un tout nouveau centre commercial est inauguré, apportant de nouvelles romances et de nouvelles tensions au groupe d'amis. Cependant, le mal rôde, et l'arrivée de nouvelles menaces du monde à l'envers va forcer tout le monde à se serrer les coudes pour survivre et sauver la ville.",
        prix: 12000,
        etat: "Neuf",
        origine: "USA",
        genre: "Fantastique",
        imageURL: "images/films/stranger-things.jpg",
        couleurAnim: "#DC143C"
    },
    {
        id: "S004",
        nom: "The Office (Intégrale)",
        description: "La vie quotidienne et hilarante des employés d'un bureau de vente de papier.",
        synopsis: "Cette série satirique au format documentaire suit un groupe d'employés de bureau excentriques de l'entreprise Dunder Mifflin. Ils naviguent entre drames mineurs, romances et compétitions ridicules, le tout filmé avec un humour absurde et souvent malaisant.",
        prix: 10000,
        etat: "Occasion",
        origine: "USA",
        genre: "Comédie",
        imageURL: "images/films/the-office.jpg",
        couleurAnim: "#A9A9A9"
    },
];

// =================================================================
// 🎮 CATALOGUE JEUX VIDÉOS
// =================================================================
const catalogueJeuxVideos = [
    {
        id: "J001",
        nom: "Cyberpunk 2077",
        description: "Jeu de rôle futuriste en monde ouvert, édition Phantom Liberty.",
        prix: 25000,
        etat: "Neuf",
        origine: "Pologne",
        genre: "RPG",
        plateforme: "PS5",
        imageURL: "images/jeux/cyberpunk.jpg",
        couleurAnim: "#FFD700"
    },
    {
        id: "J002",
        nom: "Elden Ring",
        description: "Jeu d'action-RPG fantastique acclamé par la critique.",
        prix: 20000,
        etat: "Occasion",
        origine: "Japon",
        genre: "Action-RPG",
        plateforme: "Xbox Series X",
        imageURL: "images/jeux/elden-ring.jpg",
        couleurAnim: "#A0522D" // Brun
    },
    {
        id: "J003",
        nom: "Hogwarts Legacy",
        description: "Aventure dans l'univers de Harry Potter.",
        prix: 18000,
        etat: "Neuf",
        origine: "USA",
        genre: "Aventure",
        plateforme: "Switch",
        imageURL: "images/jeux/hogwarts.jpg",
        couleurAnim: "#483D8B" // Bleu-marine
    },
];