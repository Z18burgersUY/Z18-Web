/* ═══════════════════════════════════════════════════════════════════════════════════════════════
   Z18 · GESTOR DE EVENTOS TEMÁTICOS  ("Mod Loader")
   ───────────────────────────────────────────────────────────────────────────────────────────────
   Viste la web de un evento de temporada (Halloween, Navidad…) SIN tocar la lógica del sitio. Un evento tiene dos partes:
     · el TEMA, que es solo CSS y vive en styles.css, en una sección «EVENTO · …» colgada de html[data-evento="…"]:
       paleta (variables), emojis de los títulos, detalles de los paneles. Es lo que cambia el aspecto.
     · el DECORADO dinámico (opcional): un "mod" del registro EVENTS (más abajo), { nombre, css, js }, que agrega nodos sueltos (murciélagos, sello…).

   ► INTERRUPTOR GENERAL — es la única línea que hay que cambiar:

         const activeEvent = null;          // APAGADO: no se toca nada, la web queda tal cual
         const activeEvent = 'halloween';   // ENCENDIDO: tema + decorado de Halloween

   ► ELECCIÓN DEL CLIENTE: con un evento en curso, «Mi cuenta» muestra un interruptor («Tema de Halloween») para que cada cliente lo prenda o apague.
     Su decisión queda en localStorage (clave z18_evento_off = nombre del evento apagado) y se respeta al recargar; solo vale para ESE evento
     (si mañana el evento es otro, se muestra igual). El interruptor lo maneja app.js a través de window.Z18Events (ver más abajo).
   ► LOGO DEL EVENTO: cada evento puede traer su propio logo. En su entrada de EVENTS van dos propiedades:
        logo:   'assets/logo-halloween.webp'                    el archivo (cuadrado y con fondo transparente, como assets/logo.webp): subilo a esa ruta del repositorio (o, si el repo no usa carpetas, suelto en la raíz)
        logoEn: ['#logo', 'footer img[alt^="Emblema"]', '#auth .safe-auth-top img']
                                                                 qué <img> lo usan, como selectores CSS (Halloween: la cabecera, el pie y la barra de «Mi cuenta»). Sin `logoEn`: solo '#logo'.
     La señal es SIEMPRE html[data-evento] (el mismo atributo del que cuelga el tema; nada mira data-theme ni z18_theme, que solo valen light / dark):
     lo pone el gestor salvo que el cliente haya apagado el evento (z18_evento_off), y mientras esté puesto esos <img> usan el logo del evento.
     Los tres: #logo = el <img id="logo"> de la cabecera · 'footer img[alt^="Emblema"]' = el del pie · '#auth .safe-auth-top img' = el logo chico de arriba a la derecha
     de «Mi cuenta» (la barra del panel, junto a «Atrás»). En «Mi cuenta» NO sirve '#auth img': ese panel también muestra fotos de productos (la hamburguesa
     favorita, el catálogo de Puntos Z) y se las pisaría con el logo; por eso el selector baja solo hasta la barra de arriba (.safe-auth-top).
     El favicon queda como está (salvo en un repositorio plano: ver «Respaldo»).
        · Sin parpadeo: el <img> se cambia en el instante en que el navegador lo arma —antes de dibujarlo, y antes de que el pie (lazy) pida su
          archivo— y sin mover nada: ya trae width/height. Si el <img> ya existe (el interruptor de «Mi cuenta»), se cambia en el acto.
        · Sigue al interruptor de «Mi cuenta» sin recargar: Z18Events.elegir / apagar / encender cambian o devuelven todos los logos a la vez.
        · Respaldo: de cada <img> se guarda su src y su onerror tal como venían en el HTML; al apagar el evento se devuelven.
          Si el archivo no está en la ruta de `logo`, se prueba en la RAÍZ del sitio con el mismo nombre (como hace el logo de siempre cuando el
          repositorio guarda los archivos sueltos, sin carpetas): si está ahí se usa ese —y el ícono de la pestaña, si su carpeta tampoco existe,
          pasa a su archivo de la raíz— y la consola avisa. Si no está en ninguna, TODOS vuelven solos al logo de siempre, con su respaldo
          original, y en esa visita no se reintenta (al recargar, sí). Sin `logo`, el evento no toca ningún logo.
        · Diagnóstico: cuando el logo no se encuentra en la ruta configurada, la consola (DevTools → Console) lo cuenta con la URL que falló y la CAUSA
          exacta: HTTP 404 (el archivo no está en esa ruta), 200 pero con otra página en vez de una imagen (tipo MIME equivocado: típico de un rewrite
          de Vercel), archivo dañado o pedido bloqueado (extensión, CSP, CORS). Si un selector de `logoEn` no encuentra nada, o encuentra algo que no
          es un <img>, también lo avisa. Y a pedido: Z18Events.diagnostico() en la consola revisa todo junto (interruptor, elección de este navegador,
          selectores, rutas y respuesta del servidor) y lo escribe con ✔ / ✘.
   ► Este archivo se carga en el <head> a propósito: el atributo data-evento queda puesto ANTES del primer dibujo y no hay parpadeo
     (también la elección guardada del cliente se lee ahí, antes de pintar).
   ► REDEFINIR un evento (otro color, otro brillo): cambiá las variables --hw-* de la sección «EVENTO · HALLOWEEN» de styles.css
     (hay un bloque para modo oscuro y otro para modo claro). Los emojis de cada título están en esa misma sección, en la parte «3 · Emojis».
   ► SUMAR otro evento: copiá esa sección de styles.css cambiando «halloween» por el nombre nuevo, agregá una entrada a EVENTS
     (con css/js vacíos si no necesita decorado) y poné su nombre en activeEvent.
        css      → texto CSS que se inyecta en <style id="z18-evento-…-css">      (o cssUrl: 'eventos/navidad.css')
        js(ctx)  → función que arma el decorado (ctx.add(nodo, padre, alInicio) lo agrega y se limpia solo al apagar);
                   puede devolver una función de limpieza extra                      (o jsUrl: 'eventos/navidad.js')
        logo, logoEn → el logo del evento y los <img> que lo usan (opcionales; ver «LOGO DEL EVENTO» más arriba)
   Reglas de oro: nada de position estático que mueva el diseño (usá absolute/fixed), pointer-events: none en el decorado, y respetar
   prefers-reduced-motion. Si el mod falla, el gestor lo apaga solo y la web sigue funcionando.
   Desde la consola del navegador: Z18Events.apagar() lo quita al instante (solo esta visita) y Z18Events.encender() lo vuelve a poner;
   Z18Events.elegir(true / false) hace lo mismo y además guarda la elección, igual que el interruptor de «Mi cuenta».
   ═══════════════════════════════════════════════════════════════════════════════════════════════ */
const activeEvent = 'halloween';

(function Z18EventManager() {
  'use strict';

  /* ───────────────────────────── REGISTRO DE EVENTOS (los mods) ───────────────────────────── */
  const EVENTS = {

    halloween: {
      nombre: 'Halloween',
      emoji: '🎃',                                    // lo muestra el interruptor de «Mi cuenta»
      logo: 'assets/logo-halloween.webp',             // el logo especial del evento (si el archivo falta, quedan los logos de siempre)
      logoEn: ['#logo', 'footer img[alt^="Emblema"]', '#auth .safe-auth-top img'], // dónde se usa (selectores CSS de <img>): la cabecera, el pie y el logo chico de la barra de «Mi cuenta»
      /* Solo el decorado dinámico de abajo: la paleta, los emojis y los paneles (el tema) están en styles.css, sección «EVENTO · HALLOWEEN».
         Los colores salen de las mismas variables --hw-* (con un valor de respaldo por si faltaran). */
      css: `
        /* Capa decorativa dentro de la cabecera: absoluta, sin clics y detrás del contenido → no mueve nada (cero CLS) */
        .z18-evt-capa { position: absolute; inset: 0; z-index: 0; overflow: hidden; pointer-events: none; }
        .z18-evt-murci { position: absolute; top: var(--y); left: -3rem; font-size: var(--s); line-height: 1; opacity: .85;
                         animation: z18-evt-vuelo var(--d) linear infinite; animation-delay: var(--w); }
        @keyframes z18-evt-vuelo {
          from { transform: translate(0, 0) rotate(-6deg); }
          50%  { transform: translate(55vw, 14px) rotate(6deg); }
          to   { transform: translate(115vw, -8px) rotate(-6deg); }
        }
        .z18-evt-sello { position: absolute; top: .75rem; left: .75rem; padding: .2rem .7rem; border-radius: 9999px;
                         font: 400 1rem/1.2 'Bebas Neue', sans-serif; letter-spacing: .08em; color: rgb(var(--hw-noche, 26 11 46));
                         background: linear-gradient(135deg, #ffb347, rgb(var(--hw-calabaza, 255 122 0)));
                         box-shadow: 0 2px 12px rgb(var(--hw-calabaza, 255 122 0) / .55), 0 0 0 1px rgb(var(--hw-violeta, 168 85 247) / .55); transform: rotate(-4deg); }
        @media (prefers-reduced-motion: reduce) { .z18-evt-murci { display: none; } }
      `,
      js(ctx) {
        if (!ctx.header) return;
        const capa = document.createElement('div');
        capa.className = 'z18-evt-capa';
        capa.setAttribute('aria-hidden', 'true');
        if (!ctx.reducedMotion) {
          for (let i = 0; i < 5; i++) {                                             // murciélagos cruzando la cabecera
            const b = document.createElement('span');
            b.className = 'z18-evt-murci';
            b.textContent = '🦇';
            b.style.cssText = `--y:${8 + Math.random() * 60}%;--s:${1.1 + Math.random() * 0.9}rem;--d:${9 + Math.random() * 8}s;--w:-${Math.random() * 12}s`;
            capa.appendChild(b);
          }
        }
        const sello = document.createElement('span');
        sello.className = 'z18-evt-sello';
        sello.textContent = '🎃 Especial Halloween';
        capa.appendChild(sello);
        ctx.add(capa, ctx.header, true);                                            // al principio de la cabecera: queda detrás del logo y los textos
      }
    }

  };

  /* ───────────────────────────── CARGADOR ───────────────────────────── */
  if (activeEvent === null || activeEvent === undefined || activeEvent === false || activeEvent === '') return;   // apagado: no se toca el DOM

  const mod = EVENTS[activeEvent];
  if (!mod) { console.warn('[Z18] Evento desconocido en activeEvent:', activeEvent, '· disponibles:', Object.keys(EVENTS).join(', ')); return; }

  const CLAVE = 'z18_evento_off';                     // localStorage: nombre del evento que el CLIENTE apagó desde «Mi cuenta»
  const apagadoPorCliente = () => { try { return localStorage.getItem(CLAVE) === activeEvent; } catch (e) { return false; } };
  const guardarEleccion = si => { try { if (si) localStorage.removeItem(CLAVE); else localStorage.setItem(CLAVE, activeEvent); } catch (e) { /* sin almacenamiento: vale solo para esta visita */ } };

  const nodes = [];            // todo lo que inyecta el evento (se quita al apagar)
  let limpiar = null;          // limpieza extra que devuelva el js del mod
  let armado = false;          // ¿ya se inyectó el decorado? (necesita el DOM armado)
  const root = document.documentElement;
  const encendido = () => root.getAttribute('data-evento') === activeEvent;   // ¿el evento está puesto ahora? LA señal: el atributo del que cuelga el tema

  /* Logo del evento (mod.logo) en los <img> de mod.logoEn. Los logos siguen a html[data-evento]: aplicarLogos() solo actúa con el evento puesto y
     devolverLogos() los devuelve a todos. Este archivo corre en el <head>, ANTES de que existan los <img>: un observador los cambia en el instante
     en que el navegador los arma (antes de dibujarlos) y, al terminar de armarse la página, se hace un último repaso. Si la página ya está armada
     (interruptor de «Mi cuenta», consola) se cambian en el acto. De cada <img> se guarda su src y su onerror originales: ahí vuelven al apagar el
     evento, y también si el archivo del evento no se encuentra en ninguna ruta (404, red caída): entonces vuelven TODOS y en esta visita no se reintenta. */
  const LOGO_EN = (mod.logo ? [].concat(mod.logoEn || '#logo') : []).filter(sel => {      // sin logoEn: solo la cabecera; un selector inválido se ignora (avisa)
    try { if (typeof sel !== 'string') return false; document.querySelector(sel); return true; }
    catch (e) { console.error('[Z18] logoEn: selector inválido «' + sel + '» (se ignora)'); return false; }
  });
  const logos = [];                                   // [{ el, src, onerror }]: cada <img> cambiado, con su src y su onerror tal como venían en el HTML
  let logoRoto = false;                               // el archivo del evento no cargó en ninguna ruta: en esta visita no se vuelve a intentar
  /* Dónde se busca el archivo: en la ruta de `logo` ('assets/logo-halloween.webp') y, si no está ahí, en la RAÍZ del sitio con el mismo nombre
     ('logo-halloween.webp'): así funciona también cuando el repositorio guarda los archivos sueltos, igual que el logo de siempre (que cae a 'logo.webp'). */
  const RUTAS = (() => {
    const m = /^(?:[^\/:?#]+\/)+([^\/:?#]+)$/.exec(mod.logo || '');        // solo rutas relativas dentro de una carpeta (no URLs ni rutas que empiezan con /)
    return mod.logo ? [mod.logo].concat(m ? [m[1]] : []) : [];
  })();
  let intento = 0;                                    // cuál de RUTAS usan los <img> (0 = la configurada)
  let probando = false;                               // se está buscando el archivo en la ruta siguiente
  let vigiaLogo = null;                               // observador que espera a los <img> mientras la página se está armando
  const pararVigiaLogo = () => { if (vigiaLogo) { vigiaLogo.disconnect(); vigiaLogo = null; } };
  const devolverLogos = () => {                       // cada <img> vuelve a su src y a su onerror originales
    pararVigiaLogo();
    logos.splice(0).forEach(({ el, src, onerror }) => {
      el.onerror = onerror;
      if (src === null) el.removeAttribute('src'); else el.setAttribute('src', src);
    });
  };
  /* Si el logo del evento no está en la ruta configurada, se prueba en la raíz SIN tocar los <img> hasta saber si está (con una imagen suelta, que el navegador
     guarda en su caché y que luego usan los <img>). Si no está en ninguna ruta, vuelven los logos de siempre y la consola (DevTools → Console) dice POR QUÉ: se consulta
     cada archivo una sola vez y se distingue 404 (no está en esa ruta), 200 con otra página en vez de una imagen (tipo MIME equivocado: típico de un rewrite de Vercel),
     archivo dañado y pedido bloqueado. Z18Events.diagnostico() hace esa misma consulta a pedido y además revisa el interruptor, la elección de este navegador y cada
     selector de logoEn. */
  const urlDe = ruta => { try { return new URL(ruta, document.baseURI).href; } catch (e) { return ruta; } };
  const consultarLogo = url => {                      // → Promise de { bien, noEsta, texto }: lo que responde el servidor por ese archivo, en una frase
    if (typeof fetch !== 'function') return Promise.resolve({ bien: false, texto: 'este navegador no permite consultar el archivo: abrilo en una pestaña nueva para ver qué responde el servidor.' });
    return fetch(url, { cache: 'no-store' }).then(res => {
      try { if (res.body) res.body.cancel(); } catch (e) { /* solo interesan los encabezados */ }
      const tipo = (res.headers.get('content-type') || 'sin tipo').split(';')[0].trim().toLowerCase();
      if (res.status === 404) return { bien: false, noEsta: true, texto: 'HTTP 404: el archivo NO está en esa ruta del sitio publicado (no es un problema de CORS ni de tipo MIME).' };
      if (!res.ok) return { bien: false, texto: 'HTTP ' + res.status + (res.statusText ? ' ' + res.statusText : '') + ': el servidor rechazó el pedido del archivo.' };
      if (tipo.indexOf('image/') !== 0) return { bien: false, texto: 'HTTP ' + res.status + ' pero el servidor devolvió «' + tipo + '» en vez de una imagen (tipo MIME incorrecto). Pasa cuando el archivo no existe y el sitio contesta con otra página (por ejemplo, una regla rewrite de vercel.json que manda todo a index.html).' };
      return { bien: true, texto: 'HTTP ' + res.status + ' y tipo «' + tipo + '»: el servidor entrega bien el archivo.' };
    }).catch(err => ({ bien: false, texto: 'no se pudo consultar el archivo (' + ((err && err.message) || err) + '): sin conexión, bloqueado por una extensión del navegador o una política de seguridad (CSP), o está en otro dominio sin permiso CORS. Abrilo en una pestaña nueva para ver qué responde.' }));
  };
  const causas = (urls, cs) => urls.map((u, i) => '  · ' + u + ' → ' + cs[i].texto + (cs[i].bien
    ? ' Entonces falla el navegador al dibujarlo: el archivo está dañado, incompleto o no es un WebP válido; o algo (una extensión, la política CSP img-src) lo bloqueó; o la conexión falló justo en ese momento (recargá con Ctrl+F5 para descartarlo).' : '')).join('\n');
  const explicarFalloLogo = falladas => {             // el archivo no cargó en ninguna ruta: la consola dice qué se probó y por qué falló cada una
    const urls = falladas.map(urlDe);
    console.error('[Z18] El logo del evento «' + mod.nombre + '» no cargó: ' + urls.join(' ni ') + ' · se muestra el logo de siempre (event-manager.js → logo: \'' + mod.logo + '\'). Consultando al servidor para ver la causa…');
    Promise.all(urls.map(consultarLogo)).then(cs => console.error('[Z18] Causa de que no cargue el logo del evento «' + mod.nombre + '»:\n' + causas(urls, cs)
      + (cs.every(c => c.noEsta) ? '\nSolución: subí el archivo al repositorio con ese nombre EXACTO —carpeta y mayúsculas: Vercel las distingue— a «' + mod.logo + '»'
        + (RUTAS.length > 1 ? ' (o a la raíz, como «' + RUTAS[1] + '»)' : '') + ', esperá a que Vercel termine de publicar y recargá con Ctrl+F5.' : ''))).catch(() => { /* el aviso nunca rompe nada */ });
  };
  const avisarRutaAlternativa = falladas => {         // no estaba en la ruta configurada pero sí en la raíz: funciona, y la consola lo cuenta (con la causa)
    const urls = falladas.map(urlDe), usada = urlDe(RUTAS[intento]);
    Promise.all(urls.map(consultarLogo)).then(cs => console.warn('[Z18] El logo del evento «' + mod.nombre + '» no está en la ruta configurada (event-manager.js → logo: \'' + mod.logo
      + '\') y se usa el de la raíz del sitio: ' + usada + '. Funciona, pero lo correcto es subirlo a «' + mod.logo + '» en el repositorio.\n' + causas(urls, cs))).catch(() => { /* el aviso nunca rompe nada */ });
  };
  const rendirse = falladas => {                      // no está en ninguna ruta: vuelven los logos de siempre (todos), con su respaldo, y la consola explica por qué
    probando = false;
    logoRoto = true;
    devolverLogos();
    try { explicarFalloLogo(falladas); } catch (e) { /* el aviso nunca rompe nada */ }
  };
  const cuidarFavicon = () => {                       // repositorio plano: el ícono de la pestaña (assets/logo.webp) tampoco existe → se usa el mismo archivo suelto en la raíz
    const ln = document.querySelector('link[rel~="icon"]');          // (lo que hace el onerror del logo de siempre, que acá no corre porque la cabecera muestra el del evento)
    const href = ln && ln.getAttribute('href'), m = href && /^(?:[^\/:?#]+\/)+([^\/:?#]+)$/.exec(href);
    if (!m) return;
    const a = new Image();
    a.onerror = () => { const b = new Image(); b.onload = () => ln.setAttribute('href', m[1]); b.src = m[1]; };
    a.src = href;
  };
  const probarRutas = (desde, falladas) => {          // `falladas` no cargaron: se prueba la ruta `desde` (si queda alguna) antes de rendirse
    if (desde >= RUTAS.length) { rendirse(falladas); return; }
    let sonda;
    try { sonda = new Image(); } catch (e) { rendirse(falladas); return; }
    probando = true;
    sonda.onload = () => {
      probando = false;
      if (logoRoto) return;
      intento = desde;                                // desde ahora se usa esta ruta (también si el evento se apaga y se vuelve a prender)
      logos.forEach(l => l.el.setAttribute('src', RUTAS[intento]));
      try { avisarRutaAlternativa(falladas); cuidarFavicon(); } catch (e) { /* el aviso nunca rompe nada */ }
    };
    sonda.onerror = () => probarRutas(desde + 1, falladas.concat(RUTAS[desde]));
    sonda.src = RUTAS[desde];
  };
  const falloLogo = () => {                           // un <img> con el logo del evento no cargó
    if (logoRoto || probando) return;                 // (si fallan varios <img> a la vez, se atiende una sola vez)
    probarRutas(intento + 1, [RUTAS[intento]]);
  };
  const aplicarLogos = () => {                        // cambia los <img> que ya existen y todavía no se cambiaron (no hace nada si el evento no está puesto)
    if (logoRoto || !encendido()) return;
    LOGO_EN.forEach(sel => document.querySelectorAll(sel).forEach(el => {
      if (el.tagName !== 'IMG' || logos.some(l => l.el === el)) return;
      logos.push({ el, src: el.getAttribute('src'), onerror: el.onerror });
      el.onerror = falloLogo;                         // si el archivo del evento falla, vuelve el logo de siempre
      el.setAttribute('src', RUTAS[intento]);
    }));
  };
  const alTerminarDeArmar = () => {                   // la página terminó de armarse: último repaso y se deja de vigilar
    aplicarLogos();
    pararVigiaLogo();
    if (encendido() && !logoRoto) LOGO_EN.forEach(sel => {      // un selector que no llega a ningún <img> se avisa en la consola
      const els = document.querySelectorAll(sel);
      if (!els.length) console.error('[Z18] logoEn: el selector «' + sel + '» no encontró ningún elemento en la página, así que ese logo no se cambia. Revisá que coincida con la etiqueta del index.html (por ejemplo <img id="logo"> para \'#logo\').');
      else if (!Array.prototype.some.call(els, el => el.tagName === 'IMG')) console.error('[Z18] logoEn: el selector «' + sel + '» encontró <' + els[0].tagName.toLowerCase() + '>, que no es un <img>, así que ese logo no se cambia. El selector tiene que apuntar a la etiqueta <img> del logo.');
    });
  };
  const buscarLogos = () => {                         // al encender: cambia ya los que existan y, si la página todavía se está armando, vigila a los que falten
    if (!LOGO_EN.length || logoRoto) return;
    aplicarLogos();
    if (document.readyState !== 'loading') return;    // ya está armada: no queda nada por esperar
    if (!vigiaLogo && typeof MutationObserver === 'function') {
      vigiaLogo = new MutationObserver(aplicarLogos);
      vigiaLogo.observe(root, { childList: true, subtree: true });
    }
    document.addEventListener('DOMContentLoaded', alTerminarDeArmar, { once: true });
  };

  const quitar = () => {                              // deshace TODO lo que puso el evento (no toca la elección guardada)
    armado = false;
    try { if (typeof limpiar === 'function') limpiar(); } catch (e) { /* nada */ }
    limpiar = null;
    nodes.splice(0).forEach(n => n.remove());
    devolverLogos();
    root.removeAttribute('data-evento');
  };

  const armar = () => {                               // inyecta el decorado; si el mod falla se apaga solo y se retira la API (el interruptor desaparece)
    if (!encendido() || armado) return;
    armado = true;
    const add = (nodo, padre = document.body, alInicio = false) => { alInicio ? padre.prepend(nodo) : padre.appendChild(nodo); nodes.push(nodo); return nodo; };
    try {
      if (mod.css) { const st = document.createElement('style'); st.id = `z18-evento-${activeEvent}-css`; st.textContent = mod.css; add(st, document.head); }
      if (mod.cssUrl) { const ln = document.createElement('link'); ln.rel = 'stylesheet'; ln.href = mod.cssUrl; ln.id = `z18-evento-${activeEvent}-link`; add(ln, document.head); }
      if (typeof mod.js === 'function') {
        limpiar = mod.js({ add, root, header: document.querySelector('header'), reducedMotion: matchMedia('(prefers-reduced-motion: reduce)').matches });
      }
      if (mod.jsUrl) { const sc = document.createElement('script'); sc.src = mod.jsUrl; sc.defer = true; sc.id = `z18-evento-${activeEvent}-script`; add(sc, document.body); }
    } catch (e) {
      console.error('[Z18] El evento «' + activeEvent + '» falló y se apagó solo:', e);   // un mod roto nunca rompe la web
      quitar();
      try { delete window.Z18Events; } catch (e2) { window.Z18Events = undefined; }
    }
  };

  const encender = () => {                            // se puede llamar las veces que sea: nada se duplica
    root.setAttribute('data-evento', activeEvent);                                  // YA: el tema de styles.css cuelga de este atributo y así se pinta desde el primer dibujo
    buscarLogos();                                                                  // YA también: los logos del evento reemplazan a los de siempre antes del primer dibujo
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', armar, { once: true });
    else armar();
  };

  /* Z18Events.diagnostico(): revisa de una vez TODO lo que puede dejar a la vista el logo de siempre y lo escribe en la consola con ✔ / ✘ (una sola salida, fácil de copiar).
     Devuelve una promesa con el mismo informe como objeto. */
  const diagnostico = () => {
    const urls = RUTAS.map(urlDe);
    const lineas = [], informe = { evento: activeEvent, encendido: encendido(), apagadoPorElNavegador: apagadoPorCliente(), logoRoto, urls, rutaEnUso: RUTAS[intento] || null, selectores: [], servidor: null };
    const linea = (bien, texto) => lineas.push((bien ? '✔ ' : '✘ ') + texto);
    linea(true, 'Interruptor general (event-manager.js): activeEvent = \'' + activeEvent + '\'');
    linea(!apagadoPorCliente(), apagadoPorCliente()
      ? 'Este navegador apagó el evento desde «Mi cuenta» (localStorage ' + CLAVE + ' = \'' + activeEvent + '\'): por eso se ve el logo de siempre. Para prenderlo: Z18Events.elegir(true)'
      : 'Este navegador no apagó el evento (localStorage ' + CLAVE + ' no lo apaga)');
    linea(encendido(), encendido()
      ? '<html data-evento="' + activeEvent + '"> está puesto: el evento está encendido'
      : '<html data-evento> no está puesto: el evento está apagado y se ven los logos de siempre. Para prenderlo en esta visita: Z18Events.encender()');
    if (!mod.logo) linea(false, 'el evento «' + mod.nombre + '» no tiene logo propio (falta logo: en su entrada de EVENTS): no se cambia ningún logo');
    LOGO_EN.forEach(sel => {
      const els = Array.prototype.slice.call(document.querySelectorAll(sel)), imgs = els.filter(el => el.tagName === 'IMG');
      informe.selectores.push({ selector: sel, elementos: els.length, imagenes: imgs.length });
      if (!els.length) linea(false, '«' + sel + '» no encuentra ningún elemento: no coincide con ninguna etiqueta del index.html actual');
      else if (!imgs.length) linea(false, '«' + sel + '» encuentra <' + els[0].tagName.toLowerCase() + '>, que no es un <img>: ese logo no se cambia');
      else imgs.forEach(img => {
        const src = img.getAttribute('src'), usa = RUTAS.indexOf(src) >= 0, ve = img.complete && img.naturalWidth > 0, espera = !img.complete && img.loading === 'lazy';
        const txt = '«' + sel + '» → <img src="' + src + '"> usa el logo ' + (usa ? 'del evento' : 'de siempre')
          + (ve ? ' y se ve' : espera ? ' (todavía no lo pidió: es «lazy» y carga al llegar hasta él)' : ' y NO se ve (no cargó o todavía está cargando)');
        if (usa && espera) lineas.push('· ' + txt); else linea(usa && ve, txt);
      });
    });
    if (mod.logo) {
      linea(!logoRoto, logoRoto ? 'el logo del evento ya falló en esta visita (por eso volvieron los de siempre): recargá para reintentar' : 'el logo del evento no falló en esta visita');
      if (intento > 0) linea(false, 'se está usando la ruta alternativa «' + RUTAS[intento] + '» porque «' + mod.logo + '» no cargó: conviene subir el archivo a «' + mod.logo + '»');
      lineas.push('· Ruta configurada (event-manager.js → logo): \'' + mod.logo + '\'' + (RUTAS.length > 1 ? ' · si no está ahí se prueba en la raíz: \'' + RUTAS[1] + '\'' : ''));
    }
    const cerrar = () => { console.log('[Z18] Diagnóstico del logo del evento «' + mod.nombre + '»\n' + lineas.join('\n')); return informe; };
    if (!mod.logo) return Promise.resolve(cerrar());
    informe.servidor = [];
    const revisar = i => consultarLogo(urls[i]).then(c => {       // se consulta la ruta configurada y, solo si no está bien, la siguiente (la raíz)
      informe.servidor.push({ url: urls[i], bien: c.bien, texto: c.texto });
      linea(c.bien, 'Servidor · ' + urls[i] + ' → ' + c.texto);
      return !c.bien && i + 1 < urls.length ? revisar(i + 1) : null;
    });
    return revisar(0).then(cerrar);
  };

  /* API pública (la usa el interruptor de «Mi cuenta» en app.js y la consola) */
  window.Z18Events = {
    activo: activeEvent, nombre: mod.nombre, emoji: mod.emoji || '', logo: mod.logo || '', logoEn: LOGO_EN.slice(),
    get encendido() { return encendido(); },
    encender, apagar: quitar,                         // solo esta visita
    diagnostico,                                      // revisa por qué se ve (o no) el logo del evento y lo escribe en la consola
    elegir: si => { guardarEleccion(!!si); if (si) encender(); else quitar(); }   // lo que hace el interruptor: aplica y guarda la elección del cliente
  };

  if (!apagadoPorCliente()) encender();               // salvo que el cliente lo haya apagado en una visita anterior
})();
