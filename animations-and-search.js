// animations-and-search.js (Avec gestion de la recherche et de l'animation Luffy)

// --- GESTION DE LA RECHERCHE ---
const searchInput = document.getElementById('search-input');
let searchTimeout;

if (searchInput) {
    searchInput.addEventListener('input', () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const query = searchInput.value.toLowerCase();
            // initialSearchFilter est une fonction globale définie dans script-catalogue.js ou script.js
            if (typeof initialSearchFilter === 'function') {
                initialSearchFilter(query);
            } else {
                // Ce warning est normal sur produit-details.html ou panier.html qui n'ont pas de catalogue complet
                // console.warn("initialSearchFilter n'est pas définie.");
            }
        }, 300); // Délai de 300ms après la frappe
    });
}

// --- GESTION DE L'ANIMATION DE LUFFY ---

const luffyContainer = document.getElementById('luffy-container');
const luffyImage = document.getElementById('luffy-animation');
// IMPORTANT: Assurez-vous que ce chemin est correct. Placez l'image de Luffy dans un dossier 'images'.
const luffyAnimationSrc = 'images/luffy-animation.gif'; 

let luffyActive = false;
let luffyTimer;
const ANIMATION_DURATION = 8000; // Durée totale visible

function showLuffy() {
    if (luffyActive || !luffyContainer || !luffyImage) return;

    luffyActive = true;
    luffyImage.src = luffyAnimationSrc;
    luffyImage.style.display = 'block';
    luffyImage.style.opacity = '0';
    luffyImage.style.transform = 'translateY(-20px) translateX(-50%)';
    luffyImage.classList.remove('luffy-idle'); // Retirer l'animation de base pendant la séquence

    // 1. Animation d'apparition
    luffyImage.animate([
        { opacity: 0, transform: 'translateY(-20px) translateX(-50%)' },
        { opacity: 1, transform: 'translateY(0) translateX(-50%)' }
    ], {
        duration: 800,
        easing: 'ease-out',
        fill: 'forwards'
    }).onfinish = () => {
        
        // 2. Déclencher la séquence spécifique après l'apparition
        // Ajout d'une classe pour lancer la séquence d'animation complexe dans le CSS
        luffyImage.classList.add('luffy-sequence'); 

        // 3. Masquer Luffy après la séquence
        luffyTimer = setTimeout(hideLuffy, ANIMATION_DURATION); 
    };
}

function hideLuffy() {
    if (!luffyActive || !luffyImage) return;

    clearTimeout(luffyTimer);
    luffyImage.classList.remove('luffy-sequence'); // Retirer la classe de séquence

    // Animation de disparition
    luffyImage.animate([
        { opacity: 1, transform: 'translateY(0) translateX(-50%)' },
        { opacity: 0, transform: 'translateY(-20px) translateX(-50%)' }
    ], {
        duration: 800,
        easing: 'ease-in',
        fill: 'forwards'
    }).onfinish = () => {
        luffyImage.style.display = 'none';
        luffyActive = false;
        // Relancer le timer pour une prochaine apparition aléatoire
        startLuffyRandomAppearance();
    };
}

function startLuffyRandomAppearance() {
    // Apparaît aléatoirement entre 10 et 30 secondes (10000ms et 30000ms)
    const minDelay = 10000;
    const maxDelay = 30000;
    const randomDelay = Math.random() * (maxDelay - minDelay) + minDelay; 
    setTimeout(showLuffy, randomDelay);
}

// Démarrer l'animation de Luffy après le chargement complet du DOM
document.addEventListener('DOMContentLoaded', () => {
    if (luffyContainer && luffyImage) {
        startLuffyRandomAppearance();
    }
});