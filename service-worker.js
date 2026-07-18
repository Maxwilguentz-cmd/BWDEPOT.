// Service Worker BWdepot — kache "koki" app la (paj HTML + imaj lokal yo)
// pou app la ka LOUVRI menm si pa gen entènèt. Done Firebase yo (vant,
// stòk, kès) toujou bezwen entènèt pou senkronize an tan reyèl — sa a
// sèlman fè paj la chaje pi vit epi fonksyone san koneksyon.

// 🔧 MIZAJOU VÈSYON: chak fwa w chanje kontni service-worker.js la (oswa
// kontni SHELL_FILES yo), ogmante nimewo a anba a (v1 → v2 → v3...).
// Sa a se sa ki fè navigatè a rann kont gen yon "nouvo vèsyon" epi ki
// deklanche bandwòl "Aktyalize Kounye a" nan index.html.
const CACHE_NAME = 'bwdepot-shell-v2';

// Paj prensipal yo nou vle disponib menm san entènèt.
const SHELL_FILES = [
    'index.html',
    'natcash.html',
    'admin.html',
    'manifest.json',
    'icon-192.png',
    'icon-512.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(SHELL_FILES).catch((err) => {
                console.warn('Service Worker: kèk fichye koki pa t disponib pou precache:', err);
            });
        })
    );
    // 🔧 NÒT: nou PA rele self.skipWaiting() otomatikman isit la ankò.
    // Konsa, yon nouvo vèsyon service-worker.js rete "an atant" jiskaske
    // itilizatè a klike sou bouton "Aktyalize Kounye a" nan bandwòl la —
    // sa evite yon mizajou aplike san moun nan pa konnen pandan l ap
    // travay (pa egzanp pandan l ap fè yon vant).
});

// Resevwa mesaj ki soti nan paj la (index.html) lè itilizatè a klike sou
// "Aktyalize Kounye a" — se sa ki fè nouvo vèsyon an vin aktif.
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((names) => {
            return Promise.all(
                names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n))
            );
        })
    );
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    const req = event.request;

    // Sèlman jere requèt GET; kite requèt Firebase (POST/WebSocket/API) pase
    // dirèkteman san n pa touche yo, pou pa kraze senkronizasyon an tan reyèl la.
    if (req.method !== 'GET') return;

    const url = new URL(req.url);

    // Paj HTML (navigasyon): eseye rezo a anvan, si l echwe (pa gen
    // entènèt) sèvi ak vèsyon ki nan kach la.
    if (req.mode === 'navigate') {
        event.respondWith(
            fetch(req)
                .then((res) => {
                    caches.open(CACHE_NAME).then((cache) => cache.put(req, res.clone()));
                    return res;
                })
                .catch(() => caches.match(req).then((res) => res || caches.match('index.html')))
        );
        return;
    }

    // Sèlman jere fichye ki soti sou menm sit la (imaj pwodwi, CSS, JS lokal).
    // Fichye Firebase/CDN (gstatic.com) yo pa touche pa kache sa a.
    if (url.origin === self.location.origin) {
        event.respondWith(
            caches.match(req).then((cached) => {
                if (cached) return cached;
                return fetch(req).then((res) => {
                    caches.open(CACHE_NAME).then((cache) => cache.put(req, res.clone()));
                    return res;
                }).catch(() => cached);
            })
        );
    }
});
