/* ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
   sw.js · Z18 como app: la web se guarda en el celular, abre más rápido y, sin señal, muestra el menú que ya se vio.
   (index.html lo registra al terminar de cargar; si el navegador no puede, la web anda igual, solo que sin esto.)

   CÓMO GUARDA (todo dentro de este mismo origen; Firebase, Google Fonts y las fotos de Unsplash los maneja el navegador y no pasan por acá):
     · La página y el código (index.html, tailwind.css, styles.css, app.js, event-manager.js, cocina.js, el manifest): PRIMERO LA RED.
       Se pide a internet; si en 3,5 segundos no llegó (o no hay señal) se muestra la copia guardada. Así, cuando hay conexión, el cliente siempre ve
       la última versión (precios y menú al día) y, cuando no, igual abre.
     · Fotos, logos e íconos: se muestra lo guardado al instante y, en segundo plano, se actualiza para la próxima vez.
     · Solo se guarda lo que respondió bien (200) y es de este sitio: un 404 nunca queda guardado.
     · Pedir NO funciona sin conexión (WhatsApp y la cocina necesitan internet): la web avisa cuando se corta y cuando vuelve.

   SI SE CAMBIA ESTE ARCHIVO: subir el número de CACHE (z18-v2, z18-v3…) para que el celular tire lo guardado con la lógica vieja.
   SI ALGUNA VEZ HAY QUE APAGAR ESTO: reemplazar todo el contenido de sw.js por estas dos líneas (el celular lo desinstala solo y vuelve a la web normal):
       self.addEventListener('install', () => self.skipWaiting());
       self.addEventListener('activate', e => e.waitUntil(caches.keys().then(ks => Promise.all(ks.map(k => caches.delete(k)))).then(() => self.registration.unregister())));
   ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════ */
const CACHE = 'z18-v1';
const ESPERA_RED = 3500;                                   // milisegundos que se le da a internet antes de mostrar la copia guardada
// Lo que se guarda desde la primera visita (para que abra sin señal). Un archivo que falte no frena a los demás.
const NUCLEO = ['./', 'index.html', 'tailwind.css', 'styles.css', 'app.js', 'event-manager.js', 'cocina.js', 'logo.webp', 'logo-navidad.webp', 'manifest.webmanifest', 'icon-192.png'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => Promise.allSettled(NUCLEO.map(u => c.add(new Request(u, { cache: 'reload' })))))   // 'reload': se baja de internet, no de la memoria del navegador
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k.startsWith('z18-') && k !== CACHE).map(k => caches.delete(k))))   // lo guardado por versiones viejas de este archivo
      .then(() => self.clients.claim())
  );
});

// La llave con la que se guarda: la dirección sin «?…» ni «#…» (así /?fbclid=123 y / son la misma página y no se acumulan copias)
const llave = req => { const u = new URL(req.url); u.search = ''; u.hash = ''; return u.href; };
// Solo se guarda lo del propio sitio que respondió 200 (nada de 404, redirecciones, respuestas parciales ni de otros orígenes)
const guardable = res => !!res && res.status === 200 && res.type === 'basic' && !res.redirected;

const guardar = (req, res) => caches.open(CACHE).then(c => c.put(llave(req), res)).catch(() => {});

// Primero la red (con tiempo límite) y, si falla o tarda, la copia guardada
const redPrimero = (req, event) => {
  const red = fetch(req).then(res => { if (guardable(res)) guardar(req, res.clone()); return res; });
  event.waitUntil(red.catch(() => {}));                    // que el celular no apague este proceso antes de terminar de guardar
  const sirve = red.then(res => { if (res.status >= 500) throw new Error('servidor caído'); return res; });   // un error 5xx del servidor tampoco es una respuesta: se usa la copia guardada
  const limite = new Promise((_, no) => setTimeout(no, ESPERA_RED));
  return Promise.race([sirve, limite]).catch(async () => {
    const c = await caches.open(CACHE);
    const copia = await c.match(llave(req)) || (req.mode === 'navigate' ? (await c.match('./') || await c.match('index.html')) : undefined);
    return copia || red;                                   // sin copia guardada: se espera a internet hasta el final
  });
};

// Lo guardado al instante y, mientras, se actualiza en segundo plano para la próxima vez
const guardadoYActualiza = (req, event) =>
  caches.open(CACHE).then(async c => {
    const copia = await c.match(llave(req));
    const red = fetch(req).then(res => { if (guardable(res)) guardar(req, res.clone()); return res; });
    if (copia) { event.waitUntil(red.catch(() => {})); return copia; }
    return red;
  });

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET' || req.headers.has('range')) return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;         // Firebase, Google Fonts, Unsplash…: los maneja el navegador
  if (url.pathname.endsWith('/sw.js')) return;             // este archivo lo pide el navegador directo, siempre fresco
  const nucleo = req.mode === 'navigate' || url.pathname.endsWith('/') || /\.(html|css|webmanifest)$/.test(url.pathname) || /\/(app|cocina|event-manager)\.js$/.test(url.pathname);
  event.respondWith(nucleo ? redPrimero(req, event) : guardadoYActualiza(req, event));
});
