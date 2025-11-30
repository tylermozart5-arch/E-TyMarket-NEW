// service-worker.js

const CACHE_NAME = 'ety-market-cache-v1';

// ATTENTION : Le chemin racine '/' a été retiré car il cause des 404 sur GitHub Pages.
const urlsToCache = [
    'index.html', // C'est la page d'accueil
    'styles.css',
    'data.js',
    'utils.js',
    'script.js',
    'script-details.js',
    'script-catalogue.js',
    'animations-and-search.js', 
    'telephones.html',
    'jeux.html',
    'films.html',
    'series.html',
    'produit-details.html',
    'panier.html',
    'images/luffy-run.gif', 
    'images/icons/icon-192x192.png', 
    'manifest.json'
];

// --- 1. Installation du Service Worker et mise en cache ---
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache ouvert, pré-mise en cache des ressources');
        // Ajout des fichiers au cache
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.error('Échec de la mise en cache lors de l\'installation:', error);
      })
  );
});

// --- 2. Récupération des ressources (Stratégie Cache First) ---
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si la ressource est trouvée dans le cache, on la retourne
        if (response) {
          return response;
        }
        // Sinon, on fait une requête réseau
        return fetch(event.request);
      })
  );
});

// --- 3. Activation du Service Worker et nettoyage des anciens caches ---
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Suppression ancien cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
