// utils.js (Fonctions utilitaires et de manipulation du panier)

/**
 * Formate un nombre en devise CFA (pour l'affichage des prix).
 * @param {number} prix - Le prix en F CFA.
 * @returns {string} Le prix formaté.
 */
function formatPrix(prix) {
    if (typeof prix !== 'number') return 'Prix inconnu';
    return prix.toLocaleString('fr-FR', {
        style: 'currency',
        currency: 'XOF', // Code de devise pour le Franc CFA
        minimumFractionDigits: 0
    });
}

/**
 * Met à jour le compteur du panier dans le header.
 */
function updatePanierCount() {
    const panier = JSON.parse(localStorage.getItem('panier') || '[]');
    const count = panier.reduce((sum, item) => sum + item.quantite, 0);
    const countElement = document.getElementById('panier-count');
    if (countElement) {
        countElement.textContent = count;
    }
}

/**
 * Ajoute un produit au panier dans le LocalStorage.
 * @param {string} productId - L'ID du produit à ajouter.
 */
function addToPanier(productId) {
    if (typeof catalogueComplet === 'undefined') {
        alert("Erreur critique: Données du catalogue non chargées.");
        console.error("ERREUR: catalogueComplet n'est pas défini lors de l'appel à addToPanier.");
        return;
    }
    
    const panier = JSON.parse(localStorage.getItem('panier') || '[]');
    const produit = catalogueComplet.find(p => p.id === productId);

    if (!produit) {
        console.error("Produit non trouvé pour l'ajout au panier:", productId);
        return;
    }

    const itemExistant = panier.find(item => item.id === productId);

    if (itemExistant) {
        itemExistant.quantite += 1;
    } else {
        panier.push({
            id: productId,
            nom: produit.nom,
            prix: produit.prix,
            quantite: 1,
            imageURL: produit.imageURL
        });
    }

    localStorage.setItem('panier', JSON.stringify(panier));
    updatePanierCount();
    
    alert(`"${produit.nom}" a été ajouté à votre panier !`);
}

/**
 * Affiche le formulaire WhatsApp pour la commande.
 * @param {string} productId - L'ID du produit à acheter.
 */
function showWhatsAppForm(productId) {
    if (typeof catalogueComplet === 'undefined') {
        alert("Erreur critique: Données du catalogue non chargées.");
        console.error("ERREUR: catalogueComplet n'est pas défini lors de l'appel à showWhatsAppForm.");
        return;
    }

    const produit = catalogueComplet.find(p => p.id === productId);

    if (!produit) {
        alert("Erreur: Produit non identifié pour l'achat.");
        return;
    }

    const message = `Bonjour, je souhaite commander l'article : ${produit.nom} (ID: ${produit.id}) au prix de ${formatPrix(produit.prix)}. Merci de confirmer la disponibilité et le mode de paiement.`;
    
    // NUMÉRO WHATSAPP CORRIGÉ
    const numeroCible = '24162636600'; 

    const whatsappUrl = `https://wa.me/${numeroCible}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank');
}

/**
 * Vide complètement le panier.
 */
function viderPanier() {
    localStorage.removeItem('panier');
    updatePanierCount();
    alert("Le panier a été vidé.");
}