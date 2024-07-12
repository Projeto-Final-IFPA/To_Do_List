let cacheName = 'cache-v1';

let currentCacheVersion = 1;

self.addEventListener('install', (e) => {

  let cache = caches.open('cache-v' + currentCacheVersion).then((c) => {
    // Adcione novos arquivos atualizados ao cache
    c.addAll([
      // Lista de arquivos para cache
    ]);
  });

  e.waitUntil(cache);
});

self.addEventListener('fetch', function (event) {

  event.respondWith(


    caches.open('cache-v' + currentCacheVersion).then(function (cache) {
      return cache.match(event.request).then(function (response) {
        // Verifique se a resposta em cache existe e é da versão atual
        if (response && response.headers.get('Cache-Version') === currentCacheVersion) {
          return response; // Use a resposta em cache
        }

        // Se a resposta em cache estiver desatualizada ou não for encontrada, busque na rede
        return fetch(event.request).then(function (response) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })

  );

});

currentCacheVersion++;