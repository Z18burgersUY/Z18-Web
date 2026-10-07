/* ═══════════════════════════════════════════════════════════════════════════════════════════════
   Z18 · GESTOR DE EVENTOS TEMÁTICOS  ("Mod Loader")
   ───────────────────────────────────────────────────────────────────────────────────────────────
   Inyecta el CSS y el JS de un evento temático (Halloween, Navidad…) en la página SIN tocar index.html.
   Cada evento es un "mod" del registro EVENTS (más abajo): { nombre, css, js }.

   ► INTERRUPTOR GENERAL — es la única línea que hay que cambiar:

         const activeEvent = null;          // APAGADO: no se inyecta nada, la web queda tal cual
         const activeEvent = 'halloween';   // ENCENDIDO: se inyecta el evento «halloween»

   ► Para sumar otro evento: agregá una entrada a EVENTS con su css y su js, y poné su nombre en activeEvent.
        css      → texto CSS que se inyecta en <style id="z18-evento-…-css">      (o cssUrl: 'eventos/navidad.css')
        js(ctx)  → función que arma el decorado (ctx.add(nodo, padre, alInicio) lo agrega y se limpia solo al apagar);
                   puede devolver una función de limpieza extra                      (o jsUrl: 'eventos/navidad.js')
   Reglas de oro de un mod: nada de position estático que mueva el diseño (usá absolute/fixed), pointer-events: none en el
   decorado, y respetar prefers-reduced-motion. Si el mod falla, el gestor lo apaga solo y la web sigue funcionando.
   Desde la consola del navegador: Z18Events.apagar() lo quita al instante.
   ═══════════════════════════════════════════════════════════════════════════════════════════════ */
const activeEvent = null;

(function Z18EventManager() {
  'use strict';

  /* ───────────────────────────── REGISTRO DE EVENTOS (los mods) ───────────────────────────── */
  const EVENTS = {

    halloween: {
      nombre: 'Halloween',
      css: `
        /* Tinte morado/naranja en la cabecera, el logo y las brasas (solo cambia variables y colores, no el diseño) */
        html[data-evento="halloween"] { --z-hero1: #2a1245; }
        html[data-evento="halloween"] .glow-logo { filter: drop-shadow(0 0 24px rgba(168, 85, 247, .55)) drop-shadow(0 0 10px rgba(255, 120, 0, .55)); }
        html[data-evento="halloween"] .glow-text { text-shadow: 0 0 14px rgba(168, 85, 247, .65); }
        html[data-evento="halloween"] .ember { background: #c084fc; box-shadow: 0 0 8px 2px rgba(192, 132, 252, .7); }
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
                         font: 400 1rem/1.2 'Bebas Neue', sans-serif; letter-spacing: .08em; color: #1b0b2e;
                         background: linear-gradient(135deg, #ffb347, #ff6a00); box-shadow: 0 2px 12px rgba(255, 106, 0, .55); transform: rotate(-4deg); }
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

  const nodes = [];            // todo lo que inyecta el evento (se quita al apagar)
  let limpiar = null;          // limpieza extra que devuelva el js del mod
  const root = document.documentElement;

  const apagar = () => {
    try { if (typeof limpiar === 'function') limpiar(); } catch (e) { /* nada */ }
    nodes.splice(0).forEach(n => n.remove());
    root.removeAttribute('data-evento');
    try { delete window.Z18Events; } catch (e) { window.Z18Events = undefined; }
  };

  const arrancar = () => {
    const add = (nodo, padre = document.body, alInicio = false) => { alInicio ? padre.prepend(nodo) : padre.appendChild(nodo); nodes.push(nodo); return nodo; };
    root.setAttribute('data-evento', activeEvent);                                  // los CSS de los mods cuelgan de este atributo
    try {
      if (mod.css) { const st = document.createElement('style'); st.id = `z18-evento-${activeEvent}-css`; st.textContent = mod.css; add(st, document.head); }
      if (mod.cssUrl) { const ln = document.createElement('link'); ln.rel = 'stylesheet'; ln.href = mod.cssUrl; ln.id = `z18-evento-${activeEvent}-link`; add(ln, document.head); }
      if (typeof mod.js === 'function') {
        limpiar = mod.js({ add, root, header: document.querySelector('header'), reducedMotion: matchMedia('(prefers-reduced-motion: reduce)').matches });
      }
      if (mod.jsUrl) { const sc = document.createElement('script'); sc.src = mod.jsUrl; sc.defer = true; sc.id = `z18-evento-${activeEvent}-script`; add(sc, document.body); }
    } catch (e) {
      console.error('[Z18] El evento «' + activeEvent + '» falló y se apagó solo:', e);   // un mod roto nunca rompe la web
      apagar();
      return;
    }
    window.Z18Events = { activo: activeEvent, nombre: mod.nombre, apagar };
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', arrancar, { once: true });
  else arrancar();
})();
