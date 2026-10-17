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
   ► LOGO DEL EVENTO: cada evento puede traer su propio logo para la cabecera: es la propiedad `logo` de su entrada en EVENTS (Halloween:
     'assets/logo-halloween.webp', una imagen cuadrada y con fondo transparente, como assets/logo.webp). Subí el archivo a esa ruta del repositorio:
     mientras el evento esté puesto, el <img id="logo"> de la cabecera lo usa (sin parpadeo del logo clásico y sin mover nada: el <img> ya trae
     width/height). Si el archivo no está, o el cliente apaga el evento, el logo de siempre vuelve solo. Sin `logo`, el evento no toca el logo.
   ► Este archivo se carga en el <head> a propósito: el atributo data-evento queda puesto ANTES del primer dibujo y no hay parpadeo
     (también la elección guardada del cliente se lee ahí, antes de pintar).
   ► REDEFINIR un evento (otro color, otro brillo): cambiá las variables --hw-* de la sección «EVENTO · HALLOWEEN» de styles.css
     (hay un bloque para modo oscuro y otro para modo claro). Los emojis de cada título están en esa misma sección, en la parte «3 · Emojis».
   ► SUMAR otro evento: copiá esa sección de styles.css cambiando «halloween» por el nombre nuevo, agregá una entrada a EVENTS
     (con css/js vacíos si no necesita decorado) y poné su nombre en activeEvent.
        css      → texto CSS que se inyecta en <style id="z18-evento-…-css">      (o cssUrl: 'eventos/navidad.css')
        js(ctx)  → función que arma el decorado (ctx.add(nodo, padre, alInicio) lo agrega y se limpia solo al apagar);
                   puede devolver una función de limpieza extra                      (o jsUrl: 'eventos/navidad.js')
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
      logo: 'assets/logo-halloween.webp',             // logo especial de la cabecera durante el evento (si el archivo falta, queda el logo de siempre)
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
  const guardarEleccion = encendido => { try { if (encendido) localStorage.removeItem(CLAVE); else localStorage.setItem(CLAVE, activeEvent); } catch (e) { /* sin almacenamiento: vale solo para esta visita */ } };

  const nodes = [];            // todo lo que inyecta el evento (se quita al apagar)
  let limpiar = null;          // limpieza extra que devuelva el js del mod
  let encendido = false;       // ¿el evento está puesto ahora?
  let armado = false;          // ¿ya se inyectó el decorado? (necesita el DOM armado)
  const root = document.documentElement;

  /* Logo del evento (mod.logo): se cambia el src del <img id="logo"> de la cabecera y, al apagar, se devuelve el original (src y respaldo onerror
     incluidos). Se hace apenas el navegador arma ese <img> —un observador, porque este archivo corre ANTES de que exista— y así el logo clásico
     nunca llega a dibujarse. Si el archivo del evento no está en el servidor (404), vuelve solo al logo de siempre. */
  let logoOrig = null;                                // { el, src, onerror } tal como venía en el HTML
  let vigiaLogo = null;                               // observador que espera al <img> mientras la página se está armando
  const pararVigiaLogo = () => { if (vigiaLogo) { vigiaLogo.disconnect(); vigiaLogo = null; } };
  const devolverLogo = () => {
    pararVigiaLogo();
    if (!logoOrig) return;
    const { el, src, onerror } = logoOrig;
    logoOrig = null;
    el.onerror = onerror;
    el.setAttribute('src', src);
  };
  const ponerLogo = el => {
    if (!el || (logoOrig && logoOrig.el === el)) return;
    logoOrig = { el, src: el.getAttribute('src'), onerror: el.onerror };
    el.onerror = devolverLogo;                        // 404: vuelve el logo de siempre (con su propio respaldo)
    el.setAttribute('src', mod.logo);
  };
  const buscarLogo = () => {
    if (!mod.logo) return;
    const el = document.getElementById('logo');
    if (el) return ponerLogo(el);
    if (document.readyState !== 'loading' || typeof MutationObserver !== 'function') return;   // la página ya está armada y no tiene logo: nada que cambiar
    vigiaLogo = new MutationObserver(() => { const l = document.getElementById('logo'); if (l) { pararVigiaLogo(); if (encendido) ponerLogo(l); } });
    vigiaLogo.observe(document.documentElement, { childList: true, subtree: true });
    document.addEventListener('DOMContentLoaded', pararVigiaLogo, { once: true });
  };

  const quitar = () => {                              // deshace TODO lo que puso el evento (no toca la elección guardada)
    encendido = false; armado = false;
    try { if (typeof limpiar === 'function') limpiar(); } catch (e) { /* nada */ }
    limpiar = null;
    nodes.splice(0).forEach(n => n.remove());
    devolverLogo();
    root.removeAttribute('data-evento');
  };

  const armar = () => {                               // inyecta el decorado; si el mod falla se apaga solo y se retira la API (el interruptor desaparece)
    if (!encendido || armado) return;
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

  const encender = () => {
    if (encendido) return;
    encendido = true;
    root.setAttribute('data-evento', activeEvent);                                  // YA: el tema de styles.css cuelga de este atributo y así se pinta desde el primer dibujo
    buscarLogo();                                                                   // YA también: el logo del evento reemplaza al de siempre antes del primer dibujo
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', armar, { once: true });
    else armar();
  };

  /* API pública (la usa el interruptor de «Mi cuenta» en app.js y la consola) */
  window.Z18Events = {
    activo: activeEvent, nombre: mod.nombre, emoji: mod.emoji || '', logo: mod.logo || '',
    get encendido() { return encendido; },
    encender, apagar: quitar,                         // solo esta visita
    elegir: si => { guardarEleccion(!!si); if (si) encender(); else quitar(); }   // lo que hace el interruptor: aplica y guarda la elección del cliente
  };

  if (!apagadoPorCliente()) encender();               // salvo que el cliente lo haya apagado en una visita anterior
})();
