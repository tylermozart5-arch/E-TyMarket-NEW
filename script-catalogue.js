// script-catalogue.js (Logique pour afficher, filtrer et rechercher les catalogues)

// Les variables `currentCatalogueData` et `catalogueTitle` sont définies
// directement dans les balises <script> des pages HTML spécifiques (telephones.html, films.html, etc.)

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
 * Affiche une liste de produits dans la grille du catalogue.
 * @param {Array<Object>} produits - Le tableau de produits à afficher.
 * @param {boolean} isSearch - Indique si c'est un résultat de recherche.
 */
function displayCatalogue(produits, isSearch = false) {
    const container = document.getElementById('catalogue-complet');
    if (!container) return;
    
    // CRITIQUE : Vérifie si le catalogue est vide
    if (!produits || produits.length === 0) {
        const title = (typeof catalogueTitle !== 'undefined') ? catalogueTitle : "Produits";
        let message = `Aucun ${title} trouvé. Le catalogue est vide ou n'a pas été chargé correctement.`;
        
        if (isSearch) {
             const searchTerm = document.getElementById('search-input').value;
             message = `Aucun résultat trouvé pour la recherche de "${searchTerm}" dans le catalogue ${title}.`;
        }
        
        container.innerHTML = `<p class="search-message">${message}</p>`;
        return;
    }

    const html = produits.map(createProductCard).join('');
    container.innerHTML = html;
}


/**
 * Filtre le catalogue en fonction de la valeur de filtre sélectionnée.
 */
function filterCatalogue(filterValue) {
    if (typeof currentCatalogueData === 'undefined') {
        console.error("Erreur de filtre: currentCatalogueData non définie.");
        return;
    }
    let filteredData = [];

    if (filterValue === 'Tous') {
        filteredData = currentCatalogueData;
    } else {
        filteredData = currentCatalogueData.filter(produit => {
            const isMatchComposite = produit.genre && produit.plateforme && (filterValue === `${produit.genre}-${produit.plateforme}`);
            const isMatchOS = produit.OS && produit.OS.includes(filterValue);
            const isMatchMarque = produit.nom && produit.nom.includes(filterValue);
            const isMatchGenre = produit.genre && produit.genre.includes(filterValue);

            return isMatchComposite || isMatchOS || isMatchMarque || isMatchGenre;
        });
    }

    displayCatalogue(filteredData);
}

/**
 * Fonction utilisée par animations-and-search.js pour effectuer la recherche en direct.
 */
function handleSearch() {
    if (typeof currentCatalogueData === 'undefined') {
        console.error("Erreur de recherche: currentCatalogueData non définie.");
        return;
    }
    
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    
    if (searchTerm.length < 2 && searchTerm.length !== 0) {
        return;
    }
    
    const filteredResults = currentCatalogueData.filter(produit => 
        produit.nom.toLowerCase().includes(searchTerm) ||
        produit.description.toLowerCase().includes(searchTerm) ||
        (produit.genre && produit.genre.toLowerCase().includes(searchTerm))
    );

    displayCatalogue(filteredResults, true);

    if (searchTerm === '') {
        displayCatalogue(currentCatalogueData, false);
    }
}

// L'appel à displayCatalogue est géré par les scripts inline dans les pages HTML
document.addEventListener('DOMContentLoaded', () => {
    if (typeof updatePanierCount === 'function') {
        updatePanierCount();
    }
});