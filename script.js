// script.js (Logique d'affichage de la page d'accueil - Trié par nouveauté et Séparé)

// Vérifie que les dépendances critiques sont chargées
if (typeof formatPrix !== 'function' || typeof catalogueTelephones === 'undefined') {
    console.error("ERREUR CRITIQUE: data.js ou utils.js n'est pas chargé correctement.");
}


/**
 * Crée le code HTML pour une carte de produit.
 * @param {Object} produit - L'objet produit.
 * @returns {string} Le code HTML de la carte.
 */
function createProductCard(produit) {
    const etatClass = produit.etat === 'Neuf' ? 'etat-neuf' : 'etat-occasion';
    
    const cardStyle = `style="--animation-color: ${produit.couleurAnim || 'var(--primary-color)'};"`;

    return `
        <a href="produit-details.html?id=${produit.id}" class="produit-card" ${cardStyle}>
            <div class="produit-card-image">
                <img src="${produit.imageURL}" alt="${produit.nom}">
            </div>
            <span class="produit-etat ${etatClass}">${produit.etat}</span>
            <h3>${produit.nom}</h3>
            <p class="produit-description">${produit.description.substring(0, 60)}...</p>
            <div class="produit-prix">${formatPrix(produit.prix)}</div>
            <p class="produit-origine">Origine: ${produit.origine}</p>
        </a>
    `;
}


/**
 * Fonction principale pour afficher les produits sur la page d'accueil
 */
function displayHomePageProducts() {
    const containerTelephones = document.getElementById('produits-telephones');
    const containerFilms = document.getElementById('produits-films');
    const containerSeries = document.getElementById('produits-series');
    const containerJeux = document.getElementById('produits-jeux');

    const LIMIT = 4; // Limite d'affichage

    // --- 1. TÉLÉPHONES ---
    if (containerTelephones && typeof catalogueTelephones !== 'undefined') {
        const telephDisplay = [...catalogueTelephones].reverse().slice(0, LIMIT); 
        containerTelephones.innerHTML = telephDisplay.map(createProductCard).join('');
    }

    // --- 2. FILMS ---
    if (containerFilms && typeof catalogueFilms !== 'undefined') {
        const filmsDisplay = [...catalogueFilms].reverse().slice(0, LIMIT); 
        containerFilms.innerHTML = filmsDisplay.map(createProductCard).join('');
    }

    // --- 3. SÉRIES ---
    if (containerSeries && typeof catalogueSeries !== 'undefined') {
        const seriesDisplay = [...catalogueSeries].reverse().slice(0, LIMIT); 
        containerSeries.innerHTML = seriesDisplay.map(createProductCard).join('');
    }

    // --- 4. JEUX VIDÉOS ---
    if (containerJeux && typeof catalogueJeuxVideos !== 'undefined') {
        const jeuxDisplay = [...catalogueJeuxVideos].reverse().slice(0, LIMIT); 
        containerJeux.innerHTML = jeuxDisplay.map(createProductCard).join('');
    }


    // Mise à jour du compteur de panier
    if (typeof updatePanierCount === 'function') {
        updatePanierCount();
    }
}


// Exécution
document.addEventListener('DOMContentLoaded', displayHomePageProducts);

// Fonction factice requise par animations-and-search.js
function handleSearch() {
    // La fonction de recherche est gérée par animations-and-search.js
}

// =================================================================
// 🚀 ENREGISTREMENT DU SERVICE WORKER (PWA)
// =================================================================

// Enregistrement du Service Worker pour la PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('ServiceWorker enregistré avec succès:', registration.scope);
            })
            .catch(error => {
                console.log('Échec de l\'enregistrement du ServiceWorker:', error);
            });
    });
}