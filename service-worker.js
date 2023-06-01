var cacheName = 'petstore-v1';
var cacheFiles = [
    'index.html',
    'products.js',
    'petstore.webmanifest',
    'images/acting.jpg',
    'images/icon-state-512.png',
    'images/basketball.jpg',
    'images/creative_writing.jpg',
    'images/coding.jpg',
    'images/music.jpg'



]

self.addEventListener('install',(e) => {
    console.log('[Service Worker] Install');
    e.waitUntil(
        caches.open(cacheName).then((cache) => {
            console.log('[Service Worker] Caching all the files');
            return cache.addAll(cacheFiles);
        }
    ));
});

// self.addEventListener('fetch', function(e){
//     e.respondWith(
//         //check if the cache has the file
//         caches.match(e.request).then(function (r){
//             console.log('[Service Worker] Fetch resource: ' 
//             + e.request.url);
//             // 'r' is the matching file if it exists in the cache
//             return r
//         })
//     );
// });


self.addEventListener('fetch', function(e){
    e.respondWith(
        caches.match(e.request).then(function(r){
            //download the file if it is not in the cache,
            return r || fetch(e.request).then(function (response){
                //add the new file to cache
                return caches.open(cacheName).then(function (cache){
                    cache.put(e.request, response.clone());
                    return response;
                });
            });
        })

    );
});