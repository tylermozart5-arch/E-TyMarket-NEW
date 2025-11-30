// script-details.js (Logique pour la page produit-details.html)

// CRITIQUE : Définition du catalogue complet pour que utils.js puisse y accéder
const catalogueComplet = [
    ...(typeof catalogueTelephones !== 'undefined' ? catalogueTelephones : []),
    ...(typeof catalogueFilms !== 'undefined' ? catalogueFilms : []),
    ...(typeof catalogueSeries !== 'undefined' ? catalogueSeries : []),
    ...(typeof catalogueJeuxVideos !== 'undefined' ? catalogueJeuxVideos : [])
];

/**
 * Crée le code HTML pour afficher les détails d'un produit.
 * @param {Object} produit - L'objet produit.
 */
function displayProductDetails(produit) {
    const container = document.getElementById('produit-detail-container');
    if (!container) return;

    const etatText = produit.etat === 'Neuf' ? 
        `<span class="detail-etat-neuf">Neuf</span>` : 
        `<span class="detail-etat-occasion">Occasion</span>`;
    
    // Ajout conditionnel du synopsis
    let synopsisHTML = '';
    if (produit.synopsis) {
        synopsisHTML = `
            <h3>Synopsis</h3>
            <p>${produit.synopsis}</p>
        `;
    }

    container.innerHTML = `
        <div class="detail-image">
            <img src="${produit.imageURL}" alt="${produit.nom}">
        </div>
        <div class="detail-info">
            <h2>${produit.nom}</h2>
            
            ${synopsisHTML}

            <p><strong>Description:</strong> ${produit.description}</p>
            <p><strong>État:</strong> ${etatText}</p>
            <p><strong>Origine:</strong> ${produit.origine}</p>
            
            ${produit.OS ? `<p><strong>Système:</strong> ${produit.OS}</p>` : ''}
            ${produit.genre ? `<p><strong>Genre:</strong> ${produit.genre}</p>` : ''}
            ${produit.plateforme ? `<p><strong>Plateforme:</strong> ${produit.plateforme}</p>` : ''}

            <div class="detail-price">${formatPrix(produit.prix)}</div>

            <div class="action-buttons">
                <button id="btn-acheter" onclick="showWhatsAppForm('${produit.id}')">Acheter (WhatsApp)</button>
                <button id="btn-ajouter-panier" onclick="addToPanier('${produit.id}')">Ajouter au Panier</button>
            </div>
        </div>
    `;

    document.title = `${produit.nom} - Détails`;
}

/**
 * Initialisation au chargement de la page.
 */
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (catalogueComplet.length === 0) {
        console.error("ERREUR CRITIQUE: Catalogue(s) non chargé(s). Vérifiez data.js.");
        document.getElementById('produit-detail-container').innerHTML = 
            `<p>Erreur de chargement des données. Veuillez vérifier la console du navigateur (F12).</p>`;
        return;
    }

    if (!productId) {
        document.getElementById('produit-detail-container').innerHTML = 
            `<p>Erreur: ID produit manquant dans l'URL.</p>`;
        return;
    }

    const produit = catalogueComplet.find(p => p.id === productId);

    if (produit) {
        displayProductDetails(produit);
    } else {
        document.getElementById('produit-detail-container').innerHTML = 
            `<p>Produit introuvable (ID: ${productId}).</p>`;
    }

    if (typeof updatePanierCount === 'function') {
        updatePanierCount();
    }
});