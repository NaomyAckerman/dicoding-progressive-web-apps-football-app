importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox) {
    console.log('berhasil memuat workbox');
    workbox.precaching.precacheAndRoute([{
            url: '/',
            revision: '1'
        },
        {
            url: '/index.html',
            revision: '1'
        },
        {
            url: '/pages/team.html',
            revision: '1'
        },
        {
            url: '/pages/teams.html',
            revision: '1'
        },
        {
            url: '/pages/standings.html',
            revision: '1'
        },
        {
            url: '/pages/favorite-teams.html',
            revision: '1'
        },
        {
            url: '/component/nav.html',
            revision: '1'
        },
        {
            url: '/assets/css/materialize.min.css',
            revision: '1'
        },
        {
            url: '/assets/css/style.css',
            revision: '1'
        },
        {
            url: '/assets/js/materialize.min.js',
            revision: '1'
        },
        {
            url: '/assets/js/index.js',
            revision: '1'
        },
        {
            url: '/assets/js/nav.js',
            revision: '1'
        },
        {
            url: '/assets/js/api.js',
            revision: '1'
        },
        {
            url: '/assets/js/db.js',
            revision: '1'
        },
        {
            url: '/assets/js/idb.js',
            revision: '1'
        },
        {
            url: '/manifest.json',
            revision: '1'
        },
        {
            url: '/assets/image/icon/icon-72x72.png',
            revision: '1'
        },
        {
            url: '/assets/image/icon/icon-96x96.png',
            revision: '1'
        },
        {
            url: '/assets/image/icon/icon-128x128.png',
            revision: '1'
        },
        {
            url: '/assets/image/icon/icon-144x144.png',
            revision: '1'
        },
        {
            url: '/assets/image/icon/icon-152x152.png',
            revision: '1'
        },
        {
            url: '/assets/image/icon/icon-192x192.png',
            revision: '1'
        },
        {
            url: '/assets/image/icon/icon-384x384.png',
            revision: '1'
        },
        {
            url: '/assets/image/icon/icon-512x512.png',
            revision: '1'
        },
        {
            url: 'https://fonts.googleapis.com/icon?family=Material+Icons',
            revision: '1'
        },
        {
            url: 'https://unpkg.com/snarkdown@1.0.2/dist/snarkdown.umd.js',
            revision: '1'
        }
    ], {
        ignoreUrlParametersMatching: [/.*/]
    });

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