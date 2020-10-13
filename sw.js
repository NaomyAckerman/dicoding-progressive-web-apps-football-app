importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox) {
    console.log('berhasil memuat workbox');
    workbox.precaching.precacheAndRoute([
        { url: '/', revision: '2' },
        { url: '/index.html', revision: '2' },
        { url: '/pages/team.html', revision: '2' },
        { url: '/component/nav.html', revision: '2' },
        { url: '/assets/css/materialize.min.css', revision: '2' },
        { url: '/assets/css/style.css', revision: '2' },
        { url: '/assets/js/materialize.min.js', revision: '2' },
        { url: '/assets/js/index.js', revision: '2' },
        { url: '/assets/js/nav.js', revision: '2' },
        { url: '/assets/js/api.js', revision: '2' },
        { url: '/assets/js/db.js', revision: '2' },
        { url: '/assets/js/idb.js', revision: '2' },
        { url: '/push.js', revision: '2' },
        { url: '/manifest.json', revision: '2' },
        { url: '/assets/image/icon/icon-72x72.png', revision: '2'},
        { url: '/assets/image/icon/icon-96x96.png', revision: '2'},
        { url: '/assets/image/icon/icon-128x128.png', revision: '2'},
        { url: '/assets/image/icon/icon-144x144.png', revision: '2'},
        { url: '/assets/image/icon/icon-152x152.png', revision: '2'},
        { url: '/assets/image/icon/icon-192x192.png', revision: '2'},
        { url: '/assets/image/icon/icon-384x384.png', revision: '2'},
        { url: '/assets/image/icon/icon-512x512.png', revision: '2'},
        { url: 'https://fonts.googleapis.com/icon?family=Material+Icons', revision: '2' },
        { url: 'https://unpkg.com/snarkdown@1.0.2/dist/snarkdown.umd.js', revision: '2' },
    ]);
    workbox.routing.registerRoute(
        new RegExp('/pages/'),
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'pages'
        })
    );
    workbox.routing.registerRoute(
        /^https:\/\/api\.football-data\.org\/v2/,
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'api',
            plugins: [
                new workbox.cacheableResponse.Plugin({
                    statuses: [0, 200],
                }),
                new workbox.expiration.Plugin({
                    maxEntries: 60,
                    maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
                }),
            ],
        })
    );
} else console.log('workbok gagal dimuat');