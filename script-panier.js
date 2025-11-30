// script-panier.js (Avec formulaire Nom/Quartier avant validation du panier)

// Définir le numéro WhatsApp du destinataire (À REMPLACER PAR VOTRE NUMÉRO)
const WHATSAPP_NUMBER = "237699999999"; 

/**
 * Affiche les produits actuellement dans le panier.
 */
function displayPanier() {
    const panier = getPanier();
    const panierListDiv = document.getElementById('panier-list');
    const totalArticlesSpan = document.getElementById('total-articles');
    const panierTotalPriceSpan = document.getElementById('panier-total-price');

    if (!panierListDiv || !totalArticlesSpan || !panierTotalPriceSpan) return;

    panierListDiv.innerHTML = ''; // Vider la liste existante
    let totalArticles = 0;
    let totalPrice = 0;

    if (panier.length === 0) {
        panierListDiv.innerHTML = '<p class="panier-vide">Votre panier est vide.</p>';
        totalArticlesSpan.textContent = '0';
        panierTotalPriceSpan.textContent = formatPrix(0);
        return;
    }

    panier.forEach(item => {
        totalArticles += item.quantity;
        totalPrice += item.prix * item.quantity;

        const itemDiv = document.createElement('div');
        itemDiv.classList.add('panier-item');
        itemDiv.innerHTML = `
            <img src="${item.imageURL}" alt="${item.nom}">
            <div class="item-info">
                <h4>${item.nom}</h4>
                <p>${formatPrix(item.prix)} x ${item.quantity}</p>
            </div>
            <div class="item-actions">
                <button onclick="changeQuantity('${item.id}', -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="changeQuantity('${item.id}', 1)">+</button>
                <button class="remove-item" onclick="removeFromPanier('${item.id}')">Supprimer</button>
            </div>
        `;
        panierListDiv.appendChild(itemDiv);
    });

    totalArticlesSpan.textContent = totalArticles;
    panierTotalPriceSpan.textContent = formatPrix(totalPrice);
}

/**
 * Change la quantité d'un produit dans le panier.
 * @param {string} productId - L'ID du produit.
 * @param {number} delta - La quantité à ajouter ou soustraire (-1 ou 1).
 */
window.changeQuantity = function(productId, delta) {
    const panier = getPanier();
    const itemIndex = panier.findIndex(item => item.id === productId);

    if (itemIndex > -1) {
        panier[itemIndex].quantity += delta;
        if (panier[itemIndex].quantity <= 0) {
            panier.splice(itemIndex, 1); // Supprimer si la quantité est 0 ou moins
        }
        savePanier(panier);
        displayPanier(); // Rafraîchir l'affichage
        updatePanierCount(); // Mettre à jour le compteur global
    }
}

/**
 * Retire complètement un produit du panier.
 * @param {string} productId - L'ID du produit à retirer.
 */
window.removeFromPanier = function(productId) {
    let panier = getPanier();
    panier = panier.filter(item => item.id !== productId);
    savePanier(panier);
    displayPanier(); // Rafraîchir l'affichage
    updatePanierCount(); // Mettre à jour le compteur global
}

/**
 * Vide entièrement le panier.
 */
window.clearPanier = function() {
    if (confirm("Voulez-vous vraiment vider votre panier ?")) {
        localStorage.removeItem('panier');
        displayPanier();
        updatePanierCount();
    }
}

/**
 * Affiche le formulaire pour les informations client avant de valider la commande.
 */
function showPanierValidationForm() {
    const panier = getPanier();
    if (panier.length === 0) {
        alert("Votre panier est vide. Veuillez ajouter des produits avant de valider.");
        return;
    }

    const overlay = document.createElement('div');
    overlay.id = 'form-overlay';
    overlay.onclick = () => overlay.remove();

    const formModal = document.createElement('div');
    formModal.id = 'client-info-modal';
    formModal.onclick = (e) => e.stopPropagation();

    const totalPrice = panier.reduce((sum, item) => sum + (item.prix * item.quantity), 0);

    formModal.innerHTML = `
        <h3>Confirmer votre Commande</h3>
        <p>Total de la commande: <strong>${formatPrix(totalPrice)}</strong></p>
        <hr>
        <label for="client-name-panier">Votre Nom :</label>
        <input type="text" id="client-name-panier" placeholder="Ex: Jean Dupont" required>
        <label for="client-quarter-panier">Votre Quartier :</label>
        <input type="text" id="client-quarter-panier" placeholder="Ex: Bastos, Douala" required>
        <div class="modal-actions">
            <button id="confirm-panier-whatsapp">Confirmer et Envoyer la Commande</button>
            <button id="cancel-panier-form">Annuler</button>
        </div>
    `;

    document.body.appendChild(overlay);
    overlay.appendChild(formModal);

    document.getElementById('confirm-panier-whatsapp').addEventListener('click', () => {
        const clientName = document.getElementById('client-name-panier').value;
        const clientQuarter = document.getElementById('client-quarter-panier').value;

        if (!clientName || !clientQuarter) {
            alert("Veuillez remplir votre Nom et votre Quartier.");
            return;
        }

        let message = `Bonjour, je souhaite commander les articles suivants :\n\n`;
        panier.forEach(item => {
            message += `* ${item.nom} (${formatPrix(item.prix)}) x ${item.quantity}\n`;
        });
        message += `\nTotal: ${formatPrix(totalPrice)}`;
        message += `\n\nNom du Client: ${clientName}`;
        message += `\nQuartier du Client: ${clientQuarter}`;
        
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
        
        window.open(whatsappUrl, '_blank');
        overlay.remove(); // Fermer le formulaire
        clearPanier(); // Vider le panier après la commande
    });

    document.getElementById('cancel-panier-form').addEventListener('click', () => {
        overlay.remove();
    });
}


// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    displayPanier();
    updatePanierCount();

    const btnValiderPanier = document.getElementById('btn-valider-panier');
    if (btnValiderPanier) {
        btnValiderPanier.addEventListener('click', showPanierValidationForm);
    }
});