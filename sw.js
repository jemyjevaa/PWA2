// Evento 'install'
self.addEventListener('install', event => {
    caches.open('appShellPrueba').then(cache => {
        cache.addAll([
            '/index.html',
            '/error.jpg', 
            '/images/track.png',
            '/images/about.png',
            '/images/banner.png',
            '/images/loading.png'
        ]);
    });
    self.skipWaiting(); 
});

// Evento 'activate'
self.addEventListener('activate', event => {
    caches.delete('appShell2'); // Elimina la cache anterior si es necesario
});

// Evento 'fetch'
self.addEventListener('fetch', event => {
    const resp = fetch(event.request).then(respuesta => {
        if (!respuesta) {
            return caches.match(event.request).then(cachedResponse => {
                if (cachedResponse) {
                    return cachedResponse;
                } else {
                    return caches.match('/error.jpg'); 
                }
            });
        } else {
            return caches.open('dinamico').then(cache => {
                cache.put(event.request, respuesta.clone());
                return respuesta;
            });
        }
    }).catch(err => {
        return caches.match(event.request).then(cachedResponse => {
            if (cachedResponse) {
                return cachedResponse;
            } else {
                return caches.match('/error.png');
            }
        });
    });

    event.respondWith(resp);
});
